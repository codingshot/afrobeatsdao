
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-to-b from-[#F28C38] to-[#E63946] overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-20"></div>
      
      {/* Emoji Decorations */}
      <div className="absolute top-10 left-10 text-5xl animate-emoji-bounce delay-100">✨</div>
      <div className="absolute bottom-20 right-10 text-5xl animate-emoji-bounce delay-300">🎶</div>
      <div className="absolute top-1/3 right-[15%] text-5xl animate-emoji-bounce delay-200">🌍</div>
      <div className="absolute bottom-1/3 left-[20%] text-5xl animate-emoji-bounce delay-400">🥁</div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 flex flex-col md:flex-row items-center justify-center gap-4">
            <span className="text-7xl md:text-8xl animate-emoji-bounce">🪘</span>
            <span>Afrobeats DAO</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 font-medium leading-relaxed">
            A global community spreading culture through Afrobeats Parties 🎉, music 🎶, and vibes ✨
          </p>
          
          <Button 
            className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-[#264653] text-lg px-8 py-6 rounded-full shadow-lg transform transition hover:scale-105 flex items-center gap-2"
            onClick={() => window.open("https://discord.com/invite/55EGdbyh", "_blank")}
          >
            <span>Join the Vibe</span>
            <span className="text-xl animate-emoji-bounce">🫶</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
