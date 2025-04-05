
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

  // Show a toast with deduplication
  const showToast = (title: string, description: string, variant?: "default" | "destructive") => {
    // Create a unique ID for the toast based on content
    const toastId = `${title}-${description}`.replace(/\s+/g, '-').toLowerCase();
    
    // Don't show the same toast if it was just shown
    if (lastToastIdRef.current === toastId) {
      return;
    }
    
    lastToastIdRef.current = toastId;
    
    toast({
      id: toastId,
      title,
      description,
      variant,
    });
    
    // Reset toast ID after a delay
    setTimeout(() => {
      if (lastToastIdRef.current === toastId) {
        lastToastIdRef.current = null;
      }
    }, 3000);
  };

  // Load events from Supabase or localStorage
  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        
        if (!user) {
          // If user is not logged in, use localStorage
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
          // Try to load events from Supabase
          try {
            const supabaseEvents = await loadSupabaseEvents(moduleName, user.id);
            
            // If there are no events, add the default event
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
            // On failure, fall back to localStorage
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
            // For deletion, we need to check against the old record
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
      
      showToast(
        errorMessage.title,
        errorMessage.description,
        "destructive"
      );
      
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
        
        showToast(
          "Event Deleted",
          "The event has been successfully removed from your tracking"
        );
      }
    } catch (error) {
      console.error("Error deleting tracking event:", error);
      showToast(
        "Delete Failed",
        "Unable to delete the event. Please try again.",
        "destructive"
      );
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
