
import React from "react";
import { CalendarDays, Globe, Award, FileText, CloudRain } from "lucide-react";
import { cn } from "@/lib/utils";

interface GlobalEventCardProps {
  title: string;
  description: string;
  type: "weather" | "policy" | "innovation" | "disease" | "market";
  location: string;
  date: string;
  className?: string;
}

export function GlobalEventCard({
  title,
  description,
  type,
  location,
  date,
  className
}: GlobalEventCardProps) {
  const getEventIcon = () => {
    switch (type) {
      case "weather":
        return <CloudRain className="h-4 w-4 text-blue-500" />;
      case "policy":
        return <FileText className="h-4 w-4 text-purple-500" />;
      case "innovation":
        return <Award className="h-4 w-4 text-green-500" />;
      case "disease":
        return <CloudRain className="h-4 w-4 text-red-500" />;
      case "market":
        return <FileText className="h-4 w-4 text-orange-500" />;
      default:
        return <Globe className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className={cn(
      "border rounded-lg p-3 space-y-2 transition-all hover:border-primary/30 hover:shadow-sm",
      className
    )}>
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-sm flex items-center gap-1.5">
          {getEventIcon()}
          {title}
        </h4>
        <span className={`text-xs px-2 py-0.5 rounded-full
          ${type === 'weather' ? 'bg-blue-100 text-blue-800' : 
          type === 'policy' ? 'bg-purple-100 text-purple-800' : 
          type === 'innovation' ? 'bg-green-100 text-green-800' :
          type === 'disease' ? 'bg-red-100 text-red-800' :
          'bg-orange-100 text-orange-800'}`}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
      <div className="flex justify-between text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Globe className="h-3 w-3" />
          {location}
        </span>
        <span className="flex items-center gap-1">
          <CalendarDays className="h-3 w-3" />
          {date}
        </span>
      </div>
      <div className="text-xs text-right text-primary">Click for details</div>
    </div>
  );
}
