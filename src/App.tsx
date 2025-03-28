
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/climate" element={<Index />} />
          <Route path="/economic" element={<Index />} />
          <Route path="/tech" element={<Index />} />
          <Route path="/pest" element={<Index />} />
          <Route path="/regulations" element={<Index />} />
          <Route path="/infrastructure" element={<Index />} />
          <Route path="/workforce" element={<Index />} />
          <Route path="/beginning" element={<Index />} />
          <Route path="/types" element={<Index />} />
          <Route path="/health" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
