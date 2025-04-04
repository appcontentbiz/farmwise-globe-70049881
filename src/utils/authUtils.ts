
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

/**
 * Checks if the current session is valid
 */
export const isSessionValid = async () => {
  const { data, error } = await supabase.auth.getSession();
  return { 
    valid: !!data.session && !error,
    session: data.session 
  };
};

/**
 * Refreshes the current session if possible
 */
export const refreshSession = async () => {
  try {
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
  const { valid } = await isSessionValid();
  
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
  
  // Return the original message or a fallback
  return error.message || "An authentication error occurred";
};
