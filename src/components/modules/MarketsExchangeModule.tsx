
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MarketplaceMap } from './markets-exchange/MarketplaceMap';
import { BarterExchange } from './markets-exchange/BarterExchange';
import { MarketRates } from './markets-exchange/MarketRates';

export function MarketsExchangeModule() {
  return (
    <div className="p-6 animate-fade-in">
      <h1 className="text-2xl font-bold mb-6">Markets & Exchange</h1>
      
      <p className="text-muted-foreground mb-6">
        Find local markets filtered by distance and product types, or exchange your surplus yields 
        with other farmers through our bartering system. Current exchange rates provide guidance 
        on fair trades based on real-time supply and demand.
      </p>

      <Tabs defaultValue="markets" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="markets">Local Markets</TabsTrigger>
          <TabsTrigger value="barter">Barter Exchange</TabsTrigger>
          <TabsTrigger value="rates">Market Rates</TabsTrigger>
        </TabsList>
        
        <TabsContent value="markets" className="space-y-6">
          <MarketplaceMap />
        </TabsContent>
        
        <TabsContent value="barter" className="space-y-6">
          <BarterExchange />
        </TabsContent>
        
        <TabsContent value="rates" className="space-y-6">
          <MarketRates />
        </TabsContent>
      </Tabs>
    </div>
  );
}
