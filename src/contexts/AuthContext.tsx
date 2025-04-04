
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, farmName: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // This function handles auth errors in redirects
    const handleAuthRedirects = () => {
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
    };

    const hasHandledRedirect = handleAuthRedirects();
    if (hasHandledRedirect) return;

    // Initialize Supabase schema
    initializeSupabaseSchema();

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

    return () => subscription.unsubscribe();
  }, [navigate]);

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      navigate('/');
      toast.success("Welcome back!");
    } catch (error: any) {
      console.error('Sign in error:', error);
      toast.error(error.message || "Failed to sign in");
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
      toast.error(error.message || "Failed to sign up");
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
      toast.error(error.message || "Failed to sign out");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, isLoading, signIn, signUp, signOut }}>
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

// Initialize Supabase schema 
async function initializeSupabaseSchema() {
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
}
