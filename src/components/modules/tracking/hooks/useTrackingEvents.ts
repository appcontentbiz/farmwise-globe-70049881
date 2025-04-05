
import { useState } from "react";
import { TrackingEvent } from "../types";
import { useAuth } from "@/contexts/AuthContext";
import { useTrackingEventOperations } from "./useTrackingEventOperations";
import { useTrackingDataLoader } from "./useTrackingDataLoader";
import { useTrackingRealtimeUpdates } from "./useTrackingRealtimeUpdates";

export function useTrackingEvents(moduleName: string) {
  const [hasNewUpdates, setHasNewUpdates] = useState(false);
  const { user } = useAuth();
  
  // Event operations (add, delete, filter)
  const {
    getFilteredEvents,
    addEvent,
    deleteEvent,
    loadLocalEvents,
    loadSupabaseEvents
  } = useTrackingEventOperations([], setEvents, user);
  
  // Initial data loading
  const { 
    events, 
    setEvents, 
    loading 
  } = useTrackingDataLoader(user, moduleName, loadLocalEvents, loadSupabaseEvents, addEvent);
  
  // Setup real-time updates
  useTrackingRealtimeUpdates(user?.id, moduleName, setEvents, setHasNewUpdates);
  
  // Function to refresh events on demand
  const refreshEvents = async () => {
    if (!user) return;
    
    try {
      const refreshedEvents = await loadSupabaseEvents(moduleName, user.id);
      setEvents(refreshedEvents);
      setHasNewUpdates(false);
    } catch (error) {
      console.error("Error refreshing events:", error);
    }
  };

  return {
    events,
    setEvents,
    loading,
    hasNewUpdates,
    refreshEvents,
    getFilteredEvents,
    addEvent,
    deleteEvent
  };
}
