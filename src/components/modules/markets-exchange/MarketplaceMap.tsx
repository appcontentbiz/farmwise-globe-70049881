
import React, { useState, useEffect } from 'react';
import { MapPin, Filter, Search, MapIcon, Navigation, Compass, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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
const productCategories = [
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
const marketTypes = [
  { id: "weekly", label: "Weekly Markets" },
  { id: "daily", label: "Daily Markets" },
  { id: "co-op", label: "Co-ops" }
];

export function MarketplaceMap() {
  const { toast } = useToast();
  const [maxDistance, setMaxDistance] = useState<number>(20);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedMarket, setSelectedMarket] = useState<number | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [showDirectionsDialog, setShowDirectionsDialog] = useState(false);
  const [selectedMarketForDirections, setSelectedMarketForDirections] = useState<typeof farmMarkets[0] | null>(null);
  const [mapInstance, setMapInstance] = useState<any>(null);
  const mapContainerRef = React.useRef<HTMLDivElement>(null);

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

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstance) return;

    const mapboxScript = document.createElement('script');
    mapboxScript.src = 'https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.js';
    mapboxScript.async = true;

    mapboxScript.onload = () => {
      const mapboxgl = window.mapboxgl;
      if (!mapboxgl) return;

      mapboxgl.accessToken = 'pk.eyJ1IjoibG92YWJsZWFpIiwiYSI6ImNsb2NjbDlzNTAxb24ycm82OW96Mm40ZHkifQ.a4ReIYV_1DzHzS416VbIyw';
      
      const map = new mapboxgl.Map({
        container: mapContainerRef.current!,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-86.813, 33.523], // Center on Birmingham, Alabama (adjust for your needs)
        zoom: 9
      });

      map.on('load', () => {
        setMapLoaded(true);
        setMapInstance(map);
        
        // Add markers for each market
        filteredMarkets.forEach((market) => {
          // Create a custom pin element
          const el = document.createElement('div');
          el.className = 'custom-marker';
          el.innerHTML = `
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21C16 17 20 13.4183 20 9C20 4.58172 16.4183 1 12 1C7.58172 1 4 4.58172 4 9C4 13.4183 8 17 12 21Z" 
                fill="#4CAF50" stroke="white" strokeWidth="2"/>
              <circle cx="12" cy="9" r="3" fill="white" />
            </svg>
          `;
          
          el.style.cursor = 'pointer';
          el.addEventListener('click', () => {
            viewMarketDetails(market.id);
          });
          
          // Add marker to map
          new mapboxgl.Marker(el)
            .setLngLat([market.coordinates.lng, market.coordinates.lat])
            .addTo(map);
        });
      });

      // Add navigation controls
      map.addControl(new mapboxgl.NavigationControl(), 'top-right');

      return () => {
        map?.remove();
      };
    };

    document.head.appendChild(mapboxScript);

    // CSS for custom markers
    const style = document.createElement('style');
    style.textContent = `
      .custom-marker {
        width: 32px;
        height: 32px;
        cursor: pointer;
      }
      .custom-marker svg {
        transform: translate(-16px, -32px);
      }
      .mapboxgl-map {
        border-radius: 0.5rem;
      }
    `;
    document.head.appendChild(style);

    // Add Mapbox CSS
    const mapboxCss = document.createElement('link');
    mapboxCss.rel = 'stylesheet';
    mapboxCss.href = 'https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.css';
    document.head.appendChild(mapboxCss);

    return () => {
      document.head.removeChild(mapboxScript);
      document.head.removeChild(style);
      document.head.removeChild(mapboxCss);
      if (mapInstance) {
        mapInstance.remove();
      }
    };
  }, []);

  // Update markers when filtered markets change
  useEffect(() => {
    if (!mapInstance || !mapLoaded) return;

    // Remove all existing markers
    const markers = document.querySelectorAll('.custom-marker');
    markers.forEach(marker => {
      marker.remove();
    });

    // Add markers for each filtered market
    filteredMarkets.forEach((market) => {
      // Create a custom pin element
      const el = document.createElement('div');
      el.className = 'custom-marker';
      el.innerHTML = `
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 21C16 17 20 13.4183 20 9C20 4.58172 16.4183 1 12 1C7.58172 1 4 4.58172 4 9C4 13.4183 8 17 12 21Z" 
            fill="${selectedMarket === market.id ? '#FF5722' : '#4CAF50'}" stroke="white" strokeWidth="2"/>
          <circle cx="12" cy="9" r="3" fill="white" />
        </svg>
      `;
      
      el.style.cursor = 'pointer';
      el.addEventListener('click', () => {
        viewMarketDetails(market.id);
      });
      
      // Add marker to map
      new mapboxgl.Marker(el)
        .setLngLat([market.coordinates.lng, market.coordinates.lat])
        .addTo(mapInstance);
    });
  }, [filteredMarkets, selectedMarket, mapLoaded]);

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
    
    // If a market is selected, center map on it
    if (id !== selectedMarket && mapInstance) {
      const market = farmMarkets.find(m => m.id === id);
      if (market) {
        mapInstance.flyTo({
          center: [market.coordinates.lng, market.coordinates.lat],
          zoom: 12,
          essential: true
        });
      }
    }
  };

  // Handle contact actions
  const contactMarket = (method: 'phone' | 'website', value: string) => {
    toast({
      title: `Contact via ${method}`,
      description: `Connecting to ${value}`,
    });
  };

  // Get directions to market
  const getDirections = (market: typeof farmMarkets[0]) => {
    setSelectedMarketForDirections(market);
    setShowDirectionsDialog(true);
  };

  // Handle actually navigating to the market
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

  // Handle viewport changes for responsive design
  const getMapHeight = () => {
    // Check if we're on mobile
    const isMobile = window.innerWidth < 768;
    return isMobile ? '350px' : '500px';
  };

  return (
    <div className="space-y-6">
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-4">
          <h3 className="text-lg font-medium">Markets Near You ({filteredMarkets.length})</h3>
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
            {filteredMarkets.length > 0 ? (
              filteredMarkets.map((market) => (
                <Card 
                  key={market.id} 
                  className={`cursor-pointer transition-all ${selectedMarket === market.id ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => viewMarketDetails(market.id)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-base">{market.name}</CardTitle>
                      <Badge variant="outline">{market.distance} mi</Badge>
                    </div>
                    <CardDescription className="text-xs">{market.location}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <p className="text-xs text-muted-foreground mb-2">{market.hours}</p>
                    <div className="flex flex-wrap gap-1">
                      {market.products.slice(0, 3).map((product) => (
                        <Badge key={product} variant="secondary" className="text-xs">
                          {productCategories.find(p => p.id === product)?.label}
                        </Badge>
                      ))}
                      {market.products.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{market.products.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8 bg-muted rounded-lg">
                <p className="text-muted-foreground">No markets match your filters</p>
                <Button variant="link" onClick={clearFilters}>Clear filters</Button>
              </div>
            )}
          </div>
        </div>

        <div className="md:col-span-2">
          <Card className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <MapIcon className="h-5 w-5" /> Market Map
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 relative">
              {/* Real Map Container */}
              <div 
                ref={mapContainerRef} 
                className="w-full"
                style={{ height: getMapHeight() }}
              ></div>

              {/* Loading State */}
              {!mapLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
                  <div className="flex flex-col items-center gap-4">
                    <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                    <p>Loading map...</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {selectedMarket && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>{farmMarkets.find(m => m.id === selectedMarket)?.name}</CardTitle>
                <CardDescription>{farmMarkets.find(m => m.id === selectedMarket)?.location}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{farmMarkets.find(m => m.id === selectedMarket)?.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-1">Hours</h4>
                    <p className="text-sm text-muted-foreground">{farmMarkets.find(m => m.id === selectedMarket)?.hours}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Products</h4>
                    <div className="flex flex-wrap gap-1">
                      {farmMarkets.find(m => m.id === selectedMarket)?.products.map((product) => (
                        <Badge key={product} variant="outline" className="text-xs">
                          {productCategories.find(p => p.id === product)?.label}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => contactMarket('phone', farmMarkets.find(m => m.id === selectedMarket)?.phone || '')}
                >
                  Call Market
                </Button>
                <Button 
                  className="flex items-center gap-2"
                  onClick={() => getDirections(farmMarkets.find(m => m.id === selectedMarket) as any)}
                >
                  <Navigation className="h-4 w-4" /> Get Directions
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>

      {/* Directions Dialog */}
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
    </div>
  );
}

