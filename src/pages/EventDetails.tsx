
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, MapPin, User, ExternalLink } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { slugify } from '@/lib/slugUtils';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardContent } from '@/components/ui/card';
import { MapPreview } from '@/components/MapPreview';

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

// Reuse the EVENTS data from EventsSection
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

const EventDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [eventName, setEventName] = useState<string>('');
  const [relatedEvents, setRelatedEvents] = useState<Array<{ name: string, event: Event }>>([]);

  useEffect(() => {
    if (!slug) return;

    // Find the event based on the slug
    let foundEvent: Event | null = null;
    let foundEventName = '';
    
    for (const [name, eventData] of Object.entries(EVENTS)) {
      if (slugify(name) === slug) {
        foundEvent = eventData;
        foundEventName = name;
        break;
      }
    }

    setEvent(foundEvent);
    setEventName(foundEventName);

    // Find related events - prioritize upcoming, nearby, or similar events
    if (foundEvent) {
      const today = new Date();
      const foundEventLocation = foundEvent.location.split(',')[foundEvent.location.split(',').length - 1].trim();
      
      const related = Object.entries(EVENTS)
        .filter(([name]) => name !== foundEventName)
        .map(([name, event]) => {
          const endDate = new Date(event.end_date);
          const isUpcoming = endDate >= today;
          const locationMatch = event.location.includes(foundEventLocation);
          const similarType = name.toLowerCase().includes(foundEventName.toLowerCase().split(' ')[0]) || 
                              foundEventName.toLowerCase().includes(name.toLowerCase().split(' ')[0]);
          
          // Calculate a relevance score
          let score = 0;
          if (isUpcoming) score += 3;
          if (locationMatch) score += 2;
          if (similarType) score += 1;
          
          return { name, event, score };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
        .map(({ name, event }) => ({ name, event }));
      
      setRelatedEvents(related);
    }
  }, [slug]);

  if (!event || !eventName) {
    return (
      <div className="min-h-screen py-16 bg-gradient-to-b from-[#1A1F2C] to-[#000000] text-white px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center">
            <h1 className="text-2xl text-white mb-4">Event not found</h1>
            <Button asChild>
              <Link to="/events" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Events
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
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

  return (
    <div className="bg-white min-h-screen">
      {/* Banner with overlay for better text visibility */}
      <div className="relative">
        <div className="w-full h-64 sm:h-80 md:h-96 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#000000cc] to-transparent z-10"></div>
          <img
            src={getImageUrl(event.image_url)}
            onError={(e) => {
              const imgElement = e.target as HTMLImageElement;
              imgElement.src = DEFAULT_IMAGE;
            }}
            alt={`${eventName} banner`}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        
        {/* Title positioned at bottom of banner with good contrast */}
        <div className="container mx-auto max-w-4xl px-4">
          <div className="relative -mt-32 z-20">
            <h1 className="text-4xl md:text-5xl font-bold text-white font-heading mb-4 drop-shadow-lg">
              {eventName}
            </h1>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto max-w-4xl px-4 py-6">
        <div className="bg-white rounded-lg shadow-lg p-6 -mt-6">
          {/* Info section with date, location and organizer in one row */}
          <div className="flex flex-wrap items-center gap-6 mb-6 text-gray-800 border-b border-gray-200 pb-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-gray-600" />
              <span className="font-medium">
                {formatDate(event.start_date)}
                {event.end_date !== event.start_date && ` - ${formatDate(event.end_date)}`}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-gray-600" />
              <span className="font-medium">{event.location}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-gray-600" />
              <span className="font-medium">{event.organizer}</span>
            </div>
          </div>
          
          {/* Action button */}
          <div className="mb-6">
            <Button 
              asChild
              className="bg-[#FFD600] hover:bg-[#FFD600]/80 text-black font-bold text-lg px-6 py-6 h-auto"
            >
              <a href={event.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                Visit Official Website
                <ExternalLink className="h-5 w-5" />
              </a>
            </Button>
          </div>
          
          {/* Description */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">About the Event</h2>
            <p className="text-gray-700 leading-relaxed">{event.event_description}</p>
          </div>
          
          {/* Ticket information */}
          <div className="mb-8 bg-gray-50 p-4 rounded-lg">
            <h2 className="text-2xl font-bold mb-2 text-gray-900">Ticket Information</h2>
            <p className="text-gray-700">{event.ticket_info}</p>
          </div>
          
          {/* Map section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Location</h2>
            <div className="rounded-lg overflow-hidden border border-gray-200 bg-white shadow-sm">
              <AspectRatio ratio={16/9} className="w-full">
                <MapPreview location={event.location} />
              </AspectRatio>
            </div>
          </div>
          
          {/* Related events */}
          {relatedEvents.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Related Events</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedEvents.map(({ name, event }) => (
                  <Link key={name} to={`/event/${slugify(name)}`} className="block">
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <div className="relative aspect-[16/9]">
                        <img 
                          src={getImageUrl(event.image_url)} 
                          onError={(e) => {
                            const imgElement = e.target as HTMLImageElement;
                            imgElement.src = DEFAULT_IMAGE;
                          }}
                          alt={`${name} poster`} 
                          className="absolute inset-0 w-full h-full object-cover rounded-t-lg" 
                        />
                      </div>
                      <CardContent className="py-4">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{name}</h3>
                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(event.start_date)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
                          <MapPin className="h-4 w-4" />
                          <span className="truncate">{event.location}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
          
          {/* Back button */}
          <div className="mt-12">
            <Button 
              asChild
              variant="outline" 
              className="flex items-center gap-2"
            >
              <Link to="/events">
                <ArrowLeft className="h-4 w-4" />
                Back to Events
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
