import React, { useState, useMemo } from 'react';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Calendar, Filter, Search, MapPin, ExternalLink, CalendarX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { slugify } from "@/lib/slugUtils";

// Define event types to match the events in EventsSection 
// Renamed from Event to MusicEvent to avoid conflict with DOM Event
interface MusicEvent {
  id: string;
  title: string;
  location: string;
  date: string;
  image: string;
  description: string;
  type: string;
  ticketLink?: string;
  website?: string;
}

// Events data from EventsSection.tsx
const EVENTS_DATA: Record<string, any> = {
  "Afro Nation Portugal": {
    image_url: "/afornationportugal.jpg",
    website: "https://www.afronation.com",
    location: "Portimão, Portugal",
    event_description: "Afro Nation Portugal is the world's leading Afrobeats and Amapiano festival, celebrating African music genres on the golden beaches of the Algarve. The 2025 edition features superstars like Burna Boy, Tems, Amaarae, Uncle Waffles, DBN Gogo, and more. Expect exclusive lounges, premium beachfront experiences, and a vibrant gathering of the global African diaspora.",
    organizer: "Afro Nation (founded by Obi Asika and Smade, in association with BBC 1Xtra)",
    start_date: "2025-07-09",
    end_date: "2025-07-11",
    ticket_info: "General admission tickets start at approximately €16. VIP and Golden Ticket packages offer premium amenities like private beach access, spa treatments, and exclusive lounges. Early bird tickets recommended. Purchase at afronation.com."
  },
  "Afro Nation Detroit": {
    image_url: "/afrofuture detroit.jpeg",
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
    image_url: "/mawazine.webp",
    website: "https://www.mawazine.ma",
    location: "Rabat, Morocco",
    event_description: "Mawazine's Afrobeats night at OLM Souissi stage features artists like Wizkid and Lojay. Part of a larger international music festival, it blends global and African music genres for a diverse audience.",
    organizer: "Maroc Cultures Association",
    start_date: "2025-06-26",
    end_date: "2025-06-26",
    ticket_info: "Tickets vary by stage access; some performances free, premium tickets $20–$100. Check mawazine.ma for details."
  },
  "AfroLOUD Dubai": {
    image_url: "https://assets.platinumlist.net/uploads/2d/77/2d77d6b5d7c1a0b7b7e2e1e2d3a1d1e7.jpg",
    website: "https://dubai.platinumlist.net/event-tickets/90958/afro-loud-dubai-2025",
    location: "Ain Dubai, Bluewaters Island, Dubai, United Arab Emirates",
    event_description: "AfroLOUD Dubai is the region's biggest Afro music festival, featuring Afrobeats, Amapiano, Afro house, and Afro Desi. Headliners include CKay, Victony, and Scorpion Kings. The event includes food vendors, a Loud Brunch Club, and Fashion Avenue pop-ups.",
    organizer: "AfroLOUD",
    start_date: "2025-04-05",
    end_date: "2025-04-05",
    ticket_info: "General Admission (AED 199–299), Brunch Package (AED 549), VIP Standing (AED 699). Purchase via PlatinumList."
  },
  "AMAFEST UK": {
    image_url: "https://amafest.com/wp-content/uploads/2024/03/amafest-uk-2025-poster.jpg",
    website: "https://www.amafest.com",
    location: "Bygrave Woods, Ashwell Road, Baldock Newnham, Hertfordshire, UK",
    event_description: "The world's largest Amapiano festival in the UK, featuring top Amapiano artists, immersive art installations, and interactive activities. Past lineups included Uncle Waffles and Musa Keys.",
    organizer: "AMAFEST",
    start_date: "2025-07-19",
    end_date: "2025-07-19",
    ticket_info: "Tickets available via amafest.com and Eventbrite."
  },
  "Amapiano Kingdxm": {
    image_url: "https://cdn-az.allevents.in/events5/banners/1e6b2a0d6e4c3e6b2a0d6e4c3e6b2a0d.jpg",
    website: "https://www.eventbrite.co.uk/e/amapiano-kingdxm-2025-tickets-786543209177",
    location: "Playa del Inglés, Gran Canaria, Spain",
    event_description: "A weekend of themed parties, pool parties, boat parties, and club nights, featuring top Amapiano DJs and artists. Packages include hotel stays and access to all events.",
    organizer: "Amapiano Kingdxm",
    start_date: "2025-10-03",
    end_date: "2025-10-06",
    ticket_info: "Event Pass (£169+), Hotel & Events Package (£319+). Book via Eventbrite."
  },
  "Amapiano Festival UK": {
    image_url: "https://d31fr2pwly4c4s.cloudfront.net/3/5/3/162029353_7000968_700x700.jpg",
    website: "https://www.ents24.com/bideford-events/the-palladium-club/amapiano-festival-2025/7000968",
    location: "The Palladium Club, Bideford, England, UK",
    event_description: "The UK's premier South African Amapiano music festival, celebrating the genre's fusion of deep house, jazz, and lounge influences with live performances and DJ sets.",
    organizer: "Amapiano Festival UK",
    start_date: "2025-10-25",
    end_date: "2025-10-25",
    ticket_info: "Tickets available via Ents24."
  },
  "Brisbane Afrobeats Festival": {
    image_url: "https://s3-ap-southeast-2.amazonaws.com/ticketbooth-images/production/events/afrobeats-brisbane-2025.jpg",
    website: "https://tickets.oztix.com.au/outlet/event/2b1f5c9c-4e7f-4e3e-8c4b-4c7f2b2d8e8c",
    location: "Brisbane, Australia (venue TBA)",
    event_description: "Features live Afrobeats, Amapiano, Afro remixes, DJ sets, dancers, African food, arts, fashion stalls, and business showcases. Open to all 18+.",
    organizer: "Afrobeats Brisbane",
    start_date: "2025-08-16",
    end_date: "2025-08-16",
    ticket_info: "Presale $45.90 AUD, First Release $57.15 AUD, Second Release $62.25 AUD. Purchase via Oztix."
  }
};

