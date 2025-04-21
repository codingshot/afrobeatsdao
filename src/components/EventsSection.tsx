
import { Button } from "@/components/ui/button";
import { CalendarOff, PartyPopper } from "lucide-react";

export function EventsSection() {
  return (
    <section id="events" className="py-16 bg-[#FFD600] font-afro">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-heading font-bold mb-4 flex items-center justify-center gap-2">
            <span>Upcoming Events</span>
            <span className="text-4xl">🎊</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Join the party! Discover Afrobeats vibes worldwide.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-8 py-16">
          <div className="flex flex-col items-center gap-2 text-center w-full">
            {/* Modern no-events icon with party popper */}
            <div className="relative flex justify-center">
              <CalendarOff className="h-16 w-16 text-afro-orange opacity-80 mb-2 mx-auto" />
              <PartyPopper className="h-9 w-9 text-afro-teal opacity-90 absolute -right-4 -top-4 rotate-12" />
            </div>
            <p className="text-xl font-heading text-afro-black mt-2 w-full">No events right now. Stay tuned for future Afrobeats parties!</p>
          </div>
          <Button
            className="bg-afro-teal hover:bg-afro-orange text-afro-yellow text-lg font-heading px-8 py-6 rounded-full shadow-lg transform transition hover:scale-105 flex items-center gap-2 justify-center mx-auto"
            onClick={() => window.open("https://discord.com/invite/55EGdbyh", "_blank")}
          >
            Tap In
          </Button>
        </div>
      </div>
    </section>
  );
}
