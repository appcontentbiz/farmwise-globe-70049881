
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EventForm } from "./EventForm";
import { EventList } from "./EventList";
import { useIsMobile } from "@/hooks/use-mobile";

interface TrackingTabProps {
  activeTab: "past" | "present" | "future";
  moduleName: string;
}

export function TrackingTab({ activeTab, moduleName }: TrackingTabProps) {
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const isMobile = useIsMobile();
  
  const getButtonLabel = () => {
    if (isMobile) {
      return `Add ${activeTab === "past" ? "Past" : activeTab === "present" ? "Current" : "Future"}`;
    }
    return `Add ${activeTab === "past" ? "Previous" : activeTab === "present" ? "Current" : "Planned"} Event`;
  };
  
  return (
    <>
      {!isAddingEvent ? (
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full flex items-center justify-center gap-2"
          onClick={() => setIsAddingEvent(true)}
        >
          <Plus className="h-4 w-4" />
          {getButtonLabel()}
        </Button>
      ) : (
        <EventForm 
          activeTab={activeTab} 
          onCancel={() => setIsAddingEvent(false)} 
          moduleName={moduleName} 
        />
      )}
      
      <EventList category={activeTab} moduleName={moduleName} />
    </>
  );
}
