
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface FarmingTypeDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  farmingType: {
    name: string;
    description: string;
  } | null;
}

export function FarmingTypeDetailDialog({ 
  open, 
  onOpenChange, 
  farmingType 
}: FarmingTypeDetailDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{farmingType?.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <p>{farmingType?.description}</p>
          <p>
            Additional details about {farmingType?.name} will be available soon. 
            This will include detailed guides, best practices, equipment requirements, 
            and success stories from farmers using this approach.
          </p>
        </div>
        <div className="flex justify-end">
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
