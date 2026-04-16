
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Apple, Youtube, Headphones, ChevronDown, CreativeCommons } from "lucide-react";
import { FlippableAlbum } from "./FlippableAlbum";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const ALBUM_RELEASE_DATE = new Date("2025-08-01T00:00:00Z");

/** Official YouTube playlist: “Afrobeats is a public good” */
const PUBLIC_GOOD_YT_PLAYLIST_ID = "OLAK5uy_lXoKCymdHRrb86jji8oNAT5RpcSaUvwQk";
const PUBLIC_GOOD_YT_PLAYLIST_URL = `https://www.youtube.com/playlist?list=${PUBLIC_GOOD_YT_PLAYLIST_ID}`;
const PUBLIC_GOOD_YT_PLAYLIST_EMBED = `https://www.youtube.com/embed/videoseries?list=${PUBLIC_GOOD_YT_PLAYLIST_ID}`;

function AlbumCountdown() {
  const [timeLeft, setTimeLeft] = useState(ALBUM_RELEASE_DATE.getTime() - Date.now());
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(ALBUM_RELEASE_DATE.getTime() - Date.now());
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
  return <section id="music" className="py-16 text-black font-afro bg-afro-yellow">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-heading font-extrabold mb-4 flex items-center justify-center gap-3 text-black">
            <span>Album</span>
            <span className="text-5xl" aria-label="Music emoji">🎵</span>
          </h2>
          <p className="text-xl max-w-2xl mx-auto text-black flex flex-wrap items-center justify-center gap-2 px-4">
            Afrobeats is A Public Good Album 
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="flex items-center">
                  <CreativeCommons className="h-6 w-6 mx-1" />
                  <span className="font-bold">CC0</span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>CC0 (Creative Commons Zero): A public domain dedication that allows completely free use, modification, and distribution of creative work with no restrictions.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            🆓 — full album playlist on YouTube; more stores as they go live.
          </p>
          <p className="text-lg mt-2 text-black font-semibold">
            Released August 1st, 2025 — listen below on YouTube.
          </p>
        </div>
        <div className="max-w-4xl mx-auto mb-12">
          <div className="rounded-xl overflow-hidden shadow-2xl border-4 border-black/10 bg-black aspect-video">
            <iframe
              src={PUBLIC_GOOD_YT_PLAYLIST_EMBED}
              title="Afrobeats is a public good — YouTube album playlist"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
          <p className="text-center text-sm text-black/80 mt-3">
            <a
              href={PUBLIC_GOOD_YT_PLAYLIST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline underline-offset-4 hover:text-[#E63946]"
            >
              Open this playlist on YouTube
            </a>{" "}
            — same order as the official release playlist.
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
                    <Button
                      asChild
                      className="bg-[#FF0000] hover:bg-[#cc0000] text-white flex items-center gap-2 py-4 text-lg shadow-lg w-full max-w-[140px]"
                    >
                      <a href={PUBLIC_GOOD_YT_PLAYLIST_URL} target="_blank" rel="noopener noreferrer">
                        <Youtube className="h-5 w-5" />
                        <span>YouTube</span>
                      </a>
                    </Button>
                  </div>
                  <p className="text-center text-black mt-6 text-sm">
                    Spotify and Apple Music links will be added here when available. The full album playlist is already on{" "}
                    <a href={PUBLIC_GOOD_YT_PLAYLIST_URL} className="font-semibold underline" target="_blank" rel="noopener noreferrer">
                      YouTube
                    </a>
                    .
                  </p>
                </div>}
            </div>
          </div>
        </div>
      </div>
    </section>;
}
