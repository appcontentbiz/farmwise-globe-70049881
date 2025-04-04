
import { useState, useEffect } from "react";
import { TrackingEvent } from "../types";
import { useAuth } from "@/contexts/AuthContext";
import { useTrackingLocalStorage } from "./useTrackingLocalStorage";
import { useTrackingSupabase } from "./useTrackingSupabase";
import { createDefaultEvent, filterEventsByCategory, getEventActionMessage } from "./trackingUtils";
import { useToast } from "@/hooks/use-toast";

export function useTrackingEvents(moduleName: string) {
  const [events, setEvents] = useState<TrackingEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();
  
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
          if (localEvents.length > 0) {
            toast({
              title: "Events Loaded",
              description: `Loaded ${localEvents.length} events from local storage`,
            });
          }
        } else {
          // Try to load events from Supabase
          const supabaseEvents = await loadSupabaseEvents(moduleName, user.id);
          
          // If there are no events, add the default event
          if (supabaseEvents.length === 0) {
            const defaultEvent = createDefaultEvent();
            const addResult = await addEvent(defaultEvent, moduleName);
            
            if (addResult) {
              setEvents([addResult]);
              toast({
                title: "Welcome to Tracking",
                description: "Created your first tracking event to get you started",
              });
            } else {
              setEvents([defaultEvent]);
              toast({
                title: "Using Default Event",
                description: "We've added a default event to get you started",
              });
            }
          } else {
            setEvents(supabaseEvents);
          }
        }
      } catch (error) {
        console.error("Error loading tracking events:", error);
        toast({
          title: "Failed to Load Events",
          description: "There was a problem loading your events. Please try refreshing the page.",
          variant: "destructive",
        });
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
      const errorMessage = getEventActionMessage("error", undefined, undefined, 
        error.message || "Failed to add event. Please try again.");
      
      toast({
        title: errorMessage.title,
        description: errorMessage.description,
        variant: "destructive",
      });
      
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
        
        toast({
          title: "Event Deleted",
          description: "The event has been successfully removed from your tracking",
        });
      }
    } catch (error) {
      console.error("Error deleting tracking event:", error);
      toast({
        title: "Delete Failed",
        description: "Unable to delete the event. Please try again.",
        variant: "destructive",
      });
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
