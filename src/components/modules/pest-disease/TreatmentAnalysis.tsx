
import { Bug, Droplets, Wind } from "lucide-react";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Sample data for treatment effectiveness
const treatmentData = [
  { name: 'Biological', effectiveness: 72, cost: 85, sustainability: 95 },
  { name: 'Chemical', effectiveness: 90, cost: 60, sustainability: 45 },
  { name: 'Cultural', effectiveness: 65, cost: 95, sustainability: 98 },
  { name: 'Mechanical', effectiveness: 60, cost: 75, sustainability: 90 },
];

export function TreatmentAnalysis() {
  return (
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
  );
}
