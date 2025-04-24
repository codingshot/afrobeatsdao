import { EventsSection } from "@/components/EventsSection";
import { TeamSection } from "@/components/TeamSection";
import { MusicSection } from "@/components/MusicSection";
import { VibeOfTheDay, VIBE_VIDEOS } from "@/components/VibeOfTheDay";
import { FutureSection } from "@/components/FutureSection";
import { Footer } from "@/components/Footer";
import { ClubsSection } from "@/components/ClubsSection";
import { useGlobalAudioPlayer } from "@/components/GlobalAudioPlayer";
import { useEffect, useState } from "react";
import { HeroSection } from "@/components/HeroSection";

const Index = () => {
  const { playNow, currentTrack } = useGlobalAudioPlayer();
  const [isPlayerInitialized, setIsPlayerInitialized] = useState(false);

  useEffect(() => {
    if (isPlayerInitialized || currentTrack) {
      setIsPlayerInitialized(true);
      return;
    }
    
    const timer = setTimeout(() => {
      try {
        const randomIndex = Math.floor(Math.random() * VIBE_VIDEOS.length);
        const vibeVideoId = VIBE_VIDEOS[randomIndex];
        const defaultSong = {
          id: `vibe-${vibeVideoId}`,
          youtube: vibeVideoId,
          title: "Welcome to Afrobeats DAO",
          artist: "Vibe of the Day"
        };
        
        playNow(defaultSong);
        setIsPlayerInitialized(true);
      } catch (error) {
        console.error("Error initializing player:", error);
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [playNow, isPlayerInitialized, currentTrack]);

  return (
    <div className="min-h-screen font-sans pb-[100px]">
      <main>
        <HeroSection />
        <EventsSection />
        <ClubsSection />
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
