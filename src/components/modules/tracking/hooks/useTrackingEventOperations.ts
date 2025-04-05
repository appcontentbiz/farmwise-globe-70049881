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
      console.log(`[DELETION DEBUG] useTrackingEventOperations: Deleting event ${id} in module ${moduleName}`);
      
      // Keep a copy of the current events for rollback if needed
      const currentEvents = [...events];
      
      // Optimistically update the UI by removing the event immediately
      setEvents(events => events.filter(event => event.id !== id));
      
      let success = false;
      
      if (!user) {
        console.log("[DELETION DEBUG] No user found, using local storage for deletion");
        const updatedEvents = deleteLocalEvent(id, currentEvents, moduleName);
        
        showToast(
          "Event Deleted",
          "The event has been successfully removed from your tracking"
        );
        
        success = true;
      } else {
        console.log(`[DELETION DEBUG] Delegating delete to Supabase for event ${id}`);
        // Force a fresh database call to delete the event
        success = await deleteSupabaseEvent(id);
        
        // Log the result
        console.log(`[DELETION DEBUG] Delete operation result: ${success ? "Success" : "Failed"}`);
        
        if (!success) {
          // Only rollback UI if we know the operation failed
          console.error(`[DELETION DEBUG] Delete operation failed for event ${id}, rolling back UI`);
          setEvents(currentEvents);
          return false;
        }
      }
      
      if (success) {
        console.log(`[DELETION DEBUG] Delete successful for event ${id}`);
        
        // Double-check that the event was removed from state
        setEvents(current => current.filter(e => e.id !== id));
        
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("[DELETION DEBUG] Error deleting tracking event:", error);
      
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
