
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
import Clubs from "./pages/Clubs";
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
              {/* Generic route for all dances */}
              <Route path="/dance/:genre/:id" element={<DanceDetails />} />
              {/* Generic route for direct dance access */}
              <Route path="/dance/:id" element={<DanceDetails />} />
              {/* New route for clubs */}
              <Route path="/clubs" element={<Clubs />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </GlobalAudioPlayerProvider>
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
