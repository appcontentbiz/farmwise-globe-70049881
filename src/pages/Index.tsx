
import { FarmSidebar } from "@/components/FarmSidebar";
import { StatCard } from "@/components/dashboard/StatCard";
import { FarmMap } from "@/components/dashboard/FarmMap";
import { WeatherModule } from "@/components/dashboard/WeatherModule";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { 
  Activity, 
  AlertCircle,
  Bug, 
  Cloud, 
  Coins, 
  Droplets, 
  FileText, 
  Landmark, 
  Leaf, 
  Microscope, 
  Sprout, 
  Tractor, 
  User2, 
  Users 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClimateModule } from "@/components/modules/ClimateModule";
import { EconomicModule } from "@/components/modules/EconomicModule";
import { TechModule } from "@/components/modules/TechModule";
import { PestDiseaseModule } from "@/components/modules/PestDiseaseModule";
import { BeginningFarmingModule } from "@/components/modules/BeginningFarmingModule";
import { FarmingTypesModule } from "@/components/modules/FarmingTypesModule";
import { HealthInsightsModule } from "@/components/modules/HealthInsightsModule";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const farmModules = [
  {
    name: "Climate & Sustainability",
    description: "Track environmental impact and sustainable farming practices",
    icon: Cloud,
    path: "/climate",
    available: true
  },
  {
    name: "Economic & Market",
    description: "Monitor financial performance and market access",
    icon: Coins,
    path: "/economic",
    available: true
  },
  {
    name: "Tech & Innovation",
    description: "Implement and track technological innovations",
    icon: Microscope,
    path: "/tech",
    available: true
  },
  {
    name: "Pest & Disease",
    description: "Manage and prevent pest and disease outbreaks",
    icon: Bug,
    path: "/pest",
    available: true
  },
  {
    name: "Beginning Farming",
    description: "Guidance for new farmers with structured protocols",
    icon: Sprout,
    path: "/beginning",
    available: true
  },
  {
    name: "Farming Types",
    description: "Specialized tracking for different farming approaches",
    icon: Tractor,
    path: "/types",
    available: true
  },
  {
    name: "Health Insights",
    description: "Farmer health education and tracking",
    icon: User2,
    path: "/health",
    available: true
  },
  {
    name: "Regulations & Policy",
    description: "Stay updated on relevant policies and regulations",
    icon: FileText,
    path: "/regulations",
    available: false
  },
  {
    name: "Infrastructure",
    description: "Monitor rural infrastructure and services",
    icon: Landmark,
    path: "/infrastructure",
    available: false
  },
  {
    name: "Workforce",
    description: "Manage labor and workforce requirements",
    icon: Users,
    path: "/workforce",
    available: false
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleModuleClick = (path: string, available: boolean) => {
    if (available) {
      navigate(path);
    } else {
      toast({
        title: "Module Coming Soon",
        description: "This module is under development. You can still use the available modules to test tracking features.",
      });
    }
  };

  return (
    <div className="p-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard 
          title="Crop Health Index" 
          value="86%" 
          description="Last 30 days:" 
          icon={Leaf}
          trend={{ value: 4, isPositive: true }}
        />
        <StatCard 
          title="Sustainability Score" 
          value="72/100" 
          description="Areas for improvement: Biodiversity" 
          icon={Cloud}
        />
        <StatCard 
          title="Economic Health" 
          value="$71,000" 
          description="Net profit YTD:" 
          icon={Coins}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard 
          title="Tasks Due" 
          value="5" 
          description="Most urgent: Irrigation check" 
          icon={Activity}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <FarmMap />
        <WeatherModule />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <ActivityFeed />
        
        <Card className="farm-module-card col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="farm-module-card-title">
              <AlertCircle className="h-5 w-5 text-yellow-500" />
              Alerts & Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Weather Alert: Heavy Rain Expected</h4>
                    <p className="text-sm text-muted-foreground mt-1">2-3 inches of rainfall predicted over the next 48 hours. Consider delaying scheduled fertilizer application.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Pest Alert: Corn Rootworm Detection</h4>
                    <p className="text-sm text-muted-foreground mt-1">Early signs detected in North Field section 2. Immediate inspection recommended.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Market Alert: Corn Futures Rising</h4>
                    <p className="text-sm text-muted-foreground mt-1">December corn futures up 2.5% this week. Consider locking in prices for portion of harvest.</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <h2 className="text-2xl font-semibold mb-4">Farm Management Modules</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {farmModules.map((module) => (
          <Card key={module.name} className={`relative overflow-hidden transition-all hover:shadow-md ${!module.available ? 'opacity-70' : ''}`}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <module.icon className="h-5 w-5 text-farm-green" />
                {module.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{module.description}</p>
              <Button 
                variant={module.available ? "default" : "outline"} 
                className="w-full"
                onClick={() => handleModuleClick(module.path, module.available)}
              >
                {module.available ? "Open Module" : "Coming Soon"}
              </Button>
              
              {!module.available && (
                <div className="absolute top-2 right-2">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                    Coming Soon
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const Index = () => {
  const location = useLocation();
  const path = location.pathname;
  
  return (
    <FarmSidebar>
      {path === "/" && <Dashboard />}
      {path === "/climate" && <ClimateModule />}
      {path === "/economic" && <EconomicModule />}
      {path === "/tech" && <TechModule />}
      {path === "/pest" && <PestDiseaseModule />}
      {path === "/beginning" && <BeginningFarmingModule />}
      {path === "/types" && <FarmingTypesModule />}
      {path === "/health" && <HealthInsightsModule />}
    </FarmSidebar>
  );
};

export default Index;
