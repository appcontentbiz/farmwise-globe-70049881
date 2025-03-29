
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  AlertCircle, 
  Bug, 
  BarChart, 
  Thermometer, 
  Droplets, 
  Wind, 
  Search,
  LineChart as LineChartIcon,
  Calendar,
  Download,
  RefreshCw,
  Microscope
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
  Cell,
  Scatter,
  ScatterChart,
  ZAxis
} from "recharts";

// Sample data for pest occurrence
const pestData = [
  { month: 'Jan', aphids: 12, beetles: 5, mites: 8 },
  { month: 'Feb', aphids: 10, beetles: 6, mites: 7 },
  { month: 'Mar', aphids: 15, beetles: 8, mites: 9 },
  { month: 'Apr', aphids: 25, beetles: 12, mites: 15 },
  { month: 'May', aphids: 35, beetles: 18, mites: 23 },
  { month: 'Jun', aphids: 30, beetles: 15, mites: 20 },
  { month: 'Jul', aphids: 22, beetles: 10, mites: 12 },
];

// Sample data for disease pressure
const diseaseData = [
  { month: 'Jan', blight: 5, powderyMildew: 8, rust: 3 },
  { month: 'Feb', blight: 4, powderyMildew: 7, rust: 4 },
  { month: 'Mar', blight: 6, powderyMildew: 10, rust: 5 },
  { month: 'Apr', blight: 12, powderyMildew: 18, rust: 8 },
  { month: 'May', blight: 20, powderyMildew: 25, rust: 12 },
  { month: 'Jun', blight: 18, powderyMildew: 20, rust: 10 },
  { month: 'Jul', blight: 12, powderyMildew: 15, rust: 6 },
];

// Sample data for treatment effectiveness
const treatmentData = [
  { name: 'Biological', effectiveness: 72, cost: 85, sustainability: 95 },
  { name: 'Chemical', effectiveness: 90, cost: 60, sustainability: 45 },
  { name: 'Cultural', effectiveness: 65, cost: 95, sustainability: 98 },
  { name: 'Mechanical', effectiveness: 60, cost: 75, sustainability: 90 },
];

// Risk prediction data
const riskPredictionData = [
  { x: 68, y: 78, z: 200, name: 'Field 1: High Risk' },
  { x: 45, y: 55, z: 150, name: 'Field 2: Medium Risk' },
  { x: 30, y: 40, z: 100, name: 'Field 3: Low Risk' },
  { x: 72, y: 85, z: 250, name: 'Field 4: Critical Risk' },
  { x: 35, y: 30, z: 120, name: 'Field 5: Low Risk' },
];

