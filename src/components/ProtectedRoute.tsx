
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { handleSessionRecovery } from "@/utils/authUtils";

export function ProtectedRoute() {
  const { user, isLoading, refreshSession } = useAuth();
  const [isRecovering, setIsRecovering] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkSession = async () => {
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
  }, [isLoading, user, refreshSession]);

  // If still loading or attempting recovery, show loading state
  if (isLoading || isRecovering) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
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
