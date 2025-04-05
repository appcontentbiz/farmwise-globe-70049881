
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
      
      // Find the event in the current events array to confirm it exists
      const eventToDelete = events.find(event => event.id === id);
      if (!eventToDelete) {
        console.error(`[DELETION DEBUG] Event with ID ${id} not found in local state`);
        showToast(
          "Error",
          "The event you're trying to delete could not be found.",
          "destructive"
        );
        return false;
      }
      
      console.log(`[DELETION DEBUG] Found event to delete: ${eventToDelete.title}`);
      
      // Immediately update UI for better perceived performance
      setEvents(currentEvents => currentEvents.filter(event => event.id !== id));
      
      let success = false;
      
      if (!user) {
        console.log("[DELETION DEBUG] No user found, using local storage for deletion");
        deleteLocalEvent(id, events, moduleName);
        showToast("Event Deleted", "The event has been successfully removed from your tracking");
        success = true;
      } else {
        console.log(`[DELETION DEBUG] Delegating delete to Supabase for event ${id}`);
        success = await deleteSupabaseEvent(id);
        
        if (!success) {
          // If deletion failed, restore the event in UI
          console.error(`[DELETION DEBUG] Delete operation failed for event ${id}`);
          setEvents(currentEvents => [...currentEvents, eventToDelete]);
          return false;
        }
      }
      
      // Ensure event is removed from state (safeguard against race conditions)
      setEvents(current => current.filter(e => e.id !== id));
      
      return success;
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
