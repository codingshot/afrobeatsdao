import React, { useState, useMemo } from 'react';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Calendar, Filter, Search, MapPin, ExternalLink, CalendarX, RotateCcw, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { slugify } from "@/lib/slugUtils";
import { Helmet } from "react-helmet";
import EVENTS_DATA from "@/data/events.json";

// Define event types to match the events in EventsSection 
// Renamed from Event to MusicEvent to avoid conflict with DOM Event
interface EventJson {
  image_url: string;
  website: string;
  ticket_url?: string;
  location: string;
  event_description: string;
  organizer: string;
  start_date: string;
  end_date: string;
  ticket_info: string;
}

interface MusicEvent {
  id: string;
  title: string;
  location: string;
  date: string;
  endDate: string;
  image: string;
  description: string;
  type: string;
  ticketLink?: string;
  website?: string;
}

// Helper function to process image URLs from JSON data
const getImageUrl = (imageUrl: string) => {
  // If it's already a full HTTP/HTTPS URL, return as is
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  // If it starts with a slash, it's already a proper public path
  if (imageUrl.startsWith('/')) {
    return imageUrl;
  }
  // If it doesn't start with a slash, add one to make it a proper public path
  return `/${imageUrl}`;
};

// Convert the event data to match our MusicEvent interface
const EVENTS: MusicEvent[] = Object.entries(EVENTS_DATA as Record<string, EventJson>).map(([name, event], index) => {
  return {
    id: (index + 1).toString(),
    title: name,
    location: event.location,
    date: event.start_date,
    endDate: event.end_date,
    image: getImageUrl(event.image_url),
    description: event.event_description,
    type: event.location.includes("UK") ? "Festival" : event.event_description.toLowerCase().includes("workshop") ? "Workshop" : event.event_description.toLowerCase().includes("party") ? "Party" : "Festival",
    ticketLink: event.ticket_url,
    website: event.website
  };
});

// Derive filter options from events
const EVENT_TYPES = ["All Types", ...Array.from(new Set(EVENTS.map(event => event.type)))];
const LOCATIONS = ["All Locations", ...Array.from(new Set(EVENTS.map(event => event.location)))];

function endOfEventDay(endDateIso: string): Date {
  const d = new Date(endDateIso);
  d.setHours(23, 59, 59, 999);
  return d;
}

function isPastMusicEvent(event: MusicEvent, todayStart: Date): boolean {
  return endOfEventDay(event.endDate) < todayStart;
}

