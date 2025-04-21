
import { Button } from "@/components/ui/button";
import { Apple, Youtube, Headphones } from "lucide-react";

type MusicPlatform = {
  name: string;
  icon: React.ReactNode;
  emoji: string;
  link: string;
};

const musicPlatforms: MusicPlatform[] = [
  {
    name: "Spotify",
    icon: <Headphones className="h-5 w-5" />,
    emoji: "🎧",
    link: "#",
  },
  {
    name: "Apple Music",
    icon: <Apple className="h-5 w-5" />,
    emoji: "🍎",
    link: "#",
  },
  {
    name: "YouTube",
    icon: <Youtube className="h-5 w-5" />,
    emoji: "▶️",
    link: "#",
  },
];

export function MusicSection() {
  return (
    <section id="music" className="py-16 bg-[#E63946] text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-2">
            <span>See Music</span>
            <span className="text-4xl" aria-label="Music emoji">🎵</span>
          </h2>
          <p className="text-xl max-w-2xl mx-auto">
            Afrobeats is a Public Good Album 🆓 - our CC0 album available everywhere soon.
          </p>
          <p className="text-lg mt-2 text-[#FFD700] font-semibold">
            Album drops June 6th!
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-5xl mx-auto">
          <div className="md:w-1/2">
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-2 border-4 border-dashed border-[#FFD700] rounded-xl animate-spin-slow"></div>
              <img
                src="https://images.unsplash.com/photo-1469041797191-50ace28483c3?auto=format&fit=crop&w=800&q=80"
                alt="Afrobeats Album Cover"
                className="w-full h-full object-cover rounded-xl shadow-2xl relative z-10"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl animate-pulse">▶️</span>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <h3 className="text-2xl font-bold mb-4 text-center md:text-left">
              Stream our free CC0 album and vibe to Afrobeats culture! 🎶
            </h3>
            <div className="flex flex-col gap-4 mt-6 items-center w-full">
              {musicPlatforms.map((platform) => (
                <Button
                  key={platform.name}
                  className="bg-gray-300 text-gray-400 transition-all flex items-center justify-center gap-2 py-6 text-lg shadow-lg group cursor-not-allowed w-full max-w-xs"
                  disabled
                >
                  {platform.icon}
                  <span className="opacity-50">Coming Soon</span>
                  <span className="inline-block group-hover:animate-emoji-bounce opacity-50">{platform.emoji}</span>
                </Button>
              ))}
            </div>
            <p className="text-center text-gray-200 mt-6">
              Links to Spotify, Apple Music, and YouTube will be available on release.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
