
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
  action: "add" | "delete" | "load" | "error" | "validate" | "update",
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
    case "validate":
      return {
        title: "Validation Error",
        description: errorMessage || "Please check the form fields and try again"
      };
    case "update":
      return {
        title: "Real-time Update",
        description: "Your tracking data has been updated from another session"
      };
    default:
      return {
        title: "Tracking Updated",
        description: "Your tracking data has been updated"
      };
  }
};

export const validateEventForm = (
  event: Omit<TrackingEvent, "id">
): { isValid: boolean; message?: string } => {
  if (!event.title.trim()) {
    return { isValid: false, message: "Event title is required" };
  }
  
  if (!event.date) {
    return { isValid: false, message: "Event date is required" };
  }
  
  // Check if date is in valid format (YYYY-MM-DD)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(event.date)) {
    return { isValid: false, message: "Date format should be YYYY-MM-DD" };
  }
  
  // If progress is provided, it should be between 0 and 100
  if (event.progress !== undefined && (event.progress < 0 || event.progress > 100)) {
    return { isValid: false, message: "Progress must be between 0 and 100" };
  }
  
  return { isValid: true };
};
