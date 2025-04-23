
import React from 'react';
import { Footer } from "@/components/Footer";
import { MusicSection } from "@/components/MusicSection";
import { VibeOfTheDay } from "@/components/VibeOfTheDay";
import { ArtistsSection } from "@/components/ArtistsSection";

const Music = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col gap-0">
        <MusicSection />
        <ArtistsSection />
        <VibeOfTheDay />
      </div>
      <Footer />
    </div>
  );
};

export default Music;
