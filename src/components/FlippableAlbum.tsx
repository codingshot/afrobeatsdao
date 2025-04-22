
import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";

interface FlippableAlbumProps {
  coverImage: string;
}

export function FlippableAlbum({ coverImage }: FlippableAlbumProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const trackList = [
    "Proof of Vibes",
    "Blunt DAO",
    "Potlock",
    "Public Goods Podcast",
    "Zuzalu",
    "Green Pill",
    "Nouns.wtf",
    "Let's Grow / Treegens",
    "Nada bot",
    "Build DAO"
  ];

  return (
    <HoverCard>
      <HoverCardTrigger>
        <div 
          className="relative aspect-square max-w-md mx-auto cursor-pointer transition-transform duration-700 transform-style-3d"
          style={{ 
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0)',
            transformStyle: 'preserve-3d' // Add this line
          }}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* Front of card (Album Cover) */}
          <div 
            className="absolute inset-0 backface-hidden"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="absolute inset-2 border-4 border-dashed border-[#FFD600] rounded-2xl"></div>
            <img 
              alt="Afrobeats Album Cover" 
              className="w-full h-full object-cover rounded-2xl shadow-2xl relative z-10" 
              src={coverImage}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl text-[#FFD600]">▶️</span>
            </div>
          </div>

          {/* Back of card (Tracklist) */}
          <div 
            className="absolute inset-0 bg-[#1A1F2C] rounded-2xl shadow-2xl"
            style={{ 
              transform: 'rotateY(180deg)', 
              backfaceVisibility: 'hidden'
            }}
          >
            <div className="p-6 h-full">
              <h3 className="text-2xl font-bold text-[#FFD600] mb-4">Tracklist</h3>
              <ScrollArea className="h-[calc(100%-3rem)] pr-4">
                <ol className="space-y-3">
                  {trackList.map((track, index) => (
                    <li key={track} className="text-white text-lg">
                      {index + 1}. {track}
                    </li>
                  ))}
                </ol>
              </ScrollArea>
            </div>
          </div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="bg-black text-white border-[#FFD600]">
        Click to flip for tracklist
      </HoverCardContent>
    </HoverCard>
  );
}
