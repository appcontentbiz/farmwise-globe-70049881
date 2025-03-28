
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, isSupabaseConnected } from '@/lib/supabase';
import { Session, User } from '@supabase/supabase-js';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  supabaseConnected: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, farmName: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [supabaseConnected, setSupabaseConnected] = useState(isSupabaseConnected());
  const navigate = useNavigate();

  useEffect(() => {
    if (!supabaseConnected) {
      setIsLoading(false);
      return;
    }

    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    }).catch(error => {
      console.error('Failed to get session:', error);
      setIsLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [supabaseConnected]);

  const signIn = async (email: string, password: string) => {
    if (!supabaseConnected) {
      toast.error("Supabase is not connected. Please connect via the Supabase button at the top.");
      return;
    }

    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      navigate('/');
      toast.success("Welcome back!");
    } catch (error: any) {
      toast.error(error.message || "Failed to sign in");
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, farmName: string) => {
    if (!supabaseConnected) {
      toast.error("Supabase is not connected. Please connect via the Supabase button at the top.");
      return;
    }

    try {
      setIsLoading(true);
      
      // Create user with Supabase auth
      const { data: { user }, error } = await supabase.auth.signUp({ email, password });
      
      if (error) throw error;
      
      if (user) {
        // After signup, create a farm profile for the user
        const { error: profileError } = await supabase
          .from('farms')
          .insert([{ 
            user_id: user.id, 
            farm_name: farmName,
            created_at: new Date().toISOString() 
          }]);
          
        if (profileError) throw profileError;
      }
      
      toast.success("Account created! Please verify your email.");
      navigate('/login');
    } catch (error: any) {
      toast.error(error.message || "Failed to sign up");
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    if (!supabaseConnected) {
      return;
    }

    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/login');
    } catch (error: any) {
      toast.error(error.message || "Failed to sign out");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, isLoading, supabaseConnected, signIn, signUp, signOut }}>
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
