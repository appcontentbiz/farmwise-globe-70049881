
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
  
  // Use refs to track the stability of each state
  const offlineStabilityCountRef = useRef(0);
  const errorStabilityCountRef = useRef(0);
  
  const [visible, setVisible] = useState<{offline: boolean, error: boolean}>({
    offline: isOffline,
    error: showError && !isOffline
  });
  
  // Use much longer timeouts and stability checks to prevent flickering
  useEffect(() => {
    // Only update if there's an actual change
    if (prevOfflineRef.current !== isOffline) {
      // Update ref
      prevOfflineRef.current = isOffline;
      
      if (isOffline) {
        // Increment the offline stability counter
        offlineStabilityCountRef.current++;
        
        // Only show offline notification after it's been stable for a while
        if (offlineStabilityCountRef.current >= 2) {
          // Immediately show offline state
          setVisible(prev => ({ ...prev, offline: true, error: false }));
        }
      } else {
        // Reset offline stability counter
        offlineStabilityCountRef.current = 0;
        
        // Add a longer delay before hiding offline notification
        setTimeout(() => {
          // Double-check that we're still online before hiding
          if (!prevOfflineRef.current) {
            setVisible(prev => ({ ...prev, offline: false }));
          }
        }, 2000); // Long delay for better UX
      }
    }
    
    // Handle the error state change
    if (prevErrorRef.current !== showError) {
      // Update ref
      prevErrorRef.current = showError;
      
      if (showError && !isOffline) {
        // Increment the error stability counter
        errorStabilityCountRef.current++;
        
        // Only show error after it's been stable for multiple checks
        if (errorStabilityCountRef.current >= 3) {
          // Show error after a delay to avoid quick flashes
          setTimeout(() => {
            // Triple check the error is still present before showing
            if (prevErrorRef.current && !prevOfflineRef.current) {
              setVisible(prev => ({ ...prev, error: true }));
            }
          }, 3000); // Much longer delay for errors
        }
      } else {
        // Reset error stability counter
        errorStabilityCountRef.current = 0;
        
        // Add a longer delay before hiding error notification
        setTimeout(() => {
          // Double-check that the error is still gone before hiding
          if (!prevErrorRef.current || prevOfflineRef.current) {
            setVisible(prev => ({ ...prev, error: false }));
          }
        }, 2000);
      }
    }
  }, [isOffline, showError]);
  
  return (
    <div className="space-y-2">
      {visible.offline && (
        <Alert 
          className="bg-amber-50 border-amber-200 text-amber-800 animate-fade-in transition-all duration-1000 ease-in-out"
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
          className="animate-fade-in transition-all duration-1000 ease-in-out"
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
