
import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { MarketType } from '../data/marketData';

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
}

export const useMapbox = ({
  filteredMarkets,
  selectedMarket,
  mapboxApiKey,
  onMarketSelect
}: UseMapboxProps) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<MapboxMarker[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  // Initialize map
  useEffect(() => {
    if (!mapboxApiKey || !mapContainerRef.current || mapRef.current) return;

    try {
      mapboxgl.accessToken = mapboxApiKey;

      const newMap = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-122.419, 37.775], // Default center (San Francisco)
        zoom: 11
      });

      newMap.on('load', () => {
        setMapLoaded(true);
        mapRef.current = newMap;
      });

      newMap.on('error', (e) => {
        console.error('Mapbox error:', e);
        setMapError('Error loading map. Please check your API key.');
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
    }
  }, [mapboxApiKey]);

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
      el.innerHTML = `<div class="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">${market.id}</div>`;
      
      el.addEventListener('click', () => {
        onMarketSelect(market.id);
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
        padding: 50,
        maxZoom: 15
      });
    }
  }, [filteredMarkets, mapLoaded, onMarketSelect]);

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
        zoom: 14,
        essential: true
      });
    }
  }, [selectedMarket, mapLoaded]);

  return {
    mapContainerRef,
    mapError,
    mapLoaded
  };
};
