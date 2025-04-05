
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, WifiOff } from "lucide-react";

interface ListStatusNotificationsProps {
  isOffline: boolean;
  showError: boolean;
}

export function ListStatusNotifications({ isOffline, showError }: ListStatusNotificationsProps) {
  return (
    <>
      {isOffline && (
        <Alert className="bg-amber-50 border-amber-200 text-amber-800">
          <WifiOff className="h-4 w-4" />
          <AlertDescription>
            You're currently offline. Showing locally saved reports.
          </AlertDescription>
        </Alert>
      )}
      
      {showError && !isOffline && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Failed to load reports. Click refresh to try again.
          </AlertDescription>
        </Alert>
      )}
    </>
  );
}
