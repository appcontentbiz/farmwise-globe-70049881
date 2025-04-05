
import { useState, useEffect, useRef } from "react";
import { TrackingEvent } from "../types";
import { useTrackingToasts } from "./useTrackingToasts";

export function useTrackingDataLoader(
  user: any | null,
  moduleName: string,
  loadLocalEvents: () => TrackingEvent[],
  loadSupabaseEvents: (moduleName: string, userId: string) => Promise<TrackingEvent[]>,
  addEvent: (event: Omit<TrackingEvent, "id">, moduleName: string) => Promise<TrackingEvent | null>,
  events: TrackingEvent[],
  setEvents: React.Dispatch<React.SetStateAction<TrackingEvent[]>>
) {
  const [loading, setLoading] = useState(true);
  const initialLoadComplete = useRef(false);
  const { showToast } = useTrackingToasts();
  
  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        
        if (!user) {
          const localEvents = loadLocalEvents();
          setEvents(localEvents);
          
          if (localEvents.length > 0 && !initialLoadComplete.current) {
            showToast(
              "Events Loaded", 
              `Loaded ${localEvents.length} events from local storage`
            );
            initialLoadComplete.current = true;
          }
        } else {
          try {
            const supabaseEvents = await loadSupabaseEvents(moduleName, user.id);
            setEvents(supabaseEvents);
            
            // Only show toast on first load
            if (supabaseEvents.length > 0 && !initialLoadComplete.current) {
              showToast(
                "Events Loaded", 
                `Successfully loaded ${supabaseEvents.length} tracking events`
              );
              initialLoadComplete.current = true;
            }
            
            // Removed the automatic event creation logic completely
          } catch (error) {
            console.error("Error loading events from Supabase, falling back to local storage:", error);
            const localEvents = loadLocalEvents();
            setEvents(localEvents);
            
            if (!initialLoadComplete.current) {
              showToast(
                "Using Offline Mode", 
                "Could not connect to the server. Using local data instead.",
                "destructive"
              );
              initialLoadComplete.current = true;
            }
          }
        }
      } catch (error) {
        console.error("Error loading tracking events:", error);
        if (!initialLoadComplete.current) {
          showToast(
            "Failed to Load Events",
            "There was a problem loading your events. Please try refreshing the page.",
            "destructive"
          );
          initialLoadComplete.current = true;
        }
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [moduleName, user]);
  
  return { loading };
}
