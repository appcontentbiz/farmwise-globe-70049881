
import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY;

// Check if environment variables are defined
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Using fallback values.');
}

// Create Supabase client with proper fallbacks
export const supabase = createClient(
  supabaseUrl || 'https://phdxahmpqvobbrqqjbut.supabase.co',
  supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBoZHhhaG1wcXZvYmJycXFqYnV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3MzAyODgsImV4cCI6MjA1MjMwNjI4OH0.lVWfcAaigt8z5yskV8XLH_EhYJJiNQ9mz_5PTQKMBng'
);

// Check if Supabase is properly connected
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
