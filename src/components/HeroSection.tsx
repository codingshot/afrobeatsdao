
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

export function HeroSection() {
  const scrollToVibe = () => {
    const vibeSection = document.querySelector('#vibe');
    vibeSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#FFD600]">
      <div className="relative z-10 text-center space-y-6 p-4">
        <h1 className="text-black text-4xl md:text-6xl lg:text-7xl font-bold font-heading hero-title">
          Afrobeats DAO
        </h1>
        <p className="text-black text-xl md:text-2xl max-w-2xl mx-auto hero-subtitle">
          Join the movement and jam to the best of African music and culture
        </p>
        <div className="space-x-4">
          <Button 
            size="lg" 
            className="bg-[#008751] text-white hover:bg-[#008751]/90 font-heading"
            onClick={() => window.open('https://discord.gg/afrobeats', '_blank')}
          >
            Join Discord
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="bg-[#ea384c] text-white border-white hover:bg-[#ea384c]/90 font-heading"
            onClick={scrollToVibe}
          >
            Vibe
          </Button>
        </div>
      </div>
    </section>
  );
}
