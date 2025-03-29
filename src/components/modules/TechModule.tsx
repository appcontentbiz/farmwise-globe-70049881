
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  AlertCircle, 
  Microscope, 
  Lightbulb, 
  Cpu, 
  Database, 
  Cloud, 
  BarChart, 
  Settings, 
  Zap,
  Wifi,
  Save,
  LineChart as LineChartIcon,
  Download,
  RefreshCw
} from "lucide-react";
import { TrackingInterface } from "./TrackingInterface";
import { PredictiveInsights } from "./PredictiveInsights";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart, 
  Line, 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

// Sample data for tech adoption
const adoptionData = [
  { month: 'Jan', sensors: 5, software: 2, automation: 1 },
  { month: 'Feb', sensors: 8, software: 3, automation: 2 },
  { month: 'Mar', sensors: 12, software: 5, automation: 3 },
  { month: 'Apr', sensors: 15, software: 7, automation: 4 },
  { month: 'May', sensors: 20, software: 10, automation: 6 },
  { month: 'Jun', sensors: 25, software: 12, automation: 9 },
  { month: 'Jul', sensors: 30, software: 15, automation: 12 },
];

// Sample data for ROI analysis
const roiData = [
  { month: 'Jan', cost: 12000, savings: 3000, roi: 25 },
  { month: 'Feb', cost: 12000, savings: 5000, roi: 42 },
  { month: 'Mar', cost: 15000, savings: 7000, roi: 47 },
  { month: 'Apr', cost: 15000, savings: 9000, roi: 60 },
  { month: 'May', cost: 15000, savings: 11000, roi: 73 },
  { month: 'Jun', cost: 18000, savings: 14000, roi: 78 },
];

// Sample data for tech integration categories
const techCategoryData = [
  { name: 'Field Sensors', value: 35 },
  { name: 'Farm Software', value: 30 },
  { name: 'Automation', value: 15 },
  { name: 'Data Analytics', value: 20 },
];

const COLORS = ['#4CAF50', '#FBC02D', '#42A5F5', '#A1887F', '#F06292'];

