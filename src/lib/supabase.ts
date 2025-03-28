
import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if environment variables are defined
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase environment variables are missing. Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.');
}

// Create Supabase client with fallback to empty strings to prevent immediate crashes
// This will still produce an error, but in a more controlled way
export const supabase = createClient(
  supabaseUrl || 'https://placeholder-url.supabase.co',  // Fallback URL
  supabaseAnonKey || 'placeholder-key'                   // Fallback key
);
