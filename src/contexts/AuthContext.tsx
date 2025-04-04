
import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { toast } from 'sonner';
import { getAuthErrorMessage, handleSessionRecovery } from '@/utils/authUtils';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, farmName: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Initialize Supabase schema
  const initSupabaseSchema = useCallback(async () => {
    try {
      // Check if the farms table exists
      const { error } = await supabase
        .from('farms')
        .select('count(*)', { count: 'exact', head: true })
        .limit(1);
        
      // If the table doesn't exist, we'll get an error
      if (error && error.message.includes('relation "farms" does not exist')) {
        console.warn('Farms table does not exist. Please make sure the Supabase schema is correctly set up.');
        toast.info('Setting up database schema...');
      }
    } catch (err) {
      console.error('Error initializing Supabase schema:', err);
    }
  }, []);

  // Handle auth errors in redirects
  const handleAuthRedirects = useCallback(() => {
    const url = new URL(window.location.href);
    
    // Handle error parameters
    const errorParam = url.searchParams.get('error');
    const errorDescription = url.searchParams.get('error_description');
    
    // Handle success parameters
    const emailConfirmed = url.searchParams.get('email_confirmed');
    
    if (errorParam) {
      console.error('Auth redirect error:', errorParam, errorDescription);
      toast.error(errorDescription || 'Authentication error occurred');
      navigate('/login', { replace: true });
      return true;
    }
    
    if (emailConfirmed === 'true') {
      navigate('/login?email_confirmed=true', { replace: true });
      return true;
    }
    
    return false;
  }, [navigate]);

  const refreshUserSession = useCallback(async () => {
    try {
      const { data, error } = await supabase.auth.refreshSession();
      if (error) {
        console.error("Error refreshing session:", error);
        return false;
      }
      
      setSession(data.session);
      setUser(data.session?.user ?? null);
      return !!data.session;
    } catch (error) {
      console.error("Failed to refresh session:", error);
      return false;
    }
  }, []);

  useEffect(() => {
    // Check for auth redirects first
    const hasHandledRedirect = handleAuthRedirects();
    if (hasHandledRedirect) return;

    // Initialize Supabase schema
    initSupabaseSchema();

    // First set up the auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    }).catch(error => {
      console.error('Failed to get session:', error);
      setIsLoading(false);
    });

    // Set up session expiry check interval
    const intervalId = setInterval(async () => {
      // Only perform check if we have an existing session
      if (session) {
        // Check if the session is approaching expiry (within 5 minutes)
        const expiryTime = new Date(session.expires_at * 1000);
        const now = new Date();
        const timeToExpiry = expiryTime.getTime() - now.getTime();
        
        // If session expires in less than 5 minutes, try to refresh it
        if (timeToExpiry < 5 * 60 * 1000 && timeToExpiry > 0) {
          console.log("Session expiring soon, attempting refresh...");
          await refreshUserSession();
        }
      }
    }, 60000); // Check every minute

    return () => {
      subscription.unsubscribe();
      clearInterval(intervalId);
    };
  }, [handleAuthRedirects, initSupabaseSchema, refreshUserSession, session]);

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      navigate('/');
      toast.success("Welcome back!");
    } catch (error: any) {
      console.error('Sign in error:', error);
      toast.error(getAuthErrorMessage(error));
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, farmName: string) => {
    try {
      setIsLoading(true);
      
      const { data: { user }, error } = await supabase.auth.signUp({ email, password });
      
      if (error) throw error;
      
      if (user) {
        // Create farm profile after successful signup
        try {
          const { error: profileError } = await supabase
            .from('farms')
            .insert([{ 
              user_id: user.id, 
              farm_name: farmName,
              created_at: new Date().toISOString() 
            }]);
            
          if (profileError) {
            console.error('Failed to create farm profile:', profileError);
          }
        } catch (profileError) {
          console.error('Error creating farm profile:', profileError);
          // Continue even if profile creation fails
        }
      }
      
      toast.success("Account created! Please verify your email.");
      navigate('/login');
    } catch (error: any) {
      console.error('Signup error:', error);
      toast.error(getAuthErrorMessage(error));
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/login');
    } catch (error: any) {
      console.error('Sign out error:', error);
      toast.error(getAuthErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      isLoading, 
      signIn, 
      signUp, 
      signOut,
      refreshSession: refreshUserSession
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
