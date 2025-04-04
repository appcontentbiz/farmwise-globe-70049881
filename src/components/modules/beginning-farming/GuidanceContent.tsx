
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { ChevronRight, Download, FileText, FilePlus, ClipboardList, LineChart, Users, BookOpen, Sprout, Sparkles } from "lucide-react";
import { CustomizeGuideModal } from "./CustomizeGuideModal";
import { guidanceResources } from "./utils/guidanceResources";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { ResourceContentModal } from "./ResourceContentModal";

export function GuidanceContent() {
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);
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
  
  const handleGuideClick = (guide: string) => {
    setSelectedGuide(guide);
    setShowDialog(true);
  };

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
      <div className="bg-farm-green/10 p-4 rounded-lg border border-farm-green/20">
        <h2 className="text-xl font-semibold mb-2">Structured Guidance for New Farmers</h2>
        <p className="text-muted-foreground mb-4">
          Explore our curated guides designed specifically for beginning farmers. Each guide provides step-by-step 
          instructions, recommendations, and resources to help you start your farming journey with confidence.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            className="border-farm-green text-farm-green hover:bg-farm-green hover:text-white" 
            onClick={() => setShowCustomizeModal(true)}
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Customize Guidance
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => handleDownload("Complete Farming Guide.pdf")}
          >
            <Download className="h-4 w-4 mr-2" />
            Print Guide
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border hover:border-farm-green cursor-pointer transition-all"
          onClick={() => handleResourceClick("Farm Vision Worksheet", "vision")}
        >
          <CardContent className="p-4 flex justify-between items-start">
            <div>
              <h3 className="font-medium flex items-center">
                <FileText className="h-4 w-4 mr-2 text-farm-green" />
                Farm Vision Worksheet
              </h3>
              <p className="text-sm text-muted-foreground mt-1">Define your farm's purpose and direction</p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </CardContent>
        </Card>

        <Card className="border hover:border-farm-green cursor-pointer transition-all"
          onClick={() => handleResourceClick("Goal Template", "goals")}
        >
          <CardContent className="p-4 flex justify-between items-start">
            <div>
              <h3 className="font-medium flex items-center">
                <ClipboardList className="h-4 w-4 mr-2 text-farm-green" />
                Goal Template
              </h3>
              <p className="text-sm text-muted-foreground mt-1">Create SMART goals for your farm business</p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </CardContent>
        </Card>

        <Card className="border hover:border-farm-green cursor-pointer transition-all"
          onClick={() => handleResourceClick("Resource Inventory", "inventory")}
        >
          <CardContent className="p-4 flex justify-between items-start">
            <div>
              <h3 className="font-medium flex items-center">
                <ClipboardList className="h-4 w-4 mr-2 text-farm-green" />
                Resource Inventory
              </h3>
              <p className="text-sm text-muted-foreground mt-1">Track your assets, equipment, and resources</p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </CardContent>
        </Card>

        <Card className="border hover:border-farm-green cursor-pointer transition-all"
          onClick={() => handleResourceClick("Market Research Guide", "market")}
        >
          <CardContent className="p-4 flex justify-between items-start">
            <div>
              <h3 className="font-medium flex items-center">
                <LineChart className="h-4 w-4 mr-2 text-farm-green" />
                Market Research Guide
              </h3>
              <p className="text-sm text-muted-foreground mt-1">Analyze local markets and customer demographics</p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </CardContent>
        </Card>

        <Card className="border hover:border-farm-green cursor-pointer transition-all"
          onClick={() => handleResourceClick("Business Plan Template", "business")}
        >
          <CardContent className="p-4 flex justify-between items-start">
            <div>
              <h3 className="font-medium flex items-center">
                <FilePlus className="h-4 w-4 mr-2 text-farm-green" />
                Business Plan Template
              </h3>
              <p className="text-sm text-muted-foreground mt-1">Comprehensive farm business plan structure</p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </CardContent>
        </Card>

        <Card className="border hover:border-farm-green cursor-pointer transition-all"
          onClick={() => handleResourceClick("Financial Calculator", "calculator")}
        >
          <CardContent className="p-4 flex justify-between items-start">
            <div>
              <h3 className="font-medium flex items-center">
                <LineChart className="h-4 w-4 mr-2 text-farm-green" />
                Financial Calculator
              </h3>
              <p className="text-sm text-muted-foreground mt-1">Estimate startup costs and financial projections</p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </CardContent>
        </Card>

        <Card className="border hover:border-farm-green cursor-pointer transition-all"
          onClick={() => handleResourceClick("Training Resources", "training")}
        >
          <CardContent className="p-4 flex justify-between items-start">
            <div>
              <h3 className="font-medium flex items-center">
                <BookOpen className="h-4 w-4 mr-2 text-farm-green" />
                Training Resources
              </h3>
              <p className="text-sm text-muted-foreground mt-1">Courses, workshops, and learning materials</p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </CardContent>
        </Card>

        <Card className="border hover:border-farm-green cursor-pointer transition-all"
          onClick={() => handleResourceClick("Find a Mentor", "mentor")}
        >
          <CardContent className="p-4 flex justify-between items-start">
            <div>
              <h3 className="font-medium flex items-center">
                <Users className="h-4 w-4 mr-2 text-farm-green" />
                Find a Mentor
              </h3>
              <p className="text-sm text-muted-foreground mt-1">Connect with experienced farmers for guidance</p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="getting-started" className="mt-8">
        <TabsList className="mb-4">
          <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
          <TabsTrigger value="planning">Planning</TabsTrigger>
          <TabsTrigger value="operations">Operations</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
        </TabsList>
        
        <TabsContent value="getting-started">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.values(guidanceResources).filter(g => g.category === "getting-started").map((guide) => (
              <Card 
                key={guide.id} 
                className="border hover:border-farm-green cursor-pointer transition-all"
                onClick={() => handleGuideClick(guide.id)}
              >
                <CardContent className="p-4 flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{guide.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{guide.description}</p>
                    <div className="mt-2">
                      <Badge variant="outline" className="text-xs bg-farm-green/10">
                        {guide.timeToComplete}
                      </Badge>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="planning">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.values(guidanceResources).filter(g => g.category === "planning").map((guide) => (
              <Card 
                key={guide.id} 
                className="border hover:border-farm-green cursor-pointer transition-all"
                onClick={() => handleGuideClick(guide.id)}
              >
                <CardContent className="p-4 flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{guide.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{guide.description}</p>
                    <div className="mt-2">
                      <Badge variant="outline" className="text-xs bg-farm-green/10">
                        {guide.timeToComplete}
                      </Badge>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="operations">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.values(guidanceResources).filter(g => g.category === "operations").map((guide) => (
              <Card 
                key={guide.id} 
                className="border hover:border-farm-green cursor-pointer transition-all"
                onClick={() => handleGuideClick(guide.id)}
              >
                <CardContent className="p-4 flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{guide.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{guide.description}</p>
                    <div className="mt-2">
                      <Badge variant="outline" className="text-xs bg-farm-green/10">
                        {guide.timeToComplete}
                      </Badge>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="business">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.values(guidanceResources).filter(g => g.category === "business").map((guide) => (
              <Card 
                key={guide.id} 
                className="border hover:border-farm-green cursor-pointer transition-all"
                onClick={() => handleGuideClick(guide.id)}
              >
                <CardContent className="p-4 flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{guide.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{guide.description}</p>
                    <div className="mt-2">
                      <Badge variant="outline" className="text-xs bg-farm-green/10">
                        {guide.timeToComplete}
                      </Badge>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>
              {selectedGuide && guidanceResources[selectedGuide]?.title}
            </DialogTitle>
          </DialogHeader>
          
          <ScrollArea className="h-[calc(100vh-220px)]">
            <div className="p-4">
              {selectedGuide && (
                <div className="prose prose-farm max-w-none">
                  {guidanceResources[selectedGuide]?.content}
                </div>
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
      
      <CustomizeGuideModal 
        isOpen={showCustomizeModal} 
        onClose={() => setShowCustomizeModal(false)}
      />

      <ResourceContentModal
        isOpen={showResourceModal}
        onClose={() => setShowResourceModal(false)}
        content={resourceModalContent}
      />
      
      {/* Farming Type Info Dialog */}
      <Dialog open={showFarmingTypeInfo} onOpenChange={setShowFarmingTypeInfo}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedFarmingType?.title}</DialogTitle>
          </DialogHeader>
          
          <ScrollArea className="max-h-[60vh]">
            <div className="space-y-4">
              <p className="text-muted-foreground">{selectedFarmingType?.description}</p>
              <p>{selectedFarmingType?.details}</p>
              
              <div className="bg-muted/20 p-4 rounded-md mt-6">
                <h3 className="text-lg font-medium mb-2">Key Resources</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <BookOpen className="h-4 w-4 text-farm-green mt-1" />
                    <span>Getting Started Guide</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FileText className="h-4 w-4 text-farm-green mt-1" />
                    <span>Best Practices Documentation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Users className="h-4 w-4 text-farm-green mt-1" />
                    <span>Community Forums</span>
                  </li>
                </ul>
              </div>
            </div>
          </ScrollArea>
          
          <div className="flex justify-end">
            <Button onClick={() => setShowFarmingTypeInfo(false)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