export function TechModule() {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="farm-module-card col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="farm-module-card-title">
              <Cpu className="h-5 w-5 text-farm-green" />
              Technology Adoption
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="adoption">
              <TabsList className="mb-4">
                <TabsTrigger value="adoption">Adoption Metrics</TabsTrigger>
                <TabsTrigger value="roi">ROI Analysis</TabsTrigger>
                <TabsTrigger value="integration">Tech Integration</TabsTrigger>
              </TabsList>
              
              <TabsContent value="adoption">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Technology Adoption Trends</h4>
                      <p className="text-sm text-muted-foreground">Number of implemented technologies by category</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Update
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </div>
                  
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={adoptionData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="sensors" name="Field Sensors" stroke="#4CAF50" />
                        <Line type="monotone" dataKey="software" name="Farm Software" stroke="#FBC02D" />
                        <Line type="monotone" dataKey="automation" name="Automation" stroke="#42A5F5" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="bg-farm-green/10 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Technology Insights</h4>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-center">
                        <Wifi className="h-4 w-4 mr-2 text-farm-green" />
                        Sensor network coverage now at 85% of total farm area
                      </li>
                      <li className="flex items-center">
                        <Database className="h-4 w-4 mr-2 text-farm-green" />
                        Data analytics software processing 2TB of field data monthly
                      </li>
                      <li className="flex items-center">
                        <Zap className="h-4 w-4 mr-2 text-farm-green" />
                        Automation reducing labor costs by 28% in irrigated areas
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="roi">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Return on Investment</h4>
                    <p className="text-sm text-muted-foreground">Cost vs. savings and ROI percentage</p>
                  </div>
                  
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart
                        data={roiData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                        <Tooltip />
                        <Legend />
                        <Bar yAxisId="left" dataKey="cost" name="Investment Cost ($)" fill="#A1887F" />
                        <Bar yAxisId="left" dataKey="savings" name="Cost Savings ($)" fill="#4CAF50" />
                        <Line yAxisId="right" type="monotone" dataKey="roi" name="ROI (%)" stroke="#FF7043" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <Card className="p-4">
                      <div className="text-sm text-muted-foreground mb-1">Total Investment YTD</div>
                      <div className="text-2xl font-bold text-farm-earth">$87,000</div>
                      <div className="text-xs text-farm-green mt-1">↑ 32% from last year</div>
                    </Card>
                    <Card className="p-4">
                      <div className="text-sm text-muted-foreground mb-1">Total Savings YTD</div>
                      <div className="text-2xl font-bold text-farm-green">$49,000</div>
                      <div className="text-xs text-farm-green mt-1">↑ 45% from last year</div>
                    </Card>
                    <Card className="p-4">
                      <div className="text-sm text-muted-foreground mb-1">Average ROI</div>
                      <div className="text-2xl font-bold text-farm-sky">56%</div>
                      <div className="text-xs text-farm-sky mt-1">↑ 12% from last year</div>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="integration">
                <div className="space-y-4">
                  <h4 className="font-medium">Technology Integration Status</h4>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={techCategoryData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                              {techCategoryData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="text-center text-sm text-muted-foreground">Technology Distribution (%)</div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2 flex items-center">
                          <Settings className="h-4 w-4 mr-1 text-blue-600" />
                          Integration Progress
                        </h4>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm">
                              <span>Soil Moisture Sensors</span>
                              <span className="font-medium">92% Complete</span>
                            </div>
                            <div className="w-full bg-blue-100 rounded-full h-2 mt-1">
                              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm">
                              <span>Farm Management Software</span>
                              <span className="font-medium">78% Complete</span>
                            </div>
                            <div className="w-full bg-blue-100 rounded-full h-2 mt-1">
                              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm">
                              <span>Drone Imaging System</span>
                              <span className="font-medium">45% Complete</span>
                            </div>
                            <div className="w-full bg-blue-100 rounded-full h-2 mt-1">
                              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">Integration Notes</h4>
                        <ul className="text-sm space-y-2">
                          <li className="flex items-start">
                            <div className="h-5 w-5 rounded-full bg-farm-green flex items-center justify-center text-white text-xs mr-2 mt-0.5">1</div>
                            <div>Sensor calibration required every 90 days</div>
                          </li>
                          <li className="flex items-start">
                            <div className="h-5 w-5 rounded-full bg-farm-green flex items-center justify-center text-white text-xs mr-2 mt-0.5">2</div>
                            <div>Software update scheduled for August 15</div>
                          </li>
                        </ul>
                      </div>
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
              <Cpu className="h-5 w-5 text-farm-green" />
              Tech Readiness
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              <div className="flex flex-col items-center">
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
                      strokeDashoffset={356 - (356 * 68) / 100}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r="56"
                      cx="64"
                      cy="64"
                    />
                  </svg>
                  <span className="absolute text-2xl font-bold">68</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">Technology Readiness Score</p>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Hardware Implementation</span>
                    <span className="font-medium text-farm-green">75%</span>
                  </div>
                  <div className="w-full bg-muted/20 rounded-full h-2">
                    <div className="bg-farm-green h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Software Integration</span>
                    <span className="font-medium text-farm-sky">82%</span>
                  </div>
                  <div className="w-full bg-muted/20 rounded-full h-2">
                    <div className="bg-farm-sky h-2 rounded-full" style={{ width: '82%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Staff Training</span>
                    <span className="font-medium text-yellow-500">58%</span>
                  </div>
                  <div className="w-full bg-muted/20 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '58%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Data Utilization</span>
                    <span className="font-medium text-farm-earth">62%</span>
                  </div>
                  <div className="w-full bg-muted/20 rounded-full h-2">
                    <div className="bg-farm-earth h-2 rounded-full" style={{ width: '62%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-5 pt-4 border-t space-y-4">
                <h4 className="font-medium text-sm">Technology Recommendations</h4>
                <div className="bg-farm-green/10 p-3 rounded-lg">
                  <div className="flex items-start">
                    <Save className="h-4 w-4 mr-2 text-farm-green mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium">Upgrade Data Storage System</p>
                      <p className="text-xs text-muted-foreground">Current capacity will be reached in ~45 days. Recommended upgrade to 5TB system.</p>
                    </div>
                  </div>
                </div>
                <div className="bg-farm-sky/10 p-3 rounded-lg">
                  <div className="flex items-start">
                    <Lightbulb className="h-4 w-4 mr-2 text-farm-sky mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium">Staff Training Session</p>
                      <p className="text-xs text-muted-foreground">Schedule a training session for new field monitoring software by September.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <PredictiveInsights moduleName="Tech & Innovation" />
      
      <TrackingInterface moduleName="Tech & Innovation" />
    </div>
  );
}
