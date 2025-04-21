
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

type NavItem = {
  label: string;
  emoji: string;
  href: string;
};

const navItems: NavItem[] = [
  { label: "Home", emoji: "🏠", href: "#" },
  { label: "Events", emoji: "🎉", href: "#events" },
  { label: "Team", emoji: "👥", href: "#team" },
  { label: "Music", emoji: "🎶", href: "#music" },
  { label: "Future", emoji: "🚀", href: "#future" },
  { label: "Join", emoji: "🫶", href: "https://discord.com/invite/55EGdbyh" },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 w-full z-50 bg-[#F28C38] shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#" className="flex items-center space-x-2">
          <span className="text-4xl md:text-5xl animate-emoji-bounce">🪘</span>
          <span className="text-xl md:text-2xl font-bold text-white">Afrobeats.party</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-white hover:text-afro-gold transition-colors flex items-center space-x-1 group"
            >
              <span className="group-hover:animate-emoji-bounce">{item.emoji}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <Button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          variant="ghost" 
          className="md:hidden text-white hover:bg-afro-orange/20"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#F28C38] border-t border-white/10 animate-slide-in-right">
          <div className="container mx-auto px-4 py-2">
            <nav className="flex flex-col space-y-3 py-3">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-white hover:text-[#FFD700] transition-colors flex items-center space-x-2 p-2 rounded-md hover:bg-white/10"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>{item.emoji}</span>
                  <span>{item.label}</span>
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
