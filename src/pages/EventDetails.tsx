import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { deslugify, slugify } from '@/lib/slugUtils';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CalendarDays, MapPin, Users, ExternalLink, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

// Import directly from EventsSection without using require
import { EVENTS } from "@/components/EventsSection";

interface Event {
  image_url: string;
  website: string;
  location: string;
  event_description: string;
  organizer: string;
  start_date: string;
  end_date: string;
  ticket_info: string;
}

const EventDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const [event, setEvent] = useState<{ name: string; details: Event } | null>(null);
  const [relatedEvents, setRelatedEvents] = useState<{ name: string; details: Event }[]>([]);
  const [mapUrl, setMapUrl] = useState<string>('');

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    if (slug) {
      const eventName = deslugify(slug);
      
      // Find the event by its name
      const foundEventEntry = Object.entries(EVENTS).find(
        ([name]) => slugify(name.toLowerCase()) === slug.toLowerCase()
      );
      
      if (foundEventEntry) {
        const [name, details] = foundEventEntry;
        setEvent({ name, details });
        
        // Generate Google Maps URL
        const encodedLocation = encodeURIComponent(details.location);
        setMapUrl(`https://maps.google.com/maps?q=${encodedLocation}&t=&z=13&ie=UTF8&iwloc=&output=embed`);
        
        // Find related events (same location or close dates or just other events)
        const today = new Date();
        const otherEvents = Object.entries(EVENTS)
          .filter(([otherName]) => otherName !== name)
          .map(([otherName, otherDetails]) => {
            // Calculate a relevance score:
            // - Higher score for events in the same location
            // - Higher score for upcoming events
            // - Higher score for events closer in time
            
            let score = 0;
            
            // Location match
            if (otherDetails.location.includes(details.location.split(',')[0]) || 
                details.location.includes(otherDetails.location.split(',')[0])) {
              score += 5;
            }
            
            // Check if upcoming
            const eventDate = new Date(otherDetails.start_date);
            if (eventDate >= today) {
              score += 3;
            }
            
            // Check date proximity
            const eventTime = new Date(details.start_date).getTime();
            const otherTime = eventDate.getTime();
            const timeDiff = Math.abs(eventTime - otherTime);
            const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
            
            if (daysDiff < 30) {
              score += 3;
            } else if (daysDiff < 90) {
              score += 2;
            } else if (daysDiff < 180) {
              score += 1;
            }
            
            return {
              name: otherName,
              details: otherDetails,
              score
            };
          })
          .sort((a, b) => b.score - a.score)
          .slice(0, 3)
          .map(({ name, details }) => ({ name, details }));
        
        setRelatedEvents(otherEvents);
      }
    }
  }, [slug]);

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-24">
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-3xl font-bold mb-4">Event not found</h1>
            <p className="text-lg mb-6">Sorry, we couldn't find the event you're looking for.</p>
            <Button variant="default" asChild>
              <Link to="/events">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Events
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getImageUrl = (imageUrl: string) => {
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    if (imageUrl.startsWith('/')) {
      return imageUrl;
    }
    return `/${imageUrl}`;
  };

  const DEFAULT_IMAGE = '/AfrobeatsDAOMeta.png';
  const bannerImage = event?.details?.image_url ? getImageUrl(event.details.image_url) : DEFAULT_IMAGE;
  const isMultiDayEvent = event?.details ? event.details.start_date !== event.details.end_date : false;

  // Enhanced SEO data with dynamic event information
  const eventDate = formatDate(event.details.start_date);
  const eventLocation = event.details.location.split(',')[0]; // Get city name
  const metaTitle = `${event.name} - ${eventDate} in ${eventLocation} | Afrobeats.party`;
  const metaDescription = `🎉 Join ${event.name} on ${eventDate} in ${event.details.location}! ${event.details.event_description.substring(0, 100)}... Experience the best Afrobeats culture with ${event.details.organizer}. Get tickets now!`;
  const canonicalUrl = `https://afrobeats.party/event/${slug}`;
  
  // Use event image for Open Graph, ensure it's a full URL
  const ogImage = event.details.image_url 
    ? (event.details.image_url.startsWith('http') 
       ? event.details.image_url 
       : `https://afrobeats.party${getImageUrl(event.details.image_url)}`)
    : 'https://afrobeats.party/AfrobeatsDAOMeta.png';
  const ogImageAlt = `${event.name} - ${eventDate} in ${eventLocation}`;
  
  // Enhanced keywords for better SEO
  const seoKeywords = [
    event.name.toLowerCase(),
    'afrobeats event',
    'african music event',
    eventLocation.toLowerCase(),
    event.details.organizer.toLowerCase(),
    'afrobeats party',
    'music festival',
    'concert',
    'cultural event',
    'african culture'
  ].filter(Boolean).join(', ');

  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="event" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content={ogImageAlt} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="Afrobeats.party" />
        <meta property="og:locale" content="en_US" />
        
        {/* Event specific Open Graph */}
        <meta property="event:start_time" content={event.details.start_date} />
        <meta property="event:end_time" content={event.details.end_date} />
        <meta property="event:location" content={event.details.location} />
        <meta property="event:organizer" content={event.details.organizer} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@afrobeatsdao" />
        <meta name="twitter:creator" content="@afrobeatsdao" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content={ogImageAlt} />
        
        {/* Additional SEO */}
        <link rel="canonical" href={canonicalUrl} />
        <meta name="keywords" content={seoKeywords} />
        <meta name="author" content="Afrobeats.party" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="theme-color" content="#008751" />
        
        {/* Geographic SEO */}
        <meta name="geo.region" content={eventLocation} />
        <meta name="geo.placename" content={event.details.location} />
        
        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            "name": event.name,
            "description": event.details.event_description,
            "image": ogImage,
            "url": canonicalUrl,
            "startDate": event.details.start_date,
            "endDate": event.details.end_date,
            "eventStatus": "https://schema.org/EventScheduled",
            "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
            "location": {
              "@type": "Place",
              "name": event.details.location,
              "address": {
                "@type": "PostalAddress",
                "addressLocality": eventLocation,
                "addressRegion": event.details.location
              }
            },
            "organizer": {
              "@type": "Organization",
              "name": event.details.organizer
            },
            "offers": {
              "@type": "Offer",
              "description": event.details.ticket_info,
              "url": event.details.website,
              "availability": "https://schema.org/InStock"
            },
            "isPartOf": {
              "@type": "WebSite",
              "name": "Afrobeats.party",
              "url": "https://afrobeats.party",
              "description": "Global platform for African music and culture events"
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": canonicalUrl
            }
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-black text-white">
        <Header />
        
        <main className="flex-1">
          {!event ? (
            <div className="container mx-auto px-4 py-24">
              <div className="flex flex-col items-center justify-center h-full">
                <h1 className="text-3xl font-bold mb-4 text-white">Event not found</h1>
                <p className="text-lg mb-6 text-white">Sorry, we couldn't find the event you're looking for.</p>
                <Button variant="default" className="bg-[#008751] text-white hover:bg-[#008751]/90" asChild>
                  <Link to="/events">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Events
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* Banner image with overlay back button */}
              <div className="w-full relative">
                <AspectRatio ratio={21/9} className="bg-muted">
                  <img
                    src={bannerImage}
                    alt={event.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const imgElement = e.target as HTMLImageElement;
                      imgElement.src = DEFAULT_IMAGE;
                    }}
                  />
                </AspectRatio>
                {/* Back button positioned as overlay - with higher z-index and more visible styling */}
                <div className="absolute top-4 left-4 z-20">
                  <Button variant="outline" className="bg-black/70 backdrop-blur-sm text-white hover:bg-black/90 border-white/30" asChild>
                    <Link to="/events">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Events
                    </Link>
                  </Button>
                </div>
              </div>
              
              <div className="container mx-auto px-4 py-8">
                {/* Event title - positioned below the banner */}
                <div className="mb-8">
                  <h1 className="text-4xl md:text-5xl font-heading font-bold text-white">{event.name}</h1>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    {/* Event info row: date, location, organizer */}
                    <div className="bg-gray-900 p-6 rounded-lg shadow-sm mb-8">
                      <div className="flex flex-wrap gap-6 md:gap-8 text-white">
                        <div className="flex items-center gap-2">
                          <CalendarDays className="h-5 w-5 text-[#008751]" />
                          <div>
                            <p className="font-medium">Date</p>
                            <p>
                              {formatDate(event.details.start_date)}
                              {isMultiDayEvent && ` - ${formatDate(event.details.end_date)}`}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <MapPin className="h-5 w-5 text-[#008751]" />
                          <div>
                            <p className="font-medium">Location</p>
                            <p>{event.details.location}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Users className="h-5 w-5 text-[#008751]" />
                          <div>
                            <p className="font-medium">Organizer</p>
                            <p>{event.details.organizer}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Event description */}
                    <div className="bg-gray-900 p-6 rounded-lg shadow-sm mb-8">
                      <h2 className="text-2xl font-heading font-bold mb-4 text-white">About This Event</h2>
                      <p className="text-white whitespace-pre-line">{event.details.event_description}</p>
                    </div>
                    
                    {/* Ticket information */}
                    <div className="bg-gray-900 p-6 rounded-lg shadow-sm mb-8">
                      <h2 className="text-2xl font-heading font-bold mb-4 text-white">Ticket Information</h2>
                      <p className="text-white mb-4 whitespace-pre-line">{event.details.ticket_info}</p>
                      
                      {event.details.website && (
                        <Button variant="accent" className="bg-[#008751] text-white hover:bg-[#008751]/90" asChild>
                          <a href={event.details.website} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Get Tickets
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <div className="lg:col-span-1">
                    {/* Website - MOVED ABOVE LOCATION */}
                    {event.details.website && (
                      <div className="bg-gray-900 p-6 rounded-lg shadow-sm mb-8">
                        <h2 className="text-xl font-heading font-bold mb-4 text-white">Official Website</h2>
                        <Button variant="accent" className="w-full bg-[#FFD600] text-black hover:bg-[#FFD600]/90 font-medium" asChild>
                          <a href={event.details.website} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Visit Website
                          </a>
                        </Button>
                      </div>
                    )}
                    
                    {/* Map */}
                    <div className="bg-gray-900 p-6 rounded-lg shadow-sm mb-8">
                      <h2 className="text-xl font-heading font-bold mb-4 text-white">Location</h2>
                      <div className="rounded-lg overflow-hidden">
                        {mapUrl && (
                          <iframe
                            title="Event Location"
                            src={mapUrl}
                            width="100%"
                            height="300"
                            style={{ border: 0 }}
                            allowFullScreen={false}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                          ></iframe>
                        )}
                      </div>
                      <p className="mt-2 text-sm text-gray-300">{event.details.location}</p>
                    </div>
                  </div>
                </div>
                
                {/* Related events with enhanced hover effects */}
                {relatedEvents.length > 0 && (
                  <div className="mt-12">
                    <h2 className="text-3xl font-heading font-bold mb-6 text-white">Related Events</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {relatedEvents.map(({ name, details }) => (
                        <Link key={name} to={`/event/${slugify(name)}`}>
                          <Card className="h-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#008751]/20 hover:border-[#008751]/50 bg-gray-900 border-gray-800 group">
                            <div className="h-48 relative overflow-hidden">
                              <img 
                                src={getImageUrl(details.image_url)} 
                                alt={name} 
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                onError={(e) => {
                                  const imgElement = e.target as HTMLImageElement;
                                  imgElement.src = DEFAULT_IMAGE;
                                }} 
                              />
                            </div>
                            <CardContent className="p-4">
                              <h3 className="font-bold text-lg mb-2 text-white group-hover:text-[#FFD600] transition-colors duration-300">{name}</h3>
                              <div className="flex items-center text-sm text-gray-300 mb-2">
                                <CalendarDays className="h-4 w-4 mr-1" />
                                <span>{formatDate(details.start_date)}</span>
                              </div>
                              <div className="flex items-center text-sm text-gray-300">
                                <MapPin className="h-4 w-4 mr-1" />
                                <span className="truncate">{details.location}</span>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default EventDetails;
