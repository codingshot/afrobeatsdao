
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
import EventDetails from "./pages/EventDetails";
import Playlists from "./pages/Playlists";
import ArtistProfile from "./pages/ArtistProfile";
import Song from "./pages/Song";
import Careers from "./pages/Careers";
import JobDetails from "./pages/JobDetails";
import Discord from "./pages/Discord";
import News from "./pages/News";
import Map from "./pages/Map";
import Partner from "./pages/Partner";
import Chapters from "./pages/Chapters";
import Join from "./pages/Join";
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
                  <Route path="/event/:slug" element={<div className="page-events"><EventDetails /></div>} />
                  <Route path="/music" element={<div className="page-music"><Playlists /></div>} />
                  <Route path="/music/artist/:id" element={<div className="page-music"><ArtistProfile /></div>} />
                  <Route path="/music/artist/:artistId/:songSlug" element={<div className="page-music"><Song /></div>} />
                  <Route path="/careers" element={<div className="page-careers"><Careers /></div>} />
                  <Route path="/careers/:slug" element={<div className="page-careers"><JobDetails /></div>} />
                  <Route path="/news" element={<div className="page-news"><News /></div>} />
                  <Route path="/discord" element={<div className="page-discord"><Discord /></div>} />
                  <Route path="/map" element={<div className="page-map"><Map /></div>} />
                  <Route path="/partner" element={<div className="page-partner"><Partner /></div>} />
                  <Route path="/chapters" element={<div className="page-chapters"><Chapters /></div>} />
                  <Route path="/join" element={<div className="page-join"><Join /></div>} />
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
