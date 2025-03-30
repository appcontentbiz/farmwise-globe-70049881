
import React, { useState } from 'react';
import { Calendar, ChevronDown, ChevronUp, Download, Info, Search, Bookmark, MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip } from '@/components/ui/tooltip';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartTooltip, Legend } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

// Sample data for market rates
const marketRatesData = [
  {
    id: 1,
    product: "Corn (Bushel)",
    currentPrice: 5.85,
    previousPrice: 5.65,
    change: 0.20,
    changePercent: 3.54,
    supply: "High",
    trend: "up",
    forecast: "Stable with slight increase due to ethanol demand",
    location: "Midwest Region",
    history: [
      { month: "Jan", price: 5.45 },
      { month: "Feb", price: 5.55 },
      { month: "Mar", price: 5.50 },
      { month: "Apr", price: 5.65 },
      { month: "May", price: 5.70 },
      { month: "Jun", price: 5.65 },
      { month: "Jul", price: 5.85 }
    ]
  },
  {
    id: 2,
    product: "Wheat (Bushel)",
    currentPrice: 7.25,
    previousPrice: 7.45,
    change: -0.20,
    changePercent: -2.68,
    supply: "Medium",
    trend: "down",
    forecast: "Expected to stabilize as harvest begins",
    location: "Great Plains",
    history: [
      { month: "Jan", price: 7.65 },
      { month: "Feb", price: 7.80 },
      { month: "Mar", price: 7.70 },
      { month: "Apr", price: 7.60 },
      { month: "May", price: 7.50 },
      { month: "Jun", price: 7.45 },
      { month: "Jul", price: 7.25 }
    ]
  },
  {
    id: 3,
    product: "Soybeans (Bushel)",
    currentPrice: 13.75,
    previousPrice: 13.25,
    change: 0.50,
    changePercent: 3.77,
    supply: "Medium",
    trend: "up",
    forecast: "Likely to increase due to international demand",
    location: "Iowa/Illinois",
    history: [
      { month: "Jan", price: 12.85 },
      { month: "Feb", price: 13.10 },
      { month: "Mar", price: 13.05 },
      { month: "Apr", price: 13.15 },
      { month: "May", price: 13.20 },
      { month: "Jun", price: 13.25 },
      { month: "Jul", price: 13.75 }
    ]
  },
  {
    id: 4,
    product: "Dairy Milk (Cwt)",
    currentPrice: 21.40,
    previousPrice: 21.80,
    change: -0.40,
    changePercent: -1.83,
    supply: "High",
    trend: "down",
    forecast: "Projected to decrease slightly with summer production peak",
    location: "Wisconsin/California",
    history: [
      { month: "Jan", price: 22.15 },
      { month: "Feb", price: 22.25 },
      { month: "Mar", price: 22.10 },
      { month: "Apr", price: 22.00 },
      { month: "May", price: 21.90 },
      { month: "Jun", price: 21.80 },
      { month: "Jul", price: 21.40 }
    ]
  },
  {
    id: 5,
    product: "Beef Cattle (Cwt)",
    currentPrice: 125.50,
    previousPrice: 122.75,
    change: 2.75,
    changePercent: 2.24,
    supply: "Low",
    trend: "up",
    forecast: "Expected to continue rising due to reduced herd sizes",
    location: "Texas/Oklahoma",
    history: [
      { month: "Jan", price: 120.25 },
      { month: "Feb", price: 120.75 },
      { month: "Mar", price: 121.50 },
      { month: "Apr", price: 122.00 },
      { month: "May", price: 122.45 },
      { month: "Jun", price: 122.75 },
      { month: "Jul", price: 125.50 }
    ]
  },
  {
    id: 6,
    product: "Tomatoes (25lb box)",
    currentPrice: 42.15,
    previousPrice: 39.25,
    change: 2.90,
    changePercent: 7.39,
    supply: "Low",
    trend: "up",
    forecast: "Significant increase expected due to drought conditions",
    location: "California/Florida",
    history: [
      { month: "Jan", price: 36.50 },
      { month: "Feb", price: 36.75 },
      { month: "Mar", price: 37.25 },
      { month: "Apr", price: 38.50 },
      { month: "May", price: 39.00 },
      { month: "Jun", price: 39.25 },
      { month: "Jul", price: 42.15 }
    ]
  },
  {
    id: 7,
    product: "Apples (42lb carton)",
    currentPrice: 48.30,
    previousPrice: 47.90,
    change: 0.40,
    changePercent: 0.83,
    supply: "Medium",
    trend: "stable",
    forecast: "Expected to remain stable through summer",
    location: "Washington/Michigan",
    history: [
      { month: "Jan", price: 46.75 },
      { month: "Feb", price: 47.10 },
      { month: "Mar", price: 47.40 },
      { month: "Apr", price: 47.65 },
      { month: "May", price: 47.80 },
      { month: "Jun", price: 47.90 },
      { month: "Jul", price: 48.30 }
    ]
  }
];

