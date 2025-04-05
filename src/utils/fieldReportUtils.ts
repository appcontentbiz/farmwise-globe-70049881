
import { FieldReport } from "@/types/fieldReportTypes";

// Key for storing reports in localStorage
export const OFFLINE_REPORTS_KEY = 'offline-field-reports';

// Helper function to save reports to localStorage
export const saveReportsLocally = (data: FieldReport[]): void => {
  try {
    localStorage.setItem(OFFLINE_REPORTS_KEY, JSON.stringify(data));
  } catch (error) {
    console.warn('Failed to save reports to localStorage:', error);
  }
};

// Helper function to load reports from localStorage
export const loadLocalReports = (): FieldReport[] => {
  try {
    const savedReports = localStorage.getItem(OFFLINE_REPORTS_KEY);
    return savedReports ? JSON.parse(savedReports) : [];
  } catch (error) {
    console.warn('Failed to load reports from localStorage:', error);
    return [];
  }
};

// Helper to transform Supabase report data to our FieldReport interface
export const transformReportData = (data: any[]): FieldReport[] => {
  return data.map(report => ({
    id: report.id,
    reportType: report.report_type,
    location: report.location,
    title: report.title,
    description: report.description,
    submittedAt: report.submitted_at,
    files: report.files
  }));
};

// Create a new report object for offline storage
export const createTempReport = (
  report: Omit<FieldReport, "id" | "submittedAt">
): FieldReport => {
  return {
    id: `temp-${Date.now()}`,
    ...report,
    submittedAt: new Date().toISOString(),
  };
};
