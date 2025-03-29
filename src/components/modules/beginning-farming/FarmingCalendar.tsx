
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { format, addDays, startOfDay, isWithinInterval } from "date-fns";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  type: string;
}

export function FarmingCalendar() {
  const [date, setDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>(() => {
    const savedEvents = localStorage.getItem("farm-tracking-Beginning Farming");
    if (!savedEvents) return [];
    
    // Transform the saved events into CalendarEvent format
    return JSON.parse(savedEvents).map((event: any) => ({
      id: event.id,
      title: event.title,
      date: new Date(event.date),
      type: event.type || "activity"
    }));
  });

  // Create a custom day render function to show events
  const renderDay = (day: Date) => {
    const dayEvents = events.filter(event => 
      startOfDay(new Date(event.date)).getTime() === startOfDay(day).getTime()
    );
    
    if (dayEvents.length === 0) return null;
    
    // Get unique event types for the day
    const uniqueTypes = [...new Set(dayEvents.map(event => event.type))];
    
    return (
      <div className="relative w-full h-full flex justify-center">
        <div className="absolute -bottom-1">
          {uniqueTypes.map((type, index) => {
            let color;
            switch(type) {
              case "activity": color = "bg-blue-500"; break;
              case "learning": color = "bg-green-500"; break;
              case "goal": color = "bg-amber-500"; break;
              case "note": color = "bg-purple-500"; break;
              case "milestone": color = "bg-red-500"; break;
              default: color = "bg-gray-500";
            }
            
            return (
              <div 
                key={index} 
                className={`${color} w-1.5 h-1.5 rounded-full inline-block mx-0.5`} 
              />
            );
          })}
        </div>
      </div>
    );
  };

  const getDayEventsContent = (day: Date) => {
    const dayEvents = events.filter(event => 
      startOfDay(new Date(event.date)).getTime() === startOfDay(day).getTime()
    );
    
    if (dayEvents.length === 0) return "No events for this day";
    
    return (
      <div className="space-y-2 max-h-60 overflow-y-auto">
        {dayEvents.map(event => {
          let badgeColor;
          switch(event.type) {
            case "activity": badgeColor = "bg-blue-100 text-blue-800"; break;
            case "learning": badgeColor = "bg-green-100 text-green-800"; break;
            case "goal": badgeColor = "bg-amber-100 text-amber-800"; break;
            case "note": badgeColor = "bg-purple-100 text-purple-800"; break;
            case "milestone": badgeColor = "bg-red-100 text-red-800"; break;
            default: badgeColor = "bg-gray-100 text-gray-800";
          }
          
          return (
            <div key={event.id} className="border-b pb-2 last:border-b-0">
              <div className="flex items-center justify-between">
                <span className="font-medium">{event.title}</span>
                <Badge variant="outline" className={badgeColor}>
                  {event.type}
                </Badge>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-xl">
          <CalendarIcon className="h-5 w-5 text-farm-green" />
          Farming Activity Calendar
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap justify-center max-w-full">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(newDate) => newDate && setDate(newDate)}
            className="pointer-events-auto"
            components={{
              DayContent: (props) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" className="h-9 w-9 p-0 font-normal">
                      <div className="flex flex-col items-center justify-center">
                        <span>{format(props.date, "d")}</span>
                        {renderDay(props.date)}
                      </div>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-3" align="center">
                    <div className="space-y-2">
                      <div className="font-medium">{format(props.date, "MMMM d, yyyy")}</div>
                      {getDayEventsContent(props.date)}
                    </div>
                  </PopoverContent>
                </Popover>
              ),
            }}
          />
        </div>
        <div className="mt-4 flex justify-center items-center gap-2">
          <div className="flex items-center mr-4">
            <div className="bg-blue-500 w-3 h-3 rounded-full mr-1"></div>
            <span className="text-xs">Activities</span>
          </div>
          <div className="flex items-center mr-4">
            <div className="bg-green-500 w-3 h-3 rounded-full mr-1"></div>
            <span className="text-xs">Learning</span>
          </div>
          <div className="flex items-center mr-4">
            <div className="bg-amber-500 w-3 h-3 rounded-full mr-1"></div>
            <span className="text-xs">Goals</span>
          </div>
          <div className="flex items-center mr-4">
            <div className="bg-purple-500 w-3 h-3 rounded-full mr-1"></div>
            <span className="text-xs">Notes</span>
          </div>
          <div className="flex items-center">
            <div className="bg-red-500 w-3 h-3 rounded-full mr-1"></div>
            <span className="text-xs">Milestones</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
