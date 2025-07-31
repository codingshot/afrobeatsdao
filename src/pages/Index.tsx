import { EventsSection } from "@/components/EventsSection";
import { TeamSection } from "@/components/TeamSection";
import { MusicSection } from "@/components/MusicSection";
import { VibeOfTheDay, VIBE_VIDEOS } from "@/components/VibeOfTheDay";
import { DanceCarousel } from "@/components/DanceCarousel";
import { Footer } from "@/components/Footer";
import { ClubsSection } from "@/components/ClubsSection";
import { useGlobalAudioPlayer } from "@/components/GlobalAudioPlayer";
import { useEffect } from "react";
import { HeroSection } from "@/components/HeroSection";
import NewsTicker from "@/components/NewsTicker";
import MusicCarousel from "@/components/MusicCarousel";
import ArtistsCarousel from "@/components/ArtistsCarousel";
import { MiniGlobalMap } from "@/components/MiniGlobalMap";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
const Index = () => {
  const navigate = useNavigate();

  // Safely access the audio player context
  let audioPlayerContext;
  try {
    audioPlayerContext = useGlobalAudioPlayer();
  } catch (error) {
    console.warn("GlobalAudioPlayer context not available:", error);
    audioPlayerContext = null;
  }
  const { playNow, currentSong } = audioPlayerContext || {};

  // Auto-play a random vibe when the page loads and no song is currently playing
  useEffect(() => {
    if (!audioPlayerContext || !playNow) return;

    // Check localStorage first for any saved song
    const savedSong = localStorage.getItem("afrobeats_current_song");

    // Only initialize if no song is currently playing and no song in local storage
    if (!currentSong && !savedSong) {
      // Get a random Vibe of the Day video to use as the default song
      const randomIndex = Math.floor(Math.random() * VIBE_VIDEOS.length);
      const vibeVideoId = VIBE_VIDEOS[randomIndex];
      console.log("Auto-initializing player with video ID:", vibeVideoId);

      // Create a song object from the Vibe of the Day
      const defaultSong = {
        id: `vibe-${vibeVideoId}`,
        youtube: vibeVideoId, // Only pass the video ID, titles will be fetched from YouTube
      };

      // Play the Vibe of the Day video
      playNow(defaultSong);
    }
  }, [playNow, currentSong, audioPlayerContext]);
  return (
    <div className="min-h-screen font-sans pb-[150px] md:pb-[93px]">
      <main>
        <HeroSection />
        <NewsTicker />
        <MusicCarousel />
        <EventsSection />
        <ClubsSection />
        <VibeOfTheDay />
        <MusicSection />
        <ArtistsCarousel />
        <DanceCarousel />
        <MiniGlobalMap />
        <TeamSection />

        {/* Partner CTA Section */}
      </main>
      <Footer />
    </div>
  );
};
export default Index;