// Sample barter exchange rate suggestions
const barterExchangeRates = [
  {
    id: 1,
    exchange: "1 bushel of corn",
    forProduct: "7-8 lbs of fresh vegetables",
    fairValue: "$5.85 vs $5.60-$6.40",
    notes: "Value varies by vegetable type",
  },
  {
    id: 2,
    exchange: "1 dozen eggs",
    forProduct: "1 lb of grass-fed beef",
    fairValue: "$4.50 vs $4.80",
    notes: "Slight advantage to beef producer",
  },
  {
    id: 3,
    exchange: "5 lbs of tomatoes",
    forProduct: "3 lbs of apples",
    fairValue: "$8.40 vs $8.25",
    notes: "Nearly equivalent value",
  },
  {
    id: 4,
    exchange: "1 gallon of milk",
    forProduct: "2 lbs of honey",
    fairValue: "$4.50 vs $16.00",
    notes: "Significant advantage to honey producer",
  },
  {
    id: 5,
    exchange: "10 lbs of potatoes",
    forProduct: "5 lbs of onions",
    fairValue: "$6.80 vs $7.25",
    notes: "Slightly favors onion producer",
  }
];

export function MarketRates() {
  const { toast } = useToast();
  const [selectedRate, setSelectedRate] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [timeRange, setTimeRange] = useState<string>("7d");
  
  // Filtered market rates based on search and region
  const filteredRates = marketRatesData.filter(rate => {
    if (searchTerm && !rate.product.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    if (selectedRegion && !rate.location.includes(selectedRegion)) {
      return false;
    }
    
    return true;
  });

  // Handle saving a market rate
  const handleSaveRate = (id: number) => {
    toast({
      title: "Market Rate Saved",
      description: "This price has been added to your saved rates"
    });
  };

  // Handle downloading market rate data
  const handleDownloadData = (type: string) => {
    toast({
      title: `${type} Data Downloaded`,
      description: "The market data file has been downloaded to your device"
    });
  };

  // Show price trend with up/down arrow
  const renderTrend = (trend: string, change: number) => {
    if (trend === "up") {
      return <span className="text-green-600 flex items-center"><ChevronUp className="h-4 w-4" /> {change.toFixed(2)}</span>;
    } else if (trend === "down") {
      return <span className="text-red-600 flex items-center"><ChevronDown className="h-4 w-4" /> {change.toFixed(2)}</span>;
    } else {
      return <span className="text-amber-600">→ {change.toFixed(2)}</span>;
    }
  };

  // Get supply badge color
  const getSupplyBadge = (supply: string) => {
    switch (supply) {
      case "High":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">High</Badge>;
      case "Medium":
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Medium</Badge>;
      case "Low":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Low</Badge>;
      default:
        return <Badge variant="outline">{supply}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Market Rates & Exchange Values</h2>
          <p className="text-muted-foreground">
            Current market prices to help you make informed selling decisions and fair barter exchanges
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleDownloadData("Market Rate")}>
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      <Tabs defaultValue="market" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="market">Market Prices</TabsTrigger>
          <TabsTrigger value="barter">Barter Exchange Rates</TabsTrigger>
        </TabsList>
        
        <TabsContent value="market" className="space-y-6">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for crops, livestock, or products..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="All Regions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Regions</SelectItem>
                <SelectItem value="Midwest">Midwest Region</SelectItem>
                <SelectItem value="Great Plains">Great Plains</SelectItem>
                <SelectItem value="Iowa">Iowa/Illinois</SelectItem>
                <SelectItem value="Wisconsin">Wisconsin/California</SelectItem>
                <SelectItem value="Texas">Texas/Oklahoma</SelectItem>
                <SelectItem value="California">California/Florida</SelectItem>
                <SelectItem value="Washington">Washington/Michigan</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">7 Days</SelectItem>
                <SelectItem value="30d">30 Days</SelectItem>
                <SelectItem value="90d">90 Days</SelectItem>
                <SelectItem value="1y">1 Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead className="text-right">Current Price</TableHead>
                  <TableHead className="text-right">Change</TableHead>
                  <TableHead>Supply</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRates.length > 0 ? (
                  filteredRates.map((rate) => (
                    <TableRow 
                      key={rate.id} 
                      className={`cursor-pointer ${selectedRate === rate.id ? 'bg-muted/50' : ''}`}
                      onClick={() => setSelectedRate(rate.id === selectedRate ? null : rate.id)}
                    >
                      <TableCell className="font-medium">{rate.product}</TableCell>
                      <TableCell className="text-right">${rate.currentPrice.toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        {renderTrend(rate.trend, rate.change)}
                      </TableCell>
                      <TableCell>{getSupplyBadge(rate.supply)}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
                          <span className="text-sm">{rate.location}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSaveRate(rate.id);
                          }}
                        >
                          <Bookmark className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No market rates found matching your search criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {selectedRate && (
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle>
                    {marketRatesData.find(r => r.id === selectedRate)?.product} - Detailed Trends
                  </CardTitle>
                  <Badge variant="outline">
                    <Calendar className="h-3 w-3 mr-1" /> Updated: Today
                  </Badge>
                </div>
                <CardDescription>
                  Historical prices and future forecast for {marketRatesData.find(r => r.id === selectedRate)?.product}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-6">
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={marketRatesData.find(r => r.id === selectedRate)?.history}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis domain={['auto', 'auto']} />
                        <RechartTooltip 
                          formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
                          labelFormatter={(label) => `Month: ${label}`}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="price"
                          stroke="#4CAF50"
                          name="Price"
                          strokeWidth={2}
                          dot={{ strokeWidth: 2, r: 4 }}
                          activeDot={{ r: 8 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Supply Status</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-semibold">
                            {marketRatesData.find(r => r.id === selectedRate)?.supply}
                          </span>
                          {getSupplyBadge(marketRatesData.find(r => r.id === selectedRate)?.supply || "")}
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Price Change</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-semibold">
                            {renderTrend(
                              marketRatesData.find(r => r.id === selectedRate)?.trend || "", 
                              marketRatesData.find(r => r.id === selectedRate)?.changePercent || 0
                            )}%
                          </span>
                          <span className="text-sm text-muted-foreground">
                            ${marketRatesData.find(r => r.id === selectedRate)?.previousPrice.toFixed(2)} → 
                            ${marketRatesData.find(r => r.id === selectedRate)?.currentPrice.toFixed(2)}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Location</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center">
                          <MapPin className="h-5 w-5 mr-2 text-muted-foreground" />
                          <span className="text-lg font-medium">
                            {marketRatesData.find(r => r.id === selectedRate)?.location}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Market Forecast</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {marketRatesData.find(r => r.id === selectedRate)?.forecast}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-between">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download Historical Data
                </Button>
                <Button onClick={() => handleSaveRate(selectedRate)}>
                  <Bookmark className="h-4 w-4 mr-2" />
                  Save to Tracked Prices
                </Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="barter" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Suggested Barter Exchange Rates</h3>
              <p className="text-sm text-muted-foreground">
                Fair value exchange recommendations based on current market prices
              </p>
            </div>
            <Button variant="outline" onClick={() => handleDownloadData("Barter Rate")}>
              <Download className="h-4 w-4 mr-2" />
              Export Rates
            </Button>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Exchange Item</TableHead>
                  <TableHead>For Item</TableHead>
                  <TableHead className="text-right">Fair Value Comparison</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {barterExchangeRates.map((rate) => (
                  <TableRow key={rate.id}>
                    <TableCell className="font-medium">{rate.exchange}</TableCell>
                    <TableCell>{rate.forProduct}</TableCell>
                    <TableCell className="text-right">{rate.fairValue}</TableCell>
                    <TableCell className="text-muted-foreground">
                      <div className="flex items-center">
                        <Info className="h-3 w-3 mr-1" />
                        {rate.notes}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Calculate Your Own Exchange Rate</CardTitle>
              <CardDescription>
                Enter your products to calculate a fair barter exchange based on current market values
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">What you're offering:</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select product" />
                      </SelectTrigger>
                      <SelectContent>
                        {marketRatesData.map((product) => (
                          <SelectItem key={product.id} value={product.product}>
                            {product.product}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Quantity:</label>
                    <div className="flex items-center gap-2">
                      <Input type="number" placeholder="Amount" />
                      <Select>
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Unit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bushel">Bushel</SelectItem>
                          <SelectItem value="pound">Pound</SelectItem>
                          <SelectItem value="gallon">Gallon</SelectItem>
                          <SelectItem value="dozen">Dozen</SelectItem>
                          <SelectItem value="box">Box</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">What you want:</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select product" />
                      </SelectTrigger>
                      <SelectContent>
                        {marketRatesData.map((product) => (
                          <SelectItem key={product.id} value={product.product}>
                            {product.product}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button className="w-full mt-6">Calculate Fair Exchange</Button>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Exchange Calculation</h4>
                <p className="text-muted-foreground">
                  Select products and quantities above to calculate a fair exchange rate based on current market values.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Barter Exchange Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <Badge className="mt-0.5">1</Badge>
                  <p>Consider shelf life differences when bartering perishable for non-perishable goods</p>
                </div>
                <div className="flex items-start gap-2">
                  <Badge className="mt-0.5">2</Badge>
                  <p>Factor in labor costs, not just raw material values when trading crafted goods</p>
                </div>
                <div className="flex items-start gap-2">
                  <Badge className="mt-0.5">3</Badge>
                  <p>Seasonal availability affects fair value – in-season produce usually demands less value</p>
                </div>
                <div className="flex items-start gap-2">
                  <Badge className="mt-0.5">4</Badge>
                  <p>Quality differences matter – discuss grade and condition before finalizing trades</p>
                </div>
                <div className="flex items-start gap-2">
                  <Badge className="mt-0.5">5</Badge>
                  <p>Build relationships through fair trades – slightly uneven exchanges can be worth it for reliable partners</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
