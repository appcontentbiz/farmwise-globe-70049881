
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, AlertCircle, ExternalLink } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

type ActivityItem = {
  id: string;
  user: {
    name: string;
    avatar?: string;
    initials: string;
  };
  action: string;
  target: string;
  time: string;
  isAlert?: boolean;
  details?: string;
  actionUrl?: string;
};

const activities: ActivityItem[] = [
  {
    id: "1",
    user: { name: "John D.", initials: "JD" },
    action: "applied fertilizer to",
    target: "North Field",
    time: "2 hours ago",
    details: "Applied 50kg of NPK fertilizer to North Field at recommended rate. Soil moisture was optimal at time of application.",
    actionUrl: "/fields/north"
  },
  {
    id: "2",
    user: { name: "System", initials: "SY" },
    action: "detected low moisture in",
    target: "East Field Sector 3",
    time: "4 hours ago",
    isAlert: true,
    details: "Soil moisture levels have fallen below 30% in Eastern sector. Consider irrigation within the next 48 hours to maintain optimal growing conditions.",
    actionUrl: "/fields/east/irrigation"
  },
  {
    id: "3",
    user: { name: "Weather Alert", initials: "WA" },
    action: "predicts heavy rain in",
    target: "your region",
    time: "5 hours ago",
    isAlert: true,
    details: "Weather forecasts indicate 80% chance of heavy rainfall (>25mm) in the next 24-48 hours. Consider postponing any scheduled field operations.",
    actionUrl: "/climate"
  },
  {
    id: "4",
    user: { name: "Maria R.", initials: "MR" },
    action: "completed harvesting in",
    target: "South Field",
    time: "Yesterday",
    details: "Harvested 15 tons of corn from South Field. Yield is approximately 5% higher than projected. Equipment has been returned to storage facility.",
    actionUrl: "/fields/south"
  },
  {
    id: "5",
    user: { name: "Sensors", initials: "SE" },
    action: "recorded optimal soil pH in",
    target: "all fields",
    time: "Yesterday",
    details: "Soil pH readings across all monitored fields are within optimal range (6.2-6.8). No lime application necessary at this time.",
    actionUrl: "/soil-reports"
  },
  {
    id: "6",
    user: { name: "John D.", initials: "JD" },
    action: "updated crop rotation plan for",
    target: "next season",
    time: "2 days ago",
    details: "Updated crop rotation schedule to include cover crops in fields 3 and 4. Plan now accounts for improved soil health metrics from last season's tests.",
    actionUrl: "/planning/rotation"
  },
];

export function ActivityFeed() {
  const [selectedActivity, setSelectedActivity] = useState<ActivityItem | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleActivityClick = (activity: ActivityItem) => {
    setSelectedActivity(activity);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleActionClick = () => {
    if (selectedActivity?.actionUrl) {
      // In a real app, this would use proper navigation
      // For now, we'll just close and show a toast
      setDialogOpen(false);
      toast({
        title: "Navigating to action",
        description: `You would be directed to ${selectedActivity.actionUrl}`
      });
    }
  };

  return (
    <>
      <Card className="farm-module-card">
        <CardHeader className="pb-2">
          <CardTitle className="farm-module-card-title">
            <Activity className="h-5 w-5 text-farm-green" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[320px] pr-4">
            <div className="space-y-4">
              {activities.map((activity) => (
                <div 
                  key={activity.id} 
                  className="flex gap-3 p-2 rounded-md hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => handleActivityClick(activity)}
                >
                  <Avatar className={`h-8 w-8 ${activity.isAlert ? 'bg-yellow-100 text-yellow-700' : 'bg-secondary text-primary'}`}>
                    <AvatarFallback>
                      {activity.isAlert ? <AlertCircle className="h-4 w-4" /> : activity.user.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm leading-none">
                      <span className="font-medium">{activity.user.name}</span>{" "}
                      <span className="text-muted-foreground">{activity.action}</span>{" "}
                      <span className="font-medium">{activity.target}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        {selectedActivity && (
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {selectedActivity.isAlert && <AlertCircle className="h-5 w-5 text-yellow-600" />}
                {selectedActivity.user.name} - {selectedActivity.target}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                {selectedActivity.time}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p>{selectedActivity.details}</p>
            </div>
            <DialogFooter className="sm:justify-between">
              <Button variant="outline" onClick={handleCloseDialog}>
                Close
              </Button>
              {selectedActivity.actionUrl && (
                <Button onClick={handleActionClick}>
                  Take Action
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
