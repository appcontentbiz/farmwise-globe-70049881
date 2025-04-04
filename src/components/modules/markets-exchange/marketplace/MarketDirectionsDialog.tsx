
import React from 'react';
import { Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from '@/hooks/use-toast';
import { MarketType } from '../MarketplaceMap';

interface MarketDirectionsDialogProps {
  showDirectionsDialog: boolean;
  setShowDirectionsDialog: (show: boolean) => void;
  selectedMarketForDirections: MarketType | null;
}

export function MarketDirectionsDialog({
  showDirectionsDialog,
  setShowDirectionsDialog,
  selectedMarketForDirections
}: MarketDirectionsDialogProps) {
  const { toast } = useToast();

  // Handle navigating to the market
  const navigateToMarket = () => {
    if (!selectedMarketForDirections) return;
    
    toast({
      title: "Getting Directions",
      description: `Finding the best route to ${selectedMarketForDirections.name}`,
    });
    
    // In a real app, this would integrate with a maps API to get directions
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedMarketForDirections.location)}`, '_blank');
    setShowDirectionsDialog(false);
  };

  return (
    <Dialog open={showDirectionsDialog} onOpenChange={setShowDirectionsDialog}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Get Directions</DialogTitle>
          <DialogDescription>
            Navigate to {selectedMarketForDirections?.name}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-4 py-4">
          <div className="flex flex-col space-y-2">
            <h4 className="font-medium">Destination</h4>
            <p>{selectedMarketForDirections?.location}</p>
          </div>
          <div className="flex flex-col space-y-2">
            <h4 className="font-medium">Market Hours</h4>
            <p>{selectedMarketForDirections?.hours}</p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowDirectionsDialog(false)}>
            Cancel
          </Button>
          <Button onClick={navigateToMarket} className="flex items-center gap-2">
            <Navigation className="h-4 w-4" /> Navigate Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
