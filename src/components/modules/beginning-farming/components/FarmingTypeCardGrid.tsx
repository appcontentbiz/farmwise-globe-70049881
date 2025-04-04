
import { FarmingType } from "../types/farmingTypes";
import { farmingTypesData } from "../data/farmingTypesData";
import { FarmingTypeCard } from "./FarmingTypeCard";

interface FarmingTypeCardGridProps {
  onLearnMoreClick?: (typeName: string, description: string) => void;
  onCardClick: (farmingType: FarmingType) => void;
}

export function FarmingTypeCardGrid({ onLearnMoreClick, onCardClick }: FarmingTypeCardGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {farmingTypesData.map((type) => (
        <FarmingTypeCard 
          key={type.id}
          type={type}
          onLearnMoreClick={onLearnMoreClick}
          onCardClick={onCardClick}
        />
      ))}
    </div>
  );
}
