
// Define types for markets and product categories
export type MarketType = {
  id: number;
  name: string;
  location: string;
  description: string;
  coordinates: [number, number];
  hours: string;
  products: string[];
  distance: number;
  phone: string;
  website?: string;
  type: string;
};

export type MapboxMap = {
  addControl: (control: any) => void;
  fitBounds: (bounds: any, options?: any) => void;
  on: (event: string, handler: any) => void;
  flyTo: (options: any) => void;
  getContainer: () => HTMLElement;
};

// Market types for filtering
export const marketTypes = [
  { id: 'farmers-market', label: "Farmers Market" },
  { id: 'farm-stand', label: "Farm Stand" },
  { id: 'co-op', label: "Food Co-op" }
];

// Product categories for filtering
export const productCategories = [
  { id: 'vegetables', label: "Vegetables" },
  { id: 'fruits', label: "Fruits" },
  { id: 'dairy', label: "Dairy" },
  { id: 'meat', label: "Meat" },
  { id: 'eggs', label: "Eggs" },
  { id: 'honey', label: "Honey" },
  { id: 'baked-goods', label: "Baked Goods" },
  { id: 'preserves', label: "Preserves" },
  { id: 'crafts', label: "Crafts" }
];

// Sample market data
export const marketData: MarketType[] = [
  {
    id: 1,
    name: "Downtown Farmers Market",
    location: "123 Main St, Cityville",
    description: "A vibrant market featuring over 50 local farmers and producers every weekend.",
    coordinates: [-122.419, 37.775],
    hours: "Saturdays, 8am-2pm",
    products: ['vegetables', 'fruits', 'dairy', 'meat', 'eggs'],
    distance: 3.2,
    phone: "(555) 123-4567",
    website: "www.downtownmarket.com",
    type: 'farmers-market'
  },
  {
    id: 2,
    name: "Riverside Farm Stand",
    location: "456 River Rd, Farmingdale",
    description: "Family-owned farm stand offering seasonal produce and homemade goods.",
    coordinates: [-122.402, 37.796],
    hours: "Daily, 9am-6pm",
    products: ['vegetables', 'fruits', 'honey', 'preserves'],
    distance: 5.7,
    phone: "(555) 234-5678",
    type: 'farm-stand'
  },
  {
    id: 3,
    name: "Community Food Co-op",
    location: "789 Oak Ave, Greenfield",
    description: "Member-owned cooperative featuring local and sustainably produced goods.",
    coordinates: [-122.447, 37.785],
    hours: "Mon-Sat, 8am-8pm; Sun, 10am-6pm",
    products: ['vegetables', 'fruits', 'dairy', 'baked-goods', 'crafts'],
    distance: 2.1,
    phone: "(555) 345-6789",
    website: "www.communitycoop.org",
    type: 'co-op'
  },
  {
    id: 4,
    name: "Hilltop Organic Market",
    location: "321 Summit Rd, Hilltop",
    description: "Certified organic market with a wide selection of local and imported goods.",
    coordinates: [-122.422, 37.808],
    hours: "Wed-Sun, 10am-5pm",
    products: ['vegetables', 'fruits', 'dairy', 'meat', 'baked-goods'],
    distance: 8.3,
    phone: "(555) 456-7890",
    type: 'farmers-market'
  },
  {
    id: 5,
    name: "Valley Fresh Farm Stand",
    location: "159 Valley Way, Meadowbrook",
    description: "Roadside stand offering freshly harvested produce from our family farm.",
    coordinates: [-122.385, 37.765],
    hours: "Thu-Sun, 9am-4pm",
    products: ['vegetables', 'fruits', 'eggs', 'honey'],
    distance: 12.5,
    phone: "(555) 567-8901",
    type: 'farm-stand'
  }
];
