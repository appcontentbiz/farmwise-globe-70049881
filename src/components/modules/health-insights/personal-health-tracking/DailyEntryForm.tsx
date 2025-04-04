
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { MoodEntry } from "./types";
import { MoodSelector } from "./MoodSelector";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface DailyEntryFormProps {
  selectedDate: Date;
  currentEntry: Omit<MoodEntry, "date">;
  onEntryChange: (entry: Omit<MoodEntry, "date">) => void;
  onSave: () => Promise<boolean> | boolean;
  isSaving?: boolean;
}

export function DailyEntryForm({
  selectedDate,
  currentEntry,
  onEntryChange,
  onSave,
  isSaving = false,
}: DailyEntryFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSave = async () => {
    try {
      setIsSubmitting(true);
      const result = await onSave();
      
      if (result) {
        toast({
          title: "Entry Saved",
          description: "Your health entry has been saved successfully",
        });
      }
    } catch (error) {
      console.error("Error saving entry:", error);
      toast({
        title: "Error",
        description: "Failed to save your health entry",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="col-span-2">
      <CardHeader className="pb-2">
        <CardTitle>
          Daily Check-in: {format(selectedDate, "MMMM d, yyyy")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label className="text-base mb-2 block">How are you feeling today?</Label>
            <MoodSelector
              selectedMood={currentEntry.mood}
              onChange={(mood) =>
                onEntryChange({ ...currentEntry, mood })
              }
            />
          </div>

          <div>
            <Label className="text-base mb-2 block">
              Energy Level: {currentEntry.energy}/10
            </Label>
            <Slider
              value={[currentEntry.energy]}
              min={1}
              max={10}
              step={1}
              onValueChange={(values) =>
                onEntryChange({ ...currentEntry, energy: values[0] })
              }
              className="my-4"
            />
          </div>

          <div>
            <Label className="text-base mb-2 block">
              Hours of Sleep: {currentEntry.sleep}
            </Label>
            <Slider
              value={[currentEntry.sleep]}
              min={0}
              max={12}
              step={0.5}
              onValueChange={(values) =>
                onEntryChange({ ...currentEntry, sleep: values[0] })
              }
              className="my-4"
            />
          </div>

          <div>
            <Label htmlFor="physical" className="text-base mb-2 block">
              Physical Symptoms (if any)
            </Label>
            <Textarea
              id="physical"
              placeholder="Headache, fatigue, muscle pain, etc."
              value={currentEntry.physicalSymptoms}
              onChange={(e) =>
                onEntryChange({
                  ...currentEntry,
                  physicalSymptoms: e.target.value,
                })
              }
              className="mb-4 resize-none"
            />
          </div>

          <div>
            <Label htmlFor="thoughts" className="text-base mb-2 block">
              Notes & Thoughts
            </Label>
            <Textarea
              id="thoughts"
              placeholder="How did your day go? Any specific events affecting your wellbeing?"
              value={currentEntry.thoughts}
              onChange={(e) =>
                onEntryChange({
                  ...currentEntry,
                  thoughts: e.target.value,
                })
              }
              className="resize-none"
            />
          </div>

          <div className="flex justify-end">
            <Button 
              onClick={handleSave} 
              disabled={isSubmitting || isSaving}
              className="w-full sm:w-auto"
            >
              {(isSubmitting || isSaving) ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Entry"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
