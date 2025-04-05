
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Filter, Globe, Clock, MapPin, Loader2, RefreshCw, WifiOff, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useFieldReports } from "@/contexts/FieldReportContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function FieldReportsList() {
  const { reports, loading, refreshReports, hasError, isOffline } = useFieldReports();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string | undefined>(undefined);
  const [refreshing, setRefreshing] = useState(false);
  const [showError, setShowError] = useState(false);
  
  // Control error visibility
  useEffect(() => {
    if (hasError && !isOffline) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  }, [hasError, isOffline]);
  
  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      await refreshReports();
      toast.success("Field reports refreshed");
    } catch (error) {
      console.error("Failed to refresh reports", error);
      toast.error("Failed to refresh reports");
    } finally {
      setRefreshing(false);
    }
  };
  
  const filteredReports = reports.filter(report => {
    const matchesSearchTerm = 
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilterType = filterType ? report.reportType === filterType : true;
    
    return matchesSearchTerm && matchesFilterType;
  });
  
  const getReportTypeBadgeColor = (type: string): string => {
    switch (type) {
      case "weather": return "bg-blue-100 text-blue-800";
      case "disease": return "bg-red-100 text-red-800";
      case "innovation": return "bg-green-100 text-green-800";
      case "market": return "bg-purple-100 text-purple-800";
      case "policy": return "bg-amber-100 text-amber-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  const getReportTypeLabel = (type: string): string => {
    switch (type) {
      case "weather": return "Weather Event";
      case "disease": return "Crop Disease/Pest";
      case "innovation": return "Farming Technique";
      case "market": return "Market Insight";
      case "policy": return "Policy Impact";
      default: return type;
    }
  };
  
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

        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search reports..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select onValueChange={(value) => setFilterType(value || undefined)}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder="All Types" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Types</SelectItem>
              <SelectItem value="weather">Weather Event</SelectItem>
              <SelectItem value="disease">Crop Disease/Pest</SelectItem>
              <SelectItem value="innovation">Farming Technique</SelectItem>
              <SelectItem value="market">Market Insight</SelectItem>
              <SelectItem value="policy">Policy Impact</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin mb-4" />
            <p>Loading reports...</p>
          </div>
        ) : filteredReports.length > 0 ? (
          <div className="space-y-4">
            {filteredReports.map((report) => (
              <Card key={report.id} className={`overflow-hidden ${report.id.startsWith('temp-') ? 'border-dashed border-amber-300' : ''}`}>
                <div className="p-4">
                  {report.id.startsWith('temp-') && (
                    <Badge className="mb-2 bg-amber-100 text-amber-800 border-amber-200">
                      Pending Upload
                    </Badge>
                  )}
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <h3 className="font-medium text-lg">{report.title}</h3>
                    <Badge className={`${getReportTypeBadgeColor(report.reportType)}`}>
                      {getReportTypeLabel(report.reportType)}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {report.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>{report.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      <span>
                        {format(new Date(report.submittedAt), "MMM d, yyyy")}
                      </span>
                    </div>
                    {report.files && report.files.length > 0 && (
                      <div className="text-blue-600">
                        {report.files.length} attachment{report.files.length !== 1 ? "s" : ""}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="py-12 flex flex-col items-center justify-center text-muted-foreground">
            <p className="mb-1">No reports found</p>
            <p className="text-sm">Try adjusting your search or filters</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
