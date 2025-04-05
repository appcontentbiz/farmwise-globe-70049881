
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LogOut, User } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "./ui/dropdown-menu";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { handleSessionRecovery } from "@/utils/authUtils";

interface FarmProfile {
  farm_name: string;
  created_at: string;
}

export function UserProfile() {
  const { user, signOut, refreshSession } = useAuth();
  const [farmProfile, setFarmProfile] = useState<FarmProfile | null>(null);
  const [fetchAttempted, setFetchAttempted] = useState(false);
  
  useEffect(() => {
    if (user) {
      fetchFarmProfile();
      
      // Set up periodic session validation
      const intervalId = setInterval(async () => {
        const { valid } = await supabase.auth.getSession().then(({ data, error }) => ({
          valid: !!data.session && !error
        }));
        
        if (!valid) {
          const refreshed = await refreshSession();
          if (!refreshed) {
            toast.error("Your session has expired. Please sign in again.");
            signOut(); // Force sign out if refresh fails
          }
        }
      }, 5 * 60 * 1000); // Check every 5 minutes
      
      return () => clearInterval(intervalId);
    }
  }, [user, refreshSession, signOut]);
  
  const fetchFarmProfile = async () => {
    try {
      setFetchAttempted(true);
      
      // Only attempt if we have a user
      if (!user) return;
      
      // Check if the farms table exists - using a more resilient approach
      try {
        const { data, error } = await supabase
          .from('farms')
          .select('farm_name, created_at')
          .eq('user_id', user.id)
          .maybeSingle();
        
        if (error) {
          // If it's a "relation does not exist" error, handle gracefully
          if (error.message && error.message.includes('does not exist')) {
            console.log('Farms table does not exist yet, will create default profile');
            // Continue to create default farm below
          } else {
            console.error('Error fetching farm profile:', error);
            return;
          }
        }
        
        // If we have farm data, use it
        if (data) {
          setFarmProfile(data);
          return;
        }
      } catch (err) {
        console.error('Error in farms table check:', err);
        // Continue to try creating a default farm
      }
      
      // Create a default farm profile if none exists and we have a user
      if (user) {
        try {
          const defaultFarmName = `Farm_${user.email?.split('@')[0] || 'Default'}`;
          const { error: insertError } = await supabase
            .from('farms')
            .insert([{ 
              user_id: user.id, 
              farm_name: defaultFarmName,
              created_at: new Date().toISOString() 
            }]);
            
          if (insertError) {
            // Check if it's a "relation does not exist" error
            if (insertError.message && insertError.message.includes('does not exist')) {
              console.log('Farms table does not exist yet. This is expected for new installations.');
            } else {
              console.error('Error creating default farm profile:', insertError);
            }
          } else {
            setFarmProfile({
              farm_name: defaultFarmName,
              created_at: new Date().toISOString()
            });
            toast.success("Default farm profile created");
          }
        } catch (err) {
          console.warn('Error creating default farm:', err);
        }
      }
    } catch (error) {
      console.error('Error in farm profile handling:', error);
      // Attempt to recover from session-related errors
      if (error instanceof Error && 
          (error.message.includes("JWT") || error.message.includes("token") || error.message.includes("session"))) {
        await handleSessionRecovery();
      }
    }
  };
  
  if (!user) return null;
  
  const initials = user.email?.substring(0, 2).toUpperCase() || 'FW';
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="" alt={user.email || ""} />
            <AvatarFallback className="bg-farm-green text-white">{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {farmProfile && (
              <p className="font-medium">{farmProfile.farm_name}</p>
            )}
            {!farmProfile && fetchAttempted && (
              <p className="font-medium text-sm text-muted-foreground">Default Farm</p>
            )}
            <p className="w-[200px] truncate text-sm text-muted-foreground">
              {user.email}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
