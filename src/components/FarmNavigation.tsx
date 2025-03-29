import { Link, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { FarmModule } from "@/types/farm";
import { 
  Bug, 
  Cloud, 
  Coins, 
  FileText, 
  Landmark, 
  Leaf, 
  Microscope, 
  Sprout, 
  Tractor, 
  User2, 
  Users 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Farm module categories
export const farmModules: FarmModule[] = [
  {
    name: "Dashboard",
    path: "/",
    icon: Leaf,
    description: "Farm overview and key metrics",
    available: true
  },
  {
    name: "Climate & Sustainability",
    path: "/climate",
    icon: Cloud,
    description: "Track environmental impact and sustainability metrics",
    available: true
  },
  {
    name: "Economic & Market",
    path: "/economic",
    icon: Coins,
    description: "Monitor financial performance and market trends",
    available: true
  },
  {
    name: "Tech & Innovation",
    path: "/tech",
    icon: Microscope,
    description: "Implement and track technological innovations",
    available: true
  },
  {
    name: "Pest & Disease",
    path: "/pest",
    icon: Bug,
    description: "Manage and prevent pest and disease outbreaks",
    available: false
  },
  {
    name: "Regulations & Policy",
    path: "/regulations",
    icon: FileText,
    description: "Stay updated on relevant policies and regulations",
    available: false
  },
  {
    name: "Infrastructure",
    path: "/infrastructure",
    icon: Landmark,
    description: "Monitor rural infrastructure and services",
    available: false
  },
  {
    name: "Workforce",
    path: "/workforce",
    icon: Users,
    description: "Manage labor and workforce requirements",
    available: false
  },
  {
    name: "Beginning Farming",
    path: "/beginning",
    icon: Sprout,
    description: "Guidance for new farmers with structured protocols",
    available: false
  },
  {
    name: "Farming Types",
    path: "/types",
    icon: Tractor,
    description: "Specialized tracking for different farming approaches",
    available: false
  },
  {
    name: "Health Insights",
    path: "/health",
    icon: User2,
    description: "Farmer health education and tracking",
    available: false
  },
];

export function FarmNavigation() {
  const location = useLocation();
  const { toast } = useToast();
  
  const handleModuleClick = (module: FarmModule) => {
    if (!module.available) {
      toast({
        title: "Module Coming Soon",
        description: "This module is under development and will be available soon.",
      });
    }
  };
  
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Farm Management</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {farmModules.map((module) => (
                <li key={module.path}>
                  <NavigationMenuLink asChild>
                    <Link
                      to={module.available ? module.path : "#"}
                      className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        location.pathname === module.path ? "bg-accent/50" : ""
                      )}
                      onClick={() => handleModuleClick(module)}
                    >
                      <div className="flex items-center gap-2">
                        <module.icon className="h-4 w-4 text-farm-green" />
                        <div className="text-sm font-medium leading-none">{module.name}</div>
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {module.description}
                      </p>
                      {!module.available && (
                        <span className="mt-1 inline-flex items-center rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                          Coming Soon
                        </span>
                      )}
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <Link to="/" className={cn(navigationMenuTriggerStyle(), location.pathname === "/" ? "bg-accent/50" : "")}>
            Dashboard
          </Link>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <Link to="/climate" className={cn(navigationMenuTriggerStyle(), location.pathname === "/climate" ? "bg-accent/50" : "")}>
            Climate
          </Link>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <Link to="/economic" className={cn(navigationMenuTriggerStyle(), location.pathname === "/economic" ? "bg-accent/50" : "")}>
            Economic
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
