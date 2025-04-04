
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
import { FarmResource } from "../../utils/guidanceResources";
import { useState } from "react";

interface GuidanceCategoryProps {
  guides: FarmResource[];
  onGuideClick: (guideId: string) => void;
}

export function GuidanceCategory({ guides, onGuideClick }: GuidanceCategoryProps) {
  const [hoveredGuide, setHoveredGuide] = useState<string | null>(null);
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {guides.map((guide) => (
        <Card 
          key={guide.id} 
          className={`border transition-all ${
            hoveredGuide === guide.id 
              ? "border-farm-green shadow-sm" 
              : "hover:border-farm-green"
          } cursor-pointer`}
          onClick={() => onGuideClick(guide.id)}
          onMouseEnter={() => setHoveredGuide(guide.id)}
          onMouseLeave={() => setHoveredGuide(null)}
        >
          <CardContent className="p-4 flex justify-between items-start">
            <div>
              <h3 className="font-medium">{guide.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{guide.description}</p>
              <div className="mt-2">
                <Badge variant="outline" className="text-xs bg-farm-green/10">
                  {guide.timeToComplete}
                </Badge>
              </div>
            </div>
            <ChevronRight className={`h-5 w-5 ${
              hoveredGuide === guide.id 
                ? "text-farm-green" 
                : "text-muted-foreground"
            } transition-colors`} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
