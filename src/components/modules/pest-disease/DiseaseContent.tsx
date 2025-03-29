
import { Card } from "@/components/ui/card";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

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

export function DiseaseContent() {
  return (
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
  );
}
