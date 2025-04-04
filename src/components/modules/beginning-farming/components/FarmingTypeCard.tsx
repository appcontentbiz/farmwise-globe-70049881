
import { FarmingType } from "../types/farmingTypes";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface FarmingTypeCardProps {
  type: FarmingType;
  onLearnMoreClick?: (typeName: string, description: string) => void;
  onCardClick: (farmingType: FarmingType) => void;
}

export function FarmingTypeCard({ type, onLearnMoreClick, onCardClick }: FarmingTypeCardProps) {
  return (
    <Card 
      key={type.id} 
      className="border border-muted p-5 hover:border-farm-green/50 hover:shadow-md transition-all cursor-pointer" 
      onClick={() => onCardClick(type)}
    >
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 flex items-center justify-center rounded-md bg-farm-green/10">
            {type.icon}
          </div>
          <h3 className="font-medium text-lg">{type.title}</h3>
        </div>
        
        <p className="text-muted-foreground text-sm line-clamp-2">{type.description}</p>
        
        <div className="space-y-3">
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Expertise Needed</span>
              <span className="font-medium">{type.expertise}/5</span>
            </div>
            <div className="w-full bg-muted h-2 rounded-full">
              <div 
                className="bg-farm-green h-2 rounded-full" 
                style={{ width: `${(type.expertise / 5) * 100}%` }}
              />
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Initial Cost</span>
              <span className="font-medium">{type.initialCost}/5</span>
            </div>
            <div className="w-full bg-muted h-2 rounded-full">
              <div 
                className="bg-farm-green h-2 rounded-full" 
                style={{ width: `${(type.initialCost / 5) * 100}%` }}
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center pt-2">
          <Button 
            size="sm" 
            variant="link" 
            className="text-farm-green p-0 h-auto"
            onClick={(e) => {
              e.stopPropagation();
              if (onLearnMoreClick) {
                onLearnMoreClick(type.title, type.description);
              }
            }}
          >
            Learn more
          </Button>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </div>
      </div>
    </Card>
  );
}
