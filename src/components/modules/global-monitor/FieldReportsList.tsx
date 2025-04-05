
import { useState, useEffect, useCallback } from "react";
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
  const [showError, setShowError] = useState(false);
  const [networkChecked, setNetworkChecked] = useState(false);
  
  // Control error visibility with proper debounce
  useEffect(() => {
    let errorTimer: number;
    
    if (hasError && !isOffline) {
      // Set error after a short delay to avoid flickering
      errorTimer = window.setTimeout(() => {
        setShowError(true);
      }, 300);
    } else {
      // Clear error with a slightly longer delay to avoid flickering
      errorTimer = window.setTimeout(() => {
        setShowError(false);
      }, 500);
    }
    
    return () => {
      if (errorTimer) window.clearTimeout(errorTimer);
    };
  }, [hasError, isOffline]);
  
  // Check real connectivity status on mount
  useEffect(() => {
    const checkNetwork = async () => {
      const online = await checkRealConnectivity();
      if (online !== !isOffline) {
        // If our detected status differs from the context status,
        // trigger a refresh to update the context
        refreshReports();
      }
      setNetworkChecked(true);
    };
    
    // Check network status after component mounts
    checkNetwork();
    
    // Set up periodic checks
    const interval = setInterval(checkNetwork, 60000); // every minute
    
    return () => {
      clearInterval(interval);
    };
  }, []);
  
  // Create throttled refresh function
  const throttledRefresh = useCallback(throttle(async () => {
    try {
      setRefreshing(true);
      await refreshReports();
      toast.success("Field reports refreshed");
    } catch (error) {
      console.error("Failed to refresh reports", error);
      toast.error("Failed to refresh reports");
    } finally {
      setTimeout(() => setRefreshing(false), 500);
    }
  }, 3000), [refreshReports]);
  
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
