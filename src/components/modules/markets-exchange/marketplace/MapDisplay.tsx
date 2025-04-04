
import React, { useState } from 'react';
import { MapIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MarketType } from './data/marketData';
import { useMapbox } from './map/useMapbox';
import { useMapStyles } from './map/MapStyles';
import { MapContainer } from './map/MapContainer';

interface MapDisplayProps {
  filteredMarkets: MarketType[];
  selectedMarket: number | null;
  viewMarketDetails: (id: number) => void;
  mapboxApiKey: string;
  setShowMapKeyInput: (show: boolean) => void;
}

export function MapDisplay({
  filteredMarkets,
  selectedMarket,
  viewMarketDetails,
  mapboxApiKey,
  setShowMapKeyInput
}: MapDisplayProps) {
  // Apply map styles
  useMapStyles();

  // Initialize mapbox
  const { mapContainerRef, mapLoaded } = useMapbox({
    mapboxApiKey,
    filteredMarkets,
    selectedMarket,
    viewMarketDetails,
    setShowMapKeyInput
  });

  // Handle viewport changes for responsive design
  const getMapHeight = () => {
    // Check if we're on mobile
    const isMobile = window.innerWidth < 768;
    return isMobile ? '350px' : '500px';
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <MapIcon className="h-5 w-5" /> Market Map
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 relative">
        <MapContainer 
          mapContainerRef={mapContainerRef}
          isLoading={!mapLoaded}
          height={getMapHeight()}
        />
      </CardContent>
    </Card>
  );
}
