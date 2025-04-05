
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, WifiOff } from "lucide-react";
import { useState, useEffect } from "react";

interface ListStatusNotificationsProps {
  isOffline: boolean;
  showError: boolean;
}

export function ListStatusNotifications({ isOffline, showError }: ListStatusNotificationsProps) {
  const [visible, setVisible] = useState<{offline: boolean, error: boolean}>({
    offline: isOffline,
    error: showError && !isOffline
  });
  
  // Add delay for smoother transitions and prevent flickering
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible({
        offline: isOffline,
        error: showError && !isOffline
      });
    }, 300);
    
    return () => clearTimeout(timer);
  }, [isOffline, showError]);
  
  return (
    <div className="space-y-2">
      {visible.offline && (
        <Alert 
          className="bg-amber-50 border-amber-200 text-amber-800 transition-opacity duration-300"
        >
          <WifiOff className="h-4 w-4" />
          <AlertDescription>
            You're currently offline. Showing locally saved reports.
          </AlertDescription>
        </Alert>
      )}
      
      {visible.error && !visible.offline && (
        <Alert 
          variant="destructive"
          className="transition-opacity duration-300"
        >
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Failed to load reports. Click refresh to try again.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
