
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart as BarChartIcon, 
  LineChart as LineChartIcon, 
  PieChart as PieChartIcon,
  BarChart3 
} from "lucide-react";
import { format, subDays, isAfter, startOfDay } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface TrackingEvent {
  id: string;
  title: string;
  date: string;
  notes: string;
  category: "past" | "present" | "future";
  type?: string;
  progress?: number;
}

export function ProgressCharts() {
  const [events, setEvents] = useState<TrackingEvent[]>([]);
  const [timeRange, setTimeRange] = useState<number>(30); // Default to 30 days

  useEffect(() => {
    const savedEvents = localStorage.getItem("farm-tracking-Beginning Farming");
    if (savedEvents) {
      const parsedEvents = JSON.parse(savedEvents);
      // Filter only past and present events
      const relevantEvents = parsedEvents.filter((event: TrackingEvent) => 
        event.category === "past" || event.category === "present"
      );
      setEvents(relevantEvents);
    }
  }, []);

  // Get events within the selected time range
  const getFilteredEvents = () => {
    const cutoffDate = subDays(new Date(), timeRange);
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return isAfter(eventDate, cutoffDate) || startOfDay(eventDate).getTime() === startOfDay(cutoffDate).getTime();
    });
  };

  const filteredEvents = getFilteredEvents();

  // Prepare data for activity count by type chart
  const prepareActivityTypeData = () => {
    const typeCounts: Record<string, number> = {};
    
    filteredEvents.forEach(event => {
      const type = event.type || "other";
      typeCounts[type] = (typeCounts[type] || 0) + 1;
    });
    
    return Object.entries(typeCounts).map(([type, count]) => ({
      name: getTypeLabel(type),
      value: count
    }));
  };

  // Prepare data for progress over time
  const prepareProgressData = () => {
    const progressEvents = filteredEvents.filter(event => 
      (event.type === "learning" || event.type === "goal") && event.progress !== undefined
    );
    
    // Group by date and calculate average progress
    const progressByDate: Record<string, {total: number, count: number}> = {};
    
    progressEvents.forEach(event => {
      const date = format(new Date(event.date), "yyyy-MM-dd");
      if (!progressByDate[date]) {
        progressByDate[date] = { total: 0, count: 0 };
      }
      progressByDate[date].total += event.progress || 0;
      progressByDate[date].count += 1;
    });
    
    return Object.entries(progressByDate).map(([date, data]) => ({
      date: format(new Date(date), "MMM dd"),
      progress: Math.round(data.total / data.count)
    })).sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA.getTime() - dateB.getTime();
    });
  };

  // Prepare activity counts over time
  const prepareActivityCountData = () => {
    const activityByDate: Record<string, number> = {};
    
    filteredEvents.forEach(event => {
      const date = format(new Date(event.date), "yyyy-MM-dd");
      activityByDate[date] = (activityByDate[date] || 0) + 1;
    });
    
    return Object.entries(activityByDate).map(([date, count]) => ({
      date: format(new Date(date), "MMM dd"),
      count
    })).sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA.getTime() - dateB.getTime();
    });
  };

  const getTypeLabel = (type: string) => {
    const typeMap: Record<string, string> = {
      "activity": "Daily Activity",
      "learning": "Educational Progress",
      "goal": "Goal Setting",
      "note": "General Note",
      "milestone": "Achievement",
      "other": "Other"
    };
    
    return typeMap[type] || type;
  };

  const COLORS = ['#4CAF50', '#2196F3', '#FFC107', '#9C27B0', '#F44336', '#607D8B'];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-xl">
          <BarChart3 className="h-5 w-5 text-farm-green" />
          Farming Progress Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-wrap justify-between items-center">
          <div className="flex space-x-2 mb-2 sm:mb-0">
            <Button 
              size="sm" 
              variant={timeRange === 7 ? "default" : "outline"}
              onClick={() => setTimeRange(7)}
            >
              7 Days
            </Button>
            <Button 
              size="sm" 
              variant={timeRange === 30 ? "default" : "outline"}
              onClick={() => setTimeRange(30)}
            >
              30 Days
            </Button>
            <Button 
              size="sm" 
              variant={timeRange === 90 ? "default" : "outline"}
              onClick={() => setTimeRange(90)}
            >
              90 Days
            </Button>
            <Button 
              size="sm" 
              variant={timeRange === 365 ? "default" : "outline"}
              onClick={() => setTimeRange(365)}
            >
              1 Year
            </Button>
          </div>
          <div className="text-sm text-muted-foreground">
            Showing data for the past {timeRange} days
          </div>
        </div>

        <Tabs defaultValue="progress">
          <TabsList className="mb-4">
            <TabsTrigger value="progress">
              <LineChartIcon className="h-4 w-4 mr-2" />
              Learning Progress
            </TabsTrigger>
            <TabsTrigger value="activity">
              <BarChartIcon className="h-4 w-4 mr-2" />
              Activity Counts
            </TabsTrigger>
            <TabsTrigger value="distribution">
              <PieChartIcon className="h-4 w-4 mr-2" />
              Type Distribution
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="progress">
            <div className="h-80">
              {prepareProgressData().length > 0 ? (
                <ChartContainer 
                  className="h-80"
                  config={{
                    progress: { label: "Progress (%)" },
                  }}
                >
                  <LineChart
                    data={prepareProgressData()}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 25,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="date" 
                      angle={-45} 
                      textAnchor="end" 
                      height={60}
                      interval="preserveStart"
                    />
                    <YAxis 
                      domain={[0, 100]} 
                      label={{ value: 'Progress (%)', angle: -90, position: 'insideLeft' }} 
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="progress"
                      name="progress"
                      stroke="var(--color-progress, #4CAF50)"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ChartContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  <p>Not enough progress data to display for the selected time range.</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="activity">
            <div className="h-80">
              {prepareActivityCountData().length > 0 ? (
                <ChartContainer 
                  className="h-80"
                  config={{
                    count: { label: "Number of Activities" },
                  }}
                >
                  <BarChart
                    data={prepareActivityCountData()}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 25,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="date" 
                      angle={-45} 
                      textAnchor="end" 
                      height={60}
                      interval="preserveStart"
                    />
                    <YAxis label={{ value: 'Activity Count', angle: -90, position: 'insideLeft' }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar 
                      dataKey="count" 
                      name="count"
                      fill="var(--color-count, #2196F3)" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ChartContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  <p>No activity data to display for the selected time range.</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="distribution">
            <div className="h-80">
              {prepareActivityTypeData().length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={prepareActivityTypeData()}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {prepareActivityTypeData().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value, name) => [value, name]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  <p>No activity type data to display for the selected time range.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
        
        {filteredEvents.length === 0 && (
          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-amber-800 text-sm">
              No tracking data found for the selected time range. Add some activities in the tracking interface to see your progress.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
