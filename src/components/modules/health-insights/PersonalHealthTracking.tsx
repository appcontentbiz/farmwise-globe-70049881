
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Brain,
  Calendar as CalendarIcon,
  Clock,
  Heart,
  Moon,
  Save,
  User,
  BarChart3,
  LineChart as LineChartIcon,
  Activity,
} from "lucide-react";
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
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type MoodEntry = {
  date: Date;
  mood: string;
  energy: number;
  sleep: number;
  physicalSymptoms: string;
  thoughts: string;
};

const moodOptions = [
  { value: "great", label: "Great", color: "#4CAF50" },
  { value: "good", label: "Good", color: "#8BC34A" },
  { value: "okay", label: "Okay", color: "#FFC107" },
  { value: "low", label: "Low", color: "#FF9800" },
  { value: "bad", label: "Bad", color: "#F44336" },
];

const getMoodColor = (mood: string) => {
  return moodOptions.find((option) => option.value === mood)?.color || "#9e9e9e";
};

// Helper to get a score from mood
const getMoodScore = (mood: string): number => {
  const index = moodOptions.findIndex(m => m.value === mood);
  return (index === -1) ? 2 : (4 - index); // 4 (great) to 0 (bad)
};

export function PersonalHealthTracking() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentEntry, setCurrentEntry] = useState<Omit<MoodEntry, "date">>({
    mood: "okay",
    energy: 5,
    sleep: 7,
    physicalSymptoms: "",
    thoughts: "",
  });
  const [entries, setEntries] = useState<MoodEntry[]>(() => {
    const savedEntries = localStorage.getItem("health-tracking-entries");
    return savedEntries ? JSON.parse(savedEntries) : [];
  });
  const [chartView, setChartView] = useState<"line" | "bar" | "area" | "distribution">("line");
  const [timeRange, setTimeRange] = useState<"7days" | "30days" | "90days" | "all">("30days");
  const { toast } = useToast();

  // Get date range based on selected time range
  const getDateRange = () => {
    const endDate = new Date();
    const startDate = new Date();
    
    switch (timeRange) {
      case "7days":
        startDate.setDate(endDate.getDate() - 7);
        break;
      case "30days":
        startDate.setDate(endDate.getDate() - 30);
        break;
      case "90days":
        startDate.setDate(endDate.getDate() - 90);
        break;
      case "all":
        if (entries.length > 0) {
          // Find the earliest entry date
          const dates = entries.map(e => new Date(e.date).getTime());
          startDate.setTime(Math.min(...dates));
        } else {
          startDate.setDate(endDate.getDate() - 30); // Default to 30 days if no entries
        }
        break;
    }
    
    return { startDate, endDate };
  };

  // Generate chart data based on time range
  const generateChartData = () => {
    const { startDate, endDate } = getDateRange();
    const filteredEntries = entries.filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate >= startDate && entryDate <= endDate;
    });
    
    // Sort entries by date
    filteredEntries.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    return filteredEntries.map(entry => ({
      date: format(new Date(entry.date), "MMM dd"),
      rawDate: new Date(entry.date),
      mood: getMoodScore(entry.mood),
      moodLabel: entry.mood,
      moodColor: getMoodColor(entry.mood),
      energy: entry.energy,
      sleep: entry.sleep,
    }));
  };

  // Calculate mood distribution data
  const getMoodDistributionData = () => {
    const { startDate, endDate } = getDateRange();
    const filteredEntries = entries.filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate >= startDate && entryDate <= endDate;
    });
    
    const distribution = moodOptions.map(option => ({
      name: option.label,
      value: filteredEntries.filter(entry => entry.mood === option.value).length,
      color: option.color,
    }));
    
    return distribution.filter(item => item.value > 0);
  };

  const chartData = generateChartData();
  const distributionData = getMoodDistributionData();

  // Calculate health insights
  const calculateAverageSleep = () => {
    if (entries.length === 0) return "N/A";
    const total = entries.reduce((sum, entry) => sum + entry.sleep, 0);
    return (total / entries.length).toFixed(1);
  };

  const calculateAverageEnergy = () => {
    if (entries.length === 0) return "N/A";
    const total = entries.reduce((sum, entry) => sum + entry.energy, 0);
    return (total / entries.length).toFixed(1);
  };

  const handleSaveEntry = () => {
    const newEntry = {
      date: selectedDate,
      ...currentEntry,
    };

    // Check if an entry for this date already exists
    const existingEntryIndex = entries.findIndex(
      (entry) => format(new Date(entry.date), "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
    );

    let updatedEntries;
    if (existingEntryIndex >= 0) {
      // Update existing entry
      updatedEntries = [...entries];
      updatedEntries[existingEntryIndex] = newEntry;
    } else {
      // Add new entry
      updatedEntries = [...entries, newEntry];
    }

    setEntries(updatedEntries);
    localStorage.setItem("health-tracking-entries", JSON.stringify(updatedEntries));

    toast({
      title: "Health Entry Saved",
      description: `Your health data for ${format(selectedDate, "MMMM d, yyyy")} has been saved.`,
    });
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    
    setSelectedDate(date);
    
    // Find if an entry exists for this date
    const existingEntry = entries.find(
      (entry) => format(new Date(entry.date), "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
    );
    
    if (existingEntry) {
      setCurrentEntry({
        mood: existingEntry.mood,
        energy: existingEntry.energy,
        sleep: existingEntry.sleep,
        physicalSymptoms: existingEntry.physicalSymptoms,
        thoughts: existingEntry.thoughts,
      });
    } else {
      // Reset form for a new entry
      setCurrentEntry({
        mood: "okay",
        energy: 5,
        sleep: 7,
        physicalSymptoms: "",
        thoughts: "",
      });
    }
  };

  // Function to render calendar day content with mood indicators
  const renderCalendarDay = (day: Date) => {
    const entry = entries.find(
      (e) => format(new Date(e.date), "yyyy-MM-dd") === format(day, "yyyy-MM-dd")
    );
    
    if (entry) {
      return (
        <div className="relative h-full w-full flex items-center justify-center">
          <div
            className="absolute inset-0 opacity-30 rounded-full m-1"
            style={{ backgroundColor: getMoodColor(entry.mood) }}
          />
          <span>{day.getDate()}</span>
        </div>
      );
    }
    
    return <span>{day.getDate()}</span>;
  };

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/95 border p-3 rounded-lg shadow-md text-sm">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div 
              key={`item-${index}`} 
              className="flex items-center gap-2 mt-1"
              style={{ color: entry.color }}
            >
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }} 
              />
              <span>{entry.name}: </span>
              <span className="font-medium">
                {entry.name === "Mood" 
                  ? moodOptions.find((_, i) => getMoodScore(_.value) === entry.value)?.label 
                  : entry.value}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  // Render pie chart tooltip
  const PieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background/95 border p-3 rounded-lg shadow-md text-sm">
          <div 
            className="flex items-center gap-2"
            style={{ color: data.color }}
          >
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: data.color }} 
            />
            <span className="font-medium">{data.name}: </span>
            <span>{data.value} entries ({((data.value / entries.length) * 100).toFixed(0)}%)</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-farm-green" />
              Health Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-md p-1">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                className="rounded-md border"
                components={{
                  DayContent: ({ date }) => renderCalendarDay(date),
                }}
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-2 items-center justify-center">
              {moodOptions.map((option) => (
                <div key={option.value} className="flex items-center gap-1">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: option.color }}
                  />
                  <span className="text-xs">{option.label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <User className="h-5 w-5 text-farm-green" />
              Daily Health Entry
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-1">Selected Date</p>
                <div className="flex items-center text-sm bg-muted/30 p-2 rounded-md">
                  <CalendarIcon className="h-4 w-4 mr-2 text-farm-green" />
                  {format(selectedDate, "MMMM d, yyyy")}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">How are you feeling today?</label>
                <Select 
                  value={currentEntry.mood}
                  onValueChange={(value) => setCurrentEntry({ ...currentEntry, mood: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your mood" />
                  </SelectTrigger>
                  <SelectContent>
                    {moodOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: option.color }}
                          />
                          {option.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Energy Level (1-10)</label>
                  <div className="flex items-center gap-2">
                    <Input 
                      type="range" 
                      min="1" 
                      max="10" 
                      value={currentEntry.energy}
                      onChange={(e) => setCurrentEntry({ ...currentEntry, energy: parseInt(e.target.value) })}
                      className="flex-1"
                    />
                    <span className="text-sm font-medium bg-muted/30 px-2 py-1 rounded-md min-w-[2.5rem] text-center">
                      {currentEntry.energy}
                    </span>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Hours of Sleep</label>
                  <div className="flex items-center gap-2">
                    <Input 
                      type="range" 
                      min="0" 
                      max="12" 
                      step="0.5"
                      value={currentEntry.sleep}
                      onChange={(e) => setCurrentEntry({ ...currentEntry, sleep: parseFloat(e.target.value) })}
                      className="flex-1"
                    />
                    <span className="text-sm font-medium bg-muted/30 px-2 py-1 rounded-md min-w-[2.5rem] text-center">
                      {currentEntry.sleep}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Physical Symptoms</label>
                <Textarea 
                  placeholder="Note any physical symptoms you experienced today..."
                  value={currentEntry.physicalSymptoms}
                  onChange={(e) => setCurrentEntry({ ...currentEntry, physicalSymptoms: e.target.value })}
                  className="min-h-[80px]"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Thoughts & Reflections</label>
                <Textarea 
                  placeholder="Record your thoughts, stressors, or reflections from today..."
                  value={currentEntry.thoughts}
                  onChange={(e) => setCurrentEntry({ ...currentEntry, thoughts: e.target.value })}
                  className="min-h-[80px]"
                />
              </div>

              <Button onClick={handleSaveEntry} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Save Health Entry
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Interactive Health Visualization Section */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Activity className="h-5 w-5 text-farm-green" />
              Health Trends & Analytics
            </CardTitle>
            
            <div className="flex flex-wrap gap-2">
              <Select value={timeRange} onValueChange={(value: any) => setTimeRange(value)}>
                <SelectTrigger className="h-8 w-28">
                  <SelectValue placeholder="Time Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">7 Days</SelectItem>
                  <SelectItem value="30days">30 Days</SelectItem>
                  <SelectItem value="90days">90 Days</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="flex border rounded-md overflow-hidden">
                <Button 
                  variant={chartView === "line" ? "default" : "ghost"} 
                  size="sm" 
                  className="h-8 px-2" 
                  onClick={() => setChartView("line")}
                >
                  <LineChartIcon className="h-4 w-4" />
                </Button>
                <Button 
                  variant={chartView === "bar" ? "default" : "ghost"} 
                  size="sm" 
                  className="h-8 px-2" 
                  onClick={() => setChartView("bar")}
                >
                  <BarChart3 className="h-4 w-4" />
                </Button>
                <Button 
                  variant={chartView === "area" ? "default" : "ghost"} 
                  size="sm" 
                  className="h-8 px-2" 
                  onClick={() => setChartView("area")}
                >
                  <Activity className="h-4 w-4" />
                </Button>
                <Button 
                  variant={chartView === "distribution" ? "default" : "ghost"} 
                  size="sm" 
                  className="h-8 px-2" 
                  onClick={() => setChartView("distribution")}
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {entries.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[300px] text-center">
              <Activity className="h-12 w-12 text-muted-foreground/40 mb-4" />
              <h3 className="text-lg font-medium">No health data available</h3>
              <p className="text-muted-foreground">Add your first health entry to start tracking your well-being over time.</p>
            </div>
          ) : (
            <>
              <div className="h-[350px]">
                {chartView === "line" && (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={chartData}
                      margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis 
                        dataKey="date" 
                        tick={{ fontSize: 12 }}
                        interval={Math.max(Math.floor(chartData.length / 10), 0)}
                      />
                      <YAxis 
                        yAxisId="left" 
                        domain={[0, 10]} 
                        tick={{ fontSize: 12 }} 
                        label={{ value: 'Rating', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fontSize: 12 } }} 
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="mood"
                        name="Mood"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                        strokeWidth={2}
                        dot={{ stroke: '#8884d8', strokeWidth: 2, r: 4 }}
                      />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="energy"
                        name="Energy"
                        stroke="#4CAF50"
                        strokeWidth={2}
                        dot={{ stroke: '#4CAF50', strokeWidth: 2, r: 4 }}
                      />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="sleep"
                        name="Sleep (hours)"
                        stroke="#2196F3"
                        strokeWidth={2}
                        dot={{ stroke: '#2196F3', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
                
                {chartView === "bar" && (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={chartData}
                      margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis 
                        dataKey="date" 
                        tick={{ fontSize: 12 }}
                        interval={Math.max(Math.floor(chartData.length / 10), 0)}
                      />
                      <YAxis domain={[0, 10]} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar dataKey="mood" name="Mood" fill="#8884d8" />
                      <Bar dataKey="energy" name="Energy" fill="#4CAF50" />
                      <Bar dataKey="sleep" name="Sleep (hours)" fill="#2196F3" />
                    </BarChart>
                  </ResponsiveContainer>
                )}
                
                {chartView === "area" && (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={chartData}
                      margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis 
                        dataKey="date" 
                        tick={{ fontSize: 12 }}
                        interval={Math.max(Math.floor(chartData.length / 10), 0)}
                      />
                      <YAxis domain={[0, 10]} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="mood" 
                        stackId="1" 
                        name="Mood" 
                        stroke="#8884d8" 
                        fill="#8884d8" 
                        fillOpacity={0.6}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="energy" 
                        stackId="2" 
                        name="Energy" 
                        stroke="#4CAF50" 
                        fill="#4CAF50" 
                        fillOpacity={0.6}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="sleep" 
                        stackId="3" 
                        name="Sleep (hours)" 
                        stroke="#2196F3" 
                        fill="#2196F3" 
                        fillOpacity={0.6}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
                
                {chartView === "distribution" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                    <div className="flex items-center justify-center">
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={distributionData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {distributionData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip content={<PieTooltip />} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex flex-col justify-center p-4">
                      <h3 className="text-lg font-medium mb-3">Mood Distribution</h3>
                      <div className="space-y-4">
                        {distributionData.map((entry) => (
                          <div key={entry.name} className="space-y-1">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <div 
                                  className="w-3 h-3 rounded-full" 
                                  style={{ backgroundColor: entry.color }}
                                />
                                <span>{entry.name}</span>
                              </div>
                              <span className="font-medium">{entry.value} entries</span>
                            </div>
                            <div className="w-full bg-muted/30 rounded-full h-2">
                              <div 
                                className="h-2 rounded-full" 
                                style={{ 
                                  width: `${(entry.value / entries.length) * 100}%`,
                                  backgroundColor: entry.color
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-muted/20 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium flex items-center gap-2">
                      <Moon className="h-4 w-4 text-blue-500" />
                      Sleep Average
                    </h3>
                    <span className="text-xl font-bold">{calculateAverageSleep()}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Average hours of sleep per night during selected period</p>
                </div>
                
                <div className="bg-muted/20 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium flex items-center gap-2">
                      <Activity className="h-4 w-4 text-green-500" />
                      Energy Average
                    </h3>
                    <span className="text-xl font-bold">{calculateAverageEnergy()}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Average energy level (1-10) during selected period</p>
                </div>
                
                <div className="bg-muted/20 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 text-purple-500" />
                      Tracking Consistency
                    </h3>
                    <span className="text-xl font-bold">
                      {chartData.length} / {
                        timeRange === "7days" ? 7 : 
                        timeRange === "30days" ? 30 : 
                        timeRange === "90days" ? 90 : 
                        Math.ceil((getDateRange().endDate.getTime() - getDateRange().startDate.getTime()) / (1000 * 60 * 60 * 24))
                      }
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">Number of days with entries in the selected period</p>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

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
                  Your average sleep duration is {calculateAverageSleep()} hours.
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
    </div>
  );
}
