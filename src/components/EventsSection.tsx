
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

type EventType = "Party" | "Concert" | "Workshop" | "All";
type TimeFrame = "Upcoming" | "Past" | "All";

type Event = {
  id: number;
  title: string;
  type: Exclude<EventType, "All">;
  date: string;
  location: string;
  emoji: string;
  image: string;
  isPast: boolean;
  link: string;
};

// Sample events data
const eventsData: Event[] = [
  {
    id: 1,
    title: "Afrobeats Summer Jam",
    type: "Party",
    date: "15 June 2025",
    location: "Lagos 🌴",
    emoji: "☀️",
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=800&q=80",
    isPast: false,
    link: "#",
  },
  {
    id: 2,
    title: "Rhythm Workshop",
    type: "Workshop",
    date: "22 July 2025",
    location: "Accra 🌍",
    emoji: "💃",
    image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?auto=format&fit=crop&w=800&q=80",
    isPast: false,
    link: "#",
  },
  {
    id: 3,
    title: "Afrobeats Live",
    type: "Concert",
    date: "10 August 2025",
    location: "Online 🌐",
    emoji: "🎤",
    image: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?auto=format&fit=crop&w=800&q=80",
    isPast: false,
    link: "#",
  },
  {
    id: 4,
    title: "New Year Vibe",
    type: "Party",
    date: "15 January 2025",
    location: "Nairobi 🦒",
    emoji: "🎉",
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=800&q=80",
    isPast: true,
    link: "#",
  },
  {
    id: 5,
    title: "Beats & Culture",
    type: "Workshop",
    date: "20 February 2025",
    location: "Johannesburg 🌞",
    emoji: "🥁",
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=800&q=80",
    isPast: true,
    link: "#",
  },
];

export function EventsSection() {
  const [selectedType, setSelectedType] = useState<EventType>("All");
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<TimeFrame>("Upcoming");

  // Filter events based on selected filters
  const filteredEvents = eventsData.filter((event) => {
    const matchesType = selectedType === "All" || event.type === selectedType;
    const matchesTimeFrame =
      selectedTimeFrame === "All" ||
      (selectedTimeFrame === "Upcoming" && !event.isPast) ||
      (selectedTimeFrame === "Past" && event.isPast);

    return matchesType && matchesTimeFrame;
  });

  return (
    <section id="events" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-2">
            <span>Upcoming Events</span>
            <span className="text-4xl">🎊</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join the party! 🥳 Discover Afrobeats vibes worldwide 🌍
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
          <div className="flex flex-wrap justify-center gap-2">
            <FilterButton 
              active={selectedTimeFrame === "All"} 
              onClick={() => setSelectedTimeFrame("All")}
              emoji="🗓️"
              label="All Dates"
            />
            <FilterButton 
              active={selectedTimeFrame === "Upcoming"} 
              onClick={() => setSelectedTimeFrame("Upcoming")}
              emoji="📅"
              label="Upcoming"
            />
            <FilterButton 
              active={selectedTimeFrame === "Past"} 
              onClick={() => setSelectedTimeFrame("Past")}
              emoji="📸"
              label="Past Events"
            />
          </div>
          
          <div className="flex flex-wrap justify-center gap-2">
            <FilterButton 
              active={selectedType === "All"} 
              onClick={() => setSelectedType("All")}
              emoji="🔍"
              label="All Types"
            />
            <FilterButton 
              active={selectedType === "Party"} 
              onClick={() => setSelectedType("Party")}
              emoji="🎉"
              label="Parties"
            />
            <FilterButton 
              active={selectedType === "Concert"} 
              onClick={() => setSelectedType("Concert")}
              emoji="🎤"
              label="Concerts"
            />
            <FilterButton 
              active={selectedType === "Workshop"} 
              onClick={() => setSelectedType("Workshop")}
              emoji="💃"
              label="Workshops"
            />
          </div>
        </div>

        {/* Events Carousel */}
        {filteredEvents.length > 0 ? (
          <Carousel className="w-full max-w-6xl mx-auto">
            <CarouselContent>
              {filteredEvents.map((event) => (
                <CarouselItem key={event.id} className="md:basis-1/2 lg:basis-1/3 p-2">
                  <EventCard event={event} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-6 gap-4">
              <CarouselPrevious className="static translate-y-0 bg-[#F28C38] text-white border-none hover:bg-[#F28C38]/80">⬅️</CarouselPrevious>
              <CarouselNext className="static translate-y-0 bg-[#F28C38] text-white border-none hover:bg-[#F28C38]/80">➡️</CarouselNext>
            </div>
          </Carousel>
        ) : (
          <div className="text-center text-xl py-12">
            <p>No events found matching your filters 🔍</p>
            <p>Try selecting different options!</p>
          </div>
        )}
      </div>
    </section>
  );
}

interface FilterButtonProps {
  active: boolean;
  onClick: () => void;
  emoji: string;
  label: string;
}

function FilterButton({ active, onClick, emoji, label }: FilterButtonProps) {
  return (
    <Button
      variant={active ? "default" : "outline"}
      className={`rounded-full ${
        active ? "bg-[#F28C38] text-white" : "border-[#F28C38] text-[#F28C38]"
      } hover:bg-[#F28C38] hover:text-white transition-all`}
      onClick={onClick}
    >
      <span className="mr-1">{emoji}</span> {label}
    </Button>
  );
}

interface EventCardProps {
  event: Event;
}

function EventCard({ event }: EventCardProps) {
  return (
    <div className="bg-white border-2 border-[#FFD700] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
        {event.isPast && (
          <div className="absolute top-3 right-3 bg-[#264653] text-white px-3 py-1 rounded-full text-sm font-medium">
            Relive the Vibe 📸
          </div>
        )}
        <div className="absolute top-3 left-3 bg-afro-red text-white px-3 py-1 rounded-full text-sm font-medium">
          {event.type} {event.type === "Party" ? "🎉" : event.type === "Concert" ? "🎤" : "💃"}
        </div>
      </div>
      
      <div className="p-4">
        <div className="text-gray-500 text-sm flex items-center mb-1">
          <span>📅 {event.date}</span>
          <span className="mx-2">•</span>
          <span>{event.location}</span>
        </div>
        
        <h3 className="text-xl font-bold mb-3 flex items-center">
          {event.title} <span className="ml-1">{event.emoji}</span>
        </h3>
        
        <Button 
          className="w-full bg-[#FFD700] hover:bg-[#F4A261] text-[#264653] transition-all"
          onClick={() => window.open(event.link, "_blank")}
        >
          {event.isPast ? "See Photos 📸" : "Get Tickets 🎟️"}
        </Button>
      </div>
    </div>
  );
}
