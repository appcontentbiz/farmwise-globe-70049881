import React, { useState } from 'react';
import { MapPin, AlertCircle, CloudRain, FileText, Leaf } from 'lucide-react';
import { Tooltip } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GlobalEventCard } from './GlobalEventCard';

// Define the event type to match what GlobalEventCardProps expects
type EventType = "weather" | "policy" | "innovation" | "disease" | "market";

// Define the map event interface
interface MapEvent {
  id: number;
  title: string;
  description: string;
  type: EventType;
  location: string;
  coordinates: { x: number; y: number };
  date: string;
  severity: "high" | "medium" | "low";
}

// Map event data with properly typed EventType
const mapEvents: MapEvent[] = [
  {
    id: 1,
    title: 'Severe Drought Conditions',
    description: 'Prolonged dry period affecting wheat and corn crops. Irrigation systems operating at 40% capacity.',
    type: 'weather',
    location: 'Western Australia',
    coordinates: { x: 15, y: 65 },
    date: 'July 10, 2023',
    severity: 'high'
  },
  {
    id: 2,
    title: 'New Agricultural Policy',
    description: 'Government has announced new subsidy program for sustainable farming practices and organic certification.',
    type: 'policy',
    location: 'European Union',
    coordinates: { x: 48, y: 35 },
    date: 'August 2, 2023',
    severity: 'medium'
  },
  {
    id: 3,
    title: 'Pest Resistant Wheat Strain',
    description: 'Agricultural researchers have developed a new wheat strain with improved resistance to common pests.',
    type: 'innovation',
    location: 'United States',
    coordinates: { x: 25, y: 40 },
    date: 'June 15, 2023',
    severity: 'low'
  },
  {
    id: 4,
    title: 'Locust Swarm',
    description: 'Large locust swarms reported moving through agricultural regions, threatening crops across multiple countries.',
    type: 'disease',
    location: 'East Africa',
    coordinates: { x: 55, y: 50 },
    date: 'July 25, 2023',
    severity: 'high'
  },
  {
    id: 5,
    title: 'Rice Price Increases',
    description: 'Global rice prices have increased by 15% due to export restrictions from major producing countries.',
    type: 'market',
    location: 'Southeast Asia',
    coordinates: { x: 75, y: 52 },
    date: 'August 5, 2023',
    severity: 'medium'
  },
  {
    id: 6,
    title: 'Flooding in Agricultural Zones',
    description: 'Severe flooding has damaged rice fields and agricultural infrastructure across the region.',
    type: 'weather',
    location: 'Bangladesh',
    coordinates: { x: 70, y: 45 },
    date: 'July 30, 2023',
    severity: 'high'
  },
  {
    id: 7,
    title: 'Sustainable Farming Initiative',
    description: 'New international initiative launched to promote sustainable farming practices and reduce carbon emissions.',
    type: 'policy',
    location: 'Global',
    coordinates: { x: 50, y: 50 },
    date: 'August 1, 2023',
    severity: 'low'
  },
];

// Function to get icon based on event type
const getEventIcon = (type: EventType, className: string = 'h-4 w-4') => {
  switch (type) {
    case 'weather':
      return <CloudRain className={className + ' text-blue-500'} />;
    case 'policy':
      return <FileText className={className + ' text-orange-500'} />;
    case 'innovation':
      return <Leaf className={className + ' text-green-500'} />;
    case 'disease':
      return <AlertCircle className={className + ' text-red-500'} />;
    case 'market':
      return <FileText className={className + ' text-purple-500'} />;
    default:
      return <MapPin className={className + ' text-gray-500'} />;
  }
};

// Function to get color based on severity
const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'high':
      return 'bg-red-500';
    case 'medium':
      return 'bg-yellow-500';
    case 'low':
      return 'bg-green-500';
    default:
      return 'bg-gray-500';
  }
};

