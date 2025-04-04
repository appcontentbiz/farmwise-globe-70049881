
import React from "react";
import { FarmingType } from "../types/farmingTypes";
import { FarmingTypeCard } from "./FarmingTypeCard";

interface FarmingTypesGridProps {
  farmingTypes: FarmingType[];
  onFarmingTypeClick: (farmingType: FarmingType) => void;
}

export function FarmingTypesGrid({ farmingTypes, onFarmingTypeClick }: FarmingTypesGridProps) {
  return (
    <div>
      <h4 className="font-medium mb-3">Beginner Farming Types</h4>
      <p className="text-sm text-muted-foreground mb-4">Explore different farming approaches suitable for beginners</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {farmingTypes.map((type) => (
          <FarmingTypeCard 
            key={type.id}
            farmingType={type}
            onClick={onFarmingTypeClick}
          />
        ))}
      </div>
    </div>
  );
}
