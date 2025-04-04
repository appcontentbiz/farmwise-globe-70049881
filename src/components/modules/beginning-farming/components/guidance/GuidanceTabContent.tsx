
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GuidanceCategory } from "./GuidanceCategory";
import { guidanceResources } from "../../utils/guidanceResources";

interface GuidanceTabContentProps {
  onGuideClick: (guideId: string) => void;
}

export function GuidanceTabContent({ onGuideClick }: GuidanceTabContentProps) {
  return (
    <Tabs defaultValue="getting-started" className="mt-8">
      <TabsList className="mb-4">
        <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
        <TabsTrigger value="planning">Planning</TabsTrigger>
        <TabsTrigger value="operations">Operations</TabsTrigger>
        <TabsTrigger value="business">Business</TabsTrigger>
      </TabsList>
      
      <TabsContent value="getting-started">
        <GuidanceCategory 
          guides={Object.values(guidanceResources).filter(g => g.category === "getting-started")}
          onGuideClick={onGuideClick}
        />
      </TabsContent>
      
      <TabsContent value="planning">
        <GuidanceCategory 
          guides={Object.values(guidanceResources).filter(g => g.category === "planning")}
          onGuideClick={onGuideClick}
        />
      </TabsContent>
      
      <TabsContent value="operations">
        <GuidanceCategory 
          guides={Object.values(guidanceResources).filter(g => g.category === "operations")}
          onGuideClick={onGuideClick}
        />
      </TabsContent>
      
      <TabsContent value="business">
        <GuidanceCategory 
          guides={Object.values(guidanceResources).filter(g => g.category === "business")}
          onGuideClick={onGuideClick}
        />
      </TabsContent>
    </Tabs>
  );
}
