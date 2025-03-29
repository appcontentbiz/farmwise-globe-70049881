
import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY;

// Check if environment variables are defined and valid
if (!supabaseUrl || typeof supabaseUrl !== 'string' || !supabaseUrl.startsWith('http')) {
  console.error('Invalid Supabase connection details.');
  console.log('================== IMPORTANT INSTRUCTIONS ==================');
  console.log('To connect your project to Supabase:');
  console.log('1. Click on the green "Supabase" button at the top right of your Lovable interface');
  console.log('2. Follow the prompts to connect your Supabase project');
  console.log('3. This will automatically configure the necessary connection details');
  console.log('==========================================================');
}

// Default fallback values that are valid URLs for the URL constructor
const FALLBACK_URL = 'https://example.supabase.co';
const FALLBACK_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSJ9.LzKGEffr7J2qvk5wgSFO3jnQq4UvHQ06S3-9FMRXYes';

// Create Supabase client with proper URL validation
export const supabase = createClient(
  (supabaseUrl && typeof supabaseUrl === 'string' && supabaseUrl.startsWith('http')) 
    ? supabaseUrl 
    : FALLBACK_URL,
  supabaseAnonKey || FALLBACK_KEY
);

// Check if Supabase is properly connected
export const isSupabaseConnected = () => {
  return (
    supabaseUrl && 
    typeof supabaseUrl === 'string' && 
    supabaseUrl.startsWith('http') && 
    supabaseAnonKey
  );
};
