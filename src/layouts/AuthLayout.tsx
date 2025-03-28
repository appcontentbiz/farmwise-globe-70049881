
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export function AuthLayout() {
  const { user, isLoading } = useAuth();

  // If user is already authenticated, redirect to dashboard
  if (user && !isLoading) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Outlet />
    </div>
  );
}
