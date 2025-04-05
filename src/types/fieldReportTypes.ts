
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

export interface FieldReportContextType {
  reports: FieldReport[];
  addReport: (report: Omit<FieldReport, "id" | "submittedAt">) => Promise<void>;
  loading: boolean;
  isSubmitting: boolean;
  setIsSubmitting: (value: boolean) => void;
  refreshReports: () => Promise<void>;
  hasError: boolean;
  isOffline: boolean;
}
