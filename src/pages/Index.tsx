
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { EventsSection } from "@/components/EventsSection";
import { TeamSection } from "@/components/TeamSection";
import { MusicSection } from "@/components/MusicSection";
import { FutureSection } from "@/components/FutureSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen font-sans">
      <Header />
      <main>
        <HeroSection />
        <EventsSection />
        <TeamSection />
        <MusicSection />
        <FutureSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
