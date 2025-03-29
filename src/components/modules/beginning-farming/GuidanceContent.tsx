
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { ChevronRight, Sparkles } from "lucide-react";
import { CustomizeGuideModal } from "./CustomizeGuideModal";
import { guidanceResources } from "./utils/guidanceResources";
import { ScrollArea } from "@/components/ui/scroll-area";

export function GuidanceContent() {
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [showCustomizeModal, setShowCustomizeModal] = useState(false);
  
  const handleGuideClick = (guide: string) => {
    setSelectedGuide(guide);
    setShowDialog(true);
  };

  return (
    <div className="space-y-6">
      <div className="bg-farm-green/10 p-4 rounded-lg border border-farm-green/20">
        <h2 className="text-xl font-semibold mb-2">Structured Guidance for New Farmers</h2>
        <p className="text-muted-foreground mb-4">
          Explore our curated guides designed specifically for beginning farmers. Each guide provides step-by-step 
          instructions, recommendations, and resources to help you start your farming journey with confidence.
        </p>
        <Button 
          variant="outline" 
          className="border-farm-green text-farm-green hover:bg-farm-green hover:text-white" 
          onClick={() => setShowCustomizeModal(true)}
        >
          <Sparkles className="h-4 w-4 mr-2" />
          Customize Guidance for Your Farm
        </Button>
      </div>

      <Tabs defaultValue="getting-started">
        <TabsList className="mb-4">
          <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
          <TabsTrigger value="planning">Planning</TabsTrigger>
          <TabsTrigger value="operations">Operations</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
        </TabsList>
        
        <TabsContent value="getting-started">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {guidanceResources.filter(g => g.category === "getting-started").map((guide) => (
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
            {guidanceResources.filter(g => g.category === "planning").map((guide) => (
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
            {guidanceResources.filter(g => g.category === "operations").map((guide) => (
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
            {guidanceResources.filter(g => g.category === "business").map((guide) => (
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
              {selectedGuide && guidanceResources.find(g => g.id === selectedGuide)?.title}
            </DialogTitle>
          </DialogHeader>
          
          <ScrollArea className="h-[calc(100vh-220px)]">
            <div className="p-4">
              {selectedGuide && (
                <div className="prose prose-farm max-w-none">
                  {guidanceResources.find(g => g.id === selectedGuide)?.content}
                </div>
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
      
      <CustomizeGuideModal 
        open={showCustomizeModal} 
        onOpenChange={setShowCustomizeModal}
      />
    </div>
  );
}
