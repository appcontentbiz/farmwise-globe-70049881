
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sprout } from "lucide-react";
import { GuidanceContent } from "../GuidanceContent";
import { ResourcesContent } from "../ResourcesContent";
import { ChecklistContent } from "../ChecklistContent";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

interface GuidanceTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

export function GuidanceTabs({ activeTab, onTabChange }: GuidanceTabsProps) {
  return (
    <Card className="farm-module-card col-span-2">
      <CardHeader className="pb-2">
        <CardTitle className="farm-module-card-title">
          <Sprout className="h-5 w-5 text-farm-green" />
          Beginning Farming Guidance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="guidance" value={activeTab} onValueChange={onTabChange}>
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
  );
}
