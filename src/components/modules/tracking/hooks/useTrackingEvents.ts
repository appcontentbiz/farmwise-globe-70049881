
import { useState, useEffect } from "react";
import { TrackingEvent } from "../types";
import { useAuth } from "@/contexts/AuthContext";
import { useTrackingLocalStorage } from "./useTrackingLocalStorage";
import { useTrackingSupabase } from "./useTrackingSupabase";
import { createDefaultEvent, filterEventsByCategory, getEventActionMessage } from "./trackingUtils";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export function useTrackingEvents(moduleName: string) {
  const [events, setEvents] = useState<TrackingEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasNewUpdates, setHasNewUpdates] = useState(false);
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

  // Set up real-time subscriptions for tracking events
  useEffect(() => {
    if (!user) return;
    
    // Subscribe to changes on the tracking_events table for this user and module
    const channel = supabase
      .channel('tracking-events-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'tracking_events',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          console.log('Real-time update received:', payload);
          setHasNewUpdates(true);
          
          // Handle different types of changes
          if (payload.eventType === 'INSERT') {
            const newEvent = payload.new as any;
            // Check if this is for our module
            if (newEvent.module_name === moduleName) {
              // Only add if not already in our events list
              setEvents(currentEvents => {
                const exists = currentEvents.some(e => e.id === newEvent.id);
                if (!exists) {
                  // Convert to our TrackingEvent format
                  const formattedEvent: TrackingEvent = {
                    id: newEvent.id,
                    title: newEvent.title,
                    date: newEvent.date,
                    notes: newEvent.notes,
                    category: newEvent.category as "past" | "present" | "future",
                    type: newEvent.type,
                    progress: newEvent.progress
                  };
                  
                  toast({
                    title: "New Event Added",
                    description: `"${newEvent.title}" has been added to your tracking`,
                  });
                  
                  return [...currentEvents, formattedEvent];
                }
                return currentEvents;
              });
            }
          } else if (payload.eventType === 'DELETE') {
            // For deletion, we need to check against the old record
            setEvents(currentEvents => {
              const newEvents = currentEvents.filter(e => e.id !== payload.old.id);
              if (newEvents.length !== currentEvents.length) {
                toast({
                  title: "Event Deleted",
                  description: "A tracking event has been removed",
                });
              }
              return newEvents;
            });
          }
        }
      )
      .subscribe();
    
    // Clean up subscription when component unmounts or user changes
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, moduleName]);

  // Filter events by category
  const getFilteredEvents = (category: "past" | "present" | "future") => {
    return filterEventsByCategory(events, category);
  };

  // Refresh data from server
  const refreshEvents = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const refreshedEvents = await loadSupabaseEvents(moduleName, user.id);
      setEvents(refreshedEvents);
      setHasNewUpdates(false);
      
      toast({
        title: "Events Updated",
        description: "Your tracking events have been refreshed",
      });
    } catch (error) {
      console.error("Error refreshing events:", error);
      toast({
        title: "Refresh Failed",
        description: "Unable to refresh events. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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
    hasNewUpdates,
    refreshEvents,
    getFilteredEvents,
    addEvent,
    deleteEvent
  };
}
