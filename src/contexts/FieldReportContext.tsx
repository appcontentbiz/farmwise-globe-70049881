
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "./AuthContext";

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

export const FieldReportProvider = ({ children }: FieldReportProviderProps) => {
  const [reports, setReports] = useState<FieldReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  // Set up realtime subscription
  useEffect(() => {
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
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Load reports from Supabase on initial render
  useEffect(() => {
    refreshReports();
  }, [user]);

  const refreshReports = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('field_reports')
        .select('*')
        .order('submitted_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
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
    } catch (error) {
      console.error("Error loading field reports:", error);
      toast({
        title: "Error",
        description: "Failed to load reports",
        variant: "destructive",
      });
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
      
      // We don't need to manually add to the reports array since the realtime subscription
      // will trigger a refresh
      
      return Promise.resolve();
    } catch (error) {
      console.error("Error adding report:", error);
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
        refreshReports
      }}
    >
      {children}
    </FieldReportContext.Provider>
  );
};
