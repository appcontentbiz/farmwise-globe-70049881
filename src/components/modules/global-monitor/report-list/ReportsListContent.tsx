
import { FieldReport } from "@/types/fieldReportTypes";
import { Loader2 } from "lucide-react";
import { ReportCard } from "./ReportCard";
import { useState, useEffect } from "react";

interface ReportsListContentProps {
  loading: boolean;
  filteredReports: FieldReport[];
}

export function ReportsListContent({ loading, filteredReports }: ReportsListContentProps) {
  // Add a delayed loading state to prevent flickering for quick loads
  const [showLoading, setShowLoading] = useState(false);
  
  useEffect(() => {
    let timer: number;
    if (loading) {
      // Only show loading indicator if loading takes more than 300ms
      timer = window.setTimeout(() => setShowLoading(true), 300);
    } else {
      setShowLoading(false);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [loading]);
  
  if (loading && showLoading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-muted-foreground">
        <Loader2 className="h-8 w-8 animate-spin mb-4" />
        <p>Loading reports...</p>
      </div>
    );
  }
  
  if (!loading && filteredReports.length === 0) {
    return (
      <div className="py-12 flex flex-col items-center justify-center text-muted-foreground">
        <p className="mb-1">No reports found</p>
        <p className="text-sm">Try adjusting your search or filters</p>
      </div>
    );
  }
  
  // Don't show anything during short loading periods to prevent layout shifts
  if (loading && !showLoading) {
    return <div className="min-h-[200px]"></div>;
  }
  
  return (
    <div className="space-y-4">
      {filteredReports.map((report) => (
        <ReportCard key={report.id} report={report} />
      ))}
    </div>
  );
}
