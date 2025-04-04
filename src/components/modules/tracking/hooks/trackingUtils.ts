
import { TrackingEvent } from "../types";

export const createDefaultEvent = (): TrackingEvent => {
  return {
    id: "1",
    title: "Started tracking",
    date: new Date().toISOString().split('T')[0],
    notes: "Initial setup of tracking for this module",
    category: "present" as "past" | "present" | "future",
    type: "learning"
  };
};

export const filterEventsByCategory = (
  events: TrackingEvent[], 
  category: "past" | "present" | "future"
): TrackingEvent[] => {
  return events.filter(event => event.category === category);
};

export const getEventActionMessage = (
  action: "add" | "delete" | "load" | "error",
  eventTitle?: string,
  category?: string,
  errorMessage?: string
): { title: string; description: string } => {
  switch (action) {
    case "add":
      return {
        title: "Event Added",
        description: eventTitle && category 
          ? `Added "${eventTitle}" to your ${category} tracking`
          : "New event has been added to your tracking"
      };
    case "delete":
      return {
        title: "Event Removed",
        description: "The tracking event has been removed"
      };
    case "load":
      return {
        title: "Events Loaded",
        description: "Your tracking events have been loaded successfully"
      };
    case "error":
      return {
        title: "Operation Failed",
        description: errorMessage || "There was an issue with your tracking data"
      };
    default:
      return {
        title: "Tracking Updated",
        description: "Your tracking data has been updated"
      };
  }
};
