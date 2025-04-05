
import { useState, useCallback } from "react";
import { TrackingEvent } from "../types";
import { useAuth } from "@/contexts/AuthContext";
import { useTrackingEventOperations } from "./useTrackingEventOperations";
import { useTrackingDataLoader } from "./useTrackingDataLoader";
import { useTrackingRealtimeUpdates } from "./useTrackingRealtimeUpdates";

export function useTrackingEvents(moduleName: string) {
  const [hasNewUpdates, setHasNewUpdates] = useState(false);
  const [events, setEvents] = useState<TrackingEvent[]>([]);
  const { user } = useAuth();
  
  // Event operations (add, delete, filter)
  const {
    getFilteredEvents,
    addEvent,
    deleteEvent,
    loadLocalEvents,
    loadSupabaseEvents
  } = useTrackingEventOperations(events, setEvents, user);
  
  // Initial data loading
  const { 
    loading 
  } = useTrackingDataLoader(user, moduleName, loadLocalEvents, loadSupabaseEvents, addEvent, events, setEvents);
  
  // Setup real-time updates
  useTrackingRealtimeUpdates(user?.id, moduleName, setEvents, setHasNewUpdates);
  
  // Function to refresh events on demand
  const refreshEvents = useCallback(async () => {
    if (!user) return;
    
    try {
      console.log(`[REFRESH] Manually refreshing events for module ${moduleName}`);
      const refreshedEvents = await loadSupabaseEvents(moduleName, user.id);
      console.log(`[REFRESH] Got ${refreshedEvents.length} events from server`);
      setEvents(refreshedEvents);
      setHasNewUpdates(false);
    } catch (error) {
      console.error("[REFRESH] Error refreshing events:", error);
    }
  }, [user, moduleName, loadSupabaseEvents]);

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