export function GlobalMap() {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [mapFilter, setMapFilter] = useState<EventType | null>(null);

  // Handle zoom functionality
  const handleZoomIn = () => {
    if (zoom < 2) setZoom(zoom + 0.2);
  };

  const handleZoomOut = () => {
    if (zoom > 0.6) setZoom(zoom - 0.2);
  };

  // Handle pan functionality
  const handlePan = (direction: 'up' | 'down' | 'left' | 'right') => {
    const step = 10;
    switch (direction) {
      case 'up':
        setPan({ ...pan, y: pan.y + step });
        break;
      case 'down':
        setPan({ ...pan, y: pan.y - step });
        break;
      case 'left':
        setPan({ ...pan, x: pan.x + step });
        break;
      case 'right':
        setPan({ ...pan, x: pan.x - step });
        break;
    }
  };

  // Filter events based on selected type
  const filteredEvents = mapFilter 
    ? mapEvents.filter(event => event.type === mapFilter)
    : mapEvents;

  // Reset the map view
  const resetMapView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setSelectedEvent(null);
    setMapFilter(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Global Agricultural Map</h3>
        <div className="flex items-center space-x-2">
          <Button onClick={() => setMapFilter('weather')} variant="outline" size="sm" 
            className={mapFilter === 'weather' ? 'bg-blue-100' : ''}>
            <CloudRain className="h-4 w-4 mr-1 text-blue-500" />
            Weather
          </Button>
          <Button onClick={() => setMapFilter('policy')} variant="outline" size="sm"
            className={mapFilter === 'policy' ? 'bg-orange-100' : ''}>
            <FileText className="h-4 w-4 mr-1 text-orange-500" />
            Policy
          </Button>
          <Button onClick={() => setMapFilter('disease')} variant="outline" size="sm"
            className={mapFilter === 'disease' ? 'bg-red-100' : ''}>
            <AlertCircle className="h-4 w-4 mr-1 text-red-500" />
            Disease
          </Button>
          <Button onClick={() => setMapFilter(null)} variant="outline" size="sm">
            All Events
          </Button>
        </div>
      </div>

      <div className="relative border rounded-lg overflow-hidden bg-slate-100 h-[400px]">
        {/* World map background */}
        <div 
          className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')]"
          style={{ 
            backgroundSize: `${100 * zoom}%`, 
            backgroundPosition: `${50 + pan.x}% ${50 + pan.y}%`,
            backgroundRepeat: 'no-repeat' 
          }}
        ></div>

        {/* Map controls */}
        <div className="absolute top-2 right-2 flex flex-col space-y-2 z-10">
          <Button onClick={handleZoomIn} size="sm" variant="secondary">+</Button>
          <Button onClick={handleZoomOut} size="sm" variant="secondary">−</Button>
          <Button onClick={resetMapView} size="sm" variant="secondary">Reset</Button>
        </div>

        <div className="absolute top-2 left-2 grid grid-cols-3 gap-1 z-10">
          <Button onClick={() => handlePan('left')} size="sm" variant="secondary">←</Button>
          <Button onClick={() => handlePan('up')} size="sm" variant="secondary">↑</Button>
          <Button onClick={() => handlePan('right')} size="sm" variant="secondary">→</Button>
          <div className="w-8"></div>
          <Button onClick={() => handlePan('down')} size="sm" variant="secondary">↓</Button>
        </div>

        {/* Map event pins */}
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="absolute cursor-pointer transition-all duration-200 hover:scale-125 z-20"
            style={{ 
              left: `${event.coordinates.x}%`, 
              top: `${event.coordinates.y}%`,
              transform: `translate(-50%, -50%) scale(${zoom})` 
            }}
            onClick={() => setSelectedEvent(event.id === selectedEvent ? null : event.id)}
          >
            <div className={`h-3 w-3 rounded-full ${getSeverityColor(event.severity)} ring-2 ring-white`}></div>
            {getEventIcon(event.type, "absolute h-4 w-4 -top-2 -right-2")}
            
            {/* Tooltip on hover */}
            <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white p-2 rounded shadow-lg text-xs max-w-[200px] ${
              event.id === selectedEvent ? 'block' : 'hidden'
            }`}>
              <p className="font-medium">{event.title}</p>
              <p className="text-muted-foreground text-[10px] mb-1">{event.location}</p>
              <Badge variant="outline" className="text-[10px]">{event.type}</Badge>
            </div>
          </div>
        ))}

        {/* Legend */}
        <div className="absolute bottom-2 left-2 bg-white/90 p-2 rounded-md text-xs z-10">
          <div className="font-medium mb-1">Event Severity</div>
          <div className="flex items-center mb-1">
            <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
            <span>High</span>
          </div>
          <div className="flex items-center mb-1">
            <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
            <span>Medium</span>
          </div>
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
            <span>Low</span>
          </div>
        </div>
      </div>
      
      {/* Selected event details */}
      {selectedEvent && (
        <div className="mt-4">
          <h4 className="font-medium mb-2">Event Details</h4>
          <GlobalEventCard 
            {...mapEvents.find(event => event.id === selectedEvent)!} 
          />
        </div>
      )}
    </div>
  );
}
