
import React from 'react';
import { Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { productCategories, marketTypes } from '../MarketplaceMap';

interface FilterControlsProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  maxDistance: number;
  setMaxDistance: (distance: number) => void;
  selectedProducts: string[];
  toggleProductFilter: (productId: string) => void;
  selectedTypes: string[];
  toggleTypeFilter: (typeId: string) => void;
  clearFilters: () => void;
  showMapKeyInput: boolean;
  mapboxApiKey: string;
  updateMapboxApiKey: (key: string) => void;
}

export function FilterControls({
  searchTerm,
  setSearchTerm,
  showFilters,
  setShowFilters,
  maxDistance,
  setMaxDistance,
  selectedProducts,
  toggleProductFilter,
  selectedTypes,
  toggleTypeFilter,
  clearFilters,
  showMapKeyInput,
  mapboxApiKey,
  updateMapboxApiKey
}: FilterControlsProps) {
  
  const handleKeyUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newKey = formData.get('mapboxKey') as string;
    updateMapboxApiKey(newKey);
  };
  
  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search markets by name or location..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="h-4 w-4" /> 
          {showFilters ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>

      {showMapKeyInput && (
        <Card className="mb-6 border-yellow-400 bg-yellow-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-yellow-800">Mapbox API Key Required</CardTitle>
            <CardDescription className="text-yellow-700">
              To display the interactive map, please enter your Mapbox public access token.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleKeyUpdate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mapboxKey">Mapbox Public Access Token</Label>
                <Input 
                  id="mapboxKey" 
                  name="mapboxKey" 
                  placeholder="pk.eyJ1..." 
                  className="w-full"
                  defaultValue={mapboxApiKey} 
                />
                <p className="text-xs text-muted-foreground">
                  Get your token from <a href="https://account.mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Mapbox Account Page</a> → Access Tokens
                </p>
              </div>
              <Button type="submit">Update Map</Button>
            </form>
          </CardContent>
        </Card>
      )}

      {showFilters && (
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Filter Markets</CardTitle>
            <CardDescription>
              Narrow down markets based on your preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Maximum Distance: {maxDistance} miles</Label>
                <span className="text-sm text-muted-foreground">{maxDistance} mi</span>
              </div>
              <Slider
                value={[maxDistance]}
                min={1}
                max={30}
                step={1}
                onValueChange={(value) => setMaxDistance(value[0])}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label>Products Available</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {productCategories.map((product) => (
                  <div key={product.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`product-${product.id}`} 
                      checked={selectedProducts.includes(product.id)}
                      onCheckedChange={() => toggleProductFilter(product.id)}
                    />
                    <label
                      htmlFor={`product-${product.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {product.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Market Type</Label>
              <div className="flex flex-wrap gap-2">
                {marketTypes.map((type) => (
                  <div key={type.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`type-${type.id}`} 
                      checked={selectedTypes.includes(type.id)}
                      onCheckedChange={() => toggleTypeFilter(type.id)}
                    />
                    <label
                      htmlFor={`type-${type.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {type.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" onClick={clearFilters}>
              Reset Filters
            </Button>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
