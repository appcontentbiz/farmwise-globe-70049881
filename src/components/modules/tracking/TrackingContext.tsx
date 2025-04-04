
import { createContext, useContext, ReactNode } from "react";
import { TrackingEvent } from "./types";
import { useTrackingEvents } from "./hooks/useTrackingEvents";

interface TrackingContextType {
  events: TrackingEvent[];
  setEvents: React.Dispatch<React.SetStateAction<TrackingEvent[]>>;
  addEvent: (event: Omit<TrackingEvent, "id">, moduleName: string) => Promise<void>;
  deleteEvent: (id: string, moduleName: string) => Promise<void>;
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
  const {
    events,
    setEvents,
    loading,
    getFilteredEvents,
    addEvent,
    deleteEvent
  } = useTrackingEvents(moduleName);

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
