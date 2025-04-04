
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
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface EventListProps {
  category: "past" | "present" | "future";
  moduleName: string;
}

export function EventList({ category, moduleName }: EventListProps) {
  const { getFilteredEvents, deleteEvent } = useTracking();
  const filteredEvents = getFilteredEvents(category);
  const [deletingIds, setDeletingIds] = useState<string[]>([]);

  const handleDeleteEvent = async (id: string) => {
    try {
      setDeletingIds(prev => [...prev, id]);
      await deleteEvent(id, moduleName);
    } catch (error) {
      console.error("Error deleting event:", error);
    } finally {
      setDeletingIds(prev => prev.filter(itemId => itemId !== id));
    }
  };

  if (filteredEvents.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>No {category} events recorded yet.</p>
        <p className="text-sm mt-1">Add your first event to start tracking.</p>
      </div>
    );
  }

  return (
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
        {filteredEvents.map((event) => (
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
  );
}
