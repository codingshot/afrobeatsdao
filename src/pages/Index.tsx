
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { EventsSection } from "@/components/EventsSection";
import { TeamSection } from "@/components/TeamSection";
import { MusicSection } from "@/components/MusicSection";
import { VibeOfTheDay, VIBE_VIDEOS } from "@/components/VibeOfTheDay";
import { FutureSection } from "@/components/FutureSection";
import { Footer } from "@/components/Footer";
import { useGlobalAudioPlayer } from "@/components/GlobalAudioPlayer";
import { useEffect } from "react";

const Index = () => {
  const { playNow } = useGlobalAudioPlayer();

  // Set the current Vibe of the Day video to play when the component mounts
  useEffect(() => {
    // Get a random Vibe of the Day video to use as the default song
    const randomIndex = Math.floor(Math.random() * VIBE_VIDEOS.length);
    const vibeVideoId = VIBE_VIDEOS[randomIndex];
    
    // Create a song object from the Vibe of the Day
    const defaultSong = {
      id: `vibe-${vibeVideoId}`,
      title: "Vibe of the Day",
      artist: "Afrobeats DAO",
      youtube: vibeVideoId // Use the video ID directly
    };
    
    // Play the Vibe of the Day video
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
