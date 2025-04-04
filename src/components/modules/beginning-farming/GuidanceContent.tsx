
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ResourceCardGrid } from "./components/guidance/ResourceCardGrid";
import { GuidedSteps } from "./components/guidance/GuidedSteps";
import { ResourceContentModal } from "./ResourceContentModal";
import { FarmingTypeInfoDialog } from "./components/guidance/FarmingTypeInfoDialog";
import { CustomizeGuideModal } from "./CustomizeGuideModal";

export function GuidanceContent() {
  const [showCustomizeModal, setShowCustomizeModal] = useState(false);
  const [showResourceModal, setShowResourceModal] = useState(false);
  const [resourceModalContent, setResourceModalContent] = useState({
    title: "",
    type: ""
  });
  const [showFarmingTypeInfo, setShowFarmingTypeInfo] = useState(false);
  const [selectedFarmingType, setSelectedFarmingType] = useState<{
    title: string;
    description: string;
    details: string;
  } | null>(null);
  const { toast } = useToast();

  const handleResourceClick = (title: string, type: string) => {
    setResourceModalContent({
      title,
      type
    });
    setShowResourceModal(true);
  };
  
  const handleFarmingTypeClick = (title: string, description: string) => {
    setSelectedFarmingType({
      title,
      description,
      details: `Detailed information about ${title} will be available soon. This will include best practices, required resources, expected timeline, and success factors for ${title.toLowerCase()}.`
    });
    setShowFarmingTypeInfo(true);
  };

  // Function to handle downloadable resources
  const handleDownload = (resourceName: string) => {
    toast({
      title: "Download Started",
      description: `${resourceName} will be downloaded shortly.`,
    });
    
    // In a real app, this would be a link to the actual resource
    // Simulating a download after a short delay
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: `${resourceName} has been downloaded successfully.`,
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <GuidedSteps 
        onCustomizeClick={() => setShowCustomizeModal(true)}
        onDownload={handleDownload}
      />
      
      <ResourceCardGrid 
        onResourceClick={handleResourceClick}
      />
      
      <CustomizeGuideModal 
        isOpen={showCustomizeModal} 
        onClose={() => setShowCustomizeModal(false)}
      />

      <ResourceContentModal
        isOpen={showResourceModal}
        onClose={() => setShowResourceModal(false)}
        content={resourceModalContent}
      />
      
      <FarmingTypeInfoDialog
        open={showFarmingTypeInfo}
        onOpenChange={setShowFarmingTypeInfo}
        farmingType={selectedFarmingType}
      />
    </div>
  );
}
