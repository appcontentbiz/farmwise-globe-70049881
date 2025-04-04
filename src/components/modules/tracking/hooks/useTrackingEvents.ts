
import { useState, useEffect } from "react";
import { TrackingEvent } from "../types";
import { useAuth } from "@/contexts/AuthContext";
import { useTrackingLocalStorage } from "./useTrackingLocalStorage";
import { useTrackingSupabase } from "./useTrackingSupabase";
import { createDefaultEvent, filterEventsByCategory } from "./trackingUtils";

export function useTrackingEvents(moduleName: string) {
  const [events, setEvents] = useState<TrackingEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  
  const { 
    loadLocalEvents, 
    addLocalEvent, 
    deleteLocalEvent 
  } = useTrackingLocalStorage(moduleName);
  
  const { 
    loadSupabaseEvents, 
    addSupabaseEvent, 
    deleteSupabaseEvent 
  } = useTrackingSupabase();

  // Load events from Supabase or localStorage
  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        
        if (!user) {
          // If user is not logged in, use localStorage
          const localEvents = loadLocalEvents();
          setEvents(localEvents);
        } else {
          // Try to load events from Supabase
          const supabaseEvents = await loadSupabaseEvents(moduleName, user.id);
          
          // If there are no events, add the default event
          if (supabaseEvents.length === 0) {
            const defaultEvent = createDefaultEvent();
            const addResult = await addEvent(defaultEvent, moduleName);
            
            if (addResult) {
              setEvents([addResult]);
            } else {
              setEvents([defaultEvent]);
            }
          } else {
            setEvents(supabaseEvents);
          }
        }
      } catch (error) {
        console.error("Error loading tracking events:", error);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [moduleName, user]);

  // Filter events by category
  const getFilteredEvents = (category: "past" | "present" | "future") => {
    return filterEventsByCategory(events, category);
  };

  // Add a new event
  const addEvent = async (event: Omit<TrackingEvent, "id">, moduleName: string): Promise<TrackingEvent | null> => {
    try {
      if (!user) {
        // Fallback to localStorage if user is not logged in
        const newEvent = addLocalEvent(event, events);
        setEvents(prevEvents => [...prevEvents, newEvent]);
        return newEvent;
      }

      // Add event to Supabase
      const newEvent = await addSupabaseEvent(event, moduleName, user.id);
      
      if (newEvent) {
        setEvents(prevEvents => [...prevEvents, newEvent]);
      }
      
      return newEvent;
    } catch (error: any) {
      console.error("Error adding tracking event:", error);
      return null;
    }
  };

  // Delete an event
  const deleteEvent = async (id: string, moduleName: string) => {
    try {
      if (!user) {
        // Fallback to localStorage if user is not logged in
        const updatedEvents = deleteLocalEvent(id, events);
        setEvents(updatedEvents);
        return;
      }

      // Delete event from Supabase
      const success = await deleteSupabaseEvent(id);
      
      if (success) {
        // Update local state
        setEvents(prevEvents => prevEvents.filter(event => event.id !== id));
      }
    } catch (error) {
      console.error("Error deleting tracking event:", error);
    }
  };

  return {
    events,
    setEvents,
    loading,
    getFilteredEvents,
    addEvent,
    deleteEvent
  };
}
