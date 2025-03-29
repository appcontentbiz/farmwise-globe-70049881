
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

interface FarmProfile {
  farm_name: string;
  created_at: string;
}

export function UserProfile() {
  const { user, signOut } = useAuth();
  const [farmProfile, setFarmProfile] = useState<FarmProfile | null>(null);
  
  useEffect(() => {
    if (user) {
      fetchFarmProfile();
    }
  }, [user]);
  
  const fetchFarmProfile = async () => {
    try {
      // First check if the farms table exists
      const { data: tableExists, error: tableError } = await supabase
        .from('farms')
        .select('count(*)', { count: 'exact', head: true });
        
      if (tableError) {
        console.error('Error checking farms table:', tableError);
        return;
      }
      
      // Fetch the farm profile
      const { data, error } = await supabase
        .from('farms')
        .select('farm_name, created_at')
        .eq('user_id', user?.id);
        
      if (error) {
        console.error('Error fetching farm profile:', error);
        return;
      }
      
      // If we have farm data, use the first entry
      if (data && data.length > 0) {
        setFarmProfile(data[0]);
      } else {
        // Create a default farm profile if none exists
        if (user) {
          const defaultFarmName = `Farm_${user.email?.split('@')[0] || 'Default'}`;
          const { error: insertError } = await supabase
            .from('farms')
            .insert([{ 
              user_id: user.id, 
              farm_name: defaultFarmName,
              created_at: new Date().toISOString() 
            }]);
            
          if (insertError) {
            console.error('Error creating default farm profile:', insertError);
          } else {
            setFarmProfile({
              farm_name: defaultFarmName,
              created_at: new Date().toISOString()
            });
            toast.success("Default farm profile created");
          }
        }
      }
    } catch (error) {
      console.error('Error in farm profile handling:', error);
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
