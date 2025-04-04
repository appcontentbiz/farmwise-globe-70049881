
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen, FileText, Users } from "lucide-react";

interface FarmingTypeInfoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  farmingType: {
    title: string;
    description: string;
    details: string;
  } | null;
}

export function FarmingTypeInfoDialog({ 
  open, 
  onOpenChange, 
  farmingType 
}: FarmingTypeInfoDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{farmingType?.title}</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh]">
          <div className="space-y-4">
            <p className="text-muted-foreground">{farmingType?.description}</p>
            <p>{farmingType?.details}</p>
            
            <div className="bg-muted/20 p-4 rounded-md mt-6">
              <h3 className="text-lg font-medium mb-2">Key Resources</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <BookOpen className="h-4 w-4 text-farm-green mt-1" />
                  <span>Getting Started Guide</span>
                </li>
                <li className="flex items-start gap-2">
                  <FileText className="h-4 w-4 text-farm-green mt-1" />
                  <span>Best Practices Documentation</span>
                </li>
                <li className="flex items-start gap-2">
                  <Users className="h-4 w-4 text-farm-green mt-1" />
                  <span>Community Forums</span>
                </li>
              </ul>
            </div>
          </div>
        </ScrollArea>
        
        <div className="flex justify-end">
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
