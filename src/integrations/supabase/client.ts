
import { createClient } from '@supabase/supabase-js';
import { toast } from 'sonner';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY;

// Check if environment variables are defined
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables. Using project default values.');
}

// Create Supabase client with proper fallbacks
export const supabase = createClient(
  supabaseUrl || 'https://phdxahmpqvobbrqqjbut.supabase.co',
  supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBoZHhhaG1wcXZvYmJycXFqYnV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3MzAyODgsImV4cCI6MjA1MjMwNjI4OH0.lVWfcAaigt8z5yskV8XLH_EhYJJiNQ9mz_5PTQKMBng',
  {
    realtime: {
      params: {
        eventsPerSecond: 10,
      },
    },
  }
);

// Utility function to check if Supabase is connected properly
export const isSupabaseConnected = async () => {
  try {
    // Simple ping to check connection
    const { data, error } = await supabase.from('_dummy_query').select('*').limit(1);
    if (error && !error.message.includes('relation "_dummy_query" does not exist')) {
      console.error('Supabase connection test failed:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Error testing Supabase connection:', err);
    return false;
  }
};

// Initialize Supabase schema 
export const initializeSupabaseSchema = async () => {
  try {
    // Only try to initialize if Supabase is properly connected
    if (!await isSupabaseConnected()) {
      console.log('Supabase not properly connected. Schema initialization skipped.');
      return;
    }
    
    // Check if the farms table exists
    const { error: checkError } = await supabase
      .from('farms')
      .select('count(*)', { count: 'exact', head: true });
      
    // If the farms table doesn't exist (we get a specific error), we should create it
    if (checkError && checkError.message.includes('relation "farms" does not exist')) {
      console.log('Farms table does not exist. You need to create it in the Supabase dashboard.');
      toast.info('Please connect your Supabase project to create required tables');
    }

    // Enable realtime for the tracking_events table
    try {
      const { error } = await supabase.rpc('supabase_functions.enable_realtime', {
        table_name: 'tracking_events',
        schema: 'public'
      });
      
      if (error) {
        console.error('Error enabling realtime for tracking_events:', error);
      } else {
        console.log('Realtime enabled for tracking_events table');
      }
    } catch (err) {
      console.error('Failed to enable realtime for tracking_events:', err);
      // Continue anyway as this might be a permissions issue or the function might not exist
    }
  } catch (err) {
    console.error('Error initializing Supabase schema:', err);
  }
};
