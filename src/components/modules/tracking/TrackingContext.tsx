
import { createContext, useContext, ReactNode } from "react";
import { TrackingEvent } from "./types";
import { useTrackingEvents } from "./hooks/useTrackingEvents";

interface TrackingContextType {
  events: TrackingEvent[];
  setEvents: React.Dispatch<React.SetStateAction<TrackingEvent[]>>;
  addEvent: (event: Omit<TrackingEvent, "id">, moduleName: string) => Promise<TrackingEvent | null>;
  deleteEvent: (id: string, moduleName: string) => Promise<boolean>;
  getFilteredEvents: (category: "past" | "present" | "future") => TrackingEvent[];
  loading: boolean;
  hasNewUpdates: boolean;
  refreshEvents: () => Promise<void>;
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
    hasNewUpdates,
    refreshEvents,
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
      loading,
      hasNewUpdates,
      refreshEvents 
    }}>
      {children}
    </TrackingContext.Provider>
  );
};
