
import { useEffect, useState } from "react";
import { TrashIcon } from "lucide-react";
import { format } from "date-fns";
import { useTracking } from "./TrackingContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TrackingEvent } from "./types";
import { Skeleton } from "@/components/ui/skeleton";

interface EventListProps {
  category: "past" | "present" | "future";
  moduleName: string;
}

export function EventList({ category, moduleName }: EventListProps) {
  const { getFilteredEvents, deleteEvent, loading } = useTracking();
  const [localEvents, setLocalEvents] = useState<TrackingEvent[]>([]);
  const [isDeleting, setIsDeleting] = useState<{[key: string]: boolean}>({});
  
  // Update local state when filtered events change
  useEffect(() => {
    setLocalEvents(getFilteredEvents(category));
  }, [getFilteredEvents, category]);
  
  const handleDelete = async (id: string) => {
    try {
      console.log(`[DELETION DEBUG] EventList: Delete requested for event ${id}`);
      
      // Track deletion state for this specific event
      setIsDeleting(prev => ({ ...prev, [id]: true }));
      
      // Optimistically remove from local state
      setLocalEvents(current => current.filter(event => event.id !== id));
      
      const success = await deleteEvent(id, moduleName);
      
      if (!success) {
        console.error(`[DELETION DEBUG] EventList: Delete failed for event ${id}`);
        // If deletion failed, fetch fresh data
        setLocalEvents(getFilteredEvents(category));
      } else {
        console.log(`[DELETION DEBUG] EventList: Delete succeeded for event ${id}`);
      }
    } catch (error) {
      console.error("[DELETION DEBUG] Error in handleDelete:", error);
    } finally {
      setIsDeleting(prev => ({ ...prev, [id]: false }));
    }
  };
  
  if (loading) {
    return (
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <Skeleton className="h-5 w-2/3 mb-2" />
              <Skeleton className="h-4 w-1/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
  
  if (localEvents.length === 0) {
    return (
      <Card>
        <CardContent className="p-4 text-center text-muted-foreground">
          No {category === "past" ? "past" : category === "present" ? "current" : "future"} events found.
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="space-y-2">
      {localEvents.map((event) => (
        <Card key={event.id} className="animate-fade-in">
          <CardContent className="p-4 flex justify-between items-start">
            <div className="space-y-1">
              <h3 className="font-medium">{event.title}</h3>
              <p className="text-sm text-muted-foreground">
                {format(new Date(event.date), "PPP")}
              </p>
              {event.notes && (
                <p className="text-sm mt-2">{event.notes}</p>
              )}
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-muted-foreground hover:text-destructive"
              onClick={() => handleDelete(event.id)}
              disabled={isDeleting[event.id]}
            >
              {isDeleting[event.id] ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
              ) : (
                <TrashIcon className="h-4 w-4" />
              )}
              <span className="sr-only">Delete</span>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
