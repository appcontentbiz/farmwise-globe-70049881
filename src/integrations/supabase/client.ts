
import { createClient } from '@supabase/supabase-js';
import { toast } from 'sonner';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY;

// Check if environment variables are defined and valid
if (!supabaseUrl || typeof supabaseUrl !== 'string' || !supabaseUrl.startsWith('http')) {
  console.warn('Invalid Supabase URL. Using fallback values.');
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

// Utility function to check if Supabase is connected properly
export const isSupabaseConnected = async () => {
  if (!supabaseUrl || !supabaseUrl.startsWith('http') || !supabaseAnonKey) {
    return false;
  }
  
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
  } catch (err) {
    console.error('Error initializing Supabase schema:', err);
  }
};
