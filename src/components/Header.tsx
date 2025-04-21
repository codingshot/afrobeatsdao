
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 w-full z-50 bg-[#1A1F2C] shadow-md font-heading">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#" className="flex items-center space-x-2">
          {/* Afro Vibes Logo Style with 🪘 emoji */}
          <span className="text-4xl" aria-label="Drum emoji" role="img">🪘</span>
          <span className="text-3xl md:text-4xl font-bold text-[#FFD600] tracking-wide font-heading">
            Afrobeats.party
          </span>
        </a>
        {/* Only one CTA on the navbar, no bouncing/emoji */}
        <Button
          className="bg-[#E63946] hover:bg-afro-orange text-white font-heading text-lg px-8 py-3 rounded-full shadow-lg transition hover:scale-105"
          onClick={() => window.open("https://discord.gg/TNrWwSA955", "_blank")}
        >
          Join
        </Button>
      </div>
    </header>
  );
}
