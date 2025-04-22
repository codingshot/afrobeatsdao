
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { EventsSection } from "@/components/EventsSection";
import { TeamSection } from "@/components/TeamSection";
import { MusicSection } from "@/components/MusicSection";
import { VibeOfTheDay } from "@/components/VibeOfTheDay";
import { FutureSection } from "@/components/FutureSection";
import { Footer } from "@/components/Footer";
import { useGlobalAudioPlayer } from "@/components/GlobalAudioPlayer";
import { useEffect } from "react";

const Index = () => {
  const { playNow } = useGlobalAudioPlayer();

  // Set a default song to play when the component mounts
  useEffect(() => {
    // Example song to play automatically when the page loads
    const defaultSong = {
      id: "default-song",
      title: "Welcome to Afrobeats DAO",
      artist: "Afrobeats Community",
      youtube: "https://www.youtube.com/watch?v=Oe8KGEEvZ0w" // Sample Afrobeats song
    };
    
    // Play the default song
    playNow(defaultSong);
  }, [playNow]);

  return (
    <div className="min-h-screen font-sans">
      <Header />
      <main>
        <HeroSection />
        <EventsSection />
        <MusicSection />
        <VibeOfTheDay />
        <TeamSection />
        <FutureSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
