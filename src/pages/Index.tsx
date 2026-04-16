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
  const { playNow, currentSong } = useGlobalAudioPlayer();

  // Auto-play a random vibe when the page loads and no song is currently playing
  useEffect(() => {
    const savedSong = localStorage.getItem("afrobeats_current_song");

    if (!currentSong && !savedSong) {
      const randomIndex = Math.floor(Math.random() * VIBE_VIDEOS.length);
      const vibeVideoId = VIBE_VIDEOS[randomIndex];

      playNow({
        id: `vibe-${vibeVideoId}`,
        youtube: vibeVideoId,
      });
    }
  }, [playNow, currentSong]);
  return <div className="min-h-screen font-sans pb-[100px]">
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
    </div>;
};
export default Index;