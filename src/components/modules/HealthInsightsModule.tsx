
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Activity, 
  Heart, 
  HeartPulse, 
  ShieldCheck, 
  User2
} from "lucide-react";
import { TrackingInterface } from "./TrackingInterface";
import { PredictiveInsights } from "./PredictiveInsights";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PhysicalHealthContent } from "./health-insights/PhysicalHealthContent";
import { MentalHealthContent } from "./health-insights/MentalHealthContent";
import { SafetyContent } from "./health-insights/SafetyContent";
import { PersonalHealthTracking } from "./health-insights/PersonalHealthTracking";

export function HealthInsightsModule() {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="farm-module-card col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="farm-module-card-title">
              <User2 className="h-5 w-5 text-farm-green" />
              Farmer Health & Wellbeing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="personal">
              <TabsList className="mb-4">
                <TabsTrigger value="personal">Personal Health Tracking</TabsTrigger>
                <TabsTrigger value="physical">Physical Health</TabsTrigger>
                <TabsTrigger value="mental">Mental Wellbeing</TabsTrigger>
                <TabsTrigger value="safety">Farm Safety</TabsTrigger>
              </TabsList>
              
              <TabsContent value="personal">
                <PersonalHealthTracking />
              </TabsContent>
              
              <TabsContent value="physical">
                <PhysicalHealthContent />
              </TabsContent>
              
              <TabsContent value="mental">
                <MentalHealthContent />
              </TabsContent>
              
              <TabsContent value="safety">
                <SafetyContent />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <Card className="farm-module-card">
          <CardHeader className="pb-2">
            <CardTitle className="farm-module-card-title">
              <HeartPulse className="h-5 w-5 text-farm-green" />
              Health Monitoring
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              <div className="mb-6">
                <h4 className="text-sm font-medium mb-2">Overall Health Score</h4>
                <div className="flex items-center justify-center">
                  <div className="relative flex items-center justify-center">
                    <svg className="w-32 h-32">
                      <circle
                        className="text-muted/20"
                        strokeWidth="8"
                        stroke="currentColor"
                        fill="transparent"
                        r="56"
                        cx="64"
                        cy="64"
                      />
                      <circle
                        className="text-farm-green"
                        strokeWidth="8"
                        strokeDasharray={356}
                        strokeDashoffset={356 - (356 * 78) / 100}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="56"
                        cx="64"
                        cy="64"
                      />
                    </svg>
                    <span className="absolute text-2xl font-bold">78%</span>
                  </div>
                </div>
                <p className="text-center text-sm text-muted-foreground mt-2">Based on your tracking data</p>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Physical Activity</span>
                    <span className="font-medium text-farm-green">82%</span>
                  </div>
                  <div className="w-full bg-muted/20 rounded-full h-2">
                    <div className="bg-farm-green h-2 rounded-full" style={{ width: '82%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Stress Management</span>
                    <span className="font-medium text-farm-sky">65%</span>
                  </div>
                  <div className="w-full bg-muted/20 rounded-full h-2">
                    <div className="bg-farm-sky h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Sleep Quality</span>
                    <span className="font-medium text-amber-500">60%</span>
                  </div>
                  <div className="w-full bg-muted/20 rounded-full h-2">
                    <div className="bg-amber-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Safety Practices</span>
                    <span className="font-medium text-farm-wheat-dark">85%</span>
                  </div>
                  <div className="w-full bg-muted/20 rounded-full h-2">
                    <div className="bg-farm-wheat-dark h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-5 pt-4 border-t space-y-4">
                <h4 className="font-medium text-sm">Recommendations</h4>
                <div className="bg-farm-green/10 p-3 rounded-lg">
                  <div className="flex items-start">
                    <Heart className="h-4 w-4 mr-2 text-farm-green mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium">Improve Sleep Quality</p>
                      <p className="text-xs text-muted-foreground mt-1">Aim for consistent sleep schedule and reduce screen time before bed</p>
                    </div>
                  </div>
                </div>
                <div className="bg-farm-sky/10 p-3 rounded-lg">
                  <div className="flex items-start">
                    <Activity className="h-4 w-4 mr-2 text-farm-sky mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium">Schedule Regular Breaks</p>
                      <p className="text-xs text-muted-foreground mt-1">Short breaks during intense work periods can reduce fatigue and injury risk</p>
                    </div>
                  </div>
                </div>
                <div className="bg-amber-50 p-3 rounded-lg">
                  <div className="flex items-start">
                    <ShieldCheck className="h-4 w-4 mr-2 text-amber-500 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium">Annual Health Check-up</p>
                      <p className="text-xs text-muted-foreground mt-1">Schedule your annual health check-up in the next 30 days</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <PredictiveInsights moduleName="Health Insights" />
      
      <TrackingInterface moduleName="Health Insights" />
    </div>
  );
}
