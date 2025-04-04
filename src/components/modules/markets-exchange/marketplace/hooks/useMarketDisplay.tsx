
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { MarketType } from '../data/marketData';

export function useMarketDisplay() {
  const [selectedMarket, setSelectedMarket] = useState<number | null>(null);
  const [mapboxApiKey, setMapboxApiKey] = useState<string>("pk.eyJ1IjoibG92YWJsZWFpIiwiYSI6ImNsdDc5Y2JlYTA2MTgyanBkd2phMmh3NDEifQ.7OaFUrTYgMTRqaO3hxSkuw");
  const [showMapKeyInput, setShowMapKeyInput] = useState(false);
  const [showDirectionsDialog, setShowDirectionsDialog] = useState(false);
  const [selectedMarketForDirections, setSelectedMarketForDirections] = useState<MarketType | null>(null);

  // Handle market selection
  const viewMarketDetails = (id: number) => {
    setSelectedMarket(id === selectedMarket ? null : id);
  };

  // Get directions to market
  const getDirections = (market: MarketType) => {
    setSelectedMarketForDirections(market);
    setShowDirectionsDialog(true);
  };

  // Update Mapbox API key
  const updateMapboxApiKey = (newKey: string) => {
    if (newKey) {
      setMapboxApiKey(newKey);
      setShowMapKeyInput(false);
      
      toast({
        title: "API Key Updated",
        description: "The map will reload with your Mapbox API key.",
      });
    }
  };
  
  return {
    display: {
      selectedMarket,
      mapboxApiKey,
      showMapKeyInput,
      showDirectionsDialog,
      selectedMarketForDirections
    },
    setters: {
      setShowMapKeyInput,
      setShowDirectionsDialog
    },
    handlers: {
      viewMarketDetails,
      getDirections,
      updateMapboxApiKey
    }
  };
}
