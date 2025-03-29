
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronLeft, ChevronRight, Clock, Plus, Save } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TrackingEvent {
  id: string;
  title: string;
  date: string;
  notes: string;
  category: "past" | "present" | "future";
}

export function TrackingInterface({ moduleName }: { moduleName: string }) {
  const [activeTab, setActiveTab] = useState<"past" | "present" | "future">("present");
  const [events, setEvents] = useState<TrackingEvent[]>(() => {
    const savedEvents = localStorage.getItem(`farm-tracking-${moduleName}`);
    return savedEvents ? JSON.parse(savedEvents) : [
      {
        id: "1",
        title: "Started tracking",
        date: new Date().toISOString().split('T')[0],
        notes: "Initial setup of tracking for this module",
        category: "present"
      }
    ];
  });
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: new Date().toISOString().split('T')[0],
    notes: ""
  });
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const { toast } = useToast();

  const filteredEvents = events.filter(event => event.category === activeTab);

  const handleSaveEvent = () => {
    if (!newEvent.title.trim()) {
      toast({
        title: "Error",
        description: "Event title is required",
        variant: "destructive"
      });
      return;
    }

    const updatedEvents = [
      ...events,
      {
        id: Date.now().toString(),
        ...newEvent,
        category: activeTab
      }
    ];
    
    setEvents(updatedEvents);
    localStorage.setItem(`farm-tracking-${moduleName}`, JSON.stringify(updatedEvents));
    
    setNewEvent({
      title: "",
      date: new Date().toISOString().split('T')[0],
      notes: ""
    });
    
    setIsAddingEvent(false);
    
    toast({
      title: "Event Added",
      description: `Added "${newEvent.title}" to your ${activeTab} tracking`,
    });
  };

  const handleDeleteEvent = (id: string) => {
    const updatedEvents = events.filter(event => event.id !== id);
    setEvents(updatedEvents);
    localStorage.setItem(`farm-tracking-${moduleName}`, JSON.stringify(updatedEvents));
    
    toast({
      title: "Event Removed",
      description: "The tracking event has been removed",
    });
  };

  return (
    <Card className="tracking-interface">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Clock className="h-5 w-5 text-farm-green" />
          {moduleName} Tracking
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="present" onValueChange={(value) => setActiveTab(value as "past" | "present" | "future")}>
          <TabsList className="mb-4 w-full grid grid-cols-3">
            <TabsTrigger value="past">Past</TabsTrigger>
            <TabsTrigger value="present">Present</TabsTrigger>
            <TabsTrigger value="future">Future</TabsTrigger>
          </TabsList>
          
          {["past", "present", "future"].map((tab) => (
            <TabsContent key={tab} value={tab} className="space-y-4">
              {!isAddingEvent ? (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() => setIsAddingEvent(true)}
                >
                  <Plus className="h-4 w-4" />
                  Add {activeTab === "past" ? "Previous" : activeTab === "present" ? "Current" : "Planned"} Event
                </Button>
              ) : (
                <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                  <div>
                    <label htmlFor="event-title" className="text-sm font-medium mb-1 block">
                      Event Title
                    </label>
                    <input
                      id="event-title"
                      className="w-full px-3 py-2 border rounded-md text-sm"
                      placeholder="Enter event title"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="event-date" className="text-sm font-medium mb-1 block">
                      Date
                    </label>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <input
                        id="event-date"
                        type="date"
                        className="px-3 py-2 border rounded-md text-sm"
                        value={newEvent.date}
                        onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                      />
                    </div>
                  </div>
                  
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
                      onClick={() => setIsAddingEvent(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      size="sm"
                      className="flex items-center gap-2"
                      onClick={handleSaveEvent}
                    >
                      <Save className="h-4 w-4" />
                      Save Event
                    </Button>
                  </div>
                </div>
              )}
              
              {filteredEvents.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Event</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEvents.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell className="font-medium">
                          <div>{event.title}</div>
                          {event.notes && (
                            <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                              {event.notes}
                            </div>
                          )}
                        </TableCell>
                        <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => handleDeleteEvent(event.id)}
                          >
                            Remove
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No {activeTab} events recorded yet.</p>
                  <p className="text-sm mt-1">Add your first event to start tracking.</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
