
import React, { useState, useMemo } from 'react';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Calendar, Filter, Search, MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

// Define event types
interface Event {
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

// Sample event data
const EVENTS: Event[] = [
  {
    id: "1",
    title: "Afrobeats Festival 2025",
    location: "London, UK",
    date: "2025-07-12",
    image: "/afornationportugal.jpg",
    description: "The biggest celebration of Afrobeats music and culture in Europe.",
    type: "Festival",
    ticketLink: "https://example.com/tickets",
    website: "https://example.com"
  },
  {
    id: "2",
    title: "Afrobeats Dance Workshop",
    location: "Amsterdam, Netherlands",
    date: "2025-05-18",
    image: "/afrofuture detroit.jpeg",
    description: "Learn authentic Afrobeats dance moves from expert choreographers.",
    type: "Workshop",
    ticketLink: "https://example.com/tickets"
  },
  {
    id: "3",
    title: "Cultural Rhythms",
    location: "Accra, Ghana",
    date: "2025-08-05",
    image: "/mawazine.webp",
    description: "A celebration of African culture and music.",
    type: "Festival",
    website: "https://example.com"
  },
  {
    id: "4",
    title: "AfroMix Night",
    location: "Berlin, Germany",
    date: "2025-06-22",
    image: "/larkim.png",
    description: "A night of Afrobeats and Amapiano music with top DJs.",
    type: "Party",
    ticketLink: "https://example.com/tickets"
  }
];

// Filter options
const EVENT_TYPES = ["All Types", "Festival", "Workshop", "Party", "Concert"];
const LOCATIONS = ["All Locations", "London, UK", "Amsterdam, Netherlands", "Accra, Ghana", "Berlin, Germany"];

const Events = () => {
  // State for filters
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [locationFilter, setLocationFilter] = useState("All Locations");
  
  // Filter events based on search query and filters
  const filteredEvents = useMemo(() => {
    return EVENTS.filter(event => {
      // Apply text search
      const matchesSearch = 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Apply type filter
      const matchesType = typeFilter === "All Types" || event.type === typeFilter;
      
      // Apply location filter
      const matchesLocation = locationFilter === "All Locations" || event.location === locationFilter;
      
      return matchesSearch && matchesType && matchesLocation;
    });
  }, [searchQuery, typeFilter, locationFilter]);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-24">
        <div className="flex flex-col items-center text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-heading font-extrabold mb-4">
            Afrobeats Events
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Discover the hottest Afrobeats festivals, parties, and workshops happening around the world.
          </p>
        </div>
        
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex-1 md:flex-initial w-full md:w-48">
              <Select 
                value={typeFilter} 
                onValueChange={setTypeFilter}
              >
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
              <Select 
                value={locationFilter} 
                onValueChange={setLocationFilter}
              >
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
          </div>
        </div>
        
        {/* Events grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredEvents.length > 0 ? (
            filteredEvents.map(event => (
              <Card key={event.id} className="overflow-hidden flex flex-col h-full">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
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
                  <p>{event.description}</p>
                </CardContent>
                
                <CardFooter className="flex justify-between border-t pt-4">
                  {event.ticketLink && (
                    <Button variant="accent" asChild>
                      <a href={event.ticketLink} target="_blank" rel="noopener noreferrer">
                        Get Tickets
                      </a>
                    </Button>
                  )}
                  
                  {event.website && (
                    <Button variant="outline" asChild>
                      <a href={event.website} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Website
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))
          ) : (
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
