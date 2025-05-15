
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CalendarDays, MapPin, ExternalLink, Users, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { deslugify, slugify } from "@/lib/slugUtils";
import { formatDate } from "@/lib/utils";
import { MapPreview } from '@/components/MapPreview';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';

// Using the same Event type from EventsSection.tsx
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
  },
  "Afrobash NYC": {
    image_url: "https://cdn.evbstatic.com/s3-build/fe/build/images/eb-logo-square-7b7b7b7.png",
    website: "https://www.eventbrite.com/e/afrobash-afrobeats-amapiano-hip-hop-party-tickets-877859982047",
    location: "SOB's, 204 Varick Street, New York City, USA",
    event_description: "A late-night party with Afrobeats, Amapiano, and hip hop, featuring DJ sets, happy hour, and dance classes. Regular monthly editions.",
    organizer: "Afrobash NYC",
    start_date: "2025-05-02",
    end_date: "2025-05-03",
    ticket_info: "Free with RSVP before 11:30 PM, $0–$20.74 for late entry. Available via Eventbrite."
  },
  "Amapiano & Afrobeats Day Festival London": {
    image_url: "https://www.eventbrite.com/e/amapiano-afrobeats-day-festival-at-studio-338-tickets-1331409253919",
    website: "https://www.eventbrite.com/e/amapiano-afrobeats-day-festival-at-studio-338-tickets-1331409253919",
    location: "Studio 338, 388 Boord Street, London, UK",
    event_description: "A day festival celebrating Amapiano and Afrobeats at one of London's top club venues.",
    organizer: "Studio 338",
    start_date: "2025-06-01",
    end_date: "2025-06-01",
    ticket_info: "Tickets via Eventbrite."
  }
};

const DEFAULT_IMAGE = '/AfrobeatsDAOMeta.png';

