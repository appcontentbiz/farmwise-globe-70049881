
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { LearningResources } from "./resources/LearningResources";
import { FarmingTypesGrid } from "./resources/FarmingTypesGrid";
import { LearningPath } from "./resources/LearningPath";
import { FarmingTypeDialog } from "./resources/FarmingTypeDialog";
import { farmingTypesData } from "./data/farmingTypesData";
import { FarmingType } from "./types/farmingTypes";

export function ResourcesContent() {
  const { toast } = useToast();
  const [showFarmingTypeInfo, setShowFarmingTypeInfo] = useState(false);
  const [selectedFarmingType, setSelectedFarmingType] = useState<FarmingType | null>(null);

  // Handle resource interaction
  const handleResourceClick = (resource: string) => {
    const resourceUrls: Record<string, string> = {
      "usda": "https://www.farmers.gov/your-business/beginning-farmers",
      "videos": "https://www.youtube.com/playlist?list=PLhQpDGfX5e7AgV_6jpvKJeVU5T1F0BAgJ",
      "extension": "https://nifa.usda.gov/extension",
      "mentor": "https://www.farmcommons.org/farm-interns-and-apprentices"
    };

    if (resourceUrls[resource]) {
      window.open(resourceUrls[resource], '_blank');
    } else {
      toast({
        title: "Resource Access",
        description: `${resource} resources are being prepared. Check back soon!`,
      });
    }
  };

  // Handle farming type selection
  const handleFarmingTypeClick = (farmingType: FarmingType) => {
    setSelectedFarmingType(farmingType);
    setShowFarmingTypeInfo(true);
  };

  return (
    <div className="space-y-6">
      <LearningResources onResourceClick={handleResourceClick} />
      
      <FarmingTypesGrid 
        farmingTypes={farmingTypesData} 
        onFarmingTypeClick={handleFarmingTypeClick} 
      />
      
      <LearningPath />

      <FarmingTypeDialog
        open={showFarmingTypeInfo}
        farmingType={selectedFarmingType}
        onClose={() => setShowFarmingTypeInfo(false)}
      />
    </div>
  );
}
