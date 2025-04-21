
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Apple, Youtube, Headphones, ChevronDown } from "lucide-react";

function AlbumCountdown() {
  const releaseDate = new Date("2025-06-06T00:00:00Z");
  const [timeLeft, setTimeLeft] = useState(releaseDate.getTime() - Date.now());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(releaseDate.getTime() - Date.now());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  if (timeLeft <= 0) return <span className="text-2xl font-bold text-white">Album is out now!</span>;

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return (
    <div className="flex gap-4 text-2xl md:text-3xl font-bold text-white justify-center mt-4 bg-[#E63946]/80 p-3 rounded-full">
      <div><span>{days}</span><span className="ml-1 text-base">d</span></div>
      <div><span>{hours.toString().padStart(2, "0")}</span><span className="ml-1 text-base">h</span></div>
      <div><span>{minutes.toString().padStart(2, "0")}</span><span className="ml-1 text-base">m</span></div>
      <div><span>{seconds.toString().padStart(2, "0")}</span><span className="ml-1 text-base">s</span></div>
    </div>
  );
}

export function MusicSection() {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  return (
    <section id="music" className="py-20 bg-[#108C95] text-white font-afro">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-heading font-extrabold mb-4 flex items-center justify-center gap-3">
            <span>Album</span>
            <span className="text-5xl" aria-label="Music emoji">🎵</span>
          </h2>
          <p className="text-xl max-w-2xl mx-auto">
            Afrobeats is a <b>Public Good Album</b> 🆓 — our CC0 album available everywhere soon.
          </p>
          <p className="text-lg mt-2 text-[#FFD600] font-semibold">
            Album drops June 6th, 2025!
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 max-w-5xl mx-auto">
          <div className="md:w-1/2">
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-2 border-4 border-dashed border-[#FFD600] rounded-2xl"></div>
              <img alt="Afrobeats Album Cover" className="w-full h-full object-cover rounded-2xl shadow-2xl relative z-10" src="/lovable-uploads/6b6dcd87-97f1-4c68-964d-3ef675aff525.png" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl text-[#FFD600]">▶️</span>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0 w-full">
            <h3 className="text-2xl font-heading font-bold mb-4 text-center md:text-left text-white">
              Stream our free CC0 album and vibe to Afrobeats culture! 🎶
            </h3>
            {/* Dropdown mimic with countdown & streaming buttons below when open */}
            <div className="bg-[#1A1F2C] rounded-xl p-6 w-full max-w-md mx-auto shadow-2xl text-center">
              <button className="flex items-center justify-center gap-2 w-full text-xl font-heading font-bold text-[#FFD600] mb-4 focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
                <span>When is the album out?</span>
                <ChevronDown className={`h-6 w-6 transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>
              {isOpen && (
                <div>
                  <AlbumCountdown />
                  <div className="flex flex-wrap gap-4 justify-center mt-6">
                    <Button className="bg-gray-800 text-gray-400 flex items-center gap-2 py-4 text-lg shadow-lg cursor-not-allowed w-full max-w-[110px]" disabled>
                      <Headphones className="h-5 w-5" />
                      <span>Spotify</span>
                    </Button>
                    <Button className="bg-gray-800 text-gray-400 flex items-center gap-2 py-4 text-lg shadow-lg cursor-not-allowed w-full max-w-[110px]" disabled>
                      <Apple className="h-5 w-5" />
                      <span>Apple</span>
                    </Button>
                    <Button className="bg-gray-800 text-gray-400 flex items-center gap-2 py-4 text-lg shadow-lg cursor-not-allowed w-full max-w-[110px]" disabled>
                      <Youtube className="h-5 w-5" />
                      <span>YouTube</span>
                    </Button>
                  </div>
                  <p className="text-center text-[#FFD600] mt-6">
                    Links to streaming will be available on release day!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
