import React, { useState } from 'react';
import { FilterControls } from './marketplace/FilterControls';
import { MarketList } from './marketplace/MarketList';
import { MapDisplay } from './marketplace/MapDisplay';
import { MarketDetails } from './marketplace/MarketDetails';
import { MarketDirectionsDialog } from './marketplace/MarketDirectionsDialog';
import { toast } from '@/hooks/use-toast';

// Sample data for farm markets
const farmMarkets = [
  {
    id: 1,
    name: "Central Valley Farmers Market",
    description: "Weekly farmers market with fresh produce, handcrafted goods, and local food vendors.",
    location: "101 Main Street, Greenfield",
    distance: 3.2,
    type: "weekly",
    products: ["vegetables", "fruits", "dairy", "crafts"],
    hours: "Saturday & Sunday, 8am-2pm",
    coordinates: { lat: 33.523, lng: -86.813 },
    phone: "(555) 123-4567",
    website: "www.centralvalleyfarmersmarket.com"
  },
  {
    id: 2,
    name: "Riverside Organic Exchange",
    description: "Certified organic market with a focus on sustainable farming practices.",
    location: "1420 River Road, Meadowbrook",
    distance: 7.8,
    type: "daily",
    products: ["vegetables", "fruits", "organic", "honey"],
    hours: "Monday-Friday, 10am-6pm",
    coordinates: { lat: 33.343, lng: -86.733 },
    phone: "(555) 987-6543",
    website: "www.riversideorganic.com"
  },
  {
    id: 3,
    name: "Heritage Farm Co-op",
    description: "Farmer-owned cooperative selling direct to consumers at wholesale prices.",
    location: "78 Heritage Lane, Oldtown",
    distance: 12.4,
    type: "co-op",
    products: ["vegetables", "meats", "grains", "eggs"],
    hours: "Tuesday & Thursday, 9am-5pm",
    coordinates: { lat: 33.223, lng: -86.903 },
    phone: "(555) 456-7890",
    website: "www.heritagefarmcoop.org"
  },
  {
    id: 4,
    name: "Downtown Farm Stand",
    description: "Urban market featuring seasonal produce from farms within 50 miles.",
    location: "500 Center Street, Downtown",
    distance: 1.5,
    type: "daily",
    products: ["vegetables", "fruits", "flowers", "prepared"],
    hours: "Daily, 7am-7pm",
    coordinates: { lat: 33.513, lng: -86.793 },
    phone: "(555) 234-5678",
    website: "www.downtownfarmstand.com"
  },
  {
    id: 5,
    name: "Mountain View Farmers Exchange",
    description: "Scenic market with panoramic views and local farm products.",
    location: "6700 Mountain Road, Highridge",
    distance: 18.7,
    type: "weekly",
    products: ["vegetables", "crafts", "honey", "jams"],
    hours: "Sunday, 10am-4pm",
    coordinates: { lat: 33.673, lng: -87.013 },
    phone: "(555) 876-5432",
    website: "www.mountainviewfarmers.com"
  }
];

// Product categories for filtering
export const productCategories = [
  { id: "vegetables", label: "Vegetables" },
  { id: "fruits", label: "Fruits" },
  { id: "dairy", label: "Dairy" },
  { id: "meats", label: "Meats" },
  { id: "honey", label: "Honey" },
  { id: "organic", label: "Organic" },
  { id: "crafts", label: "Crafts" },
  { id: "flowers", label: "Flowers" },
  { id: "grains", label: "Grains" },
  { id: "eggs", label: "Eggs" },
  { id: "jams", label: "Jams/Preserves" },
  { id: "prepared", label: "Prepared Foods" }
];

// Market types for filtering
export const marketTypes = [
  { id: "weekly", label: "Weekly Markets" },
  { id: "daily", label: "Daily Markets" },
  { id: "co-op", label: "Co-ops" }
];

// Define a proper MapboxMap type
export type MapboxMap = {
  remove: () => void;
  on: (event: string, callback: Function) => void;
  addControl: (control: any, position?: string) => void;
  getCenter: () => { lng: number; lat: number };
  getZoom: () => number;
  easeTo: (options: any) => void;
  flyTo: (options: any) => void;
};

export type MarketType = typeof farmMarkets[0];

export function MarketplaceMap() {
  const [maxDistance, setMaxDistance] = useState<number>(20);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedMarket, setSelectedMarket] = useState<number | null>(null);
  const [mapboxApiKey, setMapboxApiKey] = useState<string>("pk.eyJ1IjoibG92YWJsZWFpIiwiYSI6ImNsdDc5Y2JlYTA2MTgyanBkd2phMmh3NDEifQ.7OaFUrTYgMTRqaO3hxSkuw");
  const [showMapKeyInput, setShowMapKeyInput] = useState(false);
  const [showDirectionsDialog, setShowDirectionsDialog] = useState(false);
  const [selectedMarketForDirections, setSelectedMarketForDirections] = useState<MarketType | null>(null);

  // Filter markets based on user selection
  const filteredMarkets = farmMarkets.filter(market => {
    // Filter by distance
    if (market.distance > maxDistance) return false;
    
    // Filter by search term
    if (searchTerm && !market.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !market.location.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    
    // Filter by product categories
    if (selectedProducts.length > 0 && 
        !selectedProducts.some(product => market.products.includes(product))) return false;
    
    // Filter by market type
    if (selectedTypes.length > 0 && 
        !selectedTypes.includes(market.type)) return false;
    
    return true;
  });

  // Handle checkbox selections
  const toggleProductFilter = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const toggleTypeFilter = (typeId: string) => {
    setSelectedTypes(prev => 
      prev.includes(typeId) 
        ? prev.filter(id => id !== typeId)
        : [...prev, typeId]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setMaxDistance(20);
    setSearchTerm("");
    setSelectedProducts([]);
    setSelectedTypes([]);
  };

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

  return (
    <div className="space-y-6">
      <FilterControls 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        maxDistance={maxDistance}
        setMaxDistance={setMaxDistance}
        selectedProducts={selectedProducts}
        toggleProductFilter={toggleProductFilter}
        selectedTypes={selectedTypes}
        toggleTypeFilter={toggleTypeFilter}
        clearFilters={clearFilters}
        showMapKeyInput={showMapKeyInput}
        mapboxApiKey={mapboxApiKey}
        updateMapboxApiKey={updateMapboxApiKey}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MarketList 
          filteredMarkets={filteredMarkets}
          selectedMarket={selectedMarket}
          viewMarketDetails={viewMarketDetails}
          clearFilters={clearFilters}
        />

        <div className="md:col-span-2">
          <MapDisplay 
            filteredMarkets={filteredMarkets}
            selectedMarket={selectedMarket}
            viewMarketDetails={viewMarketDetails}
            mapboxApiKey={mapboxApiKey}
            setShowMapKeyInput={setShowMapKeyInput}
          />

          {selectedMarket && (
            <MarketDetails 
              market={farmMarkets.find(m => m.id === selectedMarket)!}
              getDirections={getDirections}
            />
          )}
        </div>
      </div>

      <MarketDirectionsDialog 
        showDirectionsDialog={showDirectionsDialog}
        setShowDirectionsDialog={setShowDirectionsDialog}
        selectedMarketForDirections={selectedMarketForDirections}
      />
    </div>
  );
}
