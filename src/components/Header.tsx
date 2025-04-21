
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 w-full z-50 bg-afro-green shadow-md font-afro">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#" className="flex items-center space-x-2">
          <span className="text-2xl md:text-3xl font-bold text-white tracking-wide">Afrobeats.party</span>
        </a>
        {/* Only one CTA on the navbar */}
        <Button
          className="bg-afro-yellow hover:bg-afro-orange text-afro-green font-bold text-lg px-8 py-3 rounded-full shadow-lg transition hover:scale-105 animate-none"
          onClick={() => window.open("https://discord.com/invite/55EGdbyh", "_blank")}
        >
          Join
        </Button>
      </div>
    </header>
  );
}
