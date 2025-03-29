
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Microscope, Lightbulb, Cpu } from "lucide-react";
import { TrackingInterface } from "./TrackingInterface";
import { PredictiveInsights } from "./PredictiveInsights";

export function TechModule() {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="farm-module-card">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Microscope className="h-5 w-5 text-farm-green" />
              Coming Soon
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Tech & Innovation Module Under Development</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    This module is currently being developed and will be available soon. You can still use the tracking features below to plan your tech adoption strategy.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="farm-module-card">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Lightbulb className="h-5 w-5 text-farm-green" />
              Tech Strategy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              While waiting for the full Tech & Innovation module, you can use the tracking interface below to:
            </p>
            <ul className="text-sm space-y-2 list-disc pl-5 mb-4">
              <li>Document past technology implementations</li>
              <li>Track current technology projects</li>
              <li>Plan future technology adoptions</li>
            </ul>
          </CardContent>
        </Card>
      </div>
      
      {/* Add the predictive insights component */}
      <PredictiveInsights moduleName="Tech & Innovation" />
      
      <TrackingInterface moduleName="Tech & Innovation" />
    </div>
  );
}
