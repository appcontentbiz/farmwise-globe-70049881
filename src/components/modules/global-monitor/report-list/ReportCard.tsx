
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Clock, MapPin } from "lucide-react";
import { format } from "date-fns";
import { FieldReport } from "@/types/fieldReportTypes";

interface ReportCardProps {
  report: FieldReport;
}

export function ReportCard({ report }: ReportCardProps) {
  const getReportTypeBadgeColor = (type: string): string => {
    switch (type) {
      case "weather": return "bg-blue-100 text-blue-800";
      case "disease": return "bg-red-100 text-red-800";
      case "innovation": return "bg-green-100 text-green-800";
      case "market": return "bg-purple-100 text-purple-800";
      case "policy": return "bg-amber-100 text-amber-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  const getReportTypeLabel = (type: string): string => {
    switch (type) {
      case "weather": return "Weather Event";
      case "disease": return "Crop Disease/Pest";
      case "innovation": return "Farming Technique";
      case "market": return "Market Insight";
      case "policy": return "Policy Impact";
      default: return type;
    }
  };

  return (
    <Card key={report.id} className={`overflow-hidden ${report.id.startsWith('temp-') ? 'border-dashed border-amber-300' : ''}`}>
      <div className="p-4">
        {report.id.startsWith('temp-') && (
          <Badge className="mb-2 bg-amber-100 text-amber-800 border-amber-200">
            Pending Upload
          </Badge>
        )}
        <div className="flex justify-between items-start gap-2 mb-2">
          <h3 className="font-medium text-lg">{report.title}</h3>
          <Badge className={`${getReportTypeBadgeColor(report.reportType)}`}>
            {getReportTypeLabel(report.reportType)}
          </Badge>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {report.description}
        </p>
        
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            <span>{report.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>
              {format(new Date(report.submittedAt), "MMM d, yyyy")}
            </span>
          </div>
          {report.files && report.files.length > 0 && (
            <div className="text-blue-600">
              {report.files.length} attachment{report.files.length !== 1 ? "s" : ""}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
