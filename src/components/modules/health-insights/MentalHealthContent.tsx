
import { useState } from "react";
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts";
import { Card } from "@/components/ui/card";
import { Brain, Phone, Sun, SunMedium } from "lucide-react";
import { MentalHealthResourcesModal } from "./MentalHealthResourcesModal";

// Sample data for mental health
const stressData = [
  { month: 'Jan', stressLevel: 65, workSatisfaction: 75, restQuality: 70 },
  { month: 'Feb', stressLevel: 70, workSatisfaction: 72, restQuality: 68 },
  { month: 'Mar', stressLevel: 75, workSatisfaction: 68, restQuality: 65 },
  { month: 'Apr', stressLevel: 85, workSatisfaction: 65, restQuality: 60 },
  { month: 'May', stressLevel: 75, workSatisfaction: 70, restQuality: 65 },
  { month: 'Jun', stressLevel: 65, workSatisfaction: 80, restQuality: 75 },
  { month: 'Jul', stressLevel: 60, workSatisfaction: 85, restQuality: 80 },
];

const wellbeingData = [
  { subject: 'Work-Life Balance', value: 65 },
  { subject: 'Stress Management', value: 70 },
  { subject: 'Sleep Quality', value: 65 },
  { subject: 'Social Connection', value: 60 },
  { subject: 'Sense of Purpose', value: 85 },
  { subject: 'Financial Security', value: 55 },
];

export function MentalHealthContent() {
  const [showResourcesModal, setShowResourcesModal] = useState(false);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-medium">Mental Wellbeing Tracking</h4>
          <p className="text-sm text-muted-foreground">Monitoring stress levels and overall mental health</p>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setShowResourcesModal(true)}
        >
          <Brain className="h-4 w-4 mr-2" />
          Resources
        </Button>
      </div>
      
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={stressData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="stressLevel" name="Stress Level" stroke="#F44336" />
            <Line type="monotone" dataKey="workSatisfaction" name="Work Satisfaction" stroke="#4CAF50" />
            <Line type="monotone" dataKey="restQuality" name="Rest Quality" stroke="#42A5F5" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 col-span-1">
          <h4 className="font-medium text-sm mb-3">Wellbeing Assessment</h4>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={wellbeingData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar name="Wellbeing Score" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        
        <div className="bg-farm-green/10 p-4 rounded-lg col-span-2">
          <h4 className="font-medium mb-3">Mental Health Resources</h4>
          
          <div className="space-y-4">
            <div className="p-3 border rounded-md">
              <div className="flex items-start">
                <Phone className="h-5 w-5 mr-2 text-farm-green flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <h5 className="font-medium">Farm Aid Hotline</h5>
                  <p className="text-muted-foreground">1-800-FARM-AID (1-800-327-6243)</p>
                  <p className="text-xs text-muted-foreground mt-1">Provides support services for farmers facing stress, anxiety, depression, or financial challenges</p>
                </div>
              </div>
            </div>
            
            <div className="p-3 border rounded-md">
              <div className="flex items-start">
                <Brain className="h-5 w-5 mr-2 text-farm-green flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <h5 className="font-medium">Stress Management Techniques</h5>
                  <ul className="text-muted-foreground mt-1 space-y-1">
                    <li>• Deep breathing exercises (5-5-5 method)</li>
                    <li>• Progressive muscle relaxation</li>
                    <li>• Mindfulness practices for farmers</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="p-3 border rounded-md">
              <div className="flex items-start">
                <SunMedium className="h-5 w-5 mr-2 text-farm-green flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <h5 className="font-medium">Seasonal Stress Management</h5>
                  <p className="text-xs text-muted-foreground mt-1">Planning strategies to manage stress during high-pressure seasons like planting and harvest</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2"
                    onClick={() => setShowResourcesModal(true)}
                  >
                    <Sun className="h-3.5 w-3.5 mr-1" />
                    Seasonal Plan
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-amber-50 border border-amber-100 p-4 rounded-lg mt-4">
        <h4 className="font-medium mb-2 flex items-center">
          <Brain className="h-4 w-4 mr-2 text-amber-500" />
          Stress Warning Signs
        </h4>
        <ul className="text-sm space-y-2">
          <li className="flex items-start">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-1.5 mr-2"></span>
            <div>Changes in sleep patterns or persistent fatigue</div>
          </li>
          <li className="flex items-start">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-1.5 mr-2"></span>
            <div>Increased irritability or trouble making decisions</div>
          </li>
          <li className="flex items-start">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-1.5 mr-2"></span>
            <div>Feeling overwhelmed or a sense of dread about farm work</div>
          </li>
          <li className="flex items-start">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-1.5 mr-2"></span>
            <div>Physical symptoms like headaches, muscle tension, or digestive issues</div>
          </li>
        </ul>
        <p className="text-xs text-muted-foreground mt-3">If you notice these signs persisting, consider reaching out to a mental health professional who understands agricultural challenges.</p>
      </div>

      <MentalHealthResourcesModal 
        isOpen={showResourcesModal} 
        onClose={() => setShowResourcesModal(false)} 
      />
    </div>
  );
}
