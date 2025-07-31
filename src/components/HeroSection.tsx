
import React from "react";
import { Button } from "@/components/ui/button";
export function HeroSection() {
  const scrollToVibe = () => {
    const vibeSection = document.querySelector('#vibe');
    vibeSection?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return <section className="relative min-h-screen flex items-center justify-center bg-[#FFD600]">
      <div className="relative z-10 text-center space-y-8 p-4">
        <div className="flex flex-col items-center">
          <div className="mb-6">
            <img src="/afrobeatsdaologo.png" alt="Afrobeats DAO Logo" className="mx-auto w-48 h-48 object-contain" />
          </div>
          <h1 className="text-black text-5xl md:text-7xl lg:text-8xl font-bold font-heading" style={{
          color: '#000 !important'
        }}>
            Afrobeats DAO
          </h1>
        </div>
        <p className="text-black text-2xl md:text-3xl max-w-2xl mx-auto hero-subtitle">the only hub for everything Afrobeats - music, DJs, events, clubs, dance + more</p>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
          <Button size="lg" className="bg-[#008751] text-white hover:bg-[#008751]/90 font-heading text-lg sm:text-xl rounded-full px-6 sm:px-8 py-4 sm:py-6 h-auto w-full sm:w-auto" onClick={() => window.open('https://discord.gg/TNrWwSA955', '_blank')}>
            Join
          </Button>
          <Button size="lg" variant="outline" className="bg-[#ea384c] text-white border-white hover:bg-[#ea384c]/90 font-heading text-lg sm:text-xl rounded-full px-6 sm:px-8 py-4 sm:py-6 h-auto w-full sm:w-auto" onClick={scrollToVibe}>
            Vibe
          </Button>
        </div>
      </div>
    </section>;
}
