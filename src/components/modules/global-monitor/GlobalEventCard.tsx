
import { CloudRain, FileText, Leaf, MapPin, AlertCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface GlobalEventCardProps {
  title: string;
  description: string;
  type: "weather" | "policy" | "innovation" | "disease" | "market";
  location: string;
  date: string;
  severity?: "low" | "medium" | "high";
}

export function GlobalEventCard({ 
  title, 
  description, 
  type, 
  location, 
  date,
  severity
}: GlobalEventCardProps) {
  const getIcon = () => {
    switch (type) {
      case "weather":
        return <CloudRain className="h-5 w-5 text-blue-500" />;
      case "policy":
        return <FileText className="h-5 w-5 text-orange-500" />;
      case "innovation":
        return <Leaf className="h-5 w-5 text-green-500" />;
      case "disease":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case "market":
        return <FileText className="h-5 w-5 text-purple-500" />;
      default:
        return <CloudRain className="h-5 w-5 text-blue-500" />;
    }
  };

  const getTypeLabel = () => {
    switch (type) {
      case "weather":
        return "Weather Event";
      case "policy":
        return "Policy Change";
      case "innovation":
        return "Agricultural Innovation";
      case "disease":
        return "Disease Outbreak";
      case "market":
        return "Market Shift";
      default:
        return "Event";
    }
  };

  const getSeverityColor = () => {
    switch (severity) {
      case "high":
        return "bg-red-100 border-red-200 text-red-800";
      case "medium":
        return "bg-yellow-100 border-yellow-200 text-yellow-800";
      case "low":
        return "bg-green-100 border-green-200 text-green-800";
      default:
        return "bg-muted/50";
    }
  };

  return (
    <div className={`border rounded-lg p-4 hover:bg-muted/30 transition-colors ${severity ? getSeverityColor() : ''}`}>
      <div className="flex items-start gap-3">
        <div className="mt-1">{getIcon()}</div>
        <div className="flex-1">
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
          <div className="flex items-center flex-wrap gap-2 mt-3">
            <Badge variant="outline" className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {location}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {date}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {getTypeLabel()}
            </Badge>
            {severity && (
              <Badge variant="outline" className={`
                ${severity === "high" ? "bg-red-100 text-red-800 border-red-200" : 
                  severity === "medium" ? "bg-yellow-100 text-yellow-800 border-yellow-200" : 
                  "bg-green-100 text-green-800 border-green-200"}
              `}>
                {severity.charAt(0).toUpperCase() + severity.slice(1)} Impact
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
