
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { FarmingType } from "../types/farmingTypes";

export function useFarmingTypeActions() {
  const [selectedType, setSelectedType] = useState<FarmingType | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const { toast } = useToast();

  const handleCompareClick = () => {
    toast({
      title: "Comparing Farming Types",
      description: "Loading comprehensive comparison chart...",
    });
    
    // Simulate loading
    setTimeout(() => {
      toast({
        title: "Comparison Ready",
        description: "Displaying detailed comparison of farming approaches.",
      });
      
      setTimeout(() => {
        toast({
          title: "Feature Preview",
          description: "This comparison feature will be fully interactive in the next update.",
        });
      }, 1500);
    }, 1000);
  };

  const handleCardClick = (farmingType: FarmingType) => {
    setSelectedType(farmingType);
    setShowDialog(true);
  };

  const handleResourceClick = (url?: string, title?: string) => {
    if (url) {
      try {
        const urlToOpen = url.startsWith('http') ? url : `https://${url}`;
        window.open(urlToOpen, '_blank', 'noopener,noreferrer');
        
        toast({
          title: "Resource Opened",
          description: `Opening ${title || 'resource'} in a new tab.`,
        });
      } catch (error) {
        toast({
          title: "Link Error",
          description: `The link for "${title || 'resource'}" appears to be invalid.`,
          variant: "destructive"
        });
      }
    } else {
      toast({
        title: "Resource Unavailable",
        description: "This resource doesn't have an accessible link yet.",
      });
    }
  };

  const handleQuickAction = (action: string, farmingType?: string) => {
    const actionMessages = {
      "learn": `Loading educational resources for ${farmingType || "beginning farmers"}...`,
      "connect": "Finding mentors and communities for beginning farmers...",
      "tools": "Searching for essential tools and equipment...",
      "grants": "Exploring available grants and financial assistance..."
    };
    
    toast({
      title: "Loading Resources",
      description: actionMessages[action as keyof typeof actionMessages] || "Loading resources...",
    });
    
    setTimeout(() => {
      toast({
        title: "Resources Ready",
        description: `${farmingType ? farmingType + " resources" : "Beginning farmer resources"} are now available.`,
      });
    }, 1500);
  };

  return {
    selectedType,
    showDialog,
    setShowDialog,
    handleCompareClick,
    handleCardClick,
    handleResourceClick,
    handleQuickAction
  };
}
