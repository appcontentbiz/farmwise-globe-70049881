import { useState, useEffect, useRef } from 'react';
import { MapboxMap, MarketType } from '../data/marketData';

interface UseMapboxProps {
  mapboxApiKey: string;
  filteredMarkets: MarketType[];
  selectedMarket: number | null;
  viewMarketDetails: (id: number) => void;
  setShowMapKeyInput: (show: boolean) => void;
}

export function useMapbox({
  mapboxApiKey,
  filteredMarkets,
  selectedMarket,
  viewMarketDetails,
  setShowMapKeyInput
}: UseMapboxProps) {
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

    return () => {
      document.head.removeChild(mapboxScript);
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

  return { mapContainerRef, mapLoaded, mapInstance };
}
