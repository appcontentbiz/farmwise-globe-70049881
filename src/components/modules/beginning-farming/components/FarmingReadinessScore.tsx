
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function FarmingReadinessScore() {
  const { toast } = useToast();
  const [hovering, setHovering] = useState(false);

  const handleScoreClick = () => {
    toast({
      title: "Readiness Assessment",
      description: "Your farming readiness score is based on completed training, equipment preparation, and market research.",
    });
  };

  return (
    <div className="mb-6">
      <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
        Farming Readiness Score
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-4 w-4 rounded-full"
          onClick={handleScoreClick}
        >
          <Info className="h-3 w-3" />
        </Button>
      </h4>
      <div className="flex items-center justify-center">
        <div 
          className="relative flex items-center justify-center cursor-pointer transition-all"
          onClick={handleScoreClick}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          <svg className={`w-32 h-32 ${hovering ? 'scale-105' : ''} transition-transform`}>
            <circle
              className="text-muted/20"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
              r="56"
              cx="64"
              cy="64"
            />
            <circle
              className="text-farm-green"
              strokeWidth="8"
              strokeDasharray={356}
              strokeDashoffset={356 - (356 * 65) / 100}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="56"
              cx="64"
              cy="64"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-2xl font-bold">65%</span>
            {hovering && (
              <span className="text-xs text-farm-green animate-fade-in">Click for details</span>
            )}
          </div>
        </div>
      </div>
      <p className="text-center text-sm text-muted-foreground mt-2">Overall Readiness Score</p>
      <div className="grid grid-cols-3 gap-2 mt-3">
        <div className="text-center">
          <div className="text-xs text-muted-foreground">Training</div>
          <div className="text-sm font-medium">75%</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-muted-foreground">Equipment</div>
          <div className="text-sm font-medium">60%</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-muted-foreground">Planning</div>
          <div className="text-sm font-medium">70%</div>
        </div>
      </div>
    </div>
  );
}
