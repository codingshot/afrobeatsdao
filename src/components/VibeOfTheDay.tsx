
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Shuffle } from "lucide-react";

// Export the array of video IDs so it can be used in other components
export const VIBE_VIDEOS = [
  'ul_Iy9HC0GE',
  'hvf_K273XIY',
  '6xd4oIP6Uws',
  'yaie5Uia4k8',
  'Sn0dNiKbyz4'
];

export function VibeOfTheDay() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(() => 
    Math.floor(Math.random() * VIBE_VIDEOS.length)
  );

  const shuffleVideo = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * VIBE_VIDEOS.length);
    } while (newIndex === currentVideoIndex);
    setCurrentVideoIndex(newIndex);
  };

  return (
    <section id="vibe" className="py-16 bg-white font-afro">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-heading font-bold mb-4 flex items-center justify-center gap-2">
            <span>Vibe of the Day</span>
            <span className="text-4xl">🎵</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Daily dose of Afrobeats magic. Refresh your spirit!
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative pt-[56.25%] bg-black rounded-2xl overflow-hidden shadow-xl mb-6">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={`https://www.youtube.com/embed/${VIBE_VIDEOS[currentVideoIndex]}`}
              title="Vibe of the Day"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          
          <Button 
            onClick={shuffleVideo}
            className="bg-[#E63946] hover:bg-red-700 text-white font-heading text-xl px-8 py-6 rounded-full shadow-lg transform transition hover:scale-105 flex items-center gap-3 mx-auto"
          >
            <Shuffle className="w-6 h-6" />
            <span>Shuffle Vibe</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
