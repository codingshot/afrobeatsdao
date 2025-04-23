import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Shuffle, Play } from "lucide-react";
import { useGlobalAudioPlayer } from "@/components/GlobalAudioPlayer";

// Export the array of video IDs so it can be used in other components
export const VIBE_VIDEOS = ['ul_Iy9HC0GE', 'hvf_K273XIY', '6xd4oIP6Uws', 'yaie5Uia4k8', 'Sn0dNiKbyz4'];
export function VibeOfTheDay() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(() => Math.floor(Math.random() * VIBE_VIDEOS.length));
  const {
    playNow
  } = useGlobalAudioPlayer();
  const shuffleVideo = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * VIBE_VIDEOS.length);
    } while (newIndex === currentVideoIndex);
    setCurrentVideoIndex(newIndex);
  };
  const playInGlobalPlayer = () => {
    try {
      const videoId = VIBE_VIDEOS[currentVideoIndex];
      console.log("VibeOfTheDay: Playing video in global player:", videoId);
      playNow({
        id: `vibe-${videoId}`,
        youtube: videoId
      });
    } catch (error) {
      console.error("Error playing vibe in global player:", error);
    }
  };
  return <section id="vibe" className="py-16 bg-white font-afro">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-heading font-bold mb-4 flex items-center justify-center gap-2">
            <span className="text-slate-900">Vibe of the Day</span>
            <span className="text-4xl">🎵</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Daily dose of Afrobeats magic. Refresh your spirit! Use the player controls below to toggle video view.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-4 justify-center">
            <Button onClick={shuffleVideo} className="bg-[#E63946] hover:bg-red-700 text-white font-heading text-xl px-8 py-6 rounded-full shadow-lg transform transition hover:scale-105 flex items-center gap-3">
              <Shuffle className="w-6 h-6" />
              <span>Shuffle Vibe</span>
            </Button>
            
            <Button onClick={playInGlobalPlayer} className="bg-[#264653] hover:bg-blue-800 text-white font-heading text-xl px-8 py-6 rounded-full shadow-lg transform transition hover:scale-105 flex items-center gap-3">
              <Play className="w-6 h-6" />
              <span>Play in Player</span>
            </Button>
          </div>
        </div>
      </div>
    </section>;
}
