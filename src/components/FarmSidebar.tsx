
import { Link, useLocation } from "react-router-dom";
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
import { FarmNavigation, farmModules } from "./FarmNavigation";
import { Leaf, MenuIcon, Settings } from "lucide-react";
import { UserProfile } from "./UserProfile";
import { useAuth } from "@/contexts/AuthContext";

export function FarmSidebar({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { toast } = useToast();
  const { user } = useAuth();

  const handleMenuClick = (path: string) => {
    const module = farmModules.find(m => m.path === path);
    if (module && !module.available) {
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
              <Link to="/" className="flex items-center space-x-2">
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
                          to={module.available ? module.path : "#"}
                          className={`${location.pathname === module.path ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}`}
                          onClick={() => handleMenuClick(module.path)}
                        >
                          <module.icon className="h-5 w-5" />
                          <span>{module.name}</span>
                          {!module.available && (
                            <span className="ml-auto text-xs bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded-full">
                              Soon
                            </span>
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="p-6 border-t">
            {user ? (
              <div className="flex items-center justify-between w-full">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Button>
                <div className="ml-2">
                  <UserProfile />
                </div>
              </div>
            ) : (
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Button>
            )}
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
              {farmModules.find((m) => m.path === location.pathname)?.name || "Dashboard"}
            </div>
            <div className="ml-auto">
              <FarmNavigation />
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
