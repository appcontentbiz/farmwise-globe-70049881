
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrackingTab } from "./TrackingTab";
import { Leaf, RefreshCw } from "lucide-react";
import { TrackingProvider, useTracking } from "./TrackingContext";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

// Separate the TrackingTabs into its own component that uses the useTracking hook
const TrackingTabs = ({ moduleName }: { moduleName: string }) => {
  const [activeTab, setActiveTab] = useState<"past" | "present" | "future">("present");
  const { hasNewUpdates, refreshEvents, loading } = useTracking();
  const isMobile = useIsMobile();
  
  return (
    <Card className="animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className={`flex items-center gap-2 ${isMobile ? 'text-base' : 'text-xl'}`}>
          <Leaf className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'} text-farm-green`} />
          {isMobile ? 'Journey Tracker' : 'Tracking Your Journey'}
        </CardTitle>
        {hasNewUpdates && (
          <Button 
            variant="outline" 
            size={isMobile ? "sm" : "default"}
            className="flex items-center gap-1"
            onClick={refreshEvents}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            {loading ? (isMobile ? 'Loading...' : 'Refreshing...') : (isMobile ? 'Refresh' : 'Refresh')}
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
          <TabsList className={`grid grid-cols-3 mb-6 ${isMobile ? 'w-full' : ''}`}>
            <TabsTrigger value="past">Past</TabsTrigger>
            <TabsTrigger value="present">Present</TabsTrigger>
            <TabsTrigger value="future">Future</TabsTrigger>
          </TabsList>
          
          <TabsContent value="past" className="space-y-4">
            <TrackingTab activeTab="past" moduleName={moduleName} />
          </TabsContent>
          
          <TabsContent value="present" className="space-y-4">
            <TrackingTab activeTab="present" moduleName={moduleName} />
          </TabsContent>
          
          <TabsContent value="future" className="space-y-4">
            <TrackingTab activeTab="future" moduleName={moduleName} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

// Main component that properly wraps TrackingTabs with TrackingProvider
export function TrackingInterface({ moduleName }: { moduleName: string }) {
  return (
    <TrackingProvider moduleName={moduleName}>
      <TrackingTabs moduleName={moduleName} />
    </TrackingProvider>
  );
}
