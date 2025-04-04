
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Moon } from "lucide-react";

interface HealthInsightsProps {
  averageSleep: string;
}

export const HealthInsights = ({ averageSleep }: HealthInsightsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Brain className="h-5 w-5 text-farm-green" />
            Mental Health Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-muted/30 p-3 rounded-md">
              <p className="text-sm font-medium">Your Mood Patterns</p>
              <p className="text-xs text-muted-foreground mt-1">
                Based on your entries, your mood tends to be better on days when you sleep more than 7 hours.
                Consider prioritizing sleep for improved mental wellbeing.
              </p>
            </div>
            
            <div className="bg-amber-50 p-3 rounded-md">
              <p className="text-sm font-medium">Stress Management Tips</p>
              <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                <li>• Schedule short breaks during busy farm work periods</li>
                <li>• Practice 5-minute mindfulness exercises before bed</li>
                <li>• Connect with other farmers or family members regularly</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Moon className="h-5 w-5 text-farm-green" />
            Sleep Quality Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-muted/30 p-3 rounded-md">
              <p className="text-sm font-medium">Your Sleep Patterns</p>
              <p className="text-xs text-muted-foreground mt-1">
                Your average sleep duration is {averageSleep} hours.
                During seasonal transitions, farmers often experience sleep disruptions due to changing workloads.
              </p>
            </div>
            
            <div className="bg-blue-50 p-3 rounded-md">
              <p className="text-sm font-medium">Sleep Improvement Strategies</p>
              <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                <li>• Create a consistent sleep schedule, even during busy seasons</li>
                <li>• Limit caffeine after 2pm and reduce screen time before bed</li>
                <li>• Keep your bedroom cool, dark, and quiet</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
