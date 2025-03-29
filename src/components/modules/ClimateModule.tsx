import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Cloud, Droplets, Leaf, Thermometer, Wind } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { TrackingInterface } from "./TrackingInterface";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar
} from "recharts";

const carbonData = [
  { month: 'Jan', emissions: 24, reduction: 5 },
  { month: 'Feb', emissions: 22, reduction: 8 },
  { month: 'Mar', emissions: 25, reduction: 10 },
  { month: 'Apr', emissions: 23, reduction: 12 },
  { month: 'May', emissions: 20, reduction: 15 },
  { month: 'Jun', emissions: 18, reduction: 16 },
  { month: 'Jul', emissions: 16, reduction: 18 },
];

const waterData = [
  { name: 'Irrigation', value: 65 },
  { name: 'Natural', value: 35 },
];

const sustainabilityScores = [
  { name: "Carbon Management", score: 72 },
  { name: "Water Conservation", score: 84 },
  { name: "Soil Health", score: 67 },
  { name: "Biodiversity", score: 59 },
  { name: "Energy Efficiency", score: 78 },
];

export function ClimateModule() {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="farm-module-card col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="farm-module-card-title">
              <Leaf className="h-5 w-5 text-farm-green" />
              Sustainability Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="carbon">
              <TabsList className="mb-4">
                <TabsTrigger value="carbon">Carbon</TabsTrigger>
                <TabsTrigger value="water">Water</TabsTrigger>
                <TabsTrigger value="soil">Soil</TabsTrigger>
              </TabsList>
              
              <TabsContent value="carbon">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Carbon Footprint</h4>
                      <p className="text-sm text-muted-foreground">Monthly emissions vs reductions</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <BarChart className="h-4 w-4 mr-2" />
                      Export Data
                    </Button>
                  </div>
                  
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart
                        data={carbonData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="emissions" name="Carbon Emissions (tons)" fill="#ef4444" />
                        <Bar dataKey="reduction" name="Carbon Sequestered (tons)" fill="#4CAF50" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="bg-farm-green/10 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Climate Smart Practices</h4>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-center">
                        <Leaf className="h-4 w-4 mr-2 text-farm-green" />
                        Cover crops reduce emissions by capturing 2.5 tons of carbon per acre
                      </li>
                      <li className="flex items-center">
                        <Wind className="h-4 w-4 mr-2 text-farm-green" />
                        Reduced tillage decreasing fuel usage by 35%
                      </li>
                      <li className="flex items-center">
                        <Thermometer className="h-4 w-4 mr-2 text-farm-green" />
                        Improved nitrogen management reducing N₂O emissions
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="water">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Water Usage Efficiency</h4>
                    <p className="text-sm text-muted-foreground">Tracking irrigation and natural water sources</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Water Sources</span>
                        <span className="text-sm text-muted-foreground">Usage %</span>
                      </div>
                      {waterData.map((item) => (
                        <div key={item.name} className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">{item.name}</span>
                            <span className="text-sm font-medium">{item.value}%</span>
                          </div>
                          <Progress value={item.value} className="h-2" />
                        </div>
                      ))}
                      
                      <div className="pt-4">
                        <h4 className="text-sm font-medium mb-2">Water Conservation Tips</h4>
                        <ul className="text-xs space-y-2 text-muted-foreground">
                          <li className="flex items-start">
                            <Droplets className="h-3 w-3 mr-1 text-farm-sky mt-0.5" />
                            Installing drip irrigation could reduce water usage by up to 30%
                          </li>
                          <li className="flex items-start">
                            <Droplets className="h-3 w-3 mr-1 text-farm-sky mt-0.5" />
                            Consider rainwater harvesting systems for natural collection
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Monthly Water Usage (Gallons)</h4>
                      <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={[
                              { month: 'Jan', usage: 45000 },
                              { month: 'Feb', usage: 42000 },
                              { month: 'Mar', usage: 48000 },
                              { month: 'Apr', usage: 50000 },
                              { month: 'May', usage: 58000 },
                              { month: 'Jun', usage: 62000 },
                              { month: 'Jul', usage: 60000 },
                            ]}
                            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                          >
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <CartesianGrid stroke="#f5f5f5" />
                            <Line type="monotone" dataKey="usage" stroke="#42A5F5" yAxisId={0} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                      
                      <div className="bg-farm-sky/10 p-3 rounded-lg">
                        <div className="flex items-center">
                          <Cloud className="h-4 w-4 mr-2 text-farm-sky" />
                          <span className="text-xs font-medium">Forecast: 0.5" rain expected next week</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="soil">
                <div className="space-y-4">
                  <h4 className="font-medium">Soil Health Indicators</h4>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Organic Matter</span>
                            <span className="text-sm font-medium">4.2%</span>
                          </div>
                          <Progress value={70} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">pH Level</span>
                            <span className="text-sm font-medium">6.5</span>
                          </div>
                          <Progress value={80} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Nitrogen Content</span>
                            <span className="text-sm font-medium">Medium</span>
                          </div>
                          <Progress value={60} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Microorganism Activity</span>
                            <span className="text-sm font-medium">High</span>
                          </div>
                          <Progress value={85} className="h-2" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-farm-earth/10 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Soil Management Recommendations</h4>
                      <ul className="text-sm space-y-3">
                        <li className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-farm-earth flex items-center justify-center text-white text-xs mr-2 mt-0.5">1</div>
                          <div>Add 2 tons/acre of compost to increase organic matter</div>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-farm-earth flex items-center justify-center text-white text-xs mr-2 mt-0.5">2</div>
                          <div>Implement winter cover crops to protect topsoil</div>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-farm-earth flex items-center justify-center text-white text-xs mr-2 mt-0.5">3</div>
                          <div>Consider reducing tillage to preserve soil structure</div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <Card className="farm-module-card">
          <CardHeader className="pb-2">
            <CardTitle className="farm-module-card-title">
              <Leaf className="h-5 w-5 text-farm-green" />
              Sustainability Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center mb-6">
              <div className="relative flex items-center justify-center">
                <svg className="w-32 h-32">
                  <circle
                    className="text-farm-green/20"
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
                    strokeDashoffset={356 - (356 * 72) / 100}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="56"
                    cx="64"
                    cy="64"
                  />
                </svg>
                <span className="absolute text-2xl font-bold">72</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">Overall Sustainability Score</p>
            </div>
            
            <div className="space-y-3">
              {sustainabilityScores.map((item) => (
                <div key={item.name} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{item.name}</span>
                    <span className="text-sm font-medium">{item.score}/100</span>
                  </div>
                  <Progress value={item.score} className="h-2" />
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t">
              <h4 className="font-medium text-sm mb-2">Improvement Areas</h4>
              <ul className="text-sm space-y-2">
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-farm-green/20 flex items-center justify-center text-farm-green text-xs mr-2">↑</div>
                  <span>Implement more diverse crop rotations to improve biodiversity score</span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-farm-green/20 flex items-center justify-center text-farm-green text-xs mr-2">↑</div>
                  <span>Add more organic matter to soil to increase carbon sequestration</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Add the predictive insights component */}
      <PredictiveInsights moduleName="Climate & Sustainability" />
      
      {/* Keep the existing tracking interface */}
      <TrackingInterface moduleName="Climate & Sustainability" />
    </div>
  );
}
