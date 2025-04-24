
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
  const { playNow, currentSong } = useGlobalAudioPlayer();
  const [isPlayerInitialized, setIsPlayerInitialized] = useState(false);

  // Only initialize player if no song is currently playing
  useEffect(() => {
    // Only initialize once and only if no song is currently playing
    if (isPlayerInitialized || currentSong) {
      setIsPlayerInitialized(true); // Mark as initialized if there's a current song
      return;
    }
    
    // Add a small delay to ensure the player is fully initialized
    const timer = setTimeout(() => {
      try {
        // Get a random Vibe of the Day video to use as the default song
        const randomIndex = Math.floor(Math.random() * VIBE_VIDEOS.length);
        const vibeVideoId = VIBE_VIDEOS[randomIndex];
        
        console.log("Initializing player with video ID:", vibeVideoId);
        
        // Create a song object from the Vibe of the Day
        const defaultSong = {
          id: `vibe-${vibeVideoId}`,
          youtube: vibeVideoId // Only pass the video ID, titles will be fetched from YouTube
        };
        
        // Play the Vibe of the Day video
        playNow(defaultSong);
        setIsPlayerInitialized(true);
      } catch (error) {
        console.error("Error initializing player:", error);
      }
    }, 1000); // 1 second delay to ensure player is ready
    
    return () => clearTimeout(timer);
  }, [playNow, isPlayerInitialized, currentSong]);

  return (
    <div className="min-h-screen font-sans pb-[100px]">
      <main>
        <HeroSection />
        <EventsSection />
        <ClubsSection />
        <VibeOfTheDay />
        <MusicSection />
        <FutureSection />
        <TeamSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
