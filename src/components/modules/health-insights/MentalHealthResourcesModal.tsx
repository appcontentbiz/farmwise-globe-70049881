
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink, FileText, Phone, Brain } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ResourceLink {
  title: string;
  description: string;
  url?: string;
  phone?: string;
  icon: React.ElementType;
}

interface MentalHealthResourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MentalHealthResourcesModal({ isOpen, onClose }: MentalHealthResourcesModalProps) {
  const resources: ResourceLink[] = [
    {
      title: "Farm Aid Resource Network",
      description: "Connects farmers with services, from crisis support to legal help and financial counseling.",
      url: "https://www.farmaid.org/our-work/resources-for-farmers/",
      icon: FileText
    },
    {
      title: "Farm Crisis Center",
      description: "Immediate help for stress, anxiety, depression, or financial challenges.",
      phone: "1-800-FARM-AID (1-800-327-6243)",
      icon: Phone
    },
    {
      title: "AgrAbility Mental Wellness Resources",
      description: "Tools and education to support mental health in agricultural communities.",
      url: "https://agrability.org/resources/mental-wellness",
      icon: Brain
    },
    {
      title: "Rural Health Information Hub",
      description: "Comprehensive guides on mental health in rural communities.",
      url: "https://www.ruralhealthinfo.org/topics/mental-health",
      icon: FileText
    },
    {
      title: "National Suicide Prevention Lifeline",
      description: "24/7, free and confidential support for people in distress.",
      phone: "988 or 1-800-273-8255",
      icon: Phone
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Mental Health Resources for Farmers</DialogTitle>
          <DialogDescription>
            Access professional support, educational materials, and community resources
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[60vh] pr-4 mt-4">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Crisis Support</h3>
              <div className="grid grid-cols-1 gap-4">
                {resources
                  .filter(resource => resource.phone)
                  .map((resource, index) => (
                    <div key={index} className="border p-4 rounded-lg bg-amber-50">
                      <div className="flex items-start gap-3">
                        <resource.icon className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium">{resource.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{resource.description}</p>
                          {resource.phone && (
                            <Button variant="outline" size="sm" className="mt-2">
                              <Phone className="h-4 w-4 mr-2" />
                              {resource.phone}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Online Resources</h3>
              <div className="grid grid-cols-1 gap-4">
                {resources
                  .filter(resource => resource.url)
                  .map((resource, index) => (
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
              <h3 className="text-lg font-medium mb-4">Self-Care Strategies</h3>
              <div className="bg-farm-green/10 p-4 rounded-lg">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Brain className="h-4 w-4 text-farm-green mt-0.5" />
                    <span>Schedule regular breaks during work hours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Brain className="h-4 w-4 text-farm-green mt-0.5" />
                    <span>Practice deep breathing when feeling overwhelmed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Brain className="h-4 w-4 text-farm-green mt-0.5" />
                    <span>Connect with other farmers through community groups</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Brain className="h-4 w-4 text-farm-green mt-0.5" />
                    <span>Set realistic goals and expectations for yourself</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Brain className="h-4 w-4 text-farm-green mt-0.5" />
                    <span>Create clear boundaries between work and rest time</span>
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
