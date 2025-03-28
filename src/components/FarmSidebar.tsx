
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import {
  BarChart3,
  Bug,
  Cloud,
  Coins,
  FileText,
  Landmark,
  Leaf,
  LucideIcon,
  MenuIcon,
  Microscope,
  Settings,
  Sprout,
  Tractor,
  User2,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

type FarmModule = {
  name: string;
  path: string;
  icon: LucideIcon;
  description: string;
};

const farmModules: FarmModule[] = [
  {
    name: "Dashboard",
    path: "/",
    icon: Leaf,
    description: "Farm overview and key metrics",
  },
  {
    name: "Climate & Sustainability",
    path: "/climate",
    icon: Cloud,
    description: "Track environmental impact and sustainability metrics",
  },
  {
    name: "Economic & Market",
    path: "/economic",
    icon: Coins,
    description: "Monitor financial performance and market trends",
  },
  {
    name: "Tech & Innovation",
    path: "/tech",
    icon: Microscope,
    description: "Implement and track technological innovations",
  },
  {
    name: "Pest & Disease",
    path: "/pest",
    icon: Bug,
    description: "Manage and prevent pest and disease outbreaks",
  },
  {
    name: "Regulations & Policy",
    path: "/regulations",
    icon: FileText,
    description: "Stay updated on relevant policies and regulations",
  },
  {
    name: "Infrastructure",
    path: "/infrastructure",
    icon: Landmark,
    description: "Monitor rural infrastructure and services",
  },
  {
    name: "Workforce",
    path: "/workforce",
    icon: Users,
    description: "Manage labor and workforce requirements",
  },
  {
    name: "Beginning Farming",
    path: "/beginning",
    icon: Sprout,
    description: "Guidance for new farmers with structured protocols",
  },
  {
    name: "Farming Types",
    path: "/types",
    icon: Tractor,
    description: "Specialized tracking for different farming approaches",
  },
  {
    name: "Health Insights",
    path: "/health",
    icon: User2,
    description: "Farmer health education and tracking",
  },
];

export function FarmSidebar({ children }: { children: React.ReactNode }) {
  const [activePath, setActivePath] = useState("/");
  const { toast } = useToast();

  const handleMenuClick = (path: string) => {
    setActivePath(path);
    if (path !== "/" && path !== "/climate" && path !== "/economic") {
      toast({
        title: "Module Coming Soon",
        description: "This module is under development and will be available soon.",
      });
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar className="border-r">
          <SidebarHeader className="h-16 flex items-center px-6 border-b">
            <div className="flex items-center justify-between w-full">
              <Link to="/" className="flex items-center space-x-2" onClick={() => setActivePath("/")}>
                <Leaf className="h-6 w-6 text-farm-green" />
                <span className="text-xl font-bold">FarmWise</span>
              </Link>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Farm Management</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {farmModules.map((module) => (
                    <SidebarMenuItem key={module.path}>
                      <SidebarMenuButton asChild>
                        <Link
                          to={module.path === "/" || module.path === "/climate" || module.path === "/economic" ? module.path : "/"}
                          className={`${activePath === module.path ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}`}
                          onClick={() => handleMenuClick(module.path)}
                        >
                          <module.icon className="h-5 w-5" />
                          <span>{module.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="p-6 border-t">
            <Button variant="outline" className="w-full justify-start" size="sm">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Button>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
          <header className="h-16 border-b flex items-center px-6 sticky top-0 bg-background z-10">
            <SidebarTrigger>
              <Button variant="outline" size="icon">
                <MenuIcon className="h-5 w-5" />
              </Button>
            </SidebarTrigger>
            <div className="ml-4 font-medium">
              {farmModules.find((m) => m.path === activePath)?.name || "Dashboard"}
            </div>
          </header>
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
