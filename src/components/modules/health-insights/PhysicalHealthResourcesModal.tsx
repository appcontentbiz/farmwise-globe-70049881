
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink, FileText, Activity, Heart, Download } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PhysicalHealthResourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PhysicalHealthResourcesModal({ isOpen, onClose }: PhysicalHealthResourcesModalProps) {
  const resources = [
    {
      title: "AgriSafe Network",
      description: "Health, safety, and prevention information for farmers and ranchers",
      url: "https://www.agrisafe.org/",
      icon: Heart
    },
    {
      title: "Ergonomics for Farmers",
      description: "Guide to proper posture and techniques for common farming tasks",
      downloadable: true,
      icon: Activity
    },
    {
      title: "Rural Health Information Hub",
      description: "Health resources specifically for agricultural communities",
      url: "https://www.ruralhealthinfo.org/",
      icon: FileText
    },
    {
      title: "Stretching Routine for Farmers",
      description: "Daily stretches to prevent common musculoskeletal issues",
      downloadable: true,
      icon: Activity
    },
    {
      title: "Heat Stress Prevention Guide",
      description: "Preventing heat-related illness during hot weather work",
      downloadable: true,
      icon: FileText
    }
  ];

  const handleDownload = (resourceTitle: string) => {
    // In a real app, this would initiate the actual file download
    alert(`Download started for: ${resourceTitle}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Physical Health Resources</DialogTitle>
          <DialogDescription>
            Access guides, tools, and information to improve physical wellbeing for agricultural workers
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[60vh] pr-4 mt-4">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Downloadable Guides</h3>
              <div className="grid grid-cols-1 gap-4">
                {resources.filter(r => r.downloadable).map((resource, index) => (
                  <div key={index} className="border p-4 rounded-lg bg-green-50">
                    <div className="flex items-start gap-3">
                      <resource.icon className="h-5 w-5 text-farm-green mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium">{resource.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{resource.description}</p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-2"
                          onClick={() => handleDownload(resource.title)}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Online Resources</h3>
              <div className="grid grid-cols-1 gap-4">
                {resources.filter(r => r.url).map((resource, index) => (
                  <div key={index} className="border p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <resource.icon className="h-5 w-5 text-farm-green mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium">{resource.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{resource.description}</p>
                        {resource.url && (
                          <a href={resource.url} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="sm" className="mt-2">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Visit Website
                            </Button>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Daily Health Tips for Farmers</h3>
              <div className="bg-farm-green/10 p-4 rounded-lg">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Heart className="h-4 w-4 text-farm-green mt-0.5" />
                    <span>Stay hydrated by drinking water throughout the day, not just when thirsty</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Heart className="h-4 w-4 text-farm-green mt-0.5" />
                    <span>Take brief stretching breaks every two hours of repetitive work</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Heart className="h-4 w-4 text-farm-green mt-0.5" />
                    <span>Use proper lifting techniques: bend at the knees, not the waist</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Heart className="h-4 w-4 text-farm-green mt-0.5" />
                    <span>Protect your skin with sunscreen, even on cloudy days</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Heart className="h-4 w-4 text-farm-green mt-0.5" />
                    <span>Wear hearing protection when operating loud machinery</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
