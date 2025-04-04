import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Check, 
  ClipboardList, 
  Flower, 
  ListChecks, 
  Sprout
} from "lucide-react";
import { TrackingInterface } from "./TrackingInterface";
import { PredictiveInsights } from "./PredictiveInsights";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GuidanceContent } from "./beginning-farming/GuidanceContent";
import { ResourcesContent } from "./beginning-farming/ResourcesContent";
import { ChecklistContent } from "./beginning-farming/ChecklistContent";
import { FarmingCalendar } from "./beginning-farming/FarmingCalendar";
import { ProgressCharts } from "./beginning-farming/ProgressCharts";
import { FarmingTypes } from "./beginning-farming/FarmingTypes";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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
        <Card className="farm-module-card col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="farm-module-card-title">
              <Sprout className="h-5 w-5 text-farm-green" />
              Beginning Farming Guidance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="guidance" value={activeTab} onValueChange={handleTabChange}>
              <TabsList className="mb-4">
                <TabsTrigger value="guidance">Structured Guidance</TabsTrigger>
                <TabsTrigger value="resources">Learning Resources</TabsTrigger>
                <TabsTrigger value="checklist">Getting Started Checklist</TabsTrigger>
              </TabsList>
              
              <TabsContent value="guidance">
                <ScrollArea className="h-[calc(100vh-320px)]">
                  <GuidanceContent />
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="resources">
                <ScrollArea className="h-[calc(100vh-320px)]">
                  <ResourcesContent />
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="checklist">
                <ScrollArea className="h-[calc(100vh-320px)]">
                  <ChecklistContent />
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <Card className="farm-module-card">
          <CardHeader className="pb-2">
            <CardTitle className="farm-module-card-title">
              <ListChecks className="h-5 w-5 text-farm-green" />
              Progress Tracker
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              <div className="mb-6">
                <h4 className="text-sm font-medium mb-2">Farming Readiness Score</h4>
                <div className="flex items-center justify-center">
                  <div className="relative flex items-center justify-center">
                    <svg className="w-32 h-32">
                      <circle
                        className="text-muted/20"
                        strokeWidth="8"
                        stroke="currentColor"
                        fill="transparent"
                        r="56"
                        cx="64"
                        cy="64"
                      />
                      <circle
                        className="text-farm-green"
                        strokeWidth="8"
                        strokeDasharray={356}
                        strokeDashoffset={356 - (356 * 65) / 100}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="56"
                        cx="64"
                        cy="64"
                      />
                    </svg>
                    <span className="absolute text-2xl font-bold">65%</span>
                  </div>
                </div>
                <p className="text-center text-sm text-muted-foreground mt-2">Overall Readiness Score</p>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Planning & Research</span>
                    <span className="font-medium text-farm-green">85%</span>
                  </div>
                  <div className="w-full bg-muted/20 rounded-full h-2">
                    <div className="bg-farm-green h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Equipment & Infrastructure</span>
                    <span className="font-medium text-farm-sky">60%</span>
                  </div>
                  <div className="w-full bg-muted/20 rounded-full h-2">
                    <div className="bg-farm-sky h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Marketing & Sales</span>
                    <span className="font-medium text-amber-500">45%</span>
                  </div>
                  <div className="w-full bg-muted/20 rounded-full h-2">
                    <div className="bg-amber-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Knowledge & Training</span>
                    <span className="font-medium text-farm-wheat-dark">70%</span>
                  </div>
                  <div className="w-full bg-muted/20 rounded-full h-2">
                    <div className="bg-farm-wheat-dark h-2 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-5 pt-4 border-t space-y-4">
                <h4 className="font-medium text-sm">Next Steps</h4>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-farm-green mt-0.5" />
                    <div className="text-sm">Develop a comprehensive business plan</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-farm-green mt-0.5" />
                    <div className="text-sm">Connect with local extension office for guidance</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-farm-green mt-0.5" />
                    <div className="text-sm">Research USDA beginning farmer loans</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <FarmingTypes onLearnMoreClick={handleLearnMoreClick} />
      
      <FarmingCalendar />
      
      <ProgressCharts />
      
      <PredictiveInsights moduleName="Beginning Farming" />
      
      <TrackingInterface moduleName="Beginning Farming" />
      
      <Dialog open={showFarmingTypeDetails} onOpenChange={setShowFarmingTypeDetails}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedFarmingType?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p>{selectedFarmingType?.description}</p>
            <p>
              Additional details about {selectedFarmingType?.name} will be available soon. 
              This will include detailed guides, best practices, equipment requirements, 
              and success stories from farmers using this approach.
            </p>
          </div>
          <div className="flex justify-end">
            <Button onClick={() => setShowFarmingTypeDetails(false)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
