
import { useState } from "react";
import { TrackingEvent } from "../types";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { getEventActionMessage } from "./trackingUtils";

export function useTrackingSupabase() {
  const { toast } = useToast();
  
  const loadSupabaseEvents = async (moduleName: string, userId: string): Promise<TrackingEvent[]> => {
    try {
      const { data, error } = await supabase
        .from('tracking_events')
        .select('*')
        .eq('module_name', moduleName)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      if (data && data.length > 0) {
        const successMessage = getEventActionMessage("load");
        toast({
          title: successMessage.title,
          description: `Successfully loaded ${data.length} tracking events.`,
        });
        
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
    } catch (error: any) {
      console.error("Error loading tracking events from Supabase:", error);
      const errorMessage = getEventActionMessage("error", undefined, undefined, 
        error.message || "There was an issue loading your tracking data. Please try again.");
      
      toast({
        title: errorMessage.title,
        description: errorMessage.description,
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
      
      const successMessage = getEventActionMessage("add", event.title, event.category);
      toast({
        title: successMessage.title,
        description: successMessage.description,
      });
      
      return newEvent;
    } catch (error: any) {
      console.error("Error adding tracking event to Supabase:", error);
      const errorMessage = getEventActionMessage("error", undefined, undefined, 
        error.message || "There was an issue adding your tracking event.");
      
      toast({
        title: errorMessage.title,
        description: errorMessage.description,
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
      
      const successMessage = getEventActionMessage("delete");
      toast({
        title: successMessage.title,
        description: successMessage.description,
      });
      
      return true;
    } catch (error: any) {
      console.error("Error deleting tracking event from Supabase:", error);
      const errorMessage = getEventActionMessage("error", undefined, undefined, 
        error.message || "There was an issue removing your tracking event.");
      
      toast({
        title: errorMessage.title,
        description: errorMessage.description,
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
