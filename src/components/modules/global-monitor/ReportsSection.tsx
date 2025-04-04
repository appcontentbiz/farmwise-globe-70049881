
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FieldReportForm } from "./FieldReportForm";
import { FieldReportsList } from "./FieldReportsList";
import { FieldReportProvider } from "@/contexts/FieldReportContext";

export function ReportsSection() {
  const [activeTab, setActiveTab] = useState("view");
  
  const handleReportSubmitted = () => {
    setActiveTab("view");
  };
  
  return (
    <FieldReportProvider>
      <Tabs defaultValue="view" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 w-full mb-4">
          <TabsTrigger value="view">View Reports</TabsTrigger>
          <TabsTrigger value="submit">Submit Report</TabsTrigger>
        </TabsList>
        
        <TabsContent value="view" className="mt-0">
          <FieldReportsList />
        </TabsContent>
        
        <TabsContent value="submit" className="mt-0">
          <FieldReportForm onSubmit={handleReportSubmitted} />
        </TabsContent>
      </Tabs>
    </FieldReportProvider>
  );
}
