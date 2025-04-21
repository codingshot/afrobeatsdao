
import { Twitter, Discord } from "lucide-react";

export function Footer() {
  return <footer className="bg-[#E63946] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="text-4xl" aria-label="Drum emoji">🪘</span>
              <span className="text-2xl font-bold font-heading">Afrobeats.party</span>
            </div>
          </div>
          <div className="flex gap-6 items-center">
            <a href="https://x.com/afrobeatsdao" target="_blank" rel="noopener noreferrer" className="hover:text-[#FFD700] transition-colors" aria-label="Twitter">
              <Twitter className="h-7 w-7" />
            </a>
            <a href="https://discord.com/invite/55EGdbyh" target="_blank" rel="noopener noreferrer" className="hover:text-[#FFD700] transition-colors" aria-label="Discord">
              <Discord className="h-7 w-7" />
            </a>
          </div>
        </div>
      </div>
    </footer>;
}
