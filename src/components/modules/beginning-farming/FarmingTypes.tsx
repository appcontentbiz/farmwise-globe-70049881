
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  ExternalLink, 
  Share2, 
  Sprout, 
  ChevronRight,
  BookOpen,
  FileText,
  Users
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { farmingTypesData } from "./data/farmingTypesData";

// Making sure the interface is the same as the one in farmingTypesData.tsx
interface FarmingTypeData {
  id: string;
  title: string;
  icon: JSX.Element;
  description: string;
  expertise: number;
  initialCost: number;
  benefits: string[];
  challenges: string[];
  startingSteps: string[];
  resources: {
    title: string;
    url?: string;
    description: string;
  }[];
}

export function FarmingTypes() {
  const [selectedType, setSelectedType] = useState<FarmingTypeData | null>(null);
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
      
      // Here we would typically navigate to a comparison view or open a modal
      // For now, we'll just simulate it with a toast
      setTimeout(() => {
        toast({
          title: "Feature Preview",
          description: "This comparison feature will be fully interactive in the next update.",
        });
      }, 1500);
    }, 1000);
  };

  const handleCardClick = (farmingType: FarmingTypeData) => {
    setSelectedType(farmingType);
    setShowDialog(true);
  };

  // Function to handle resource links
  const handleResourceClick = (url?: string, title?: string) => {
    if (url) {
      // Verify URL is valid before opening
      try {
        // Check if URL has proper protocol
        const urlToOpen = url.startsWith('http') ? url : `https://${url}`;
        // Open in new tab
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

  // Function to handle quick action buttons
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
    
    // Simulate loading
    setTimeout(() => {
      toast({
        title: "Resources Ready",
        description: `${farmingType ? farmingType + " resources" : "Beginning farmer resources"} are now available.`,
      });
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 gap-6 mt-6">
      <Card className="farm-module-card">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Sprout className="h-5 w-5 text-farm-green" />
              <h2 className="text-xl font-semibold">Beginner Farming Types</h2>
            </div>
            <Button variant="outline" onClick={handleCompareClick}>
              <Share2 className="h-4 w-4 mr-2" />
              Compare Types
            </Button>
          </div>
          <p className="text-muted-foreground mb-6">Explore different farming approaches suitable for beginners</p>
          
          <div className="flex flex-wrap gap-3 mb-8">
            <Button size="sm" variant="outline" onClick={() => handleQuickAction("learn")}>
              <BookOpen className="h-4 w-4 mr-2" />
              Learn More
            </Button>
            <Button size="sm" variant="outline" onClick={() => handleQuickAction("connect")}>
              <Users className="h-4 w-4 mr-2" />
              Connect with Mentors
            </Button>
            <Button size="sm" variant="outline" onClick={() => handleQuickAction("tools")}>
              <FileText className="h-4 w-4 mr-2" />
              Equipment Guide
            </Button>
            <Button size="sm" variant="outline" onClick={() => handleQuickAction("grants")}>
              <FileText className="h-4 w-4 mr-2" />
              Find Grants
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {farmingTypesData.map((type) => (
              <Card 
                key={type.id} 
                className="border border-muted p-5 hover:border-farm-green/50 hover:shadow-md transition-all cursor-pointer" 
                onClick={() => handleCardClick(type)}
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
                        handleQuickAction("learn", type.title);
                      }}
                    >
                      Learn more
                    </Button>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Card>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
          {selectedType && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  <span className="w-6 h-6 flex items-center justify-center">{selectedType.icon}</span>
                  <span>{selectedType.title}</span>
                </DialogTitle>
                <DialogDescription>{selectedType.description}</DialogDescription>
              </DialogHeader>
              
              <ScrollArea className="h-[calc(100vh-220px)] pr-4">
                <div className="space-y-6">
                  <div className="flex flex-row gap-6 flex-wrap md:flex-nowrap">
                    <div className="flex-1 min-w-[250px]">
                      <h3 className="font-semibold text-lg mb-3">Benefits</h3>
                      <ul className="space-y-2">
                        {selectedType.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start space-x-2">
                            <Sprout className="h-4 w-4 text-farm-green mt-1 flex-shrink-0" />
                            <span className="text-sm">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex-1 min-w-[250px]">
                      <h3 className="font-semibold text-lg mb-3">Challenges</h3>
                      <ul className="space-y-2">
                        {selectedType.challenges.map((challenge, i) => (
                          <li key={i} className="flex items-start space-x-2">
                            <Sprout className="h-4 w-4 text-amber-500 mt-1 flex-shrink-0" />
                            <span className="text-sm">{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Getting Started</h3>
                    <ol className="list-decimal pl-5 space-y-2">
                      {selectedType.startingSteps.map((step, i) => (
                        <li key={i} className="pl-1">
                          <span className="text-sm">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Recommended Resources</h3>
                    <div className="space-y-3">
                      {selectedType.resources.map((resource, i) => (
                        <div key={i} className="border p-3 rounded-md">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-medium text-sm">{resource.title}</h4>
                              <p className="text-xs text-muted-foreground mt-1">{resource.description}</p>
                            </div>
                            {resource.url && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleResourceClick(resource.url, resource.title);
                                }}
                              >
                                <ExternalLink className="h-3 w-3 mr-1" />
                                Access
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg">Suitability for Beginners</h3>
                      <div className="flex space-x-3">
                        <Badge className="bg-farm-green">
                          Expertise: {selectedType.expertise}/5
                        </Badge>
                        <Badge className="bg-farm-green">
                          Initial Cost: {selectedType.initialCost}/5
                        </Badge>
                      </div>
                    </div>
                    <p className="mt-2 text-sm">
                      {selectedType.title} is generally considered 
                      {selectedType.expertise <= 3 ? " accessible" : " challenging"} for beginning farmers.
                      Start small and scale up gradually as you build experience. 
                      The key is to start with proper education, have realistic expectations, 
                      and connect with experienced mentors in this farming type.
                    </p>
                    
                    <div className="flex gap-3 mt-4">
                      <Button 
                        variant="outline"
                        onClick={() => handleQuickAction("connect", selectedType.title)}
                      >
                        <Users className="h-4 w-4 mr-2" />
                        Find Mentors
                      </Button>
                      
                      <Button 
                        variant="outline"
                        onClick={() => handleQuickAction("tools", selectedType.title)}
                      >
                        Find Equipment
                      </Button>
                      
                      <Button 
                        variant="outline"
                        onClick={() => handleQuickAction("grants", selectedType.title)}
                      >
                        Explore Grants
                      </Button>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
