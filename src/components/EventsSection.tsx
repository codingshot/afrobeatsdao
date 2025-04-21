
import { Button } from "@/components/ui/button";
import { CalendarOff } from "lucide-react";

export function EventsSection() {
  return (
    <section id="events" className="py-16 bg-white font-afro">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-2">
            <span>Upcoming Events</span>
            <span className="text-4xl">🎊</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join the party! Discover Afrobeats vibes worldwide.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-8 py-16">
          <div className="flex flex-col items-center gap-2">
            <CalendarOff className="h-16 w-16 text-afro-red opacity-80 mb-2"/>
            <p className="text-xl text-gray-700">No events right now. Stay tuned for future Afrobeats parties!</p>
          </div>
          <Button
            className="bg-afro-orange hover:bg-afro-green text-white text-lg px-8 py-6 rounded-full shadow-lg transform transition hover:scale-105 flex items-center gap-2 justify-center"
            onClick={() => window.open("https://discord.com/invite/55EGdbyh", "_blank")}
          >
            Join our Discord to stay in tune
          </Button>
        </div>
      </div>
    </section>
  );
}
