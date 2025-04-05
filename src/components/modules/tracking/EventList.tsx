
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTracking } from "./TrackingContext";
import { getTypeLabel } from "./types";
import { useState, useEffect } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

interface EventListProps {
  category: "past" | "present" | "future";
  moduleName: string;
}

export function EventList({ category, moduleName }: EventListProps) {
  const { getFilteredEvents, deleteEvent, refreshEvents } = useTracking();
  const [deletingIds, setDeletingIds] = useState<string[]>([]);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const { toast } = useToast();
  const [events, setEvents] = useState(getFilteredEvents(category));
  
  // Update events when the category changes or when tracking context changes
  useEffect(() => {
    setEvents(getFilteredEvents(category));
  }, [getFilteredEvents, category]);
  
  // Clear error after 5 seconds
  useEffect(() => {
    if (deleteError) {
      const timer = setTimeout(() => setDeleteError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [deleteError]);

  const handleDeleteEvent = async (id: string) => {
    try {
      // Skip if already deleting this ID
      if (deletingIds.includes(id)) {
        return;
      }
      
      setDeleteError(null);
      setDeletingIds(prev => [...prev, id]);
      
      console.log(`[DELETION DEBUG] Initiating delete for event: ${id} in module: ${moduleName}`);
      
      // Optimistically remove from UI first
      setEvents(current => current.filter(event => event.id !== id));
      
      const success = await deleteEvent(id, moduleName);
      
      if (!success) {
        setDeleteError(`Failed to delete event. Please try again.`);
        console.error(`[DELETION DEBUG] Delete operation failed for event: ${id}`);
        
        // Refresh to ensure UI matches backend state
        const refreshedEvents = getFilteredEvents(category);
        setEvents(refreshedEvents);
        
        toast({
          title: "Delete Failed",
          description: "The event could not be removed. Please try again.",
          variant: "destructive"
        });
      } else {
        console.log(`[DELETION DEBUG] Event deleted successfully: ${id}`);
        // Make sure our local state matches what's in the tracking context
        setEvents(getFilteredEvents(category));
        
        toast({
          title: "Event Deleted",
          description: "The event has been successfully removed"
        });
      }
      
      // Always refresh events after deletion attempt to ensure UI is in sync with database
      await refreshEvents();
      // Update our local events again after refresh
      setEvents(getFilteredEvents(category));
      
    } catch (error) {
      console.error("[DELETION DEBUG] Error in delete handler:", error);
      setDeleteError(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
      
      // Refresh to ensure UI matches backend state
      setEvents(getFilteredEvents(category));
    } finally {
      setDeletingIds(prev => prev.filter(itemId => itemId !== id));
    }
  };

  // This ensures we're always showing the latest data
  useEffect(() => {
    const refreshData = async () => {
      await refreshEvents();
      setEvents(getFilteredEvents(category));
    };
    
    refreshData();
  }, [category, moduleName]);

  if (events.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>No {category} events recorded yet.</p>
        <p className="text-sm mt-1">Add your first event to start tracking.</p>
      </div>
    );
  }

  return (
    <>
      {deleteError && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{deleteError}</AlertDescription>
        </Alert>
      )}
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Event</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.id}>
              <TableCell className="font-medium">
                <div>{event.title}</div>
                {event.notes && (
                  <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {event.notes}
                  </div>
                )}
                {(event.type === "learning" || event.type === "goal") && event.progress !== undefined && (
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Progress</span>
                      <span>{event.progress}%</span>
                    </div>
                    <div className="w-full bg-muted/20 rounded-full h-1.5">
                      <div 
                        className="bg-farm-green h-1.5 rounded-full" 
                        style={{ width: `${event.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </TableCell>
              <TableCell>{event.type ? getTypeLabel(event.type) : "General"}</TableCell>
              <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => handleDeleteEvent(event.id)}
                  disabled={deletingIds.includes(event.id)}
                >
                  {deletingIds.includes(event.id) ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Remove"
                  )}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
