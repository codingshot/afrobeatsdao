import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MainNavbar } from "./MainNavbar";
import { Button } from "@/components/ui/button";

export function Header() {
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between text-white">
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="/lovable-uploads/d20e3d94-ab2d-45a0-b2dd-9bb50e32753d.png"
            alt="Afrobeats Logo"
            className="h-10 w-auto"
          />
        </Link>

        {location.pathname === "/" && (
          <Button
            className="bg-[#E63946] hover:bg-red-700 text-white font-heading text-xl px-8 py-3 rounded-full shadow-lg transition-all hover:scale-105 hidden md:flex"
            onClick={() => window.open('https://discord.gg/TNrWwSA955', '_blank')}
          >
            Join the Movement
          </Button>
        )}
      </div>
      <MainNavbar />
    </header>
  );
}
