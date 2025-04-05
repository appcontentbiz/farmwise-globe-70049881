
import { FieldReport } from "@/types/fieldReportTypes";
import { Loader2 } from "lucide-react";
import { ReportCard } from "./ReportCard";

interface ReportsListContentProps {
  loading: boolean;
  filteredReports: FieldReport[];
}

export function ReportsListContent({ loading, filteredReports }: ReportsListContentProps) {
  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-muted-foreground">
        <Loader2 className="h-8 w-8 animate-spin mb-4" />
        <p>Loading reports...</p>
      </div>
    );
  }
  
  if (filteredReports.length === 0) {
    return (
      <div className="py-12 flex flex-col items-center justify-center text-muted-foreground">
        <p className="mb-1">No reports found</p>
        <p className="text-sm">Try adjusting your search or filters</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {filteredReports.map((report) => (
        <ReportCard key={report.id} report={report} />
      ))}
    </div>
  );
}
