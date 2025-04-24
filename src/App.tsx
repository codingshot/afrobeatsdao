
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalAudioPlayerProvider } from "./components/GlobalAudioPlayer";
import Index from "./pages/Index";
import Music from "./pages/Music";
import Dance from "./pages/Dance";
import DanceDetails from "./pages/DanceDetails";
import Clubs from "./pages/Clubs";
import Events from "./pages/Events";
import NotFound from "./pages/NotFound";
import { Toaster } from "@/components/ui/toaster";
import "./App.css";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

function App() {
  return (
    <Router>
      <GlobalAudioPlayerProvider>
        <div className="min-h-screen bg-background font-afro">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/music" element={<Music />} />
            <Route path="/dance" element={<Dance />} />
            <Route path="/dance/:genre/:id" element={<DanceDetails />} />
            <Route path="/clubs" element={<Clubs />} />
            <Route path="/events" element={<Events />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Toaster />
        <SonnerToaster position="top-center" />
      </GlobalAudioPlayerProvider>
    </Router>
  );
}

export default App;
