
import React, { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import './App.css';
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/components/Header";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dance from "./pages/Dance";
import DanceDetails from "./pages/DanceDetails";
import Clubs from "./pages/Clubs";
import Events from "./pages/Events";
import Playlists from "./pages/Playlists";
import { GlobalAudioPlayerProvider } from "@/components/GlobalAudioPlayer";

const App = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <GlobalAudioPlayerProvider>
            <div className="min-h-screen">
              <Header />
              <Toaster />
              <Sonner />
              <main>
                <Routes>
                  <Route path="/" element={<div className="page-home"><Index /></div>} />
                  <Route path="/dance" element={<div className="page-dance"><Dance /></div>} />
                  <Route path="/dance/:genre/:id" element={<div className="page-dance"><DanceDetails /></div>} />
                  <Route path="/dance/:id" element={<div className="page-dance"><DanceDetails /></div>} />
                  <Route path="/clubs" element={<div className="page-clubs"><Clubs /></div>} />
                  <Route path="/events" element={<div className="page-events"><Events /></div>} />
                  <Route path="/music" element={<div className="page-music"><Playlists /></div>} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </GlobalAudioPlayerProvider>
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;

