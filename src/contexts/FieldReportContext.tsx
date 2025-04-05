
import React, { createContext, useContext, ReactNode } from "react";
import { FieldReport, FieldReportContextType } from "@/types/fieldReportTypes";
import { useFieldReportOperations } from "@/hooks/useFieldReportOperations";

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
  const {
    reports,
    loading,
    isSubmitting,
    setIsSubmitting,
    hasError,
    isOffline,
    refreshReports,
    addReport
  } = useFieldReportOperations();

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

export type { FieldReport };
