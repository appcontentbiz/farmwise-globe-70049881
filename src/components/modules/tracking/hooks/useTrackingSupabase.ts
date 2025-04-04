
import { useState } from "react";
import { TrackingEvent } from "../types";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export function useTrackingSupabase() {
  const { toast } = useToast();
  
  const loadSupabaseEvents = async (moduleName: string, userId: string): Promise<TrackingEvent[]> => {
    try {
      const { data, error } = await supabase
        .from('tracking_events')
        .select('*')
        .eq('module_name', moduleName)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      if (data && data.length > 0) {
        return data.map(event => ({
          id: event.id,
          title: event.title,
          date: event.date,
          notes: event.notes,
          category: event.category as "past" | "present" | "future",
          type: event.type,
          progress: event.progress
        }));
      }

      // Return empty array if no events found
      return [];
    } catch (error) {
      console.error("Error loading tracking events from Supabase:", error);
      toast({
        title: "Failed to load tracking events",
        description: "There was an issue loading your tracking data. Please try again.",
        variant: "destructive",
      });
      return [];
    }
  };

  const addSupabaseEvent = async (
    event: Omit<TrackingEvent, "id">, 
    moduleName: string, 
    userId: string
  ): Promise<TrackingEvent | null> => {
    try {
      const { data, error } = await supabase
        .from('tracking_events')
        .insert({
          user_id: userId,
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

      const newEvent = {
        id: data.id,
        title: data.title,
        date: data.date,
        notes: data.notes,
        category: data.category as "past" | "present" | "future",
        type: data.type,
        progress: data.progress
      };
      
      toast({
        title: "Event Added",
        description: `Added "${event.title}" to your ${event.category} tracking`,
      });
      
      return newEvent;
    } catch (error: any) {
      console.error("Error adding tracking event to Supabase:", error);
      toast({
        title: "Failed to Add Event",
        description: error.message || "There was an issue adding your tracking event.",
        variant: "destructive",
      });
      return null;
    }
  };

  const deleteSupabaseEvent = async (id: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('tracking_events')
        .delete()
        .eq('id', id);
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Event Removed",
        description: "The tracking event has been removed",
      });
      
      return true;
    } catch (error: any) {
      console.error("Error deleting tracking event from Supabase:", error);
      toast({
        title: "Failed to Remove Event",
        description: error.message || "There was an issue removing your tracking event.",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    loadSupabaseEvents,
    addSupabaseEvent,
    deleteSupabaseEvent
  };
}
