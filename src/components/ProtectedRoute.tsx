
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { handleSessionRecovery } from "@/utils/authUtils";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { WifiOff } from "lucide-react";

export function ProtectedRoute() {
  const { user, isLoading, refreshSession } = useAuth();
  const [isRecovering, setIsRecovering] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const location = useLocation();

  // Monitor online/offline status
  useEffect(() => {
    const handleOnlineStatusChange = () => {
      setIsOffline(!navigator.onLine);
    };
    
    window.addEventListener('online', handleOnlineStatusChange);
    window.addEventListener('offline', handleOnlineStatusChange);
    
    return () => {
      window.removeEventListener('online', handleOnlineStatusChange);
      window.removeEventListener('offline', handleOnlineStatusChange);
    };
  }, []);

  useEffect(() => {
    const checkSession = async () => {
      // Skip session recovery if offline
      if (isOffline) {
        return;
      }

      if (!isLoading && !user) {
        setIsRecovering(true);
        const recovered = await handleSessionRecovery();
        if (!recovered) {
          toast.error("Please sign in to access this page");
        }
        setIsRecovering(false);
      }
    };

    checkSession();
  }, [isLoading, user, refreshSession, isOffline]);

  // If still loading or attempting recovery, show loading state
  if (isLoading || isRecovering) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Special handling for offline mode - allow limited access for better UX
  if (isOffline && !user) {
    return (
      <div className="min-h-screen flex flex-col p-4">
        <Alert className="mb-4 bg-amber-50 border-amber-200 text-amber-800">
          <WifiOff className="h-4 w-4" />
          <AlertDescription>
            You're offline and not logged in. Some features may be limited until you connect to the internet.
          </AlertDescription>
        </Alert>
        <Outlet />
      </div>
    );
  }

  // If not authenticated after recovery attempt, redirect to login
  if (!user) {
    // Save the attempted location for redirect after login
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // User is authenticated, render the protected content
  return <Outlet />;
}
