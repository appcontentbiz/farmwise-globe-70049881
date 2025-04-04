
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FarmingType } from "../types/farmingTypes";

interface FarmingTypeCardProps {
  farmingType: FarmingType;
  onClick: (farmingType: FarmingType) => void;
}

export function FarmingTypeCard({ farmingType, onClick }: FarmingTypeCardProps) {
  return (
    <Card 
      className="p-4 hover:bg-muted/20 transition-colors cursor-pointer"
      onClick={() => onClick(farmingType)}
    >
      <div className="flex flex-col items-center text-center">
        <div className="h-12 w-12 rounded-full bg-farm-green/10 flex items-center justify-center mb-3">
          {farmingType.icon}
        </div>
        <h4 className="font-medium">{farmingType.title}</h4>
        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{farmingType.description}</p>
        <Button variant="ghost" size="sm" className="mt-2 text-xs">
          Learn More
        </Button>
      </div>
    </Card>
  );
}