function EventDetails() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [relatedEvents, setRelatedEvents] = useState<Array<{ name: string; event: Event }>>([]);
  
  // Find the event by slugified name
  const eventName = deslugify(slug || '');
  const event = EVENTS[eventName];
  
  // Handle case where event is not found
  useEffect(() => {
    if (!event) {
      navigate('/events', { replace: true });
    }
  }, [event, navigate]);
  
  // Find related events
  useEffect(() => {
    if (!event) return;

    // Get all events except current one
    const allEvents = Object.entries(EVENTS)
      .filter(([name]) => name !== eventName)
      .map(([name, event]) => ({ name, event }));
    
    // Calculate scores for each event based on relation factors
    const currentDate = new Date();
    const scoredEvents = allEvents.map(eventItem => {
      let score = 0;
      
      // Score for upcoming events (higher score for upcoming)
      const eventEndDate = new Date(eventItem.event.end_date);
      if (eventEndDate >= currentDate) {
        score += 5;
        
        // Closer events get higher score
        const daysUntilEvent = Math.ceil((eventEndDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
        if (daysUntilEvent < 30) score += 3;
        else if (daysUntilEvent < 90) score += 2;
      }
      
      // Score for location similarity
      if (eventItem.event.location.includes(event.location.split(',').pop()?.trim() || '')) {
        score += 4;
      }
      
      // Score for similar organizer
      if (eventItem.event.organizer.includes(event.organizer.split(',')[0].trim())) {
        score += 3;
      }
      
      return { ...eventItem, score };
    });
    
    // Sort by score and take top 3
    const topRelatedEvents = scoredEvents
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
    
    setRelatedEvents(topRelatedEvents);
  }, [event, eventName]);
  
  if (!event) {
    return null;
  }
  
  const getImageUrl = (imageUrl: string) => {
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    if (imageUrl.startsWith('/')) {
      return imageUrl;
    }
    return `/${imageUrl}`;
  };
  
  const isEventActive = () => {
    const now = new Date().getTime();
    const start = new Date(event.start_date).getTime();
    const end = new Date(event.end_date).getTime();
    return now >= start && now <= end;
  };
  
  const isUpcoming = () => {
    return new Date(event.start_date).getTime() > new Date().getTime();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Banner with improved contrast */}
        <div className="relative w-full h-80 sm:h-96 md:h-[500px]">
          <img
            src={getImageUrl(event.image_url)}
            alt={`${eventName} banner`}
            onError={(e) => {
              const imgElement = e.target as HTMLImageElement;
              imgElement.src = DEFAULT_IMAGE;
            }}
            className="w-full h-full object-cover"
          />
          
          {/* Darker overlay for better contrast */}
          <div className="absolute inset-0 bg-black/60"></div>
          
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl text-white">
                {isEventActive() && (
                  <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium inline-block mb-4">
                    Happening Now
                  </span>
                )}
                
                {!isEventActive() && isUpcoming() && (
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium inline-block mb-4">
                    Upcoming
                  </span>
                )}
                
                {!isEventActive() && !isUpcoming() && (
                  <span className="bg-gray-500 text-white px-4 py-1 rounded-full text-sm font-medium inline-block mb-4">
                    Past Event
                  </span>
                )}
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4 drop-shadow-md">
                  {eventName}
                </h1>
                
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="shrink-0" />
                  <span className="text-lg drop-shadow-md">{event.location}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Calendar className="shrink-0" />
                  <span className="text-lg drop-shadow-md">
                    {formatDate(event.start_date)}
                    {event.end_date !== event.start_date && ` - ${formatDate(event.end_date)}`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                <h2 className="text-3xl font-heading font-bold mb-6 text-slate-950">About the Event</h2>
                <p className="text-lg text-gray-700 mb-8">{event.event_description}</p>
                
                <div className="border-t pt-6">
                  <h3 className="text-xl font-bold mb-4 text-slate-950">Event Details</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CalendarDays className="shrink-0 mt-1 text-[#008751]" />
                      <div>
                        <h4 className="font-semibold text-slate-950">Date</h4>
                        <p>
                          {formatDate(event.start_date)}
                          {event.end_date !== event.start_date && ` - ${formatDate(event.end_date)}`}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <MapPin className="shrink-0 mt-1 text-[#008751]" />
                      <div>
                        <h4 className="font-semibold text-slate-950">Location</h4>
                        <p>{event.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Users className="shrink-0 mt-1 text-[#008751]" />
                      <div>
                        <h4 className="font-semibold text-slate-950">Organizer</h4>
                        <p>{event.organizer}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Map preview section */}
                <div className="mt-8 border-t pt-6">
                  <h3 className="text-xl font-bold mb-4 text-slate-950">Location</h3>
                  <div className="w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
                    <MapPreview location={event.location} />
                  </div>
                </div>
              </div>
              
              {/* Related Events Section */}
              {relatedEvents.length > 0 && (
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h3 className="text-2xl font-heading font-bold mb-6 text-slate-950">Related Events</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {relatedEvents.map(({ name, event: relatedEvent }) => (
                      <Link to={`/event/${slugify(name)}`} key={name} className="block">
                        <Card className="h-full transition-transform hover:scale-105">
                          <div className="w-full h-40 overflow-hidden">
                            <img
                              src={getImageUrl(relatedEvent.image_url)}
                              alt={name}
                              onError={(e) => {
                                const imgElement = e.target as HTMLImageElement;
                                imgElement.src = DEFAULT_IMAGE;
                              }}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">{name}</CardTitle>
                            <CardDescription className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              <span className="truncate">{relatedEvent.location}</span>
                            </CardDescription>
                          </CardHeader>
                          <CardFooter className="pt-0">
                            <div className="flex items-center gap-1 text-xs">
                              <Clock className="h-3 w-3" />
                              <span>{formatDate(relatedEvent.start_date)}</span>
                            </div>
                          </CardFooter>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div>
              <div className="bg-white rounded-lg shadow-lg p-8 sticky top-32">
                <h3 className="text-2xl font-heading font-bold mb-6 text-slate-950">Ticket Information</h3>
                <p className="text-gray-700 mb-6">{event.ticket_info}</p>
                
                <div className="space-y-4">
                  <Button asChild className="w-full bg-[#008751] hover:bg-[#008751]/90">
                    <a href={event.website} target="_blank" rel="noopener noreferrer">
                      Get Tickets
                    </a>
                  </Button>
                  
                  <Button variant="outline" asChild className="w-full">
                    <a href={event.website} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Visit Website
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default EventDetails;
