
import { useState } from "react";
import { CalendarIcon, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTracking } from "./TrackingContext";
import { eventTypeOptions } from "./types";

interface EventFormProps {
  activeTab: "past" | "present" | "future";
  onCancel: () => void;
  moduleName: string;
}

export function EventForm({ activeTab, onCancel, moduleName }: EventFormProps) {
  const { addEvent } = useTracking();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: new Date().toISOString().split('T')[0],
    notes: "",
    type: "activity",
    progress: 0,
    category: activeTab
  });

  const handleSaveEvent = async () => {
    if (!newEvent.title.trim()) {
      return;
    }

    try {
      setIsSubmitting(true);
      
      await addEvent({
        title: newEvent.title,
        date: newEvent.date,
        notes: newEvent.notes,
        type: newEvent.type,
        progress: newEvent.progress,
        category: activeTab
      }, moduleName);

      setNewEvent({
        title: "",
        date: new Date().toISOString().split('T')[0],
        notes: "",
        type: "activity",
        progress: 0,
        category: activeTab
      });
      
      onCancel();
    } catch (error) {
      console.error("Error saving event:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-muted/50 p-4 rounded-lg space-y-3">
      <div>
        <label htmlFor="event-title" className="text-sm font-medium mb-1 block">
          Event Title
        </label>
        <Input
          id="event-title"
          placeholder="Enter event title"
          value={newEvent.title}
          onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
        />
      </div>
      
      <div>
        <label htmlFor="event-type" className="text-sm font-medium mb-1 block">
          Event Type
        </label>
        <Select 
          value={newEvent.type} 
          onValueChange={(value) => setNewEvent({...newEvent, type: value})}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            {eventTypeOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <label htmlFor="event-date" className="text-sm font-medium mb-1 block">
          Date
        </label>
        <div className="flex items-center">
          <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
          <Input
            id="event-date"
            type="date"
            value={newEvent.date}
            onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
          />
        </div>
      </div>
      
      {(newEvent.type === "learning" || newEvent.type === "goal") && (
        <div>
          <label htmlFor="event-progress" className="text-sm font-medium mb-1 block">
            Progress (%)
          </label>
          <Input
            id="event-progress"
            type="number"
            min="0"
            max="100"
            value={newEvent.progress}
            onChange={(e) => setNewEvent({
              ...newEvent, 
              progress: Math.max(0, Math.min(100, parseInt(e.target.value) || 0))
            })}
          />
          <div className="w-full bg-muted/20 rounded-full h-2 mt-2">
            <div 
              className="bg-farm-green h-2 rounded-full" 
              style={{ width: `${newEvent.progress}%` }}
            ></div>
          </div>
        </div>
      )}
      
      <div>
        <label htmlFor="event-notes" className="text-sm font-medium mb-1 block">
          Notes
        </label>
        <Textarea
          id="event-notes"
          placeholder="Add any additional details..."
          value={newEvent.notes}
          onChange={(e) => setNewEvent({...newEvent, notes: e.target.value})}
          className="min-h-[100px]"
        />
      </div>
      
      <div className="flex justify-end gap-2 pt-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button 
          size="sm"
          className="flex items-center gap-2"
          onClick={handleSaveEvent}
          disabled={isSubmitting}
        >
          <Save className="h-4 w-4" />
          {isSubmitting ? "Saving..." : "Save Event"}
        </Button>
      </div>
    </div>
  );
}
