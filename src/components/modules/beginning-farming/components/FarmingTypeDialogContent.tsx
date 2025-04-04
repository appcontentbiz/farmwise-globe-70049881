
import { FarmingType } from "../types/farmingTypes";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sprout, Users, ExternalLink } from "lucide-react";

interface FarmingTypeDialogContentProps {
  selectedType: FarmingType;
  handleResourceClick: (url?: string, title?: string) => void;
  handleQuickAction: (action: string, farmingType?: string) => void;
}

export function FarmingTypeDialogContent({ 
  selectedType, 
  handleResourceClick, 
  handleQuickAction 
}: FarmingTypeDialogContentProps) {
  return (
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
  );
}
