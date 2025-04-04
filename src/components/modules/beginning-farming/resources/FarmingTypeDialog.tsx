
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sprout, ExternalLink } from "lucide-react";
import { FarmingType } from "../types/farmingTypes";

interface FarmingTypeDialogProps {
  open: boolean;
  farmingType: FarmingType | null;
  onClose: () => void;
}

export function FarmingTypeDialog({ open, farmingType, onClose }: FarmingTypeDialogProps) {
  if (!farmingType) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {farmingType.icon}
            {farmingType.title}
          </DialogTitle>
          <DialogDescription>{farmingType.description}</DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="space-y-6 p-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Benefits</h3>
                <ul className="space-y-2">
                  {farmingType.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Sprout className="h-4 w-4 text-farm-green mt-1" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Challenges</h3>
                <ul className="space-y-2">
                  {farmingType.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Sprout className="h-4 w-4 text-amber-500 mt-1" />
                      <span>{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Getting Started</h3>
              <ol className="space-y-3 list-decimal pl-5">
                {farmingType.startingSteps.map((step, index) => (
                  <li key={index} className="pl-1">
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Key Resources</h3>
              <div className="space-y-4">
                {farmingType.resources.map((resource, index) => (
                  <div key={index} className="border p-3 rounded-md">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium">{resource.title}</h4>
                        <p className="text-sm text-muted-foreground">{resource.description}</p>
                      </div>
                      {resource.url && (
                        <a href={resource.url} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Access
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="border-t pt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Suitability for Beginners</h3>
                <Badge className="bg-farm-green">Beginner Friendly</Badge>
              </div>
              <p className="mt-2">
                {farmingType.title} is generally considered accessible for beginning farmers, 
                particularly if you start small and scale up gradually as you build experience. 
                The key is to start with proper education, have realistic expectations, and connect 
                with experienced mentors in this farming type.
              </p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
