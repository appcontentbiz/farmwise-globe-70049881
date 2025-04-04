
import React, { useState } from 'react';
import { MapIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MarketType } from './data/marketData';
import { useMapbox } from './map/useMapbox';
import { useMapStyles } from './map/MapStyles';
import { MapContainer } from './map/MapContainer';
import { PaginationControls } from '@/components/ui/pagination-controls';

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
  
  // State for pagination
  const [currentMapPage, setCurrentMapPage] = useState(1);
  const marketsPerPage = 5;
  const totalMapPages = Math.ceil(filteredMarkets.length / marketsPerPage);
  
  // Get current visible markets
  const currentMarkets = filteredMarkets.slice(
    (currentMapPage - 1) * marketsPerPage,
    currentMapPage * marketsPerPage
  );

  // Initialize mapbox
  const { mapContainerRef, mapLoaded, mapError } = useMapbox({
    filteredMarkets: currentMarkets,
    selectedMarket,
    mapboxApiKey,
    onMarketSelect: viewMarketDetails,
    viewMarketDetails,
    setShowMapKeyInput
  });

  // Handle pagination
  const handlePreviousPage = () => {
    if (currentMapPage > 1) {
      setCurrentMapPage(currentMapPage - 1);
    }
  };
  
  const handleNextPage = () => {
    if (currentMapPage < totalMapPages) {
      setCurrentMapPage(currentMapPage + 1);
    }
  };

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
        {mapError && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/90">
            <div className="text-center p-4">
              <p className="text-error mb-2">{mapError}</p>
              <button 
                className="text-primary underline text-sm"
                onClick={() => setShowMapKeyInput(true)}
              >
                Update API Key
              </button>
            </div>
          </div>
        )}
        
        {filteredMarkets.length > marketsPerPage && (
          <div className="bg-background/90 p-3 border-t">
            <PaginationControls
              currentPage={currentMapPage}
              totalPages={totalMapPages}
              onPrevious={handlePreviousPage}
              onNext={handleNextPage}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
