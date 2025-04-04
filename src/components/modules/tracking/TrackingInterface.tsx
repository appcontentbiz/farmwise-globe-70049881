
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrackingProvider } from "./TrackingContext";
import { TrackingTab } from "./TrackingTab";

interface TrackingInterfaceProps {
  moduleName: string;
}

export function TrackingInterface({ moduleName }: TrackingInterfaceProps) {
  const [activeTab, setActiveTab] = useState<"past" | "present" | "future">("present");

  return (
    <TrackingProvider moduleName={moduleName}>
      <Card className="tracking-interface">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Clock className="h-5 w-5 text-farm-green" />
            {moduleName} Tracking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="present" onValueChange={(value) => setActiveTab(value as "past" | "present" | "future")}>
            <TabsList className="mb-4 w-full grid grid-cols-3">
              <TabsTrigger value="past">Past</TabsTrigger>
              <TabsTrigger value="present">Present</TabsTrigger>
              <TabsTrigger value="future">Future</TabsTrigger>
            </TabsList>
            
            {["past", "present", "future"].map((tab) => (
              <TabsContent key={tab} value={tab} className="space-y-4">
                <TrackingTab 
                  activeTab={tab as "past" | "present" | "future"} 
                  moduleName={moduleName} 
                />
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </TrackingProvider>
  );
}
