import { useState } from "react";
import { TrackingEvent } from "../types";
import { useToast } from "@/hooks/use-toast";
import { supabase, handleSupabaseError } from "@/integrations/supabase/client";
import { getEventActionMessage } from "./trackingUtils";

let lastErrorToastId = '';
const errorCooldown = 5000; // 5 seconds between showing the same error

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

      return [];
    } catch (error: any) {
      console.error("Error loading tracking events from Supabase:", error);
      throw error;
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
        id: `add-event-${Date.now()}`,
        title: successMessage.title,
        description: successMessage.description,
      });
      
      return newEvent;
    } catch (error: any) {
      console.error("Error adding tracking event to Supabase:", error);
      
      const formattedError = handleSupabaseError(error);
      if (formattedError) {
        const errorId = `${formattedError.type}-${formattedError.message}`;
        const now = Date.now();
        
        if (errorId !== lastErrorToastId || now - parseInt(lastErrorToastId.split('-')[0] || '0') > errorCooldown) {
          lastErrorToastId = `${now}-${errorId}`;
          
          toast({
            id: `error-${now}`,
            title: "Error Adding Event",
            description: formattedError.message,
            variant: "destructive",
          });
        }
      }
      
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
      
      return true;
    } catch (error: any) {
      console.error("Error deleting tracking event from Supabase:", error);
      
      const formattedError = handleSupabaseError(error);
      if (formattedError) {
        toast({
          id: `delete-error-${Date.now()}`,
          title: "Error Removing Event",
          description: formattedError.message,
          variant: "destructive",
        });
      }
      
      return false;
    }
  };

  return {
    loadSupabaseEvents,
    addSupabaseEvent,
    deleteSupabaseEvent
  };
}
