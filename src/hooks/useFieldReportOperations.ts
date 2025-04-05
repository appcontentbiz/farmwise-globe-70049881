
import { useState, useEffect, useRef, useCallback } from 'react';
import { supabase, handleSupabaseError } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { isSessionValid } from "@/utils/authUtils";
import { FieldReport } from "@/types/fieldReportTypes";
import { 
  saveReportsLocally, 
  loadLocalReports, 
  transformReportData,
  createTempReport
} from "@/utils/fieldReportUtils";

export const useFieldReportOperations = () => {
  const [reports, setReports] = useState<FieldReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [retryCount, setRetryCount] = useState(0);
  const [lastRefreshAttempt, setLastRefreshAttempt] = useState(0);
  const channelRef = useRef<any>(null);
  const { toast: uiToast } = useToast();
  const { user } = useAuth();

  // Monitor online/offline status with improved handling
  useEffect(() => {
    const handleOnlineWithValidation = async () => {
      // Only update state after confirming we're really online
      try {
        // Add a small delay to ensure the network is stable
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Test network connectivity with a real request
        const response = await fetch('/favicon.ico', { 
          method: 'HEAD',
          cache: 'no-store',
          // Set a reasonable timeout
          signal: AbortSignal.timeout(5000)
        });
        
        if (response.ok) {
          console.log("Network connection restored, refreshing data");
          setIsOffline(false);
          refreshReports();
        }
      } catch (error) {
        console.log("Browser reports online but network test failed");
        // We're not really online - do nothing
      }
    };
    
    function handleOffline() {
      console.log("Browser reports offline");
      setIsOffline(true);
    }
    
    window.addEventListener('online', handleOnlineWithValidation);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnlineWithValidation);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Cleanup function for realtime subscription
  const cleanupRealtimeSubscription = useCallback(() => {
    if (channelRef.current) {
      try {
        supabase.removeChannel(channelRef.current);
      } catch (error) {
        console.warn("Error cleaning up realtime subscription:", error);
      }
      channelRef.current = null;
    }
  }, []);

  // Set up realtime subscription with better error handling and cleanup
  useEffect(() => {
    if (!user || isOffline) {
      cleanupRealtimeSubscription();
      return;
    }
    
    try {
      // Clean up any existing subscription first
      cleanupRealtimeSubscription();
      
      const channel = supabase
        .channel('field-reports-changes')
        .on('postgres_changes', {
          event: '*',
          schema: 'public',
          table: 'field_reports'
        }, () => {
          // Refresh reports when any change happens
          refreshReports();
        })
        .subscribe((status) => {
          if (status === 'SUBSCRIBED') {
            console.log("Realtime subscription established");
          } else if (status === 'TIMED_OUT') {
            console.warn("Realtime subscription timed out");
          } else if (status === 'CHANNEL_ERROR') {
            console.warn("Realtime subscription error");
          } else if (status === 'CLOSED') {
            console.warn("Realtime subscription closed");
          }
        });

      channelRef.current = channel;
      
      return () => {
        cleanupRealtimeSubscription();
      };
    } catch (error) {
      console.error("Error setting up realtime subscription:", error);
      // Don't break the component if this fails
    }
  }, [user, isOffline, cleanupRealtimeSubscription]);

  // Load reports from Supabase on initial render
  useEffect(() => {
    refreshReports();
  }, [user]);

  const refreshReports = async () => {
    // Prevent rapid successive refresh attempts (debounce)
    const now = Date.now();
    if (now - lastRefreshAttempt < 2000) {
      return;
    }
    setLastRefreshAttempt(now);
    
    try {
      setLoading(true);
      
      if (isOffline) {
        const localReports = loadLocalReports();
        setReports(localReports);
        setLoading(false);
        setHasError(false);
        return;
      }

      // Check if we have a valid session before making the request
      const { valid } = await isSessionValid();
      if (!valid && user) {
        setHasError(true);
        uiToast({
          title: "Session Error",
          description: "Your session is invalid. Please sign in again.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }
      
      const { data, error } = await supabase
        .from('field_reports')
        .select('*')
        .order('submitted_at', { ascending: false });
      
      if (error) {
        // Handle based on error type
        const errorInfo = handleSupabaseError(error);
        
        if (retryCount < 3) {
          // Add exponential backoff for retries
          const delay = Math.pow(2, retryCount) * 1000;
          console.log(`Retrying after ${delay}ms (attempt ${retryCount + 1})`);
          setTimeout(() => {
            setRetryCount(retryCount + 1);
            refreshReports();
          }, delay);
          return;
        }
        
        throw error;
      }
      
      // Reset retry count on success
      setRetryCount(0);
      setHasError(false);
      
      // Transform the data to match our FieldReport interface
      const transformedReports = transformReportData(data || []);
      
      setReports(transformedReports);
      
      // Also store reports locally for offline access
      saveReportsLocally(transformedReports);
    } catch (error: any) {
      console.error("Error loading field reports:", error);
      setHasError(true);
      
      // Fall back to cached data
      const localReports = loadLocalReports();
      if (localReports.length > 0) {
        setReports(localReports);
        uiToast({
          title: "Using Cached Data",
          description: "Showing locally stored reports due to connection issues.",
          variant: "default",
        });
      } else {
        uiToast({
          title: "Failed to Load Reports",
          description: "Check your internet connection and try again.",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const addReport = async (report: Omit<FieldReport, "id" | "submittedAt">) => {
    if (!user) {
      uiToast({
        title: "Authentication Required",
        description: "You must be signed in to submit reports",
        variant: "destructive",
      });
      return Promise.reject("Authentication required");
    }
    
    setIsSubmitting(true);
    
    try {
      // If offline, store locally to sync later
      if (isOffline) {
        const tempReport = createTempReport(report);
        
        const localReports = loadLocalReports();
        localReports.unshift(tempReport); // Add to beginning of array
        saveReportsLocally(localReports);
        
        setReports([tempReport, ...reports]);
        toast("Report Saved Offline", {
          description: "Your report will be uploaded when you're back online."
        });
        
        return Promise.resolve();
      }
      
      // Insert the report into Supabase
      const { error } = await supabase
        .from('field_reports')
        .insert({
          user_id: user.id,
          report_type: report.reportType,
          location: report.location,
          title: report.title,
          description: report.description,
          files: report.files
        });
      
      if (error) {
        throw error;
      }
      
      toast.success("Report submitted successfully");
      return Promise.resolve();
    } catch (error) {
      console.error("Error adding report:", error);
      toast.error("Failed to submit report");
      return Promise.reject(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    reports,
    loading,
    isSubmitting,
    setIsSubmitting,
    hasError,
    isOffline,
    refreshReports,
    addReport
  };
};
