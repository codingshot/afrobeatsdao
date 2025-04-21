
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-[#FFD600] overflow-hidden">
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-3xl mx-auto text-center text-black drop-shadow-lg">
          <h1 className="text-6xl md:text-7xl font-heading mb-4 flex flex-col items-center justify-center gap-6">
            <span className="text-9xl" aria-label="Drum emoji" role="img">🪘</span>
            <span>
              Afrobeats DAO
            </span>
          </h1>
          <p className="text-2xl md:text-3xl mb-8 font-medium leading-relaxed font-afro text-black max-w-xl mx-auto">
            Grassroots afrobeats culture, community, music and parties.
          </p>
          {/* CTA Row - Centered, modern, bold */}
          <div className="flex flex-row gap-6 items-center justify-center w-full max-w-xl mx-auto">
            <Button
              className="bg-[#E63946] hover:bg-red-700 text-white font-heading text-xl px-8 py-5 rounded-full shadow-lg transition-all hover:scale-105 flex items-center gap-3 w-full"
              onClick={() => window.open('https://discord.gg/TNrWwSA955', '_blank')}
            >
              Join the Vibe
            </Button>
            <Button
              className="bg-green-700 hover:bg-green-600 text-white font-heading text-xl px-8 py-5 rounded-full shadow-lg transition-all hover:scale-105 flex items-center gap-3 w-full"
              onClick={() =>
                document.getElementById('music')?.scrollIntoView({ behavior: 'smooth' })
              }
              variant="secondary"
            >
              Join
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
