
import { useState, useEffect } from "react";
import { CalendarIcon, Save, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useTracking } from "./TrackingContext";
import { eventTypeOptions } from "./types";
import { validateEventForm, getEventActionMessage } from "./hooks/trackingUtils";
import { useToast } from "@/hooks/use-toast";

interface EventFormProps {
  activeTab: "past" | "present" | "future";
  onCancel: () => void;
  moduleName: string;
}

export function EventForm({ activeTab, onCancel, moduleName }: EventFormProps) {
  const { addEvent } = useTracking();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: new Date().toISOString().split('T')[0],
    notes: "",
    type: "activity",
    progress: 0,
    category: activeTab
  });

  // Update category when activeTab changes
  useEffect(() => {
    setNewEvent(prev => ({ ...prev, category: activeTab }));
  }, [activeTab]);

  const handleSaveEvent = async () => {
    // Clear previous validation errors
    setValidationError(null);
    
    // Validate form before submission
    const validation = validateEventForm(newEvent);
    if (!validation.isValid) {
      setValidationError(validation.message || "Please check your form inputs");
      const errorMsg = getEventActionMessage("validate", undefined, undefined, validation.message);
      toast({
        title: errorMsg.title,
        description: errorMsg.description,
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      const result = await addEvent({
        title: newEvent.title,
        date: newEvent.date,
        notes: newEvent.notes,
        type: newEvent.type,
        progress: newEvent.progress,
        category: activeTab
      }, moduleName);

      if (result) {
        setNewEvent({
          title: "",
          date: new Date().toISOString().split('T')[0],
          notes: "",
          type: "activity",
          progress: 0,
          category: activeTab
        });
        
        onCancel();
      } else {
        // This will be handled by the error in the catch block or in the useTrackingEvents hook
        throw new Error("Failed to save event");
      }
    } catch (error: any) {
      console.error("Error saving event:", error);
      setValidationError(error.message || "Failed to save event. Please try again.");
      toast({
        title: "Save Failed",
        description: error.message || "There was a problem saving your event",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-muted/50 p-4 rounded-lg space-y-3">
      {validationError && (
        <Alert variant="destructive" className="py-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{validationError}</AlertDescription>
        </Alert>
      )}
      
      <div>
        <label htmlFor="event-title" className="text-sm font-medium mb-1 block">
          Event Title <span className="text-destructive">*</span>
        </label>
        <Input
          id="event-title"
          placeholder="Enter event title"
          value={newEvent.title}
          onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
          required
          aria-required="true"
        />
      </div>
      
      <div>
        <label htmlFor="event-type" className="text-sm font-medium mb-1 block">
          Event Type <span className="text-destructive">*</span>
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
          Date <span className="text-destructive">*</span>
        </label>
        <div className="flex items-center">
          <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
          <Input
            id="event-date"
            type="date"
            value={newEvent.date}
            onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
            required
            aria-required="true"
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
              className="bg-farm-green h-2 rounded-full transition-all duration-300" 
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
          type="button"
        >
          Cancel
        </Button>
        <Button 
          size="sm"
          className="flex items-center gap-2"
          onClick={handleSaveEvent}
          disabled={isSubmitting}
          type="button"
        >
          <Save className="h-4 w-4" />
          {isSubmitting ? "Saving..." : "Save Event"}
        </Button>
      </div>
    </div>
  );
}
