
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
  Leaf
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { GlobalEventCard } from "./global-monitor/GlobalEventCard";
import { GlobalMap } from "./global-monitor/GlobalMap";
import { AgriculturalIndexChart } from "./global-monitor/AgriculturalIndexChart";
import { FieldReportForm } from "./global-monitor/FieldReportForm";

export function GlobalMonitorModule() {
  const [activeTab, setActiveTab] = useState("monitor");
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  
  // Events data - in a real app, this would come from an API
  const events = [
    {
      title: "Drought Conditions",
      description: "Affecting wheat and corn crops in Southern Europe. Irrigation levels at 40% capacity.",
      type: "weather",
      location: "Southern Europe",
      date: "2 days ago"
    },
    {
      title: "Agricultural Policy Change",
      description: "New subsidy program for sustainable farming practices announced in Brazil.",
      type: "policy",
      location: "Brazil",
      date: "1 week ago"
    },
    {
      title: "New Pest Resistant Strain",
      description: "Scientists have developed a new wheat strain resistant to common rust.",
      type: "innovation",
      location: "Canada",
      date: "2 weeks ago"
    },
    {
      title: "Flooding in Rice Fields",
      description: "Severe flooding has affected rice production in Southeast Asia.",
      type: "weather",
      location: "Thailand",
      date: "3 days ago"
    },
    {
      title: "Trade Agreement Update",
      description: "New agricultural trade agreement between EU and Mercosur countries.",
      type: "policy",
      location: "EU/South America",
      date: "5 days ago"
    },
    {
      title: "Vertical Farming Breakthrough",
      description: "New technology increases yields by 40% in urban vertical farming systems.",
      type: "innovation",
      location: "Japan",
      date: "1 week ago"
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
                  <GlobalEventCard 
                    key={`${event.title}-${index}`}
                    title={event.title}
                    description={event.description}
                    type={event.type}
                    location={event.location}
                    date={event.date}
                  />
                ))}
                
                <div className="flex justify-between mt-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>
                  <span className="text-sm text-muted-foreground flex items-center">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
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
    </div>
  );
}
