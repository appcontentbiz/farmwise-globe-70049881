
import React from 'react';
import { Navigation } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { productCategories, MarketType } from '../MarketplaceMap';

interface MarketDetailsProps {
  market: MarketType;
  getDirections: (market: MarketType) => void;
}

export function MarketDetails({ market, getDirections }: MarketDetailsProps) {
  const { toast } = useToast();

  // Handle contact actions
  const contactMarket = (method: 'phone' | 'website', value: string) => {
    toast({
      title: `Contact via ${method}`,
      description: `Connecting to ${value}`,
    });
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>{market.name}</CardTitle>
        <CardDescription>{market.location}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{market.description}</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-1">Hours</h4>
            <p className="text-sm text-muted-foreground">{market.hours}</p>
          </div>
          <div>
            <h4 className="font-medium mb-1">Products</h4>
            <div className="flex flex-wrap gap-1">
              {market.products.map((product) => (
                <Badge key={product} variant="outline" className="text-xs">
                  {productCategories.find(p => p.id === product)?.label}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={() => contactMarket('phone', market.phone)}
        >
          Call Market
        </Button>
        <Button 
          className="flex items-center gap-2"
          onClick={() => getDirections(market)}
        >
          <Navigation className="h-4 w-4" /> Get Directions
        </Button>
      </CardFooter>
    </Card>
  );
}
