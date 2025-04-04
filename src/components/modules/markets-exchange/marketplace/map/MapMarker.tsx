
import React from 'react';

interface MapMarkerProps {
  market: {
    id: number;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  isSelected: boolean;
  onClick: (id: number) => void;
}

export function MapMarker({ market, isSelected, onClick }: MapMarkerProps) {
  // Create a custom pin element
  const handleClick = () => {
    onClick(market.id);
  };

  return (
    <div className="custom-marker" onClick={handleClick}>
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 21C16 17 20 13.4183 20 9C20 4.58172 16.4183 1 12 1C7.58172 1 4 4.58172 4 9C4 13.4183 8 17 12 21Z" 
          fill={isSelected ? '#FF5722' : '#4CAF50'} stroke="white" strokeWidth="2"/>
        <circle cx="12" cy="9" r="3" fill="white" />
      </svg>
    </div>
  );
}
