
import { Button } from "@/components/ui/button";
import { RefreshCw, Download, Thermometer, Calendar, Search } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

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

export function PestContent() {
  return (
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
  );
}
