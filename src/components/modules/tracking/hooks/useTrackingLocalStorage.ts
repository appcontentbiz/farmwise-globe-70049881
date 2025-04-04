
import { useState } from "react";
import { TrackingEvent } from "../types";
import { useToast } from "@/hooks/use-toast";

export function useTrackingLocalStorage(moduleName: string) {
  const { toast } = useToast();
  
  const loadLocalEvents = (): TrackingEvent[] => {
    try {
      const savedEvents = localStorage.getItem(`farm-tracking-${moduleName}`);
      if (savedEvents) {
        return JSON.parse(savedEvents);
      }
    } catch (error) {
      console.error("Error loading tracking events from localStorage:", error);
      toast({
        title: "Failed to Load",
        description: "There was an issue loading your tracking data. Using default data instead.",
        variant: "destructive",
      });
    }
    
    // Default event if nothing exists
    return [{
      id: "1",
      title: "Started tracking",
      date: new Date().toISOString().split('T')[0],
      notes: "Initial setup of tracking for this module",
      category: "present" as "past" | "present" | "future",
      type: "learning"
    }];
  };

  const saveLocalEvents = (events: TrackingEvent[]): void => {
    try {
      localStorage.setItem(`farm-tracking-${moduleName}`, JSON.stringify(events));
    } catch (error) {
      console.error("Error saving tracking events to localStorage:", error);
      toast({
        title: "Failed to Save",
        description: "There was an issue saving your tracking data locally.",
        variant: "destructive",
      });
    }
  };

  const addLocalEvent = (event: Omit<TrackingEvent, "id">, events: TrackingEvent[]): TrackingEvent => {
    const newEvent = {
      ...event,
      id: Date.now().toString()
    };
    
    saveLocalEvents([...events, newEvent]);
    
    toast({
      title: "Event Added",
      description: `Added "${event.title}" to your ${event.category} tracking`,
    });
    
    return newEvent;
  };

  const deleteLocalEvent = (id: string, events: TrackingEvent[]): TrackingEvent[] => {
    const updatedEvents = events.filter(event => event.id !== id);
    saveLocalEvents(updatedEvents);
    
    toast({
      title: "Event Removed",
      description: "The tracking event has been removed",
    });
    
    return updatedEvents;
  };

  return {
    loadLocalEvents,
    saveLocalEvents,
    addLocalEvent,
    deleteLocalEvent
  };
}
