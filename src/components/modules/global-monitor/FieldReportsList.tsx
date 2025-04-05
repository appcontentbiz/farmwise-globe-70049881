import { useState, useEffect, useCallback, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, RefreshCw, WifiOff } from "lucide-react";
import { useFieldReports } from "@/contexts/FieldReportContext";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { FilterControls } from "./report-list/FilterControls";
import { ListStatusNotifications } from "./report-list/ListStatusNotifications";
import { ReportsListContent } from "./report-list/ReportsListContent";
import { throttle, checkRealConnectivity } from "@/utils/networkUtils";

export function FieldReportsList() {
  const { reports, loading, refreshReports, hasError, isOffline } = useFieldReports();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string | undefined>(undefined);
  const [refreshing, setRefreshing] = useState(false);
  
  // Use a separate state for showing error with proper stability checks
  const [showError, setShowError] = useState(false);
  const errorTimerRef = useRef<number | null>(null);
  const networkCheckedRef = useRef(false);
  const errorStateStableCountRef = useRef(0);
  
  // Control error visibility with improved stability
  useEffect(() => {
    // Clear any existing timers
    if (errorTimerRef.current) {
      window.clearTimeout(errorTimerRef.current);
      errorTimerRef.current = null;
    }
    
    if (hasError && !isOffline) {
      // Count consecutive error states to ensure stability
      errorStateStableCountRef.current += 1;
      
      // Only set error after multiple consecutive checks show an error
      if (errorStateStableCountRef.current >= 2) {
        // Set error after a much longer delay to avoid flickering
        errorTimerRef.current = window.setTimeout(() => {
          setShowError(true);
          errorTimerRef.current = null;
        }, 2000); // Much longer delay
      }
    } else {
      // Reset the counter if no error or offline
      errorStateStableCountRef.current = 0;
      
      // Only clear error if it's been consistently gone for a while
      errorTimerRef.current = window.setTimeout(() => {
        setShowError(false);
        errorTimerRef.current = null;
      }, 1000);
    }
    
    return () => {
      if (errorTimerRef.current) {
        window.clearTimeout(errorTimerRef.current);
      }
    };
  }, [hasError, isOffline]);
  
  // Improved network checking logic with better debouncing
  useEffect(() => {
    const checkNetwork = async () => {
      try {
        const online = await checkRealConnectivity();
        
        // Only trigger refresh if we detect a change in connectivity 
        // and we haven't just mounted the component and enough time has passed
        if (networkCheckedRef.current && online !== !isOffline) {
          console.log("Network state changed, triggering refresh");
          refreshReports();
        }
        
        networkCheckedRef.current = true;
      } catch (error) {
        console.error("Error checking network:", error);
      }
    };
    
    // Check network status after component mounts, but with a delay
    const initialCheckTimer = setTimeout(checkNetwork, 1000);
    
    // Set up periodic checks with a longer interval
    const interval = setInterval(checkNetwork, 120000); // Increased to every 2 minutes
    
    return () => {
      clearTimeout(initialCheckTimer);
      clearInterval(interval);
    };
  }, [isOffline, refreshReports]);
  
  // Create more robust throttled refresh function with longer throttle time
  const throttledRefresh = useCallback(
    throttle(async () => {
      if (refreshing) return; // Prevent multiple refreshes
      
      try {
        setRefreshing(true);
        // Temporarily hide error during refresh
        setShowError(false);
        
        await refreshReports();
        
        // Check if we're actually online, as the refresh might have succeeded with cached data
        const online = await checkRealConnectivity();
        if (online) {
          toast.success("Field reports refreshed");
        } else {
          toast.info("Using cached reports (you appear to be offline)");
        }
      } catch (error) {
        console.error("Failed to refresh reports", error);
        toast.error("Failed to refresh reports");
      } finally {
        // Add a slight delay before resetting the refreshing state
        // to give visual feedback to the user
        setTimeout(() => setRefreshing(false), 800);
      }
    }, 5000), // Increased from 3000ms to 5000ms
    [refreshReports, refreshing]
  );
  
  const handleRefresh = () => {
    throttledRefresh();
  };
  
  const filteredReports = reports.filter(report => {
    const matchesSearchTerm = 
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilterType = filterType ? report.reportType === filterType : true;
    
    return matchesSearchTerm && matchesFilterType;
  });
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Globe className="h-5 w-5 text-farm-green" />
            Field Reports
            {isOffline && (
              <Badge variant="outline" className="ml-2 bg-amber-100 text-amber-800 border-amber-200">
                <WifiOff className="h-3 w-3 mr-1" /> Offline
              </Badge>
            )}
          </CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh} 
            disabled={loading || refreshing}
            className="flex items-center gap-1"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <ListStatusNotifications isOffline={isOffline} showError={showError} />
        
        <FilterControls
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onFilterChange={setFilterType}
        />
        
        <ReportsListContent loading={loading} filteredReports={filteredReports} />
      </CardContent>
    </Card>
  );
}
