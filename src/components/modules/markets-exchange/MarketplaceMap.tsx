
import React from 'react';
import { FilterControls } from './marketplace/FilterControls';
import { MarketList } from './marketplace/MarketList';
import { MapDisplay } from './marketplace/MapDisplay';
import { MarketDetails } from './marketplace/MarketDetails';
import { MarketDirectionsDialog } from './marketplace/MarketDirectionsDialog';
import { farmMarkets } from './marketplace/data/marketData';
import { useMarketFilters } from './marketplace/hooks/useMarketFilters';
import { useMarketDisplay } from './marketplace/hooks/useMarketDisplay';

export function MarketplaceMap() {
  const {
    filters,
    setters: filterSetters,
    handlers: filterHandlers,
    filteredMarkets
  } = useMarketFilters(farmMarkets);

  const {
    display,
    setters: displaySetters,
    handlers: displayHandlers
  } = useMarketDisplay();

  // Find market by ID for display
  const selectedMarketDetails = display.selectedMarket 
    ? farmMarkets.find(m => m.id === display.selectedMarket)!
    : null;

  return (
    <div className="space-y-6">
      <FilterControls 
        searchTerm={filters.searchTerm}
        setSearchTerm={filterSetters.setSearchTerm}
        showFilters={filters.showFilters}
        setShowFilters={filterSetters.setShowFilters}
        maxDistance={filters.maxDistance}
        setMaxDistance={filterSetters.setMaxDistance}
        selectedProducts={filters.selectedProducts}
        toggleProductFilter={filterHandlers.toggleProductFilter}
        selectedTypes={filters.selectedTypes}
        toggleTypeFilter={filterHandlers.toggleTypeFilter}
        clearFilters={filterHandlers.clearFilters}
        showMapKeyInput={display.showMapKeyInput}
        mapboxApiKey={display.mapboxApiKey}
        updateMapboxApiKey={displayHandlers.updateMapboxApiKey}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MarketList 
          filteredMarkets={filteredMarkets}
          selectedMarket={display.selectedMarket}
          viewMarketDetails={displayHandlers.viewMarketDetails}
          clearFilters={filterHandlers.clearFilters}
        />

        <div className="md:col-span-2">
          <MapDisplay 
            filteredMarkets={filteredMarkets}
            selectedMarket={display.selectedMarket}
            viewMarketDetails={displayHandlers.viewMarketDetails}
            mapboxApiKey={display.mapboxApiKey}
            setShowMapKeyInput={displaySetters.setShowMapKeyInput}
          />

          {selectedMarketDetails && (
            <MarketDetails 
              market={selectedMarketDetails}
              getDirections={displayHandlers.getDirections}
            />
          )}
        </div>
      </div>

      <MarketDirectionsDialog 
        showDirectionsDialog={display.showDirectionsDialog}
        setShowDirectionsDialog={displaySetters.setShowDirectionsDialog}
        selectedMarketForDirections={display.selectedMarketForDirections}
      />
    </div>
  );
}
