import { Twitter } from "lucide-react";
export function Footer() {
  return <footer className="bg-[#E63946] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="text-4xl" aria-label="Drum emoji">🪘</span>
              <span className="text-2xl font-bold">Afrobeats.party</span>
            </div>
          </div>
          <div className="flex gap-6 items-center">
            <a href="https://x.com/afrobeatsdao" target="_blank" rel="noopener noreferrer" className="hover:text-[#FFD700] transition-colors" aria-label="Twitter">
              <Twitter className="h-7 w-7" />
            </a>
            <a href="https://discord.com/invite/55EGdbyh" target="_blank" rel="noopener noreferrer" className="hover:text-[#FFD700] transition-colors" aria-label="Discord">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <title>Discord</title>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.4 17.3s-.3-.4-.6-.7c1.2-.4 1.7-1 1.7-1s-.4.2-1.1.5c-.2.1-.3.2-.5.2s-.4 0-.6-.1c-.1 0-.3-.1-.4-.1s-.2 0-.4.1c-.2.1-.4.2-.6.2s-.3-.1-.5-.2c-.7-.3-1.1-.5-1.1-.5s.4.6 1.6 1c-.2.3-.5.7-.6.7-2.1-.1-2.9-1.4-2.9-1.4 0-2.9 1.3-5.3 1.3-5.3C8.8 11 9.5 10.8 9.5 10.8l.5.6c-1.9.6-2.6 1.9-2.6 1.9s.2-.1.6-.2c1.5-.6 2.5-.5 2.5-.5s.1.1.3.2c0 0 .2-.1.5-.1s.5.1.5.1c.2-.1.3-.2.3-.2s1-.1 2.5.5c.3.1.6.2.6.2s-.8-1.2-2.6-1.8l.4-.7s.8.2 1.7 1.2c0 0 1.3 2.4 1.3 5.3 0 0-.7 1.3-2.9 1.4z" />
              </svg>
            </a>
          </div>
        </div>
        
      </div>
    </footer>;
}