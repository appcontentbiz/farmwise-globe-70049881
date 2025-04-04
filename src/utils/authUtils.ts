
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

/**
 * Checks if the current session is valid
 */
export const isSessionValid = async () => {
  try {
    // Handle case when network is down
    if (!navigator.onLine) {
      console.warn("Network is offline, cannot validate session");
      return { 
        valid: false,
        session: null,
        networkError: true
      };
    }
    
    const { data, error } = await supabase.auth.getSession();
    return { 
      valid: !!data.session && !error,
      session: data.session,
      networkError: false
    };
  } catch (error) {
    console.error("Error checking session validity:", error);
    return { 
      valid: false, 
      session: null,
      networkError: true
    };
  }
};

/**
 * Refreshes the current session if possible
 */
export const refreshSession = async () => {
  try {
    if (!navigator.onLine) {
      console.warn("Network is offline, cannot refresh session");
      return false;
    }
    
    const { data, error } = await supabase.auth.refreshSession();
    
    if (error) {
      console.error("Failed to refresh session:", error);
      return false;
    }
    
    return !!data.session;
  } catch (error) {
    console.error("Error during session refresh:", error);
    return false;
  }
};

/**
 * Handles session recovery attempts
 */
export const handleSessionRecovery = async () => {
  // Don't attempt recovery if offline
  if (!navigator.onLine) {
    console.log("Network is offline, skipping session recovery");
    return false;
  }

  const { valid, networkError } = await isSessionValid();
  
  // Don't show errors if network is down
  if (networkError) {
    return false;
  }
  
  if (!valid) {
    const refreshed = await refreshSession();
    if (!refreshed) {
      toast.error("Your session has expired. Please sign in again.");
      return false;
    }
    toast.success("Session refreshed successfully");
  }
  
  return true;
};

/**
 * Extract detailed error message from Supabase auth errors
 */
export const getAuthErrorMessage = (error: any): string => {
  if (!navigator.onLine) {
    return "You appear to be offline. Please check your internet connection and try again.";
  }

  // Handle specific known error cases
  if (error.message?.includes("Email not confirmed")) {
    return "Please check your email and confirm your account before signing in.";
  }
  
  if (error.message?.includes("Invalid login credentials")) {
    return "Incorrect email or password. Please try again.";
  }
  
  if (error.message?.includes("Email already registered")) {
    return "This email is already registered. Please sign in instead.";
  }
  
  if (error.message?.includes("rate limited")) {
    return "Too many attempts. Please try again later.";
  }
  
  if (error.message?.includes("Failed to fetch")) {
    return "Network error. Please check your internet connection and try again.";
  }
  
  // Return the original message or a fallback
  return error.message || "An authentication error occurred";
};
