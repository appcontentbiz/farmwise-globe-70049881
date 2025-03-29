
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  FileText, 
  Filter, 
  Leaf, 
  LayoutGrid, 
  Tractor
} from "lucide-react";
import { TrackingInterface } from "./TrackingInterface";
import { PredictiveInsights } from "./PredictiveInsights";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OrganicContent } from "./farming-types/OrganicContent";
import { ConventionalContent } from "./farming-types/ConventionalContent";
import { ComparisonContent } from "./farming-types/ComparisonContent";

export function FarmingTypesModule() {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="farm-module-card col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="farm-module-card-title">
              <Tractor className="h-5 w-5 text-farm-green" />
              Farming Types & Approaches
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="organic">
              <TabsList className="mb-4">
                <TabsTrigger value="organic">Organic Farming</TabsTrigger>
                <TabsTrigger value="conventional">Conventional Farming</TabsTrigger>
                <TabsTrigger value="comparison">Approach Comparison</TabsTrigger>
              </TabsList>
              
              <TabsContent value="organic">
                <OrganicContent />
              </TabsContent>
              
              <TabsContent value="conventional">
                <ConventionalContent />
              </TabsContent>
              
              <TabsContent value="comparison">
                <ComparisonContent />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <Card className="farm-module-card">
          <CardHeader className="pb-2">
            <CardTitle className="farm-module-card-title">
              <FileText className="h-5 w-5 text-farm-green" />
              Certification Tracker
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              <div className="bg-farm-green/10 p-3 rounded-lg">
                <h4 className="font-medium text-sm mb-2">Active Certifications</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Leaf className="h-4 w-4 mr-2 text-farm-green" />
                      <span className="text-sm">USDA Organic</span>
                    </div>
                    <span className="text-xs bg-farm-green/20 text-farm-green px-2 py-1 rounded-full">
                      Valid until May 2025
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Filter className="h-4 w-4 mr-2 text-farm-green" />
                      <span className="text-sm">Non-GMO Project</span>
                    </div>
                    <span className="text-xs bg-farm-green/20 text-farm-green px-2 py-1 rounded-full">
                      Valid until Dec 2024
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium text-sm">Certification Progress</h4>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Regenerative Organic</span>
                    <span className="font-medium text-farm-green">75%</span>
                  </div>
                  <div className="w-full bg-muted/20 rounded-full h-2">
                    <div className="bg-farm-green h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Animal Welfare Approved</span>
                    <span className="font-medium text-farm-sky">40%</span>
                  </div>
                  <div className="w-full bg-muted/20 rounded-full h-2">
                    <div className="bg-farm-sky h-2 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-5 pt-4 border-t space-y-4">
                <h4 className="font-medium text-sm">Upcoming Requirements</h4>
                <div className="p-3 border rounded-lg">
                  <div className="flex items-start">
                    <LayoutGrid className="h-4 w-4 mr-2 text-farm-green mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium">Soil Testing Required</p>
                      <p className="text-xs text-muted-foreground">USDA Organic renewal requires comprehensive soil testing by March 2025</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="flex items-start">
                    <FileText className="h-4 w-4 mr-2 text-farm-green mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium">Annual Inspection</p>
                      <p className="text-xs text-muted-foreground">Schedule Non-GMO Project inspection by October 2024</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <PredictiveInsights moduleName="Farming Types" />
      
      <TrackingInterface moduleName="Farming Types" />
    </div>
  );
}
