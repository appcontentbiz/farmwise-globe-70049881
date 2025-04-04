
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  AlertCircle, 
  Globe, 
  MapPin, 
  ChevronRight, 
  ChevronLeft,
  CloudRain,
  FileText,
  Leaf,
  ExternalLink
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { GlobalEventCard } from "./global-monitor/GlobalEventCard";
import { GlobalMap } from "./global-monitor/GlobalMap";
import { AgriculturalIndexChart } from "./global-monitor/AgriculturalIndexChart";
import { FieldReportForm } from "./global-monitor/FieldReportForm";
import { PaginationControls } from "@/components/ui/pagination-controls";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function GlobalMonitorModule() {
  const [activeTab, setActiveTab] = useState("monitor");
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState<typeof events[0] | null>(null);
  const [eventDialogOpen, setEventDialogOpen] = useState(false);
  
  // Events data - in a real app, this would come from an API
  const events = [
    {
      title: "Drought Conditions",
      description: "Affecting wheat and corn crops in Southern Europe. Irrigation levels at 40% capacity.",
      type: "weather" as const,
      location: "Southern Europe",
      date: "2 days ago",
      details: "Extended drought conditions have persisted across Southern Europe for the past 45 days. Rainfall is 60% below seasonal averages, and many reservoirs are at critical levels. Local authorities have implemented water usage restrictions. Crop yields for wheat and corn are expected to decrease by 25-35% in affected areas.",
      actionUrl: "/climate/drought-response"
    },
    {
      title: "Agricultural Policy Change",
      description: "New subsidy program for sustainable farming practices announced in Brazil.",
      type: "policy" as const,
      location: "Brazil",
      date: "1 week ago",
      details: "The Brazilian Ministry of Agriculture has announced a $2.5 billion subsidy program aimed at promoting sustainable farming practices. Farmers who implement regenerative agriculture methods, reduce chemical inputs, or adopt water conservation technologies will be eligible for financial support up to $50,000 per year.",
      actionUrl: "/economic/policies/brazil"
    },
    {
      title: "New Pest Resistant Strain",
      description: "Scientists have developed a new wheat strain resistant to common rust.",
      type: "innovation" as const,
      location: "Canada",
      date: "2 weeks ago",
      details: "Researchers at the Canadian Agricultural Institute have successfully developed a new wheat variety (designated CR-47) that shows 92% resistance to common rust without yield penalties. Field trials demonstrate comparable or slightly improved yields compared to standard varieties. Seeds will be available to farmers for the next planting season.",
      actionUrl: "/tech/crop-innovations"
    },
    {
      title: "Flooding in Rice Fields",
      description: "Severe flooding has affected rice production in Southeast Asia.",
      type: "weather" as const,
      location: "Thailand",
      date: "3 days ago",
      details: "Monsoon rains have caused significant flooding across Thailand's central plains, inundating approximately 400,000 hectares of rice paddies. Early estimates suggest 30% of the country's rice crop may be affected, potentially impacting global rice prices in the coming months. Relief efforts are underway to support affected farmers.",
      actionUrl: "/climate/flood-response"
    },
    {
      title: "Trade Agreement Update",
      description: "New agricultural trade agreement between EU and Mercosur countries.",
      type: "policy" as const,
      location: "EU/South America",
      date: "5 days ago",
      details: "After 20 years of negotiations, the EU and Mercosur countries (Brazil, Argentina, Paraguay, and Uruguay) have finalized a trade agreement that will gradually eliminate tariffs on 93% of agricultural products. The agreement includes provisions for environmental protection and sustainable farming practices. Implementation will begin in phases over the next 5 years.",
      actionUrl: "/economic/trade-agreements"
    },
    {
      title: "Vertical Farming Breakthrough",
      description: "New technology increases yields by 40% in urban vertical farming systems.",
      type: "innovation" as const,
      location: "Japan",
      date: "1 week ago",
      details: "Tokyo-based AgriTech startup GreenTower has unveiled a new LED lighting and nutrient delivery system that increases yields in vertical farms by up to 40% while reducing energy consumption by 25%. The technology integrates AI-controlled spectrum lighting that adapts to each crop's growth stage and precise nutrient delivery. Commercial units are expected to ship within 6 months.",
      actionUrl: "/tech/vertical-farming"
    }
  ];
  
  // Pagination settings
  const eventsPerPage = 3;
  const totalPages = Math.ceil(events.length / eventsPerPage);
  
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      toast({
        title: "Page Updated",
        description: `Viewing page ${currentPage - 1} of ${totalPages}`
      });
    }
  };
  
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      toast({
        title: "Page Updated",
        description: `Viewing page ${currentPage} of ${totalPages}`
      });
    }
  };
  
  // Get current events
  const currentEvents = events.slice(
    (currentPage - 1) * eventsPerPage,
    currentPage * eventsPerPage
  );
  
  const handleContribute = () => {
    toast({
      title: "Report Submitted",
      description: "Thank you for contributing to the global farming community."
    });
  };

  const handleEventClick = (event: typeof events[0]) => {
    setSelectedEvent(event);
    setEventDialogOpen(true);
  };

  const handleEventActionClick = () => {
    if (selectedEvent?.actionUrl) {
      setEventDialogOpen(false);
      toast({
        title: "Navigating to Resource",
        description: `You would be directed to ${selectedEvent.actionUrl}`
      });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Global Agricultural Monitor</h1>
        <Button
          variant="outline"
          onClick={() => toast({
            title: "Data Updated",
            description: "Global monitoring data has been refreshed"
          })}
        >
          Refresh Data
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="monitor">Monitor</TabsTrigger>
          <TabsTrigger value="contribute">Contribute</TabsTrigger>
          <TabsTrigger value="trends">Agricultural Trends</TabsTrigger>
        </TabsList>
        
        <TabsContent value="monitor" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="farm-module-card lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="farm-module-card-title">
                  <Globe className="h-5 w-5 text-farm-green" />
                  Global Agricultural Map
                </CardTitle>
              </CardHeader>
              <CardContent>
                <GlobalMap />
              </CardContent>
            </Card>
            
            <Card className="farm-module-card">
              <CardHeader className="pb-2">
                <CardTitle className="farm-module-card-title">
                  <AlertCircle className="h-5 w-5 text-farm-green" />
                  Recent Global Events
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentEvents.map((event, index) => (
                  <div 
                    key={`${event.title}-${index}`}
                    onClick={() => handleEventClick(event)}
                    className="cursor-pointer hover:bg-muted/30 rounded-md transition-colors"
                  >
                    <GlobalEventCard 
                      title={event.title}
                      description={event.description}
                      type={event.type}
                      location={event.location}
                      date={event.date}
                    />
                  </div>
                ))}
                
                <PaginationControls
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPrevious={handlePrevious}
                  onNext={handleNext}
                  className="mt-4"
                />
              </CardContent>
            </Card>
          </div>
          
          <Card className="farm-module-card">
            <CardHeader className="pb-2">
              <CardTitle className="farm-module-card-title">
                <MapPin className="h-5 w-5 text-farm-green" />
                Regional Impact Assessment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-4 mb-4">
                <h3 className="font-medium mb-2">How global events might affect your region</h3>
                <p className="text-sm text-muted-foreground">
                  Based on your farm location and current global trends, here are potential impacts to monitor:
                </p>
                <ul className="mt-3 space-y-2">
                  <li className="flex items-start gap-2">
                    <CloudRain className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <span className="font-medium">Weather Pattern Shift</span>
                      <p className="text-sm text-muted-foreground">Drought conditions expanding northward may reach your region in 4-6 weeks.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <FileText className="h-5 w-5 text-orange-500 mt-0.5" />
                    <div>
                      <span className="font-medium">Policy Opportunity</span>
                      <p className="text-sm text-muted-foreground">New sustainability subsidies announced in neighboring regions may expand to your area.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Leaf className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <span className="font-medium">Innovation Transfer</span>
                      <p className="text-sm text-muted-foreground">New rust-resistant wheat strain may be available for next planting season.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="contribute" className="space-y-6 mt-6">
          <FieldReportForm onSubmit={handleContribute} />
        </TabsContent>
        
        <TabsContent value="trends" className="space-y-6 mt-6">
          <Card className="farm-module-card">
            <CardHeader className="pb-2">
              <CardTitle className="farm-module-card-title">
                <Globe className="h-5 w-5 text-farm-green" />
                BRICS Agricultural Index
              </CardTitle>
            </CardHeader>
            <CardContent>
              <AgriculturalIndexChart />
              <div className="mt-4 text-sm text-muted-foreground">
                <p>The BRICS Agricultural Index tracks agricultural production, innovation, and market trends across Brazil, Russia, India, China, and South Africa.</p>
                <p className="mt-2">Current Index: <span className="font-medium text-foreground">127.8</span> (↑ 3.2% from last month)</p>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="farm-module-card">
              <CardHeader className="pb-2">
                <CardTitle className="farm-module-card-title text-lg">
                  Crop Production Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Wheat</span>
                      <span className="text-green-600">+5.2%</span>
                    </div>
                    <div className="w-full bg-muted h-2 rounded-full">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "75%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Corn</span>
                      <span className="text-red-600">-2.1%</span>
                    </div>
                    <div className="w-full bg-muted h-2 rounded-full">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: "48%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Rice</span>
                      <span className="text-green-600">+8.7%</span>
                    </div>
                    <div className="w-full bg-muted h-2 rounded-full">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "82%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Soybeans</span>
                      <span className="text-green-600">+3.4%</span>
                    </div>
                    <div className="w-full bg-muted h-2 rounded-full">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "65%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="farm-module-card">
              <CardHeader className="pb-2">
                <CardTitle className="farm-module-card-title text-lg">
                  Global Market Prices
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Wheat (per bushel)</span>
                    <span className="font-medium">$7.82 <span className="text-red-500 text-xs">↓ 0.4%</span></span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Corn (per bushel)</span>
                    <span className="font-medium">$5.43 <span className="text-green-500 text-xs">↑ 1.2%</span></span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Rice (per cwt)</span>
                    <span className="font-medium">$17.50 <span className="text-green-500 text-xs">↑ 2.7%</span></span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Soybeans (per bushel)</span>
                    <span className="font-medium">$14.32 <span className="text-green-500 text-xs">↑ 0.8%</span></span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Coffee (per pound)</span>
                    <span className="font-medium">$1.92 <span className="text-red-500 text-xs">↓ 1.5%</span></span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Sugar (per pound)</span>
                    <span className="font-medium">$0.27 <span className="text-green-500 text-xs">↑ 3.2%</span></span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="farm-module-card">
              <CardHeader className="pb-2">
                <CardTitle className="farm-module-card-title text-lg">
                  Trade Policy Outlook
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-yellow-500 pl-3 py-1">
                    <h4 className="font-medium">EU-Mercosur Trade Deal</h4>
                    <p className="text-sm text-muted-foreground">Negotiations resuming with focus on agricultural exports.</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-3 py-1">
                    <h4 className="font-medium">ASEAN Agricultural Initiative</h4>
                    <p className="text-sm text-muted-foreground">New cooperative framework for Southeast Asian crop production.</p>
                  </div>
                  <div className="border-l-4 border-red-500 pl-3 py-1">
                    <h4 className="font-medium">US-China Tariff Dispute</h4>
                    <p className="text-sm text-muted-foreground">Ongoing tensions affecting soybean and corn markets.</p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-3 py-1">
                    <h4 className="font-medium">African Continental Free Trade Area</h4>
                    <p className="text-sm text-muted-foreground">Implementation phase beginning for agricultural products.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={eventDialogOpen} onOpenChange={setEventDialogOpen}>
        {selectedEvent && (
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {selectedEvent.title}
              </DialogTitle>
              <DialogDescription className="flex justify-between">
                <span>{selectedEvent.location}</span>
                <span className="text-muted-foreground">{selectedEvent.date}</span>
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="mb-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                  ${selectedEvent.type === 'weather' ? 'bg-blue-100 text-blue-800' : 
                  selectedEvent.type === 'policy' ? 'bg-purple-100 text-purple-800' : 
                  'bg-green-100 text-green-800'}`}
                >
                  {selectedEvent.type.charAt(0).toUpperCase() + selectedEvent.type.slice(1)}
                </span>
              </div>
              <p className="text-sm">{selectedEvent.details}</p>
            </div>
            <DialogFooter className="sm:justify-between">
              <Button variant="outline" onClick={() => setEventDialogOpen(false)}>
                Close
              </Button>
              {selectedEvent.actionUrl && (
                <Button onClick={handleEventActionClick}>
                  View Resources
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
