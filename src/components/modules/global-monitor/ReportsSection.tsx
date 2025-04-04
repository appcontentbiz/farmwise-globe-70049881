
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FieldReportForm } from "./FieldReportForm";
import { FieldReportsList } from "./FieldReportsList";
import { FieldReportProvider, useFieldReports } from "@/contexts/FieldReportContext";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { WifiOff } from "lucide-react";

function ReportsTabs() {
  const [activeTab, setActiveTab] = useState("view");
  const { isOffline } = useFieldReports();
  
  const handleReportSubmitted = () => {
    setActiveTab("view");
  };
  
  return (
    <Tabs defaultValue="view" value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-2 w-full mb-4">
        <TabsTrigger value="view">View Reports</TabsTrigger>
        <TabsTrigger value="submit">Submit Report</TabsTrigger>
      </TabsList>
      
      {isOffline && activeTab === "submit" && (
        <Alert className="mb-4 bg-amber-50 border-amber-200 text-amber-800">
          <WifiOff className="h-4 w-4" />
          <AlertDescription>
            You're offline. Reports will be saved locally and uploaded when you're back online.
          </AlertDescription>
        </Alert>
      )}
      
      <TabsContent value="view" className="mt-0">
        <FieldReportsList />
      </TabsContent>
      
      <TabsContent value="submit" className="mt-0">
        <FieldReportForm onSubmit={handleReportSubmitted} />
      </TabsContent>
    </Tabs>
  );
}

export function ReportsSection() {
  return (
    <FieldReportProvider>
      <ReportsTabs />
    </FieldReportProvider>
  );
}
