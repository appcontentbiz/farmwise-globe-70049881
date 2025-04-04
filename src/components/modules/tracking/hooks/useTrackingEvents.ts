
import { useState, useEffect } from "react";
import { TrackingEvent } from "../types";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export function useTrackingEvents(moduleName: string) {
  const [events, setEvents] = useState<TrackingEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  // Load events from Supabase or localStorage
  useEffect(() => {
    const loadEvents = async () => {
      if (!user) {
        // If user is not logged in, try to load from localStorage as fallback
        try {
          const savedEvents = localStorage.getItem(`farm-tracking-${moduleName}`);
          if (savedEvents) {
            setEvents(JSON.parse(savedEvents));
          } else {
            setEvents([
              {
                id: "1",
                title: "Started tracking",
                date: new Date().toISOString().split('T')[0],
                notes: "Initial setup of tracking for this module",
                category: "present" as "past" | "present" | "future",
                type: "learning"
              }
            ]);
          }
        } catch (error) {
          console.error("Error loading tracking events:", error);
        } finally {
          setLoading(false);
        }
        return;
      }

      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('tracking_events')
          .select('*')
          .eq('module_name', moduleName)
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        if (data && data.length > 0) {
          setEvents(data.map(event => ({
            id: event.id,
            title: event.title,
            date: event.date,
            notes: event.notes,
            category: event.category as "past" | "present" | "future",
            type: event.type,
            progress: event.progress
          })));
        } else {
          // Initialize with default event if no events exist
          const defaultEvent = {
            title: "Started tracking",
            date: new Date().toISOString().split('T')[0],
            notes: "Initial setup of tracking for this module",
            category: "present" as "past" | "present" | "future",
            type: "learning"
          };
          
          // Add the default event
          const addResult = await addEvent(defaultEvent, moduleName);
          
          // Set the event with the returned ID
          if (addResult && addResult.id) {
            setEvents([{ ...defaultEvent, id: addResult.id }]);
          } else {
            setEvents([{ ...defaultEvent, id: "pending" }]);
          }
        }
      } catch (error) {
        console.error("Error loading tracking events from Supabase:", error);
        toast({
          title: "Failed to load tracking events",
          description: "There was an issue loading your tracking data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [moduleName, user, toast]);

  // Filter events by category
  const getFilteredEvents = (category: "past" | "present" | "future") => {
    return events.filter(event => event.category === category);
  };

  // Add a new event
  const addEvent = async (event: Omit<TrackingEvent, "id">, moduleName: string) => {
    try {
      if (!user) {
        // Fallback to localStorage if user is not logged in
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
        return newEvent;
      }

      // Add event to Supabase
      const { data, error } = await supabase
        .from('tracking_events')
        .insert({
          user_id: user.id,
          module_name: moduleName,
          title: event.title,
          date: event.date,
          notes: event.notes,
          category: event.category,
          type: event.type,
          progress: event.progress
        })
        .select()
        .single();
      
      if (error) {
        throw error;
      }

      // Update local state with the returned event
      const newEvent = {
        id: data.id,
        title: data.title,
        date: data.date,
        notes: data.notes,
        category: data.category as "past" | "present" | "future",
        type: data.type,
        progress: data.progress
      };
      
      setEvents(prevEvents => [...prevEvents, newEvent]);
      
      toast({
        title: "Event Added",
        description: `Added "${event.title}" to your ${event.category} tracking`,
      });
      
      return newEvent;
    } catch (error: any) {
      console.error("Error adding tracking event:", error);
      toast({
        title: "Failed to Add Event",
        description: error.message || "There was an issue adding your tracking event.",
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
        const updatedEvents = events.filter(event => event.id !== id);
        setEvents(updatedEvents);
        localStorage.setItem(`farm-tracking-${moduleName}`, JSON.stringify(updatedEvents));
        
        toast({
          title: "Event Removed",
          description: "The tracking event has been removed",
        });
        return;
      }

      // Delete event from Supabase
      const { error } = await supabase
        .from('tracking_events')
        .delete()
        .eq('id', id);
      
      if (error) {
        throw error;
      }

      // Update local state
      setEvents(prevEvents => prevEvents.filter(event => event.id !== id));
      
      toast({
        title: "Event Removed",
        description: "The tracking event has been removed",
      });
    } catch (error: any) {
      console.error("Error deleting tracking event:", error);
      toast({
        title: "Failed to Remove Event",
        description: error.message || "There was an issue removing your tracking event.",
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
