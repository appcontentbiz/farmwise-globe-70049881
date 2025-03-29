
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
} from "recharts";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

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
  const { toast } = useToast();

  // Generate last 30 days data for the chart
  const last30DaysData = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - 29 + i);
    const dateString = format(date, "MMM dd");
    
    const entry = entries.find(
      (e) => format(new Date(e.date), "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
    );
    
    return {
      date: dateString,
      mood: entry ? moodOptions.findIndex(m => m.value === entry.mood) * 2 + 1 : null,
      energy: entry?.energy || null,
      sleep: entry?.sleep || null,
    };
  });

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

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Heart className="h-5 w-5 text-farm-green" />
            Health Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={last30DaysData}
                margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  interval={Math.floor(last30DaysData.length / 10)}
                />
                <YAxis 
                  yAxisId="left" 
                  domain={[0, 10]} 
                  tick={{ fontSize: 12 }} 
                  label={{ value: 'Rating (1-10)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fontSize: 12 } }} 
                />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="mood"
                  name="Mood"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                  connectNulls
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="energy"
                  name="Energy"
                  stroke="#4CAF50"
                  connectNulls
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="sleep"
                  name="Sleep (hours)"
                  stroke="#2196F3"
                  connectNulls
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
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
                  Your average sleep duration is {entries.length > 0 ? (entries.reduce((sum, entry) => sum + entry.sleep, 0) / entries.length).toFixed(1) : "N/A"} hours.
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