const Events = () => {
  // State for filters
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [locationFilter, setLocationFilter] = useState("All Locations");
  const [showPastEvents, setShowPastEvents] = useState(false);

  const todayStart = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const hasNonDefaultFilters =
    searchQuery.trim() !== "" ||
    typeFilter !== "All Types" ||
    locationFilter !== "All Locations";

  const anyUpcomingInDataset = useMemo(
    () => EVENTS.some((e) => !isPastMusicEvent(e, todayStart)),
    [todayStart]
  );

  const anyPastInDataset = useMemo(
    () => EVENTS.some((e) => isPastMusicEvent(e, todayStart)),
    [todayStart]
  );

  const clearFilters = () => {
    setSearchQuery("");
    setTypeFilter("All Types");
    setLocationFilter("All Locations");
  };

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
      const past = isPastMusicEvent(event, todayStart);
      const matchesPastFilter = showPastEvents ? past : !past;

      return matchesSearch && matchesType && matchesLocation && matchesPastFilter;
    });
  }, [searchQuery, typeFilter, locationFilter, showPastEvents, todayStart]);

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

  // SEO data
  const metaTitle = "Afrobeats Events 2026 - Global Festivals, Parties & Workshops | Afrobeats.party";
  const metaDescription = "Discover Afrobeats and amapiano festivals, parties, and workshops worldwide in 2026 and beyond—from Afro Nation Portugal to Detty December in Lagos and Accra.";
  const canonicalUrl = "https://afrobeats.party/events";
  const ogImage = filteredEvents.length > 0 ? (filteredEvents[0].image.startsWith('http') ? filteredEvents[0].image : `https://afrobeats.party${filteredEvents[0].image}`) : "https://afrobeats.party/AfrobeatsDAOMeta.png";
  const seoKeywords = [
    'afrobeats events 2026',
    'african music festivals',
    'amapiano festivals',
    'afro nation',
    'afrobeats parties',
    'african cultural events',
    'music festivals worldwide',
    'afrobeats concerts',
    'african diaspora events'
  ].join(', ');

  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content="Afrobeats Events - Global Festivals and Parties" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="Afrobeats.party" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@afrobeatsdao" />
        <meta name="twitter:creator" content="@afrobeatsdao" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content="Afrobeats Events - Global Festivals and Parties" />
        
        {/* Additional SEO */}
        <link rel="canonical" href={canonicalUrl} />
        <meta name="keywords" content={seoKeywords} />
        <meta name="author" content="Afrobeats.party" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="theme-color" content="#008751" />
        
        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EventListing",
            "name": "Afrobeats Events",
            "description": metaDescription,
            "url": canonicalUrl,
            "image": ogImage,
            "numberOfItems": filteredEvents.length,
            "mainEntity": filteredEvents.slice(0, 10).map(event => ({
              "@type": "Event",
              "name": event.title,
              "startDate": event.date,
              "location": {
                "@type": "Place",
                "name": event.location
              },
              "image": event.image.startsWith('http') ? event.image : `https://afrobeats.party${event.image}`,
              "description": event.description,
              "url": `https://afrobeats.party/event/${slugify(event.title)}`,
              "eventStatus": "https://schema.org/EventScheduled"
            })),
            "isPartOf": {
              "@type": "WebSite",
              "name": "Afrobeats.party",
              "url": "https://afrobeats.party",
              "description": "Global platform for African music and culture events"
            }
          })}
        </script>
      </Helmet>

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
          
          {/* Events grid with hover effects */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredEvents.length > 0 ? filteredEvents.map(event => (
              <Link to={`/event/${slugify(event.title)}`} key={event.id}>
                <Card className="overflow-hidden flex flex-col h-full transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#008751]/20 hover:border-[#008751]/30">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
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
                    <CardTitle className="text-slate-900">{event.title}</CardTitle>
                    <CardDescription className="flex items-center text-slate-700">
                      <MapPin className="mr-1 h-4 w-4 inline" />
                      {event.location}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="flex-grow">
                    <p className="line-clamp-3 text-slate-800">{event.description}</p>
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
              <div className="col-span-full text-center py-12 px-4">
                <h3 className="text-xl font-medium mb-2 text-slate-900">No events found</h3>
                <p className="text-slate-700 max-w-lg mx-auto mb-6">
                  {!showPastEvents && (
                    <>
                      {hasNonDefaultFilters && anyUpcomingInDataset
                        ? "No upcoming events match your current filters."
                        : !anyUpcomingInDataset
                          ? "There are no upcoming events in the calendar right now."
                          : "No upcoming events match your current filters."}
                    </>
                  )}
                  {showPastEvents && (
                    <>
                      {hasNonDefaultFilters
                        ? "No past events match your current filters."
                        : "No past events are listed yet."}
                    </>
                  )}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center flex-wrap">
                  {!showPastEvents && anyPastInDataset && (
                    <Button
                      type="button"
                      variant="default"
                      className="bg-[#008751] text-white hover:bg-[#008751]/90"
                      onClick={() => setShowPastEvents(true)}
                    >
                      <History className="mr-2 h-4 w-4" />
                      Show past events
                    </Button>
                  )}
                  {showPastEvents && anyUpcomingInDataset && (
                    <Button type="button" variant="outline" onClick={() => setShowPastEvents(false)}>
                      <Calendar className="mr-2 h-4 w-4" />
                      Show upcoming events
                    </Button>
                  )}
                  {hasNonDefaultFilters && (
                    <Button type="button" variant="outline" onClick={clearFilters}>
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Clear filters
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Events;
