
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, WifiOff } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface ListStatusNotificationsProps {
  isOffline: boolean;
  showError: boolean;
}

export function ListStatusNotifications({ isOffline, showError }: ListStatusNotificationsProps) {
  // Use refs to track the previous state to prevent unnecessary re-renders
  const prevOfflineRef = useRef(isOffline);
  const prevErrorRef = useRef(showError);
  
  const [visible, setVisible] = useState<{offline: boolean, error: boolean}>({
    offline: isOffline,
    error: showError && !isOffline
  });
  
  // Add delay for smoother transitions and prevent flickering
  useEffect(() => {
    // Only update if there's an actual change
    if (prevOfflineRef.current !== isOffline || prevErrorRef.current !== showError) {
      // Update refs
      prevOfflineRef.current = isOffline;
      prevErrorRef.current = showError;
      
      let timer: number;
      
      if (isOffline) {
        // Immediately show offline state
        setVisible(prev => ({ ...prev, offline: true, error: false }));
      } else if (showError) {
        // Add a delay before showing error to prevent flickering
        timer = window.setTimeout(() => {
          setVisible(prev => ({ ...prev, offline: false, error: true }));
        }, 500);
      } else {
        // Add a longer delay before hiding notifications
        timer = window.setTimeout(() => {
          setVisible(prev => ({ ...prev, offline: false, error: false }));
        }, 800);
      }
      
      return () => {
        if (timer) window.clearTimeout(timer);
      };
    }
  }, [isOffline, showError]);
  
  return (
    <div className="space-y-2">
      {visible.offline && (
        <Alert 
          className="bg-amber-50 border-amber-200 text-amber-800 transition-all duration-500 ease-in-out"
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
          className="transition-all duration-500 ease-in-out"
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
