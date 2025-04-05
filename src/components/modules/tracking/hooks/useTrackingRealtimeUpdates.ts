
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { TrackingEvent } from "../types";
import { useTrackingToasts } from "./useTrackingToasts";

export function useTrackingRealtimeUpdates(
  userId: string | undefined,
  moduleName: string,
  setEvents: React.Dispatch<React.SetStateAction<TrackingEvent[]>>,
  setHasNewUpdates: React.Dispatch<React.SetStateAction<boolean>>
) {
  const { showToast } = useTrackingToasts();

  useEffect(() => {
    if (!userId) return;
    
    const channel = supabase
      .channel('tracking-events-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'tracking_events',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          console.log('Real-time update received:', payload);
          setHasNewUpdates(true);
          
          if (payload.eventType === 'INSERT') {
            const newEvent = payload.new as any;
            if (newEvent.module_name === moduleName) {
              setEvents(currentEvents => {
                const exists = currentEvents.some(e => e.id === newEvent.id);
                if (!exists) {
                  const formattedEvent: TrackingEvent = {
                    id: newEvent.id,
                    title: newEvent.title,
                    date: newEvent.date,
                    notes: newEvent.notes,
                    category: newEvent.category as "past" | "present" | "future",
                    type: newEvent.type,
                    progress: newEvent.progress
                  };
                  
                  showToast(
                    "New Event Added",
                    `"${newEvent.title}" has been added to your tracking`
                  );
                  
                  return [...currentEvents, formattedEvent];
                }
                return currentEvents;
              });
            }
          } else if (payload.eventType === 'DELETE') {
            setEvents(currentEvents => {
              const newEvents = currentEvents.filter(e => e.id !== payload.old.id);
              if (newEvents.length !== currentEvents.length) {
                showToast(
                  "Event Deleted",
                  "A tracking event has been removed"
                );
              }
              return newEvents;
            });
          }
        }
      )
      .subscribe((status) => {
        console.log('Realtime subscription status:', status);
      });
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, moduleName]);
  
  return null;
}