const COLORS = ['#4CAF50', '#FBC02D', '#42A5F5', '#A1887F', '#F06292'];

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
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Pest Population Trends</h4>
                      <p className="text-sm text-muted-foreground">Monthly pest occurrence by type</p>
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
                        data={pestData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="aphids" name="Aphids" stroke="#4CAF50" />
                        <Line type="monotone" dataKey="beetles" name="Beetles" stroke="#FBC02D" />
                        <Line type="monotone" dataKey="mites" name="Spider Mites" stroke="#F44336" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="bg-farm-green/10 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Pest Insights</h4>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-center">
                        <Thermometer className="h-4 w-4 mr-2 text-farm-green" />
                        Higher temperatures correlate with increased mite populations
                      </li>
                      <li className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-farm-green" />
                        Aphid populations typically peak in May-June based on historical data
                      </li>
                      <li className="flex items-center">
                        <Search className="h-4 w-4 mr-2 text-farm-green" />
                        Beetle populations concentrated in southern fields
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="diseases">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Disease Pressure Analysis</h4>
                    <p className="text-sm text-muted-foreground">Monthly disease occurrence by type</p>
                  </div>
                  
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart
                        data={diseaseData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="blight" name="Blight" fill="#F44336" />
                        <Bar dataKey="powderyMildew" name="Powdery Mildew" fill="#9C27B0" />
                        <Bar dataKey="rust" name="Rust" fill="#FF9800" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <Card className="p-4">
                      <div className="text-sm text-muted-foreground mb-1">Current Humidity</div>
                      <div className="text-2xl font-bold text-farm-sky">78%</div>
                      <div className="text-xs text-red-500 mt-1">↑ High disease risk</div>
                    </Card>
                    <Card className="p-4">
                      <div className="text-sm text-muted-foreground mb-1">Disease Intensity</div>
                      <div className="text-2xl font-bold text-amber-500">Medium</div>
                      <div className="text-xs text-amber-500 mt-1">↗ Rising trend</div>
                    </Card>
                    <Card className="p-4">
                      <div className="text-sm text-muted-foreground mb-1">Next Treatment</div>
                      <div className="text-xl font-bold text-farm-green">Aug 12</div>
                      <div className="text-xs text-muted-foreground mt-1">5 days from now</div>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="risk">
                <div className="space-y-4">
                  <h4 className="font-medium">Risk Prediction Model</h4>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <ScatterChart
                            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                          >
                            <CartesianGrid />
                            <XAxis type="number" dataKey="x" name="Temperature (°F)" />
                            <YAxis type="number" dataKey="y" name="Humidity (%)" />
                            <ZAxis type="number" dataKey="z" range={[40, 160]} name="Risk Score" />
                            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                            <Scatter name="Risk Prediction" data={riskPredictionData} fill="#8884d8" />
                          </ScatterChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="text-center text-sm text-muted-foreground">Temperature vs. Humidity Risk Correlation</div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-red-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1 text-red-600" />
                          High Risk Areas
                        </h4>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm">
                              <span>Field 4 (North)</span>
                              <span className="font-medium">Critical Risk</span>
                            </div>
                            <div className="w-full bg-red-100 rounded-full h-2 mt-1">
                              <div className="bg-red-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm">
                              <span>Field 1 (East)</span>
                              <span className="font-medium">High Risk</span>
                            </div>
                            <div className="w-full bg-red-100 rounded-full h-2 mt-1">
                              <div className="bg-red-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm">
                              <span>Field 2 (South)</span>
                              <span className="font-medium">Medium Risk</span>
                            </div>
                            <div className="w-full bg-yellow-100 rounded-full h-2 mt-1">
                              <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '55%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">Risk Factors</h4>
                        <ul className="text-sm space-y-2">
                          <li className="flex items-start">
                            <div className="h-5 w-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs mr-2 mt-0.5">1</div>
                            <div>High humidity ({'>'}75%) increases fungal disease risk</div>
                          </li>
                          <li className="flex items-start">
                            <div className="h-5 w-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs mr-2 mt-0.5">2</div>
                            <div>Temperature range 65-80°F optimal for most pests</div>
                          </li>
                          <li className="flex items-start">
                            <div className="h-5 w-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs mr-2 mt-0.5">3</div>
                            <div>Previous pest presence increases reoccurrence risk</div>
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
              <Microscope className="h-5 w-5 text-farm-green" />
              Treatment Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              <div className="mb-6">
                <h4 className="text-sm font-medium mb-2">Treatment Effectiveness</h4>
                <div className="h-[180px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
                      data={treatmentData}
                      layout="vertical"
                      margin={{ top: 5, right: 5, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis dataKey="name" type="category" scale="band" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="effectiveness" name="Effectiveness" fill="#4CAF50" />
                      <Bar dataKey="sustainability" name="Sustainability" fill="#42A5F5" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Preventative Measures</span>
                    <span className="font-medium text-farm-green">78%</span>
                  </div>
                  <div className="w-full bg-muted/20 rounded-full h-2">
                    <div className="bg-farm-green h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Monitoring Coverage</span>
                    <span className="font-medium text-farm-sky">92%</span>
                  </div>
                  <div className="w-full bg-muted/20 rounded-full h-2">
                    <div className="bg-farm-sky h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Treatment Success Rate</span>
                    <span className="font-medium text-amber-500">65%</span>
                  </div>
                  <div className="w-full bg-muted/20 rounded-full h-2">
                    <div className="bg-amber-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-5 pt-4 border-t space-y-4">
                <h4 className="font-medium text-sm">Treatment Recommendations</h4>
                <div className="bg-farm-green/10 p-3 rounded-lg">
                  <div className="flex items-start">
                    <Bug className="h-4 w-4 mr-2 text-farm-green mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium">Apply Biological Controls</p>
                      <p className="text-xs text-muted-foreground">Release beneficial insects in Field 1 to manage aphid populations.</p>
                    </div>
                  </div>
                </div>
                <div className="bg-amber-50 p-3 rounded-lg">
                  <div className="flex items-start">
                    <Droplets className="h-4 w-4 mr-2 text-amber-500 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium">Fungicide Application</p>
                      <p className="text-xs text-muted-foreground">Apply organic fungicide to Field 4 to prevent further powdery mildew spread.</p>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-start">
                    <Wind className="h-4 w-4 mr-2 text-blue-500 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium">Improve Air Circulation</p>
                      <p className="text-xs text-muted-foreground">Prune dense foliage in greenhouse to reduce humidity and disease pressure.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <PredictiveInsights moduleName="Pest & Disease" />
      
      <TrackingInterface moduleName="Pest & Disease" />
    </div>
  );
}
