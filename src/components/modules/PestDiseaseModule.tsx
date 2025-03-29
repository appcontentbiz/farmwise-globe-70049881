
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Bug, 
  Microscope
} from "lucide-react";
import { TrackingInterface } from "./TrackingInterface";
import { PredictiveInsights } from "./PredictiveInsights";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PestContent } from "./pest-disease/PestContent";
import { DiseaseContent } from "./pest-disease/DiseaseContent";
import { RiskPrediction } from "./pest-disease/RiskPrediction";
import { TreatmentAnalysis } from "./pest-disease/TreatmentAnalysis";

export function PestDiseaseModule() {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="farm-module-card col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="farm-module-card-title">
              <Bug className="h-5 w-5 text-farm-green" />
              Pest & Disease Monitoring
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="pests">
              <TabsList className="mb-4">
                <TabsTrigger value="pests">Pest Pressure</TabsTrigger>
                <TabsTrigger value="diseases">Disease Pressure</TabsTrigger>
                <TabsTrigger value="risk">Risk Prediction</TabsTrigger>
              </TabsList>
              
              <TabsContent value="pests">
                <PestContent />
              </TabsContent>
              
              <TabsContent value="diseases">
                <DiseaseContent />
              </TabsContent>
              
              <TabsContent value="risk">
                <RiskPrediction />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <Card className="farm-module-card">
          <CardHeader className="pb-2">
            <CardTitle className="farm-module-card-title">
              <Microscope className="h-5 w-5 text-farm-green" />
              Treatment Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TreatmentAnalysis />
          </CardContent>
        </Card>
      </div>
      
      <PredictiveInsights moduleName="Pest & Disease" />
      
      <TrackingInterface moduleName="Pest & Disease" />
    </div>
  );
}
