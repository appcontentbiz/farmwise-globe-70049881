
import { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { 
  MapPin, 
  ZoomIn, 
  ZoomOut, 
  Cloud, 
  FileText, 
  Leaf, 
  AlertCircle 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface Region {
  id: string;
  name: string;
  x: number;
  y: number;
  events: Array<{
    type: "weather" | "policy" | "innovation" | "disease" | "market";
    title: string;
    description: string;
    severity?: "low" | "medium" | "high";
    date: string;
  }>;
}

export function GlobalMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [activeRegion, setActiveRegion] = useState<Region | null>(null);
  const { toast } = useToast();
  
  // Sample data for agricultural regions and events
  const regions: Region[] = [
    {
      id: "na",
      name: "North America",
      x: 20,
      y: 30,
      events: [
        {
          type: "weather",
          title: "Drought Conditions",
          description: "Severe drought affecting corn belt. Irrigation systems strained.",
          severity: "high",
          date: "2 days ago"
        },
        {
          type: "innovation",
          title: "Drought-resistant Corn",
          description: "New corn variety showing promising results in drought conditions.",
          date: "1 week ago"
        }
      ]
    },
    {
      id: "sa",
      name: "South America",
      x: 17,
      y: 55,
      events: [
        {
          type: "policy",
          title: "Sustainability Subsidies",
          description: "New government programs supporting sustainable farming methods.",
          date: "3 days ago"
        },
        {
          type: "market",
          title: "Soybean Exports Rising",
          description: "Global demand driving increased soybean prices and exports.",
          date: "1 week ago"
        }
      ]
    },
    {
      id: "eu",
      name: "Europe",
      x: 45,
      y: 35,
      events: [
        {
          type: "innovation",
          title: "Precision Agriculture",
          description: "Smart farming techniques reducing water usage by 30%.",
          date: "5 days ago"
        },
        {
          type: "disease",
          title: "Wheat Rust Outbreak",
          description: "Monitoring southern regions for signs of wheat rust spread.",
          severity: "medium",
          date: "2 days ago"
        }
      ]
    },
    {
      id: "af",
      name: "Africa",
      x: 48,
      y: 55,
      events: [
        {
          type: "innovation",
          title: "Solar Irrigation Systems",
          description: "Solar-powered irrigation expanding crop production in arid regions.",
          date: "1 week ago"
        },
        {
          type: "weather",
          title: "Increased Rainfall",
          description: "Above average rainfall improving crop outlook in East Africa.",
          date: "3 days ago"
        }
      ]
    },
    {
      id: "as",
      name: "Asia",
      x: 70,
      y: 40,
      events: [
        {
          type: "policy",
          title: "Rice Production Quotas",
          description: "New government targets for sustainable rice production.",
          date: "4 days ago"
        },
        {
          type: "weather",
          title: "Monsoon Intensity",
          description: "Stronger than expected monsoon affecting planting schedules.",
          severity: "medium",
          date: "1 day ago"
        }
      ]
    },
    {
      id: "oc",
      name: "Oceania",
      x: 80,
      y: 65,
      events: [
        {
          type: "weather",
          title: "Drought Conditions",
          description: "Ongoing drought affecting wheat and livestock production.",
          severity: "high",
          date: "1 week ago"
        },
        {
          type: "innovation",
          title: "Water Conservation",
          description: "New irrigation techniques reducing water usage in drought areas.",
          date: "5 days ago"
        }
      ]
    },
  ];

  // Handle map interaction
  useEffect(() => {
    const mapContainer = mapContainerRef.current;
    const map = mapRef.current;
    
    if (!mapContainer || !map) return;
    
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const newZoom = zoom + (e.deltaY > 0 ? -0.1 : 0.1);
      setZoom(Math.min(Math.max(newZoom, 0.8), 2.5));
    };
    
    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 0) { // Left mouse button
        setIsDragging(true);
        setDragStart({
          x: e.clientX - position.x,
          y: e.clientY - position.y
        });
      }
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newX = e.clientX - dragStart.x;
        const newY = e.clientY - dragStart.y;
        
        // Limit panning to reasonable boundaries
        const maxPanX = mapContainer.clientWidth * 0.5;
        const maxPanY = mapContainer.clientHeight * 0.5;
        
        setPosition({
          x: Math.min(Math.max(newX, -maxPanX), maxPanX),
          y: Math.min(Math.max(newY, -maxPanY), maxPanY)
        });
      }
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
    };
    
    const handleMouseLeave = () => {
      setIsDragging(false);
    };
    
    mapContainer.addEventListener('wheel', handleWheel, { passive: false });
    mapContainer.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    mapContainer.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      mapContainer.removeEventListener('wheel', handleWheel);
      mapContainer.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      mapContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isDragging, dragStart, position, zoom]);

  // Create map markers
  useEffect(() => {
    const container = mapRef.current;
    
    if (!container) return;
    
    // Clear existing markers
    const existingMarkers = container.querySelectorAll('.map-marker');
    existingMarkers.forEach(marker => marker.remove());
    
    // Create new markers based on region data
    regions.forEach(region => {
      const marker = document.createElement('div');
      
      // Determine marker style based on event severity
      const hasSevereEvent = region.events.some(e => e.severity === "high");
      const hasWarningEvent = region.events.some(e => e.severity === "medium");
      
      let markerColorClass = 'bg-blue-500';
      if (hasSevereEvent) {
        markerColorClass = 'bg-red-500';
      } else if (hasWarningEvent) {
        markerColorClass = 'bg-yellow-500';
      }
      
      marker.className = `map-marker absolute w-3 h-3 rounded-full ${markerColorClass} 
                           ${hasSevereEvent ? 'animate-pulse' : ''} cursor-pointer
                           hover:w-4 hover:h-4 transition-all`;
      marker.style.left = `${region.x}%`;
      marker.style.top = `${region.y}%`;
      marker.style.transform = 'translate(-50%, -50%)';
      
      // Add event listeners for interaction
      marker.addEventListener('click', () => {
        setActiveRegion(region);
        toast({
          title: `${region.name} Agricultural Events`,
          description: `Displaying ${region.events.length} events from ${region.name}`
        });
      });
      
      marker.addEventListener('mouseenter', () => {
        const tooltip = document.createElement('div');
        tooltip.className = 'absolute z-10 bg-background border rounded px-2 py-1 text-xs -mt-8 whitespace-nowrap';
        tooltip.innerText = `${region.name}: ${region.events.length} events`;
        tooltip.style.left = '50%';
        tooltip.style.transform = 'translateX(-50%)';
        marker.appendChild(tooltip);
      });
      
      marker.addEventListener('mouseleave', () => {
        const tooltip = marker.querySelector('div');
        if (tooltip) marker.removeChild(tooltip);
      });
      
      container.appendChild(marker);
    });
  }, [regions, toast]);

  // Get icon for event type
  const getEventIcon = (type: "weather" | "policy" | "innovation" | "disease" | "market") => {
    switch (type) {
      case "weather":
        return <Cloud className="h-4 w-4 text-blue-500" />;
      case "policy":
        return <FileText className="h-4 w-4 text-orange-500" />;
      case "innovation":
        return <Leaf className="h-4 w-4 text-green-500" />;
      case "disease":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "market":
        return <FileText className="h-4 w-4 text-purple-500" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative aspect-[16/9] rounded-lg overflow-hidden border">
        <div 
          ref={mapContainerRef}
          className="absolute inset-0 bg-gray-100 overflow-hidden cursor-move"
        >
          <div 
            ref={mapRef}
            className="absolute inset-0 bg-[url('https://raw.githubusercontent.com/loveables/public/main/worldmap.png')] bg-cover bg-center origin-center transition-transform duration-100"
            style={{ 
              transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
            }}
          ></div>
          
          <div className="absolute top-2 right-2 flex flex-col gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="bg-background/80 backdrop-blur-sm"
              onClick={() => setZoom(prev => Math.min(prev + 0.2, 2.5))}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="bg-background/80 backdrop-blur-sm"
              onClick={() => setZoom(prev => Math.max(prev - 0.2, 0.8))}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="bg-background/80 backdrop-blur-sm"
              onClick={() => {
                setZoom(1);
                setPosition({ x: 0, y: 0 });
              }}
            >
              <MapPin className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="absolute bottom-2 left-2 bg-background/80 backdrop-blur-sm border px-3 py-1.5 rounded text-sm">
          <div className="font-medium">Global Agricultural Events</div>
          <div className="text-xs text-muted-foreground">Click on markers to see details</div>
        </div>
      </div>
      
      {activeRegion && (
        <Card>
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium">{activeRegion.name} Events</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setActiveRegion(null)}
              >
                Close
              </Button>
            </div>
            <div className="space-y-3">
              {activeRegion.events.map((event, index) => (
                <div key={index} className="border rounded-md p-3">
                  <div className="flex items-start gap-2">
                    <div className="mt-0.5">{getEventIcon(event.type)}</div>
                    <div>
                      <div className="font-medium">{event.title}</div>
                      <div className="text-sm text-muted-foreground">{event.description}</div>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <span>{event.date}</span>
                        {event.severity && (
                          <span className={`ml-2 px-1.5 py-0.5 rounded-full text-xs ${
                            event.severity === "high" ? "bg-red-100 text-red-800" :
                            event.severity === "medium" ? "bg-yellow-100 text-yellow-800" :
                            "bg-green-100 text-green-800"
                          }`}>
                            {event.severity.charAt(0).toUpperCase() + event.severity.slice(1)} Impact
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
