import { CalendarDays, MapPin } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
} from "@/components/ui/carousel";

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
    image_url: "https://www.afronation.com/static/AN2025_LineupPoster_1080x1350-88f6be7d64dc0fdbf054.jpg",
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
    image_url: "https://www.afrofuture.com/static/og_afrofuture-66ebfa0e7eecf0eabf20.jpg",
    website: "https://www.afrofuture.com",
    location: "Accra, Ghana",
    event_description: "AfroFuture Fest (formerly Afrochella) is an 8-day cultural festival showcasing live Afrobeats performances, art installations, and African cuisine. Past lineups included Burna Boy, Wizkid, and Davido, offering a deep dive into African heritage.",
    organizer: "AfroFuture",
    start_date: "2025-12-27",
    end_date: "2026-01-03",
    ticket_info: "Ticket prices vary, typically bundled with travel packages. Check palacetravel.com or afrofuturefest.com for booking details."
  },
  "Afro Nation Nigeria": {
    image_url: "https://nigeria.afronation.com/static/og_image-0eecf0eabfb166ebfa0e.jpg",
    website: "https://nigeria.afronation.com",
    location: "Lagos, Nigeria",
    event_description: "The world's largest Afrobeats festival returns to Lagos, featuring top Afrobeats artists and a vibrant cultural experience. Expect high-energy performances and a celebration of African music and culture.",
    organizer: "Afro Nation, in partnership with Live Nation",
    start_date: "2025-12-19",
    end_date: "2025-12-21",
    ticket_info: "Ticket prices TBD; previous events had tickets starting around $50–$100. Sign up for priority access at afronation.com."
  },
  "Mawazine Festival": {
    image_url: "https://www.mawazine.ma/themes/mawazine/images/og-image.jpg",
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
  return (
    <section id="events" className="py-16 font-afro bg-slate-50">
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
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {Object.entries(EVENTS)
              .sort(([, a], [, b]) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime())
              .map(([name, event]) => (
                <CarouselItem key={name} className="md:basis-1/2 lg:basis-1/3">
                  <a 
                    href={event.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-white rounded-2xl shadow-xl overflow-hidden transition-transform hover:scale-[1.02]"
                  >
                    <div className="relative aspect-video">
                      <img 
                        src={event.image_url} 
                        alt={`${name} poster`}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
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
      </div>
    </section>
  );
}
