
import { TrackingEvent } from "../types";
import { useToast } from "@/hooks/use-toast";
import { getEventActionMessage } from "./trackingUtils";

export function useTrackingLocalStorage() {
  const { toast } = useToast();
  
  const loadLocalEvents = (moduleName: string = "default"): TrackingEvent[] => {
    try {
      const savedEvents = localStorage.getItem(`farm-tracking-${moduleName}`);
      if (savedEvents) {
        const events = JSON.parse(savedEvents);
        
        // Show success toast
        const message = getEventActionMessage("load");
        toast({
          title: message.title,
          description: message.description,
        });
        
        return events;
      }
    } catch (error) {
      console.error("Error loading tracking events from localStorage:", error);
      const errorMessage = getEventActionMessage("error", undefined, undefined, 
        "Failed to load tracking data from local storage. Using default data instead.");
      
      toast({
        title: errorMessage.title,
        description: errorMessage.description,
        variant: "destructive",
      });
    }
    
    // Default event if nothing exists
    return [{
      id: "1",
      title: "Started tracking",
      date: new Date().toISOString().split('T')[0],
      notes: "Initial setup of tracking for this module",
      category: "present" as "past" | "present" | "future",
      type: "learning"
    }];
  };

  const saveLocalEvents = (events: TrackingEvent[], moduleName: string = "default"): void => {
    try {
      localStorage.setItem(`farm-tracking-${moduleName}`, JSON.stringify(events));
    } catch (error) {
      console.error("Error saving tracking events to localStorage:", error);
      const errorMessage = getEventActionMessage("error", undefined, undefined, 
        "There was an issue saving your tracking data locally.");
      
      toast({
        title: errorMessage.title,
        description: errorMessage.description,
        variant: "destructive",
      });
    }
  };

  const addLocalEvent = (event: Omit<TrackingEvent, "id">, events: TrackingEvent[], moduleName: string = "default"): TrackingEvent => {
    const newEvent = {
      ...event,
      id: Date.now().toString()
    };
    
    saveLocalEvents([...events, newEvent], moduleName);
    
    const successMessage = getEventActionMessage("add", event.title, event.category);
    toast({
      title: successMessage.title,
      description: successMessage.description,
    });
    
    return newEvent;
  };

  const deleteLocalEvent = (id: string, events: TrackingEvent[], moduleName: string = "default"): TrackingEvent[] => {
    const updatedEvents = events.filter(event => event.id !== id);
    saveLocalEvents(updatedEvents, moduleName);
    
    const message = getEventActionMessage("delete");
    toast({
      title: message.title,
      description: message.description,
    });
    
    return updatedEvents;
  };

  return {
    loadLocalEvents,
    saveLocalEvents,
    addLocalEvent,
    deleteLocalEvent
  };
}
