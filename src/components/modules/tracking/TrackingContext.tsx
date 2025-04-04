
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { TrackingEvent } from "./types";
import { useToast } from "@/hooks/use-toast";

interface TrackingContextType {
  events: TrackingEvent[];
  setEvents: React.Dispatch<React.SetStateAction<TrackingEvent[]>>;
  addEvent: (event: Omit<TrackingEvent, "id">, moduleName: string) => void;
  deleteEvent: (id: string, moduleName: string) => void;
  getFilteredEvents: (category: "past" | "present" | "future") => TrackingEvent[];
  loading: boolean;
}

const TrackingContext = createContext<TrackingContextType | undefined>(undefined);

export const useTracking = () => {
  const context = useContext(TrackingContext);
  if (!context) {
    throw new Error("useTracking must be used within a TrackingProvider");
  }
  return context;
};

interface TrackingProviderProps {
  children: ReactNode;
  moduleName: string;
}

export const TrackingProvider = ({ children, moduleName }: TrackingProviderProps) => {
  const [events, setEvents] = useState<TrackingEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Load events from localStorage
  useEffect(() => {
    const loadEvents = () => {
      try {
        const savedEvents = localStorage.getItem(`farm-tracking-${moduleName}`);
        if (savedEvents) {
          setEvents(JSON.parse(savedEvents));
        } else {
          // Initialize with default event
          setEvents([
            {
              id: "1",
              title: "Started tracking",
              date: new Date().toISOString().split('T')[0],
              notes: "Initial setup of tracking for this module",
              category: "present",
              type: "learning"
            }
          ]);
        }
      } catch (error) {
        console.error("Error loading tracking events:", error);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [moduleName]);

  // Filter events by category
  const getFilteredEvents = (category: "past" | "present" | "future") => {
    return events.filter(event => event.category === category);
  };

  // Add a new event
  const addEvent = (event: Omit<TrackingEvent, "id">, moduleName: string) => {
    const newEvent = {
      ...event,
      id: Date.now().toString()
    };
    
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    localStorage.setItem(`farm-tracking-${moduleName}`, JSON.stringify(updatedEvents));
    
    toast({
      title: "Event Added",
      description: `Added "${event.title}" to your ${event.category} tracking`,
    });
  };

  // Delete an event
  const deleteEvent = (id: string, moduleName: string) => {
    const updatedEvents = events.filter(event => event.id !== id);
    setEvents(updatedEvents);
    localStorage.setItem(`farm-tracking-${moduleName}`, JSON.stringify(updatedEvents));
    
    toast({
      title: "Event Removed",
      description: "The tracking event has been removed",
    });
  };

  return (
    <TrackingContext.Provider value={{ 
      events, 
      setEvents, 
      addEvent, 
      deleteEvent, 
      getFilteredEvents, 
      loading 
    }}>
      {children}
    </TrackingContext.Provider>
  );
};
