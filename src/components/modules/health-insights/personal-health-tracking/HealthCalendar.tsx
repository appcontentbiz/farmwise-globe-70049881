
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";
import { MoodEntry } from "./types";
import { getMoodColor } from "./types";

interface HealthCalendarProps {
  selectedDate: Date;
  entries: MoodEntry[];
  onDateSelect: (date: Date | undefined) => void;
}

export const HealthCalendar = ({ selectedDate, entries, onDateSelect }: HealthCalendarProps) => {
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
    <Card className="xl:col-span-1 overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-farm-green" />
          Health Calendar
        </CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <div className="border rounded-md p-1 min-w-[280px]">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={onDateSelect}
            className="rounded-md border"
            components={{
              DayContent: ({ date }) => renderCalendarDay(date),
            }}
          />
        </div>
        <div className="mt-4 flex flex-wrap gap-2 items-center justify-center">
          {[
            { value: "great", label: "Great", color: "#4CAF50" },
            { value: "good", label: "Good", color: "#8BC34A" },
            { value: "okay", label: "Okay", color: "#FFC107" },
            { value: "low", label: "Low", color: "#FF9800" },
            { value: "bad", label: "Bad", color: "#F44336" },
          ].map((option) => (
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
  );
};
