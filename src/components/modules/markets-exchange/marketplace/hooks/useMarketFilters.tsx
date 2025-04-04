
import { useState } from 'react';
import { MarketType } from '../data/marketData';

export function useMarketFilters(allMarkets: MarketType[]) {
  const [maxDistance, setMaxDistance] = useState<number>(20);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Filter markets based on user selection
  const filteredMarkets = allMarkets.filter(market => {
    // Filter by distance
    if (market.distance > maxDistance) return false;
    
    // Filter by search term
    if (searchTerm && !market.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !market.location.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    
    // Filter by product categories
    if (selectedProducts.length > 0 && 
        !selectedProducts.some(product => market.products.includes(product))) return false;
    
    // Filter by market type
    if (selectedTypes.length > 0 && 
        !selectedTypes.includes(market.type)) return false;
    
    return true;
  });

  // Handle checkbox selections
  const toggleProductFilter = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const toggleTypeFilter = (typeId: string) => {
    setSelectedTypes(prev => 
      prev.includes(typeId) 
        ? prev.filter(id => id !== typeId)
        : [...prev, typeId]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setMaxDistance(20);
    setSearchTerm("");
    setSelectedProducts([]);
    setSelectedTypes([]);
  };

  return {
    filters: {
      maxDistance,
      searchTerm,
      selectedProducts,
      selectedTypes,
      showFilters
    },
    setters: {
      setMaxDistance,
      setSearchTerm,
      setShowFilters
    },
    handlers: {
      toggleProductFilter,
      toggleTypeFilter,
      clearFilters
    },
    filteredMarkets
  };
}
