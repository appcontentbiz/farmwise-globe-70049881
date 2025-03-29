
import { Button } from "@/components/ui/button";
import { 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";
import { AlertTriangle, CheckCircle, FileText, ShieldCheck } from "lucide-react";

// Sample data for safety incidents
const incidentData = [
  { name: 'Equipment', value: 35 },
  { name: 'Livestock', value: 20 },
  { name: 'Falls/Slips', value: 25 },
  { name: 'Chemical', value: 15 },
  { name: 'Other', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A569BD'];

// Sample data for safety compliance
const complianceData = [
  { category: 'Equipment Maintenance', compliance: 85 },
  { category: 'Chemical Storage', compliance: 90 },
  { category: 'Personal Protective Equipment', compliance: 75 },
  { category: 'Emergency Protocols', compliance: 65 },
  { category: 'Worker Training', compliance: 80 },
];

export function SafetyContent() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-medium">Farm Safety Analysis</h4>
          <p className="text-sm text-muted-foreground">Safety performance and incident prevention</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Safety Plan
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium mb-2 text-center">Incident Types (Past 12 Months)</h4>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={incidentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {incidentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium mb-2 text-center">Safety Compliance by Category</h4>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={complianceData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="category" type="category" />
                <Tooltip formatter={(value) => `${value}%`} />
                <Bar dataKey="compliance" name="Compliance %" fill="#4CAF50" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="bg-farm-green/10 p-4 rounded-lg">
        <h4 className="font-medium mb-3 flex items-center">
          <ShieldCheck className="h-4 w-4 mr-2 text-farm-green" />
          Safety Improvements
        </h4>
        
        <div className="space-y-4">
          <div className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-farm-green mt-0.5" />
            <div className="text-sm">
              <h5 className="font-medium">Completed Actions</h5>
              <ul className="space-y-1 mt-1 text-muted-foreground">
                <li>• Updated machine guarding on all equipment</li>
                <li>• Installed proper chemical storage cabinets</li>
                <li>• Created emergency contact posters for all buildings</li>
              </ul>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5" />
            <div className="text-sm">
              <h5 className="font-medium">Pending Improvements</h5>
              <ul className="space-y-1 mt-1 text-muted-foreground">
                <li>• Conduct monthly safety training sessions</li>
                <li>• Install additional fire extinguishers in outbuildings</li>
                <li>• Update safety protocol documentation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="flex flex-col items-center">
            <div className="font-bold text-3xl text-blue-600">105</div>
            <div className="text-sm text-center text-muted-foreground">Days Since Last Reportable Incident</div>
          </div>
        </div>
        
        <div className="bg-green-50 p-3 rounded-lg">
          <div className="flex flex-col items-center">
            <div className="font-bold text-3xl text-green-600">24</div>
            <div className="text-sm text-center text-muted-foreground">Safety Improvements This Year</div>
          </div>
        </div>
        
        <div className="bg-amber-50 p-3 rounded-lg">
          <div className="flex flex-col items-center">
            <div className="font-bold text-3xl text-amber-600">85%</div>
            <div className="text-sm text-center text-muted-foreground">Overall Safety Rating</div>
          </div>
        </div>
      </div>
      
      <div className="bg-red-50 border border-red-100 p-4 rounded-lg mt-4">
        <h4 className="font-medium mb-2 flex items-center">
          <AlertTriangle className="h-4 w-4 mr-2 text-red-500" />
          High-Risk Areas Requiring Attention
        </h4>
        <ul className="text-sm space-y-2">
          <li className="flex items-start">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 mt-1.5 mr-2"></span>
            <div><span className="font-medium">Tractor PTO shafts</span> - Ensure all have proper guards installed and maintained</div>
          </li>
          <li className="flex items-start">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 mt-1.5 mr-2"></span>
            <div><span className="font-medium">Grain bins</span> - Update lockout/tagout procedures and confined space protocols</div>
          </li>
          <li className="flex items-start">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 mt-1.5 mr-2"></span>
            <div><span className="font-medium">ATV usage</span> - Implement helmet requirement policy for all riders</div>
          </li>
        </ul>
      </div>
    </div>
  );
}
