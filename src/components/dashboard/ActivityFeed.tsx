
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, AlertCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

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
};

const activities: ActivityItem[] = [
  {
    id: "1",
    user: { name: "John D.", initials: "JD" },
    action: "applied fertilizer to",
    target: "North Field",
    time: "2 hours ago"
  },
  {
    id: "2",
    user: { name: "System", initials: "SY" },
    action: "detected low moisture in",
    target: "East Field Sector 3",
    time: "4 hours ago",
    isAlert: true
  },
  {
    id: "3",
    user: { name: "Weather Alert", initials: "WA" },
    action: "predicts heavy rain in",
    target: "your region",
    time: "5 hours ago",
    isAlert: true
  },
  {
    id: "4",
    user: { name: "Maria R.", initials: "MR" },
    action: "completed harvesting in",
    target: "South Field",
    time: "Yesterday"
  },
  {
    id: "5",
    user: { name: "Sensors", initials: "SE" },
    action: "recorded optimal soil pH in",
    target: "all fields",
    time: "Yesterday"
  },
  {
    id: "6",
    user: { name: "John D.", initials: "JD" },
    action: "updated crop rotation plan for",
    target: "next season",
    time: "2 days ago"
  },
];

export function ActivityFeed() {
  return (
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
              <div key={activity.id} className="flex gap-3">
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
  );
}
