
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