// Convert the event data to match our MusicEvent interface
const EVENTS: MusicEvent[] = Object.entries(EVENTS_DATA).map(([name, event], index) => {
  return {
    id: (index + 1).toString(),
    title: name,
    location: event.location,
    date: event.start_date,
    image: event.image_url.startsWith('/') ? event.image_url : `/${event.image_url}`,
    description: event.event_description,
    type: event.location.includes("UK") ? "Festival" : event.event_description.toLowerCase().includes("workshop") ? "Workshop" : event.event_description.toLowerCase().includes("party") ? "Party" : "Festival",
    ticketLink: event.ticket_info ? event.website : undefined,
    website: event.website
  };
});

// Derive filter options from events
const EVENT_TYPES = ["All Types", ...Array.from(new Set(EVENTS.map(event => event.type)))];
const LOCATIONS = ["All Locations", ...Array.from(new Set(EVENTS.map(event => event.location)))];

const Events = () => {
  // State for filters
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [locationFilter, setLocationFilter] = useState("All Locations");
  const [showPastEvents, setShowPastEvents] = useState(false);

  // Current date for filtering past/upcoming events
  const today = new Date();

  // Filter events based on search query and filters
  const filteredEvents = useMemo(() => {
    return EVENTS.filter(event => {
      // Apply text search
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            event.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            event.location.toLowerCase().includes(searchQuery.toLowerCase());

      // Apply type filter
      const matchesType = typeFilter === "All Types" || event.type === typeFilter;

      // Apply location filter
      const matchesLocation = locationFilter === "All Locations" || event.location === locationFilter;
      
      // Apply past/upcoming filter
      const eventDate = new Date(event.date);
      const isPastEvent = eventDate < today;
      const matchesPastFilter = showPastEvents ? isPastEvent : !isPastEvent;

      return matchesSearch && matchesType && matchesLocation && matchesPastFilter;
    });
  }, [searchQuery, typeFilter, locationFilter, showPastEvents]);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Function to handle image loading errors
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const imgElement = e.target as HTMLImageElement;
    imgElement.src = '/AfrobeatsDAOMeta.png';
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-24">
        <div className="flex flex-col items-center text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-heading font-extrabold mb-4 text-slate-950">
            Afrobeats Events
          </h1>
          <p className="text-xl max-w-2xl mx-auto text-slate-950">
            Discover the hottest Afrobeats festivals, parties, and workshops happening around the world.
          </p>
        </div>
        
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8 text-slate-800">
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input placeholder="Search events..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10" />
            </div>
            
            <div className="flex-1 md:flex-initial w-full md:w-48">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Event Type" />
                </SelectTrigger>
                <SelectContent>
                  {EVENT_TYPES.map(type => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex-1 md:flex-initial w-full md:w-48">
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger>
                  <MapPin className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  {LOCATIONS.map(location => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex-1 md:flex-initial w-full md:w-48">
              <Button
                variant={showPastEvents ? "default" : "outline"}
                onClick={() => setShowPastEvents(!showPastEvents)}
                className={`w-full ${showPastEvents ? "bg-[#008751] text-white hover:bg-[#008751]/90" : ""}`}
              >
                <CalendarX className="mr-2 h-4 w-4" />
                {showPastEvents ? "Past Events" : "Upcoming Events"}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Events grid with correct links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredEvents.length > 0 ? filteredEvents.map(event => (
            <Link to={`/event/${slugify(event.title)}`} key={event.id}>
              <Card className="overflow-hidden flex flex-col h-full transition-transform hover:scale-[1.02] duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover"
                    onError={handleImageError} 
                  />
                  <Badge className="absolute top-2 right-2 bg-[#008751] hover:bg-[#008751]/90">
                    {event.type}
                  </Badge>
                </div>
                
                <CardHeader>
                  <div className="flex items-center mb-2 text-muted-foreground text-sm">
                    <Calendar className="mr-2 h-4 w-4" />
                    {formatDate(event.date)}
                  </div>
                  <CardTitle>{event.title}</CardTitle>
                  <CardDescription className="flex items-center">
                    <MapPin className="mr-1 h-4 w-4 inline" />
                    {event.location}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="flex-grow">
                  <p className="line-clamp-3">{event.description}</p>
                </CardContent>
                
                <CardFooter className="flex justify-between border-t pt-4">
                  {event.ticketLink && (
                    <Button variant="accent" asChild>
                      <a href={event.ticketLink} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                        Get Tickets
                      </a>
                    </Button>
                  )}
                  
                  {event.website && (
                    <Button variant="outline" asChild>
                      <a href={event.website} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Website
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </Link>
          )) : (
            <div className="col-span-full text-center py-12">
              <h3 className="text-xl font-medium mb-2">No events found</h3>
              <p>Try adjusting your search filters</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Events;
