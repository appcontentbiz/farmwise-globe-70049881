import { TrackingEvent } from "../types";
import { useTrackingLocalStorage } from "./useTrackingLocalStorage";
import { useTrackingSupabase } from "./useTrackingSupabase";
import { createDefaultEvent, getEventActionMessage } from "./trackingUtils";
import { useTrackingToasts } from "./useTrackingToasts";

export function useTrackingEventOperations(
  events: TrackingEvent[],
  setEvents: React.Dispatch<React.SetStateAction<TrackingEvent[]>>,
  user: any | null
) {
  const { showToast } = useTrackingToasts();
  
  const { 
    loadLocalEvents, 
    addLocalEvent, 
    deleteLocalEvent 
  } = useTrackingLocalStorage();
  
  const { 
    loadSupabaseEvents, 
    addSupabaseEvent, 
    deleteSupabaseEvent 
  } = useTrackingSupabase();

  const getFilteredEvents = (category: "past" | "present" | "future") => {
    return events.filter(event => event.category === category);
  };

  const addEvent = async (event: Omit<TrackingEvent, "id">, moduleName: string): Promise<TrackingEvent | null> => {
    try {
      if (!user) {
        const newEvent = addLocalEvent(event, events, moduleName);
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
      console.log(`useTrackingEventOperations: Deleting event ${id} in module ${moduleName}`);
      
      // Keep a copy of the current events for rollback if needed
      const currentEvents = [...events];
      
      // Optimistically update the UI by removing the event immediately
      setEvents(events => events.filter(event => event.id !== id));
      
      if (!user) {
        console.log("No user found, using local storage for deletion");
        const updatedEvents = deleteLocalEvent(id, currentEvents, moduleName);
        
        showToast(
          "Event Deleted",
          "The event has been successfully removed from your tracking"
        );
        
        return true;
      }

      console.log(`Delegating delete to Supabase for event ${id}`);
      const success = await deleteSupabaseEvent(id);
      
      if (!success) {
        // Rollback the UI if the operation failed
        console.error(`Delete operation failed for event ${id}, rolling back UI`);
        setEvents(currentEvents);
        return false;
      }
      
      console.log(`Delete successful for event ${id}`);
      return true;
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
    getFilteredEvents,
    addEvent,
    deleteEvent,
    loadLocalEvents,
    loadSupabaseEvents,
  };
}
