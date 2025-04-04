
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, Save, User } from "lucide-react";
import { MoodEntry } from "./types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { moodOptions } from "./types";

interface DailyEntryFormProps {
  selectedDate: Date;
  currentEntry: Omit<MoodEntry, "date">;
  onEntryChange: (value: Omit<MoodEntry, "date">) => void;
  onSave: () => boolean;
}

export const DailyEntryForm = ({
  selectedDate,
  currentEntry,
  onEntryChange,
  onSave
}: DailyEntryFormProps) => {
  const { toast } = useToast();
  
  const handleSaveClick = () => {
    const saved = onSave();
    if (saved) {
      toast({
        title: "Health Entry Saved",
        description: `Your health data for ${format(selectedDate, "MMMM d, yyyy")} has been saved.`,
      });
    }
  };

  return (
    <Card className="xl:col-span-2">
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
              onValueChange={(value) => onEntryChange({ ...currentEntry, mood: value })}
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
                  onChange={(e) => onEntryChange({ ...currentEntry, energy: parseInt(e.target.value) })}
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
                  onChange={(e) => onEntryChange({ ...currentEntry, sleep: parseFloat(e.target.value) })}
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
              onChange={(e) => onEntryChange({ ...currentEntry, physicalSymptoms: e.target.value })}
              className="min-h-[80px]"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Thoughts & Reflections</label>
            <Textarea 
              placeholder="Record your thoughts, stressors, or reflections from today..."
              value={currentEntry.thoughts}
              onChange={(e) => onEntryChange({ ...currentEntry, thoughts: e.target.value })}
              className="min-h-[80px]"
            />
          </div>

          <Button onClick={handleSaveClick} className="w-full">
            <Save className="h-4 w-4 mr-2" />
            Save Health Entry
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
