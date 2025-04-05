
import { FieldReport } from "@/types/fieldReportTypes";
import { Loader2 } from "lucide-react";
import { ReportCard } from "./ReportCard";
import { useState, useEffect, useRef } from "react";

interface ReportsListContentProps {
  loading: boolean;
  filteredReports: FieldReport[];
}

export function ReportsListContent({ loading, filteredReports }: ReportsListContentProps) {
  // Track previous loading state to detect changes
  const prevLoadingRef = useRef(loading);
  
  // Add a delayed loading state to prevent flickering for quick loads
  const [showLoading, setShowLoading] = useState(false);
  
  // Capture the last non-empty reports to prevent UI flashing during refresh
  const [stableReports, setStableReports] = useState<FieldReport[]>(filteredReports);
  
  // Update stable reports when we have data and we're not loading
  useEffect(() => {
    if (!loading && filteredReports.length > 0) {
      setStableReports(filteredReports);
    }
  }, [loading, filteredReports]);
  
  useEffect(() => {
    let timer: number;
    
    if (loading) {
      // Only show loading indicator if loading takes more than 600ms
      // This prevents flickering for quick refreshes
      timer = window.setTimeout(() => setShowLoading(true), 600);
    } else {
      // When transitioning from loading to not loading, add a slight delay
      // This prevents the UI from jumping around
      timer = window.setTimeout(() => {
        setShowLoading(false);
      }, prevLoadingRef.current ? 100 : 0);
    }
    
    // Update the ref to track state changes
    prevLoadingRef.current = loading;
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [loading]);
  
  // Show loading state
  if (loading && showLoading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-muted-foreground">
        <Loader2 className="h-8 w-8 animate-spin mb-4" />
        <p>Loading reports...</p>
      </div>
    );
  }
  
  // Show empty state - but only if not loading and we have no reports
  // This prevents "No reports found" from flashing during loading
  if (!loading && filteredReports.length === 0 && stableReports.length === 0) {
    return (
      <div className="py-12 flex flex-col items-center justify-center text-muted-foreground">
        <p className="mb-1">No reports found</p>
        <p className="text-sm">Try adjusting your search or filters</p>
      </div>
    );
  }
  
  // During brief loading periods, show the previous reports to avoid layout shifts
  const reportsToShow = loading && !showLoading ? stableReports : filteredReports;
  
  return (
    <div className="space-y-4">
      {reportsToShow.map((report) => (
        <ReportCard key={report.id} report={report} />
      ))}
    </div>
  );
}
