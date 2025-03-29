
import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';

export function GlobalMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // In a real implementation, this would use a mapping library like Mapbox or Leaflet
    // For this demo, we're using a placeholder with some interactive elements
    
    if (!mapContainerRef.current) return;
    
    const container = mapContainerRef.current;
    
    // Create map markers for demonstration
    const createMarker = (x: number, y: number, color: string, pulse = false) => {
      const marker = document.createElement('div');
      marker.className = `absolute w-3 h-3 rounded-full bg-${color}-500 
                           ${pulse ? 'animate-pulse' : ''} cursor-pointer`;
      marker.style.left = `${x}%`;
      marker.style.top = `${y}%`;
      marker.style.transform = 'translate(-50%, -50%)';
      
      marker.addEventListener('mouseenter', () => {
        const tooltip = document.createElement('div');
        tooltip.className = 'absolute z-10 bg-background border rounded px-2 py-1 text-xs -mt-8 whitespace-nowrap';
        tooltip.innerText = `Agricultural event in ${getRegionName(x, y)}`;
        tooltip.style.left = '50%';
        tooltip.style.transform = 'translateX(-50%)';
        marker.appendChild(tooltip);
      });
      
      marker.addEventListener('mouseleave', () => {
        const tooltip = marker.querySelector('div');
        if (tooltip) marker.removeChild(tooltip);
      });
      
      container.appendChild(marker);
    };
    
    const getRegionName = (x: number, y: number) => {
      // Very simplified region mapping
      if (x < 25 && y < 40) return 'North America';
      if (x < 25 && y > 40) return 'South America';
      if (x > 25 && x < 50 && y < 50) return 'Europe';
      if (x > 25 && x < 50 && y > 50) return 'Africa';
      if (x > 50 && y < 50) return 'Asia';
      return 'Oceania';
    };
    
    // Add example markers
    createMarker(20, 30, 'blue', true);  // North America
    createMarker(17, 55, 'orange');       // South America
    createMarker(45, 35, 'red', true);   // Europe
    createMarker(48, 55, 'green');        // Africa
    createMarker(70, 40, 'yellow');       // Asia
    createMarker(80, 65, 'purple');       // Australia
    
    return () => {
      // Cleanup markers on unmount
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  return (
    <div className="relative aspect-[16/9] rounded-lg overflow-hidden border">
      <div 
        ref={mapContainerRef}
        className="absolute inset-0 bg-[url('https://placehold.co/1200x800/e6e9ee/78909c?text=World+Agricultural+Map')] bg-cover bg-center"
      ></div>
      <div className="absolute bottom-2 left-2 bg-background/80 border px-3 py-1.5 rounded text-sm">
        <div className="font-medium">Global Agricultural Events</div>
        <div className="text-xs text-muted-foreground">Click on markers to see details</div>
      </div>
    </div>
  );
}
