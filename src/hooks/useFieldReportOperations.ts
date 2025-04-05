
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
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
  const { toast: uiToast } = useToast();
  const { user } = useAuth();

  // Monitor online/offline status
  useEffect(() => {
    function handleOnline() {
      setIsOffline(false);
      refreshReports();
    }
    
    function handleOffline() {
      setIsOffline(true);
    }
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Set up realtime subscription
  useEffect(() => {
    if (!user || isOffline) return;
    
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
        if (status !== 'SUBSCRIBED') {
          console.warn("Realtime subscription not established", status);
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, isOffline]);

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
      const transformedReports = transformReportData(data);
      
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
