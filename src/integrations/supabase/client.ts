import { createClient } from '@supabase/supabase-js';
import { toast } from 'sonner';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY;

// Check if environment variables are defined
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables. Using project default values.');
}

// Create Supabase client with proper fallbacks and improved configuration
export const supabase = createClient(
  supabaseUrl || 'https://phdxahmpqvobbrqqjbut.supabase.co',
  supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBoZHhhaG1wcXZvYmJycXFqYnV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3MzAyODgsImV4cCI6MjA1MjMwNjI4OH0.lVWfcAaigt8z5yskV8XLH_EhYJJiNQ9mz_5PTQKMBng',
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
    },
    realtime: {
      params: {
        eventsPerSecond: 5, // Reduce from 10 to 5 to avoid rate limits
      },
      // Use the correct reconnection properties for the Supabase client
      reconnectAfterMs: attempt => Math.min(1000 * Math.pow(2, attempt), 10000)
    },
    global: {
      // Add some headers to show we're from Lovable
      headers: {
        'x-client-info': 'lovable-app'
      }
    }
  }
);

// Utility function to check if Supabase is connected properly
export const isSupabaseConnected = async () => {
  try {
    // Check auth connection first as it doesn't require a table
    const { data: authData, error: authError } = await supabase.auth.getSession();
    if (authError) {
      console.error('Supabase auth connection test failed:', authError);
      return false;
    }
    
    // Only try a DB query if auth looks good
    // We use a simple RPC call rather than a table query
    const { error: dbError } = await supabase.rpc('get_service_status');
    
    // Fallback to dummy query if RPC doesn't exist
    if (dbError && dbError.message.includes('function "get_service_status" does not exist')) {
      const { error: fallbackError } = await supabase
        .from('_dummy_query')
        .select('*')
        .limit(1);
        
      if (fallbackError && !fallbackError.message.includes('relation "_dummy_query" does not exist')) {
        console.error('Supabase fallback connection test failed:', fallbackError);
        return false;
      }
    } else if (dbError) {
      console.error('Supabase DB connection test failed:', dbError);
      return false;
    }
    
    return true;
  } catch (err) {
    console.error('Error testing Supabase connection:', err);
    return false;
  }
};

// Utility function for handling different types of Supabase errors
export const handleSupabaseError = (error: any) => {
  if (!error) return null;
  
  // Network errors
  if (error.message?.includes('Failed to fetch') || error.code === 'NETWORK_ERROR') {
    return {
      type: 'network',
      message: 'Network error. Check your connection and try again.'
    };
  }
  
  // Authentication errors
  if (error.message?.includes('JWT') || error.message?.includes('session')) {
    return {
      type: 'auth',
      message: 'Authentication error. Please sign in again.'
    };
  }
  
  // Database errors
  if (error.code === '42P01') { // Relation does not exist
    return {
      type: 'database',
      message: 'Database table not found. Setup may be incomplete.'
    };
  }
  
  // Rate limiting
  if (error.message?.includes('rate limit')) {
    return {
      type: 'rate-limit',
      message: 'Too many requests. Please try again later.'
    };
  }
  
  // Generic error
  return {
    type: 'unknown',
    message: error.message || 'An unknown error occurred'
  };
};

// Initialize Supabase schema with better error handling
export const initializeSupabaseSchema = async () => {
  try {
    // Only try to initialize if Supabase is properly connected
    if (!await isSupabaseConnected()) {
      console.log('Supabase not properly connected. Schema initialization skipped.');
      return;
    }
    
    // Check if the farms table exists with better error handling
    try {
      const { error: checkError } = await supabase
        .from('farms')
        .select('count(*)', { count: 'exact', head: true });
        
      // If the farms table doesn't exist (we get a specific error), we should create it
      if (checkError && checkError.message.includes('relation "farms" does not exist')) {
        console.log('Farms table does not exist. You need to create it in the Supabase dashboard.');
        toast.info('Please connect your Supabase project to create required tables');
      }
    } catch (err) {
      // Just log but don't break execution
      console.warn('Error checking farms table:', err);
    }

    // Enable realtime for the tracking_events table with better error handling
    try {
      const { error } = await supabase.rpc('supabase_functions.enable_realtime', {
        table_name: 'tracking_events',
        schema: 'public'
      });
      
      if (error) {
        if (error.message && error.message.includes('does not exist')) {
          console.log('Realtime function not found. This is expected for new installations.');
        } else {
          console.error('Error enabling realtime for tracking_events:', error);
        }
      } else {
        console.log('Realtime enabled for tracking_events table');
      }
    } catch (err) {
      console.warn('Failed to enable realtime for tracking_events:', err);
      // Continue anyway as this might be a permissions issue or the function might not exist
    }
  } catch (err) {
    console.warn('Error initializing Supabase schema:', err);
  }
};

// Create a DB service function that doesn't yet exist but might be useful in the future
export const createServiceStatusFunction = async () => {
  try {
    const { error } = await supabase.rpc('create_service_status_function');
    if (error && !error.message.includes('does not exist')) {
      console.error('Error creating service status function:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Error creating service status function:', err);
    return false;
  }
};
