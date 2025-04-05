import { useState, useEffect, useRef } from "react";
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
  const initialLoadComplete = useRef(false);
  const lastToastIdRef = useRef<string | null>(null);
  
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

  const showToast = (title: string, description: string, variant?: "default" | "destructive") => {
    const toastId = `${title}-${description}`.replace(/\s+/g, '-').toLowerCase();
    
    if (lastToastIdRef.current === toastId) {
      return;
    }
    
    lastToastIdRef.current = toastId;
    
    toast({
      title,
      description,
      variant,
    });
    
    setTimeout(() => {
      if (lastToastIdRef.current === toastId) {
        lastToastIdRef.current = null;
      }
    }, 3000);
  };

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        
        if (!user) {
          const localEvents = loadLocalEvents();
          setEvents(localEvents);
          
          if (localEvents.length > 0 && !initialLoadComplete.current) {
            showToast(
              "Events Loaded", 
              `Loaded ${localEvents.length} events from local storage`
            );
            initialLoadComplete.current = true;
          }
        } else {
          try {
            const supabaseEvents = await loadSupabaseEvents(moduleName, user.id);
            
            if (supabaseEvents.length === 0) {
              const defaultEvent = createDefaultEvent();
              const addResult = await addEvent(defaultEvent, moduleName);
              
              if (addResult) {
                setEvents([addResult]);
                if (!initialLoadComplete.current) {
                  showToast(
                    "Welcome to Tracking",
                    "Created your first tracking event to get you started"
                  );
                  initialLoadComplete.current = true;
                }
              } else {
                setEvents([defaultEvent]);
                if (!initialLoadComplete.current) {
                  showToast(
                    "Using Default Event",
                    "We've added a default event to get you started"
                  );
                  initialLoadComplete.current = true;
                }
              }
            } else {
              setEvents(supabaseEvents);
              if (supabaseEvents.length > 0 && !initialLoadComplete.current) {
                showToast(
                  "Events Loaded", 
                  `Successfully loaded ${supabaseEvents.length} tracking events`
                );
                initialLoadComplete.current = true;
              }
            }
          } catch (error) {
            console.error("Error loading events from Supabase, falling back to local storage:", error);
            const localEvents = loadLocalEvents();
            setEvents(localEvents);
            
            if (!initialLoadComplete.current) {
              showToast(
                "Using Offline Mode", 
                "Could not connect to the server. Using local data instead.",
                "destructive"
              );
              initialLoadComplete.current = true;
            }
          }
        }
      } catch (error) {
        console.error("Error loading tracking events:", error);
        if (!initialLoadComplete.current) {
          showToast(
            "Failed to Load Events",
            "There was a problem loading your events. Please try refreshing the page.",
            "destructive"
          );
          initialLoadComplete.current = true;
        }
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [moduleName, user]);

  useEffect(() => {
    if (!user) return;
    
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
          
          if (payload.eventType === 'INSERT') {
            const newEvent = payload.new as any;
            if (newEvent.module_name === moduleName) {
              setEvents(currentEvents => {
                const exists = currentEvents.some(e => e.id === newEvent.id);
                if (!exists) {
                  const formattedEvent: TrackingEvent = {
                    id: newEvent.id,
                    title: newEvent.title,
                    date: newEvent.date,
                    notes: newEvent.notes,
                    category: newEvent.category as "past" | "present" | "future",
                    type: newEvent.type,
                    progress: newEvent.progress
                  };
                  
                  showToast(
                    "New Event Added",
                    `"${newEvent.title}" has been added to your tracking`
                  );
                  
                  return [...currentEvents, formattedEvent];
                }
                return currentEvents;
              });
            }
          } else if (payload.eventType === 'DELETE') {
            setEvents(currentEvents => {
              const newEvents = currentEvents.filter(e => e.id !== payload.old.id);
              if (newEvents.length !== currentEvents.length) {
                showToast(
                  "Event Deleted",
                  "A tracking event has been removed"
                );
              }
              return newEvents;
            });
          }
        }
      )
      .subscribe((status) => {
        console.log('Realtime subscription status:', status);
      });
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, moduleName]);

  const getFilteredEvents = (category: "past" | "present" | "future") => {
    return filterEventsByCategory(events, category);
  };

  const refreshEvents = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const refreshedEvents = await loadSupabaseEvents(moduleName, user.id);
      setEvents(refreshedEvents);
      setHasNewUpdates(false);
      
      showToast(
        "Events Updated",
        "Your tracking events have been refreshed"
      );
    } catch (error) {
      console.error("Error refreshing events:", error);
      showToast(
        "Refresh Failed",
        "Unable to refresh events. Please try again.",
        "destructive"
      );
    } finally {
      setLoading(false);
    }
  };

  const addEvent = async (event: Omit<TrackingEvent, "id">, moduleName: string): Promise<TrackingEvent | null> => {
    try {
      if (!user) {
        const newEvent = addLocalEvent(event, events);
        setEvents(prevEvents => [...prevEvents, newEvent]);
        return newEvent;
      }

      const newEvent = await addSupabaseEvent(event, moduleName, user.id);
      
      if (newEvent) {
        setEvents(prevEvents => [...prevEvents, newEvent]);
      }
      
      return newEvent;
    } catch (error: any) {
      console.error("Error adding tracking event:", error);
      const errorMessage = getEventActionMessage("error", undefined, undefined, 
        error.message || "Failed to add event. Please try again.");
      
      showToast(
        errorMessage.title,
        errorMessage.description,
        "destructive"
      );
      
      return null;
    }
  };

  const deleteEvent = async (id: string, moduleName: string): Promise<boolean> => {
    try {
      console.log(`useTrackingEvents: Deleting event ${id} in module ${moduleName}`);
      
      if (!user) {
        console.log("No user found, using local storage for deletion");
        const updatedEvents = deleteLocalEvent(id, events);
        setEvents(updatedEvents);
        
        showToast(
          "Event Deleted",
          "The event has been successfully removed from your tracking"
        );
        
        return true;
      }

      console.log(`Delegating delete to Supabase for event ${id}`);
      const success = await deleteSupabaseEvent(id);
      
      if (success) {
        console.log(`Delete successful, updating local state for event ${id}`);
        setEvents(prevEvents => prevEvents.filter(event => event.id !== id));
        
        return true;
      } else {
        console.error(`Delete operation failed for event ${id}`);
        return false;
      }
    } catch (error) {
      console.error("Error deleting tracking event:", error);
      
      showToast(
        "Delete Failed",
        "Unable to delete the event. Please try again.",
        "destructive"
      );
      
      return false;
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
