
import React, { useState } from 'react';
import { 
  ArrowLeftRight, 
  Search, 
  MessageSquare, 
  Star, 
  Check, 
  Filter, 
  User,
  Clock
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Sample data for barter listings
const barterListings = [
  {
    id: 1,
    userId: 101,
    userName: "Sarah Johnson",
    userAvatar: "https://i.pravatar.cc/150?img=29",
    title: "Fresh Tomatoes for Trade",
    description: "10 pounds of vine-ripened heirloom tomatoes. Looking to trade for other vegetables or fruits.",
    offering: ["tomatoes"],
    seeking: ["vegetables", "fruits"],
    location: "Greenfield, 5 miles away",
    postedDate: "2 days ago",
    rating: 4.8,
    completion: 95
  },
  {
    id: 2,
    userId: 102,
    userName: "Michael Chen",
    userAvatar: "https://i.pravatar.cc/150?img=11",
    title: "Organic Honey Available",
    description: "5 gallons of wildflower honey from our apiary. Would trade for dairy products or handmade crafts.",
    offering: ["honey"],
    seeking: ["dairy", "crafts"],
    location: "Riverside, 12 miles away",
    postedDate: "1 week ago",
    rating: 4.9,
    completion: 100
  },
  {
    id: 3,
    userId: 103,
    userName: "Emma Rodriguez",
    userAvatar: "https://i.pravatar.cc/150?img=5",
    title: "Fresh Eggs for Exchange",
    description: "30 dozen free-range eggs from our heritage hens. Looking for fresh meat, vegetables, or farmhand assistance.",
    offering: ["eggs"],
    seeking: ["meat", "vegetables", "labor"],
    location: "Meadowview, 8 miles away",
    postedDate: "3 days ago",
    rating: 4.7,
    completion: 92
  },
  {
    id: 4,
    userId: 104,
    userName: "Robert Miller",
    userAvatar: "https://i.pravatar.cc/150?img=12",
    title: "Grass-Fed Beef Available",
    description: "Quarter cow of pasture-raised, grass-fed beef. Would trade for hay, farm equipment use, or other meat products.",
    offering: ["beef"],
    seeking: ["hay", "equipment", "meat"],
    location: "Highridge, 15 miles away",
    postedDate: "5 days ago",
    rating: 4.6,
    completion: 98
  },
  {
    id: 5,
    userId: 105,
    userName: "Aisha Patel",
    userAvatar: "https://i.pravatar.cc/150?img=24",
    title: "Handwoven Baskets for Farm Goods",
    description: "Beautiful handcrafted baskets perfect for harvest or display. Would trade for vegetables, fruits, or honey.",
    offering: ["crafts"],
    seeking: ["vegetables", "fruits", "honey"],
    location: "Central Valley, 3 miles away",
    postedDate: "1 day ago",
    rating: 4.5,
    completion: 90
  }
];

// Sample data for my barter listings
const myListings = [
  {
    id: 101,
    title: "Organic Lettuce Varieties",
    description: "10 pounds of mixed organic lettuce (romaine, butterhead, red leaf). Looking for root vegetables or berries.",
    offering: ["vegetables"],
    seeking: ["vegetables", "fruits"],
    postedDate: "4 days ago",
    status: "active",
    interested: 3
  },
  {
    id: 102,
    title: "Fresh Goat Milk",
    description: "2 gallons of fresh goat milk from our small herd. Would trade for handmade soaps, honey, or other dairy.",
    offering: ["dairy"],
    seeking: ["crafts", "honey", "dairy"],
    postedDate: "1 week ago",
    status: "pending",
    interested: 1
  }
];

// Sample data for product categories
const productCategories = [
  { id: "vegetables", label: "Vegetables" },
  { id: "fruits", label: "Fruits" },
  { id: "dairy", label: "Dairy" },
  { id: "meat", label: "Meat/Poultry" },
  { id: "honey", label: "Honey" },
  { id: "eggs", label: "Eggs" },
  { id: "crafts", label: "Crafts" },
  { id: "equipment", label: "Equipment" },
  { id: "labor", label: "Farm Labor" },
  { id: "hay", label: "Hay/Feed" },
  { id: "beef", label: "Beef" }
];

export function BarterExchange() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedListing, setSelectedListing] = useState<number | null>(null);
  const [offeringFilter, setOfferingFilter] = useState<string>("");
  const [seekingFilter, setSeekingFilter] = useState<string>("");
  const [contactMessage, setContactMessage] = useState("");

  // Filter listings based on search and filters
  const filteredListings = barterListings.filter(listing => {
    // Filter by search term
    if (searchTerm && !listing.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !listing.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Filter by what they're offering
    if (offeringFilter && !listing.offering.includes(offeringFilter)) {
      return false;
    }
    
    // Filter by what they're seeking
    if (seekingFilter && !listing.seeking.includes(seekingFilter)) {
      return false;
    }
    
    return true;
  });

  // Handle sending a message to listing owner
  const handleSendMessage = () => {
    if (!contactMessage.trim()) {
      toast({
        title: "Message Required",
        description: "Please enter a message before sending",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Message Sent",
      description: "Your barter proposal has been sent to the farmer"
    });
    
    setContactMessage("");
  };

  // Handle creating a new listing
  const handleCreateListing = () => {
    toast({
      title: "Create New Listing",
      description: "This would open a form to create a new barter listing"
    });
  };

  // Handle view listing details
  const handleViewListing = (id: number) => {
    setSelectedListing(id === selectedListing ? null : id);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Farmer-to-Farmer Exchange</h2>
        <Button onClick={handleCreateListing}>
          Create New Listing
        </Button>
      </div>
      
      <p className="text-muted-foreground">
        Exchange your surplus farm yields directly with other farmers in your area. 
        Find matches based on what you're offering and what you need.
      </p>

      <Tabs defaultValue="browse">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="browse">Browse Listings</TabsTrigger>
          <TabsTrigger value="my-listings">My Listings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="browse" className="pt-4 space-y-6">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search barter listings..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={offeringFilter} onValueChange={setOfferingFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Offering" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any Products</SelectItem>
                {productCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>{category.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={seekingFilter} onValueChange={setSeekingFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Seeking" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any Products</SelectItem>
                {productCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>{category.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Available Barter Listings ({filteredListings.length})</h3>
              
              {filteredListings.length > 0 ? (
                <div className="space-y-3">
                  {filteredListings.map((listing) => (
                    <Card 
                      key={listing.id} 
                      className={`cursor-pointer transition-all hover:border-primary/50 ${selectedListing === listing.id ? 'ring-2 ring-primary' : ''}`}
                      onClick={() => handleViewListing(listing.id)}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <CardTitle className="text-base">{listing.title}</CardTitle>
                          <Badge variant="outline" className="whitespace-nowrap">
                            <Clock className="h-3 w-3 mr-1" /> {listing.postedDate}
                          </Badge>
                        </div>
                        <CardDescription className="flex items-center gap-1">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={listing.userAvatar} alt={listing.userName} />
                            <AvatarFallback>{listing.userName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span>{listing.userName}</span>
                          <Badge className="ml-2" variant="secondary">
                            <Star className="h-3 w-3 mr-1 text-yellow-500" /> {listing.rating}
                          </Badge>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-3">
                        <p className="text-sm text-muted-foreground mb-3">{listing.description}</p>
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium">Offering:</span>
                            <div className="flex flex-wrap gap-1">
                              {listing.offering.map((item) => (
                                <Badge key={item} variant="secondary" className="text-xs">
                                  {productCategories.find(c => c.id === item)?.label || item}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium">Seeking:</span>
                            <div className="flex flex-wrap gap-1">
                              {listing.seeking.map((item) => (
                                <Badge key={item} variant="outline" className="text-xs">
                                  {productCategories.find(c => c.id === item)?.label || item}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-muted rounded-lg">
                  <p className="text-muted-foreground mb-2">No barter listings match your filters</p>
                  <Button variant="outline" onClick={() => {
                    setSearchTerm("");
                    setOfferingFilter("");
                    setSeekingFilter("");
                  }}>Clear filters</Button>
                </div>
              )}
            </div>
            
            <div>
              {selectedListing ? (
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{barterListings.find(l => l.id === selectedListing)?.title}</CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <User className="h-3 w-3 mr-1" />
                          {barterListings.find(l => l.id === selectedListing)?.userName}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">
                          {barterListings.find(l => l.id === selectedListing)?.location}
                        </Badge>
                        <div className="flex items-center mt-1 text-sm text-muted-foreground justify-end">
                          <Check className="h-3 w-3 mr-1 text-green-500" />
                          <span>{barterListings.find(l => l.id === selectedListing)?.completion}% completion rate</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-1">Description</h4>
                      <p className="text-sm text-muted-foreground">
                        {barterListings.find(l => l.id === selectedListing)?.description}
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-1">Offering</h4>
                        <div className="flex flex-wrap gap-1">
                          {barterListings.find(l => l.id === selectedListing)?.offering.map((item) => (
                            <Badge key={item} variant="secondary">
                              {productCategories.find(c => c.id === item)?.label || item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Seeking</h4>
                        <div className="flex flex-wrap gap-1">
                          {barterListings.find(l => l.id === selectedListing)?.seeking.map((item) => (
                            <Badge key={item} variant="outline">
                              {productCategories.find(c => c.id === item)?.label || item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <h4 className="font-medium mb-2">Contact About Trade</h4>
                      <div className="space-y-3">
                        <Input
                          placeholder="Describe what you'd like to trade..."
                          value={contactMessage}
                          onChange={(e) => setContactMessage(e.target.value)}
                        />
                        <div className="flex justify-end">
                          <Button 
                            onClick={handleSendMessage}
                            className="flex items-center gap-2"
                          >
                            <MessageSquare className="h-4 w-4" />
                            Send Message
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="h-full flex items-center justify-center bg-muted rounded-lg p-6">
                  <div className="text-center">
                    <ArrowLeftRight className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium mb-2">Select a Listing</h3>
                    <p className="text-sm text-muted-foreground max-w-xs">
                      Click on a barter listing to view details and contact the farmer about a potential trade
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="my-listings" className="pt-4 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">My Active Listings</h3>
            <Button variant="outline" onClick={handleCreateListing}>
              <ArrowLeftRight className="h-4 w-4 mr-2" />
              New Listing
            </Button>
          </div>
          
          {myListings.length > 0 ? (
            <div className="space-y-4">
              {myListings.map((listing) => (
                <Card key={listing.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-base">{listing.title}</CardTitle>
                      <div className="flex gap-2">
                        <Badge variant={listing.status === 'active' ? 'default' : 'secondary'}>
                          {listing.status === 'active' ? 'Active' : 'Pending Trade'}
                        </Badge>
                        <Badge variant="outline">
                          <Clock className="h-3 w-3 mr-1" /> {listing.postedDate}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <p className="text-sm text-muted-foreground mb-3">{listing.description}</p>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium">Offering:</span>
                        <div className="flex flex-wrap gap-1">
                          {listing.offering.map((item) => (
                            <Badge key={item} variant="secondary" className="text-xs">
                              {productCategories.find(c => c.id === item)?.label || item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium">Seeking:</span>
                        <div className="flex flex-wrap gap-1">
                          {listing.seeking.map((item) => (
                            <Badge key={item} variant="outline" className="text-xs">
                              {productCategories.find(c => c.id === item)?.label || item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="text-sm text-muted-foreground">
                      <MessageSquare className="h-4 w-4 inline mr-1" />
                      {listing.interested} {listing.interested === 1 ? 'farmer' : 'farmers'} interested
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      {listing.status === 'active' ? (
                        <Button variant="destructive" size="sm">Cancel</Button>
                      ) : (
                        <Button variant="default" size="sm">View Offers</Button>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted rounded-lg">
              <ArrowLeftRight className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">No Active Listings</h3>
              <p className="text-sm text-muted-foreground mb-4 max-w-xs mx-auto">
                You don't have any active barter listings. Create one to start trading with other farmers.
              </p>
              <Button onClick={handleCreateListing}>Create First Listing</Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
