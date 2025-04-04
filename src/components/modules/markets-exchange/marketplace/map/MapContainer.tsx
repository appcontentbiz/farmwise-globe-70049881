
import React from 'react';

interface MapContainerProps {
  mapContainerRef: React.RefObject<HTMLDivElement>;
  isLoading: boolean;
  height: string;
}

export function MapContainer({ mapContainerRef, isLoading, height }: MapContainerProps) {
  return (
    <>
      {/* Real Map Container */}
      <div 
        ref={mapContainerRef} 
        className="w-full"
        style={{ height }}
      ></div>

      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
            <p>Loading map...</p>
          </div>
        </div>
      )}
    </>
  );
}
