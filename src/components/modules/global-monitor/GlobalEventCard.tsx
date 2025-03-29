
import { CloudRain, FileText, Leaf, MapPin } from "lucide-react";

interface GlobalEventCardProps {
  title: string;
  description: string;
  type: "weather" | "policy" | "innovation" | "disease" | "market";
  location: string;
  date: string;
}

export function GlobalEventCard({ 
  title, 
  description, 
  type, 
  location, 
  date 
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
        return <Leaf className="h-5 w-5 text-red-500" />;
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

  return (
    <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
      <div className="flex items-start gap-3">
        <div className="mt-1">{getIcon()}</div>
        <div className="flex-1">
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
          <div className="flex items-center text-xs text-muted-foreground mt-2 gap-4">
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {location}
            </span>
            <span>{date}</span>
            <span className="bg-muted px-1.5 py-0.5 rounded">{getTypeLabel()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
