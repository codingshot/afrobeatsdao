
import { CalendarDays, MapPin } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
} from "@/components/ui/carousel";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type Event = {
  image_url: string;
  website: string;
  location: string;
  event_description: string;
  organizer: string;
  start_date: string;
  end_date: string;
  ticket_info: string;
};

const EVENTS: Record<string, Event> = {
  "Afro Nation Portugal": {
    image_url: "https://www.skiddle.com/festivals/afro-nation-portugal/images/afro-nation-portugal-2025-lineup.jpg",
    website: "https://www.afronation.com",
    location: "Portimão, Portugal",
    event_description: "Afro Nation Portugal is a leading Afrobeats festival featuring top artists like Burna Boy, Tems, DBN Gogo, and Franglish. It celebrates African music genres including Afrobeats and Amapiano, with a vibrant beachside setting, exclusive lounges, and cultural experiences.",
    organizer: "Afro Nation (founded by Obi Asika and Smade, in association with BBC 1 Xtra)",
    start_date: "2025-07-09",
    end_date: "2025-07-11",
    ticket_info: "General admission tickets start at approximately €16. VIP and Golden Ticket packages offer premium amenities like private beach access. Early bird tickets recommended. Purchase at afronation.com."
  },
  "Afro Nation Detroit": {
    image_url: "https://detroit.afronation.com/static/Lineup_Poster_1080x1350-cb0fadb4b5eecfef98e2.jpg",
    website: "https://detroit.afronation.com",
    location: "Detroit, MI, USA",
    event_description: "Held at Bedrock's Douglass Site, Afro Nation Detroit features two stages, one dedicated to Amapiano, with artists like Lil Wayne, Scorpion Kings, and local talent. It's a celebration of Afrobeats and African diaspora culture in the heart of Detroit.",
    organizer: "Afro Nation, in collaboration with Bedrock",
    start_date: "2025-08-15",
    end_date: "2025-08-17",
    ticket_info: "Tickets start at approximately $70 based on previous pricing. Check detroit.afronation.com for 2025 ticket sales and priority access sign-ups."
  },
  "AfroFuture Fest": {
    image_url: "https://www.palacetravel.com/wp-content/uploads/2023/09/AfroFuture-Fest-2024.jpg",
    website: "https://www.afrofuture.com",
    location: "Accra, Ghana",
    event_description: "AfroFuture Fest (formerly Afrochella) is an 8-day cultural festival showcasing live Afrobeats performances, art installations, and African cuisine. Past lineups included Burna Boy, Wizkid, and Davido, offering a deep dive into African heritage.",
    organizer: "AfroFuture",
    start_date: "2025-12-27",
    end_date: "2026-01-03",
    ticket_info: "Ticket prices vary, typically bundled with travel packages. Check palacetravel.com or afrofuturefest.com for booking details."
  },
  "Afro Nation Nigeria": {
    image_url: "https://www.okayafrica.com/wp-content/uploads/2023/09/afro-nation-nigeria-2023.jpg",
    website: "https://nigeria.afronation.com",
    location: "Lagos, Nigeria",
    event_description: "The world's largest Afrobeats festival returns to Lagos, featuring top Afrobeats artists and a vibrant cultural experience. Expect high-energy performances and a celebration of African music and culture.",
    organizer: "Afro Nation, in partnership with Live Nation",
    start_date: "2025-12-19",
    end_date: "2025-12-21",
    ticket_info: "Ticket prices TBD; previous events had tickets starting around $50–$100. Sign up for priority access at afronation.com."
  },
  "Mawazine Festival": {
    image_url: "https://www.mawazine.ma/sites/default/files/2023-05/mawazine_2023_poster.jpg",
    website: "https://www.mawazine.ma",
    location: "Rabat, Morocco",
    event_description: "Mawazine's Afrobeats night at OLM Souissi stage features artists like Wizkid and Lojay. Part of a larger international music festival, it blends global and African music genres for a diverse audience.",
    organizer: "Maroc Cultures Association",
    start_date: "2025-06-26",
    end_date: "2025-06-26",
    ticket_info: "Tickets vary by stage access; some performances free, premium tickets $20–$100. Check mawazine.ma for details."
  }
};

export function EventsSection() {
  const [showPastEvents, setShowPastEvents] = useState(false);
  const today = new Date();
  const DEFAULT_IMAGE = '/lovable-uploads/7d55db10-6858-47e9-a593-673aed7a7184.png';

  const filteredEvents = Object.entries(EVENTS)
    .filter(([, event]) => {
      const endDate = new Date(event.end_date);
      if (showPastEvents) {
        return endDate < today;
      }
      return endDate >= today;
    })
    .sort(([, a], [, b]) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime());

  const isEventActive = (startDate: string, endDate: string) => {
    const now = today.getTime();
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    return now >= start && now <= end;
  };

  return (
    <section id="events" className="py-16 font-afro bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-heading font-bold mb-4 flex items-center justify-center gap-2">
            <span>Upcoming Events</span>
            <span className="text-4xl">🎊</span>
          </h2>
          <div className="flex justify-center gap-4 mb-8">
            <Button
              variant={!showPastEvents ? "default" : "outline"}
              onClick={() => setShowPastEvents(false)}
            >
              Upcoming Events
            </Button>
            <Button
              variant={showPastEvents ? "default" : "outline"}
              onClick={() => setShowPastEvents(true)}
            >
              Past Events
            </Button>
          </div>
        </div>
        
        {filteredEvents.length > 0 ? (
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {filteredEvents.map(([name, event]) => (
                <CarouselItem key={name} className="md:basis-1/2 lg:basis-1/3">
                  <a 
                    href={event.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-white rounded-2xl shadow-xl overflow-hidden transition-transform hover:scale-[1.02]"
                  >
                    <div className="relative aspect-[16/9]">
                      <img 
                        src={event.image_url} 
                        onError={(e) => {
                          const imgElement = e.target as HTMLImageElement;
                          imgElement.src = DEFAULT_IMAGE;
                        }}
                        alt={`${name} poster`}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      {isEventActive(event.start_date, event.end_date) && (
                        <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Active
                        </div>
                      )}
                    </div>
                    <div className="p-6 space-y-4">
                      <h3 className="text-2xl font-heading font-bold">{name}</h3>
                      
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="shrink-0" />
                        <span>{event.location}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-gray-600">
                        <CalendarDays className="shrink-0" />
                        <span>
                          {formatDate(event.start_date)}
                          {event.end_date !== event.start_date && ` - ${formatDate(event.end_date)}`}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 line-clamp-2">
                        {event.event_description}
                      </p>
                    </div>
                  </a>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        ) : (
          <div className="text-center text-gray-500">
            {showPastEvents ? "No past events to display." : "No upcoming events to display."}
          </div>
        )}
      </div>
    </section>
  );
}
