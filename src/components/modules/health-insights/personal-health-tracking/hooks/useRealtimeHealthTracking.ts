
import { useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";

export const useRealtimeHealthTracking = (userId: string | undefined, onDataChange: () => void) => {
  useEffect(() => {
    if (!userId) return;
    
    // Set up realtime subscription
    const channel = supabase
      .channel('health-tracking-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'health_tracking',
        filter: `user_id=eq.${userId}`
      }, () => {
        // Refresh data when any change happens
        onDataChange();
      })
      .subscribe();
      
    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, onDataChange]);
};
