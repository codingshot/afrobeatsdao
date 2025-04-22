
import { Toaster } from "@/components/ui/toaster";
import './App.css';
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dance from "./pages/Dance";
import DanceDetails from "./pages/DanceDetails";
import { GlobalAudioPlayerProvider } from "@/components/GlobalAudioPlayer";
import { useState } from "react";

const App = () => {
  // Create QueryClient inside the component to ensure proper React hooks context
  const [queryClient] = useState(() => new QueryClient());

  // Restructure the providers to ensure proper nesting
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <GlobalAudioPlayerProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dance" element={<Dance />} />
              <Route path="/dance/:genre/:id" element={<DanceDetails />} />
              {/* Direct dance routes for easier sharing */}
              <Route path="/dance/afrobeats/zanku" element={<DanceDetails />} />
              <Route path="/dance/afrobeats/azonto" element={<DanceDetails />} />
              <Route path="/dance/afrobeats/shaku-shaku" element={<DanceDetails />} />
              <Route path="/dance/afrobeats/galala" element={<DanceDetails />} />
              <Route path="/dance/afrobeats/gbese" element={<DanceDetails />} />
              <Route path="/dance/amapiano/gwara-gwara" element={<DanceDetails />} />
              <Route path="/dance/amapiano/tshwala-bam" element={<DanceDetails />} />
              <Route path="/dance/amapiano/vosho" element={<DanceDetails />} />
              <Route path="/dance/amapiano/pouncing-cat" element={<DanceDetails />} />
              <Route path="/dance/amapiano/zekethe" element={<DanceDetails />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </GlobalAudioPlayerProvider>
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
