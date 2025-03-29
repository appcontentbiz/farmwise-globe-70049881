
import { Button } from "@/components/ui/button";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";
import { Activity, ArrowUpDown, Calendar, Heart } from "lucide-react";

// Sample data for physical health
const activityData = [
  { month: 'Jan', physicalActivity: 75, ergonomicScore: 65, restTime: 60 },
  { month: 'Feb', physicalActivity: 70, ergonomicScore: 68, restTime: 62 },
  { month: 'Mar', physicalActivity: 80, ergonomicScore: 72, restTime: 65 },
  { month: 'Apr', physicalActivity: 85, ergonomicScore: 75, restTime: 68 },
  { month: 'May', physicalActivity: 90, ergonomicScore: 80, restTime: 70 },
  { month: 'Jun', physicalActivity: 88, ergonomicScore: 82, restTime: 72 },
  { month: 'Jul', physicalActivity: 85, ergonomicScore: 80, restTime: 75 },
];

const healthMetrics = [
  { name: 'Hydration', current: 65, target: 90 },
  { name: 'Posture', current: 75, target: 95 },
  { name: 'Stretching', current: 50, target: 85 },
  { name: 'Rest Breaks', current: 60, target: 80 },
];

export function PhysicalHealthContent() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-medium">Physical Health Monitoring</h4>
          <p className="text-sm text-muted-foreground">Tracking key health metrics for farm work</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Select Period
          </Button>
        </div>
      </div>
      
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={activityData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="physicalActivity" name="Physical Activity" stroke="#4CAF50" />
            <Line type="monotone" dataKey="ergonomicScore" name="Ergonomic Score" stroke="#FBC02D" />
            <Line type="monotone" dataKey="restTime" name="Rest Time" stroke="#42A5F5" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div>
          <h4 className="font-medium mb-3">Health Metrics vs. Targets</h4>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={healthMetrics}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Legend />
                <Bar dataKey="current" name="Current" fill="#42A5F5" />
                <Bar dataKey="target" name="Target" fill="#4CAF50" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-farm-green/10 p-4 rounded-lg">
          <h4 className="font-medium mb-3">Key Physical Health Recommendations</h4>
          
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <Heart className="h-4 w-4 text-farm-green mt-0.5" />
              <div>
                <h5 className="text-sm font-medium">Improve Hydration</h5>
                <p className="text-xs text-muted-foreground">Keep water containers in equipment and set regular reminders to drink water, especially during hot weather.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <Activity className="h-4 w-4 text-farm-green mt-0.5" />
              <div>
                <h5 className="text-sm font-medium">Ergonomic Improvements</h5>
                <p className="text-xs text-muted-foreground">Adjust equipment seating and controls to maintain proper posture. Use anti-vibration gloves when operating equipment for extended periods.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <ArrowUpDown className="h-4 w-4 text-farm-green mt-0.5" />
              <div>
                <h5 className="text-sm font-medium">Stretching Routine</h5>
                <p className="text-xs text-muted-foreground">Implement a 5-minute stretching routine before and after major physical tasks to reduce strain and prevent injury.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-muted/30 p-4 rounded-lg mt-4">
        <h4 className="font-medium mb-2">Farmer Physical Health Facts</h4>
        <ul className="text-sm space-y-2">
          <li className="flex items-start">
            <div className="h-5 w-5 rounded-full bg-farm-green flex items-center justify-center text-white text-xs mr-2 mt-0.5">i</div>
            <div>Farmers experience lower rates of some health problems but higher rates of others compared to the general population, particularly musculoskeletal disorders.</div>
          </li>
          <li className="flex items-start">
            <div className="h-5 w-5 rounded-full bg-farm-green flex items-center justify-center text-white text-xs mr-2 mt-0.5">i</div>
            <div>Regular preventive healthcare is especially important for farmers due to exposure to various environmental factors.</div>
          </li>
          <li className="flex items-start">
            <div className="h-5 w-5 rounded-full bg-farm-green flex items-center justify-center text-white text-xs mr-2 mt-0.5">i</div>
            <div>Proper lifting techniques and ergonomic practices can significantly reduce the risk of back injuries, one of the most common health issues among farmers.</div>
          </li>
        </ul>
      </div>
    </div>
  );
}
