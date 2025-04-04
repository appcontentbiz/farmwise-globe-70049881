
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "./AuthContext";
import { isSessionValid } from "@/utils/authUtils";

export interface FieldReport {
  id: string;
  reportType: string;
  location: string;
  title: string;
  description: string;
  submittedAt: string;
  files?: {
    name: string;
    size: number;
    type: string;
  }[];
}

interface FieldReportContextType {
  reports: FieldReport[];
  addReport: (report: Omit<FieldReport, "id" | "submittedAt">) => Promise<void>;
  loading: boolean;
  isSubmitting: boolean;
  setIsSubmitting: (value: boolean) => void;
  refreshReports: () => Promise<void>;
  hasError: boolean;
  isOffline: boolean;
}

const FieldReportContext = createContext<FieldReportContextType | undefined>(undefined);

export const useFieldReports = () => {
  const context = useContext(FieldReportContext);
  if (context === undefined) {
    throw new Error("useFieldReports must be used within a FieldReportProvider");
  }
  return context;
};

interface FieldReportProviderProps {
  children: ReactNode;
}

// Key for storing reports in localStorage
const OFFLINE_REPORTS_KEY = 'offline-field-reports';

export const FieldReportProvider = ({ children }: FieldReportProviderProps) => {
  const [reports, setReports] = useState<FieldReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [retryCount, setRetryCount] = useState(0);
  const { toast } = useToast();
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

  // Helper function to save reports to localStorage
  const saveReportsLocally = (data: FieldReport[]) => {
    try {
      localStorage.setItem(OFFLINE_REPORTS_KEY, JSON.stringify(data));
    } catch (error) {
      console.warn('Failed to save reports to localStorage:', error);
    }
  };

  // Helper function to load reports from localStorage
  const loadLocalReports = (): FieldReport[] => {
    try {
      const savedReports = localStorage.getItem(OFFLINE_REPORTS_KEY);
      return savedReports ? JSON.parse(savedReports) : [];
    } catch (error) {
      console.warn('Failed to load reports from localStorage:', error);
      return [];
    }
  };

  const refreshReports = async () => {
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
        toast({
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
      const transformedReports = data.map(report => ({
        id: report.id,
        reportType: report.report_type,
        location: report.location,
        title: report.title,
        description: report.description,
        submittedAt: report.submitted_at,
        files: report.files
      }));
      
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
        toast({
          title: "Using Cached Data",
          description: "Showing locally stored reports due to connection issues.",
          variant: "default",
        });
      } else {
        toast({
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
      toast({
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
        const tempReport: FieldReport = {
          id: `temp-${Date.now()}`,
          ...report,
          submittedAt: new Date().toISOString(),
        };
        
        const localReports = loadLocalReports();
        localReports.unshift(tempReport); // Add to beginning of array
        saveReportsLocally(localReports);
        
        setReports([tempReport, ...reports]);
        toast({
          title: "Report Saved Offline",
          description: "Your report will be uploaded when you're back online.",
          variant: "default",
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

  return (
    <FieldReportContext.Provider
      value={{
        reports,
        addReport,
        loading,
        isSubmitting,
        setIsSubmitting,
        refreshReports,
        hasError,
        isOffline
      }}
    >
      {children}
    </FieldReportContext.Provider>
  );
};
