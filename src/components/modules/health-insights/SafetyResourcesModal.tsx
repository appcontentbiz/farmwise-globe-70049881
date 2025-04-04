
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink, FileText, Shield, Download } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SafetyResourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SafetyResourcesModal({ isOpen, onClose }: SafetyResourcesModalProps) {
  const resources = [
    {
      title: "Farm Safety Plan Template",
      description: "Comprehensive safety plan template for your farm operations",
      downloadable: true,
      icon: FileText
    },
    {
      title: "OSHA Agricultural Safety Resources",
      description: "Official safety guidelines and checklists for agricultural operations",
      url: "https://www.osha.gov/agricultural-operations",
      icon: Shield
    },
    {
      title: "National Farm Medicine Center",
      description: "Research and resources dedicated to agricultural health and safety",
      url: "https://marshfieldresearch.org/nfmc",
      icon: FileText
    },
    {
      title: "Agricultural Safety and Health Council",
      description: "Best practices and training materials for farm safety",
      url: "http://ashca.org/",
      icon: Shield
    },
    {
      title: "Equipment Safety Checklist",
      description: "Pre-operation inspection checklists for common farm equipment",
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
          <DialogTitle>Farm Safety Resources</DialogTitle>
          <DialogDescription>
            Access safety guides, checklists, and training materials for your farm
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[60vh] pr-4 mt-4">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Safety Plan Resources</h3>
              <div className="grid grid-cols-1 gap-4">
                {resources.filter(r => r.downloadable).map((resource, index) => (
                  <div key={index} className="border p-4 rounded-lg bg-blue-50">
                    <div className="flex items-start gap-3">
                      <resource.icon className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
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
              <h3 className="text-lg font-medium mb-4">Safety Training Resources</h3>
              <div className="bg-farm-green/10 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Recommended Training Topics</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-farm-green mt-0.5" />
                    <span>Equipment operation and maintenance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-farm-green mt-0.5" />
                    <span>Chemical handling and storage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-farm-green mt-0.5" />
                    <span>Livestock handling safety</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-farm-green mt-0.5" />
                    <span>Emergency response procedures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-farm-green mt-0.5" />
                    <span>First aid and CPR certification</span>
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
