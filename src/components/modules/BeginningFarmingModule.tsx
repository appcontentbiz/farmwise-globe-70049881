
import { useState } from "react";
import { GuidanceTabs } from "./beginning-farming/components/GuidanceTabs";
import { ProgressTracker } from "./beginning-farming/components/ProgressTracker";
import { FarmingTypeDetailDialog } from "./beginning-farming/components/FarmingTypeDetailDialog";
import { FarmingTypes } from "./beginning-farming/FarmingTypes";
import { FarmingCalendar } from "./beginning-farming/FarmingCalendar";
import { ProgressCharts } from "./beginning-farming/ProgressCharts";
import { PredictiveInsights } from "./PredictiveInsights";
import { TrackingInterface } from "./TrackingInterface";
import { useToast } from "@/hooks/use-toast";

export function BeginningFarmingModule() {
  const [activeTab, setActiveTab] = useState("guidance");
  const [showFarmingTypeDetails, setShowFarmingTypeDetails] = useState(false);
  const [selectedFarmingType, setSelectedFarmingType] = useState<{
    name: string;
    description: string;
  } | null>(null);
  const { toast } = useToast();

  // Handle tab change to simulate tracking user activity
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    // Show toast to indicate tracking is active
    toast({
      title: "Progress Tracked",
      description: `Your exploration of the ${value} section has been logged.`,
    });
  };

  // Handle learn more button clicks
  const handleLearnMoreClick = (typeName: string, description: string) => {
    setSelectedFarmingType({
      name: typeName,
      description: description
    });
    setShowFarmingTypeDetails(true);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GuidanceTabs activeTab={activeTab} onTabChange={handleTabChange} />
        <ProgressTracker />
      </div>
      
      <FarmingTypes onLearnMoreClick={handleLearnMoreClick} />
      
      <FarmingCalendar />
      
      <ProgressCharts />
      
      <PredictiveInsights moduleName="Beginning Farming" />
      
      <TrackingInterface moduleName="Beginning Farming" />
      
      <FarmingTypeDetailDialog 
        open={showFarmingTypeDetails} 
        onOpenChange={setShowFarmingTypeDetails}
        farmingType={selectedFarmingType}
      />
    </div>
  );
}
