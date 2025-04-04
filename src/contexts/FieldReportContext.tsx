
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";

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

  // Load reports from localStorage on initial render
  useEffect(() => {
    const loadReports = () => {
      try {
        const savedReports = localStorage.getItem("field-reports");
        if (savedReports) {
          setReports(JSON.parse(savedReports));
        }
      } catch (error) {
        console.error("Error loading field reports:", error);
        toast({
          title: "Error",
          description: "Failed to load saved reports",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    // Simulate network delay for demo purposes
    setTimeout(() => {
      loadReports();
    }, 600);
  }, [toast]);

  // Save reports to localStorage whenever they change
  useEffect(() => {
    if (reports.length > 0) {
      localStorage.setItem("field-reports", JSON.stringify(reports));
    }
  }, [reports]);

  const addReport = async (report: Omit<FieldReport, "id" | "submittedAt">) => {
    setIsSubmitting(true);
    
    try {
      // Simulate network request delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newReport: FieldReport = {
        ...report,
        id: Date.now().toString(),
        submittedAt: new Date().toISOString(),
      };
      
      setReports(prev => [newReport, ...prev]);
      
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
        setIsSubmitting
      }}
    >
      {children}
    </FieldReportContext.Provider>
  );
};
