
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Clock, AlertCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { TrackingProvider } from "./TrackingContext";
import { TrackingTab } from "./TrackingTab";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

interface TrackingInterfaceProps {
  moduleName: string;
}

export function TrackingInterface({ moduleName }: TrackingInterfaceProps) {
  const [activeTab, setActiveTab] = useState<"past" | "present" | "future">("present");
  const { user } = useAuth();

  return (
    <TrackingProvider moduleName={moduleName}>
      <Card className="tracking-interface">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Clock className="h-5 w-5 text-farm-green" />
            {moduleName} Tracking
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!user && (
            <Alert variant="warning" className="mb-4 bg-amber-50 border-amber-200 text-amber-800">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                You are not logged in. Your tracking data will be stored locally and won't sync across devices. 
                <Link to="/login" className="ml-1 underline font-medium">
                  Log in
                </Link> or <Link to="/register" className="underline font-medium">sign up</Link> to save your data.
              </AlertDescription>
            </Alert>
          )}
          
          <Tabs defaultValue="present" onValueChange={(value) => setActiveTab(value as "past" | "present" | "future")}>
            <TabsList className="mb-4 w-full grid grid-cols-3">
              <TabsTrigger value="past">Past</TabsTrigger>
              <TabsTrigger value="present">Present</TabsTrigger>
              <TabsTrigger value="future">Future</TabsTrigger>
            </TabsList>
            
            {["past", "present", "future"].map((tab) => (
              <TabsContent key={tab} value={tab} className="space-y-4">
                <TrackingTab 
                  activeTab={tab as "past" | "present" | "future"} 
                  moduleName={moduleName} 
                />
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </TrackingProvider>
  );
}
