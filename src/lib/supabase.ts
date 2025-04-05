
// Re-export the client from our main file for backwards compatibility
import { supabase, isSupabaseConnected } from '@/integrations/supabase/client';

export { supabase, isSupabaseConnected };
