
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-[linear-gradient(to_bottom,#FFD600_0%,#108C95_100%)] overflow-hidden">
      {/* Two afro-profile motifs on sides, using the image as bg */}
      <img src="/lovable-uploads/8b287afd-1e27-414c-8dd3-e19ca60c9359.png" alt="" className="absolute top-0 left-0 h-60 w-60 object-contain opacity-30 pointer-events-none hidden md:block" />
      <img src="/lovable-uploads/8b287afd-1e27-414c-8dd3-e19ca60c9359.png" alt="" className="absolute bottom-0 right-0 h-60 w-60 object-contain opacity-30 pointer-events-none hidden md:block transform scale-x-[-1]" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-3xl mx-auto text-center text-afro-black drop-shadow-lg">
          <h1 className="text-6xl md:text-7xl font-heading mb-4 flex flex-col md:flex-row items-center justify-center gap-6">
            <span className="text-8xl md:text-9xl" aria-label="Drum emoji">🪘</span>
            <span>Afrobeats DAO</span>
          </h1>
          <p className="text-2xl md:text-3xl mb-8 font-medium leading-relaxed font-afro text-afro-black">
            Community. Culture. Parties. Africa's global sound—<span className="text-afro-orange font-bold">unlocked</span>.
          </p>
          {/* CTA Row - Centered, modern, bold */}
          <div className="flex flex-row gap-6 items-center justify-center w-full max-w-xl mx-auto">
            <Button
              className="bg-afro-teal hover:bg-afro-orange text-afro-yellow font-heading text-xl px-8 py-5 rounded-full shadow-lg transition-all hover:scale-105 flex items-center gap-3 w-full"
              onClick={() => window.open('https://discord.com/invite/55EGdbyh', '_blank')}
            >
              Join the Vibe
            </Button>
            <Button
              className="bg-afro-orange hover:bg-afro-yellow text-afro-black font-heading text-xl px-8 py-5 rounded-full shadow-lg transition-all hover:scale-105 flex items-center gap-3 w-full"
              onClick={() =>
                document.getElementById('music')?.scrollIntoView({ behavior: 'smooth' })
              }
              variant="secondary"
            >
              Album
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
