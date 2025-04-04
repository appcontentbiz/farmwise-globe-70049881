
import React, { useState, useEffect, useRef } from 'react';
import { MapIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MarketType, MapboxMap } from '../MarketplaceMap';

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
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapInstance, setMapInstance] = useState<MapboxMap | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstance) return;

    // Create a script element for Mapbox
    const mapboxScript = document.createElement('script');
    mapboxScript.src = 'https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.js';
    mapboxScript.async = true;

    mapboxScript.onload = () => {
      // Check if mapboxgl is available on window
      if (!window.mapboxgl) {
        console.error("Mapbox GL JS is not loaded");
        return;
      }

      // Set the access token
      window.mapboxgl.accessToken = mapboxApiKey;
      
      // Create the map
      const map = new window.mapboxgl.Map({
        container: mapContainerRef.current!,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-86.813, 33.523], // Center on Birmingham, Alabama
        zoom: 9
      });

      map.on('load', () => {
        setMapLoaded(true);
        setMapInstance(map as unknown as MapboxMap);
        
        // Add markers for each market
        filteredMarkets.forEach((market) => {
          // Create marker element
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
          new window.mapboxgl.Marker(el)
            .setLngLat([market.coordinates.lng, market.coordinates.lat])
            .addTo(map);
        });

        // Add navigation controls
        map.addControl(new window.mapboxgl.NavigationControl(), 'top-right');
      });

      // Add error handling
      map.on('error', (e) => {
        console.error('Mapbox error:', e);
        if (e.error && e.error.status === 401) {
          setShowMapKeyInput(true);
        }
      });

      return () => {
        map?.remove();
      };
    };

    document.head.appendChild(mapboxScript);

    // Add Mapbox CSS
    const mapboxCss = document.createElement('link');
    mapboxCss.rel = 'stylesheet';
    mapboxCss.href = 'https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.css';
    document.head.appendChild(mapboxCss);

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

    return () => {
      document.head.removeChild(mapboxScript);
      if (document.head.contains(mapboxCss)) document.head.removeChild(mapboxCss);
      if (document.head.contains(style)) document.head.removeChild(style);
      if (mapInstance) {
        mapInstance.remove();
      }
    };
  }, [mapboxApiKey]);

  // Update markers when filtered markets change
  useEffect(() => {
    if (!mapInstance || !mapLoaded || !window.mapboxgl) return;

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
      new window.mapboxgl.Marker(el)
        .setLngLat([market.coordinates.lng, market.coordinates.lat])
        .addTo(mapInstance as any);
    });
  }, [filteredMarkets, selectedMarket, mapLoaded]);

  // Handle map center change when a market is selected
  useEffect(() => {
    if (!mapInstance || !mapLoaded) return;
    
    if (selectedMarket !== null) {
      const market = filteredMarkets.find(m => m.id === selectedMarket);
      if (market) {
        mapInstance.flyTo({
          center: [market.coordinates.lng, market.coordinates.lat],
          zoom: 12,
          essential: true
        });
      }
    }
  }, [selectedMarket, mapLoaded]);

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
  );
}
