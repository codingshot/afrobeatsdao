
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/afrobeats-vibe.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      <div className="absolute inset-0 bg-black opacity-40 z-0"></div>
      
      <div className="relative z-10 text-center space-y-6 p-4">
        <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold font-heading hero-title">
          Afrobeats DAO
        </h1>
        <p className="text-white text-xl md:text-2xl max-w-2xl mx-auto hero-subtitle">
          Join the movement and jam to the best of African music and culture
        </p>
        <div className="space-x-4">
          <Button size="lg" className="bg-[#FFD600] text-black hover:bg-[#FFD600]/90">
            Join The Movement
          </Button>
          <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
            Discover Music
          </Button>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <a href="#events" className="flex flex-col items-center text-white hover:text-gray-300">
            <ArrowDown className="h-6 w-6 mb-2" />
            <span className="text-sm">Learn More</span>
          </a>
        </div>
      </div>
    </section>
  );
}
