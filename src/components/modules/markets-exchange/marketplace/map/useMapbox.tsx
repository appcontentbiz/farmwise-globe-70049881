
import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { MarketType } from '../data/marketData';
import { useIsMobile } from '@/hooks/use-mobile';

// Mapbox specific types
export type MapboxMarker = {
  market: MarketType;
  marker: mapboxgl.Marker;
};

interface UseMapboxProps {
  filteredMarkets: MarketType[];
  selectedMarket: number | null;
  mapboxApiKey: string;
  onMarketSelect: (marketId: number) => void;
  viewMarketDetails?: (marketId: number) => void;
  setShowMapKeyInput?: (show: boolean) => void;
}

export const useMapbox = ({
  filteredMarkets,
  selectedMarket,
  mapboxApiKey,
  onMarketSelect,
  viewMarketDetails,
  setShowMapKeyInput
}: UseMapboxProps) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<MapboxMarker[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const isMobile = useIsMobile();

  // Initialize map with responsive settings
  useEffect(() => {
    if (!mapboxApiKey || !mapContainerRef.current || mapRef.current) return;

    try {
      mapboxgl.accessToken = mapboxApiKey;

      const newMap = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-122.419, 37.775], // Default center (San Francisco)
        zoom: isMobile ? 9 : 11, // Lower zoom level on mobile
        attributionControl: !isMobile, // Hide attribution on mobile
        dragRotate: !isMobile // Disable rotation on mobile for simpler interaction
      });

      newMap.on('load', () => {
        setMapLoaded(true);
        mapRef.current = newMap;
        
        // Add responsive controls
        newMap.addControl(new mapboxgl.NavigationControl({
          visualizePitch: !isMobile,
          showZoom: true,
          showCompass: !isMobile
        }), 'top-right');
        
        // Only add geolocation on mobile as it's more commonly used there
        if (isMobile) {
          newMap.addControl(new mapboxgl.GeolocateControl({
            positionOptions: { enableHighAccuracy: true },
            trackUserLocation: true
          }), 'top-right');
        }
      });

      newMap.on('error', (e) => {
        console.error('Mapbox error:', e);
        setMapError('Error loading map. Please check your API key.');
        if (setShowMapKeyInput) {
          setShowMapKeyInput(true);
        }
      });

      return () => {
        if (mapRef.current) {
          mapRef.current.remove();
          mapRef.current = null;
        }
      };
    } catch (error) {
      console.error('Error initializing Mapbox:', error);
      setMapError('Error initializing map. Please check your API key.');
      if (setShowMapKeyInput) {
        setShowMapKeyInput(true);
      }
    }
  }, [mapboxApiKey, setShowMapKeyInput, isMobile]);

  // Add markers when markets or map changes
  useEffect(() => {
    if (!mapLoaded || !mapRef.current) return;

    // Clear existing markers
    markersRef.current.forEach(({ marker }) => {
      marker.remove();
    });
    markersRef.current = [];

    if (filteredMarkets.length === 0) return;

    // Add new markers
    const newMarkers: MapboxMarker[] = filteredMarkets.map(market => {
      const [longitude, latitude] = market.coordinates;
      
      const el = document.createElement('div');
      el.className = 'marker';
      
      // Make markers slightly smaller on mobile
      const markerSize = isMobile ? 'w-5 h-5' : 'w-6 h-6';
      const fontSize = isMobile ? 'text-[10px]' : 'text-xs';
      
      el.innerHTML = `<div class="${markerSize} bg-red-500 rounded-full flex items-center justify-center text-white ${fontSize} font-bold">${market.id}</div>`;
      
      el.addEventListener('click', () => {
        const handleClick = viewMarketDetails || onMarketSelect;
        handleClick(market.id);
      });

      const marker = new mapboxgl.Marker(el)
        .setLngLat([longitude, latitude])
        .addTo(mapRef.current!);

      return { market, marker };
    });

    markersRef.current = newMarkers;

    // Fit bounds to show all markers
    if (newMarkers.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      
      newMarkers.forEach(({ market }) => {
        const [longitude, latitude] = market.coordinates;
        bounds.extend([longitude, latitude]);
      });
      
      mapRef.current.fitBounds(bounds, {
        padding: isMobile ? 30 : 50, // Less padding on mobile
        maxZoom: isMobile ? 13 : 15  // Lower max zoom on mobile
      });
    }
  }, [filteredMarkets, mapLoaded, onMarketSelect, viewMarketDetails, isMobile]);

  // Focus on selected market
  useEffect(() => {
    if (!mapLoaded || !mapRef.current || selectedMarket === null) return;

    const marketMarker = markersRef.current.find(
      ({ market }) => market.id === selectedMarket
    );

    if (marketMarker) {
      const [longitude, latitude] = marketMarker.market.coordinates;
      
      mapRef.current.flyTo({
        center: [longitude, latitude],
        zoom: isMobile ? 12 : 14, // Less zoom on mobile
        essential: true
      });
    }
  }, [selectedMarket, mapLoaded, isMobile]);

  return {
    mapContainerRef,
    mapError,
    mapLoaded
  };
};
