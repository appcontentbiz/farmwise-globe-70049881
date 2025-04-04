
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { productCategories, MarketType } from '../MarketplaceMap';

interface MarketListProps {
  filteredMarkets: MarketType[];
  selectedMarket: number | null;
  viewMarketDetails: (id: number) => void;
  clearFilters: () => void;
}

export function MarketList({
  filteredMarkets,
  selectedMarket,
  viewMarketDetails,
  clearFilters
}: MarketListProps) {
  return (
    <div className="md:col-span-1 space-y-4">
      <h3 className="text-lg font-medium">Markets Near You ({filteredMarkets.length})</h3>
      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
        {filteredMarkets.length > 0 ? (
          filteredMarkets.map((market) => (
            <Card 
              key={market.id} 
              className={`cursor-pointer transition-all ${selectedMarket === market.id ? 'ring-2 ring-primary' : ''}`}
              onClick={() => viewMarketDetails(market.id)}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-base">{market.name}</CardTitle>
                  <Badge variant="outline">{market.distance} mi</Badge>
                </div>
                <CardDescription className="text-xs">{market.location}</CardDescription>
              </CardHeader>
              <CardContent className="pb-3">
                <p className="text-xs text-muted-foreground mb-2">{market.hours}</p>
                <div className="flex flex-wrap gap-1">
                  {market.products.slice(0, 3).map((product) => (
                    <Badge key={product} variant="secondary" className="text-xs">
                      {productCategories.find(p => p.id === product)?.label}
                    </Badge>
                  ))}
                  {market.products.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{market.products.length - 3} more
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-8 bg-muted rounded-lg">
            <p className="text-muted-foreground">No markets match your filters</p>
            <Button variant="link" onClick={clearFilters}>Clear filters</Button>
          </div>
        )}
      </div>
    </div>
  );
}
