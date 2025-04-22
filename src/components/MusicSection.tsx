
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Apple, Youtube, Headphones, ChevronDown } from "lucide-react";
import { FlippableAlbum } from "./FlippableAlbum";

function AlbumCountdown() {
  const releaseDate = new Date("2025-06-06T00:00:00Z");
  const [timeLeft, setTimeLeft] = useState(releaseDate.getTime() - Date.now());
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(releaseDate.getTime() - Date.now());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
  if (timeLeft <= 0) return <span className="text-2xl font-bold text-black">Album is out now!</span>;
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(timeLeft / (1000 * 60 * 60) % 24);
  const minutes = Math.floor(timeLeft / (1000 * 60) % 60);
  const seconds = Math.floor(timeLeft / 1000 % 60);
  return <div className="flex gap-4 text-2xl md:text-3xl font-bold text-black justify-center mt-4 bg-[#E63946]/80 p-3 rounded-full">
      <div><span>{days}</span><span className="ml-1 text-base">d</span></div>
      <div><span>{hours.toString().padStart(2, "0")}</span><span className="ml-1 text-base">h</span></div>
      <div><span>{minutes.toString().padStart(2, "0")}</span><span className="ml-1 text-base">m</span></div>
      <div><span>{seconds.toString().padStart(2, "0")}</span><span className="ml-1 text-base">s</span></div>
    </div>;
}

export function MusicSection() {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return <section id="music" className="py-20 text-black font-afro bg-[#FFD600]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-heading font-extrabold mb-4 flex items-center justify-center gap-3">
            <span className="text-black">Album</span>
            <span className="text-5xl" aria-label="Music emoji">🎵</span>
          </h2>
          <p className="text-xl max-w-2xl mx-auto text-black">
            Afrobeats is a <b>Public Good Album</b> 🆓 — our CC0 album available everywhere soon.
          </p>
          <p className="text-lg mt-2 text-black font-semibold">
            Album drops June 6th, 2025!
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 max-w-5xl mx-auto">
          <div className="md:w-1/2">
            <FlippableAlbum coverImage="/lovable-uploads/6b6dcd87-97f1-4c68-964d-3ef675aff525.png" />
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0 w-full">
            <div className="bg-white rounded-xl p-6 w-full max-w-md mx-auto shadow-2xl text-center">
              <button className="flex items-center justify-center gap-2 w-full text-xl font-heading font-bold text-black mb-4 focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
                <span>When is the album out?</span>
                <ChevronDown className={`h-6 w-6 text-black transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>
              {isOpen && <div>
                  <AlbumCountdown />
                  <div className="flex flex-wrap gap-4 justify-center mt-6">
                    <Button className="bg-gray-200 text-black flex items-center gap-2 py-4 text-lg shadow-lg cursor-not-allowed w-full max-w-[110px]" disabled>
                      <Headphones className="h-5 w-5" />
                      <span>Spotify</span>
                    </Button>
                    <Button className="bg-gray-200 text-black flex items-center gap-2 py-4 text-lg shadow-lg cursor-not-allowed w-full max-w-[110px]" disabled>
                      <Apple className="h-5 w-5" />
                      <span>Apple</span>
                    </Button>
                    <Button className="bg-gray-200 text-black flex items-center gap-2 py-4 text-lg shadow-lg cursor-not-allowed w-full max-w-[110px]" disabled>
                      <Youtube className="h-5 w-5" />
                      <span>YouTube</span>
                    </Button>
                  </div>
                  <p className="text-center text-black mt-6">
                    Links to streaming will be available on release day!
                  </p>
                </div>}
            </div>
          </div>
        </div>
      </div>
    </section>;
}

