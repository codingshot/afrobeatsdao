
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 w-full z-50 bg-afro-teal shadow-md font-heading">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#" className="flex items-center space-x-2">
          {/* Afro Vibes Logo Style */}
          <span className="text-3xl md:text-4xl font-bold text-afro-yellow tracking-wide font-heading">Afrobeats.party</span>
        </a>
        {/* Only one CTA on the navbar, no bouncing/emoji */}
        <Button
          className="bg-afro-yellow hover:bg-afro-orange text-afro-teal font-heading text-lg px-8 py-3 rounded-full shadow-lg transition hover:scale-105"
          onClick={() => window.open("https://discord.com/invite/55EGdbyh", "_blank")}
        >
          Join
        </Button>
      </div>
    </header>
  );
}
