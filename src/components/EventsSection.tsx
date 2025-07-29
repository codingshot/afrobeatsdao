import { CalendarDays, MapPin } from "lucide-react";
import { formatDate } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { slugify } from "@/lib/slugUtils";
import EVENTS_DATA from "@/data/events.json";

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

export const EVENTS: Record<string, Event> = EVENTS_DATA;

export function EventsSection() {
  const [showPastEvents, setShowPastEvents] = useState(false);
  const today = new Date();
  const DEFAULT_IMAGE = "/AfrobeatsDAOMeta.png";

  // Improved function to handle image URLs from JSON data
  const getImageUrl = (imageUrl: string) => {
    // If it's already a full HTTP/HTTPS URL, return as is
    if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
      return imageUrl;
    }
    // If it starts with a slash, it's already a proper public path
    if (imageUrl.startsWith("/")) {
      return imageUrl;
    }
    // If it doesn't start with a slash, add one to make it a proper public path
    return `/${imageUrl}`;
  };

  const filteredEvents = Object.entries(EVENTS)
    .filter(([, event]) => {
      const endDate = new Date(event.end_date);
      if (showPastEvents) {
        return endDate < today;
      }
      return endDate >= today;
    })
    .sort(
      ([, a], [, b]) =>
        new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
    );

  const isEventActive = (startDate: string, endDate: string) => {
    const now = today.getTime();
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    return now >= start && now <= end;
  };

  return (
    <section id="events" className="py-16 font-afro bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
          <div className="flex flex-col sm:flex-row lg:flex-row items-start sm:items-center lg:items-center gap-4 lg:gap-6">
            <h2 className="text-4xl font-heading font-bold flex items-center gap-2 text-black">
              <span>Events</span>
              <span className="text-4xl">🎊</span>
            </h2>

            <div className="flex items-center gap-2 bg-gray-100 rounded-full p-1 w-full sm:w-auto lg:w-auto">
              <Button
                variant={!showPastEvents ? "default" : "ghost"}
                size="sm"
                onClick={() => setShowPastEvents(false)}
                className={`rounded-full px-3 sm:px-4 text-sm ${
                  !showPastEvents
                    ? "bg-[#008751] text-white hover:bg-[#008751]/90"
                    : "hover:bg-gray-200"
                }`}
              >
                Upcoming
              </Button>
              <Button
                variant={showPastEvents ? "default" : "ghost"}
                size="sm"
                onClick={() => setShowPastEvents(true)}
                className={`rounded-full px-3 sm:px-4 text-sm ${
                  showPastEvents
                    ? "bg-[#008751] text-white hover:bg-[#008751]/90"
                    : "hover:bg-gray-200"
                }`}
              >
                Past
              </Button>
            </div>
          </div>

          <Link to="/events" className="w-full sm:w-auto lg:w-auto">
            <Button
              variant="outline"
              className="border-[#008751] text-[#008751] hover:bg-[#008751] hover:text-white w-full sm:w-auto lg:w-auto"
            >
              See All Events
            </Button>
          </Link>
        </div>

        {filteredEvents.length > 0 ? (
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent>
              {filteredEvents.map(([name, event]) => (
                <CarouselItem
                  key={name}
                  className="md:basis-1/3 lg:basis-1/4 xl:basis-1/5 pb-5"
                >
                  <Link to={`/event/${slugify(name)}`} className="block">
                    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-[1.02] h-full">
                      <div className="relative aspect-[16/10]">
                        <img
                          src={getImageUrl(event.image_url)}
                          onError={(e) => {
                            const imgElement = e.target as HTMLImageElement;
                            imgElement.src = DEFAULT_IMAGE;
                          }}
                          alt={`${name} poster`}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        {isEventActive(event.start_date, event.end_date) && (
                          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            Active
                          </div>
                        )}
                      </div>
                      <div className="p-4 space-y-2">
                        <h3 className="text-lg font-heading font-bold text-slate-950 line-clamp-2">
                          {name}
                        </h3>

                        <div className="flex items-center gap-1 text-gray-600 text-sm">
                          <MapPin className="shrink-0 h-3 w-3" />
                          <span className="line-clamp-1">{event.location}</span>
                        </div>

                        <div className="flex items-center gap-1 text-gray-600 text-sm">
                          <CalendarDays className="shrink-0 h-3 w-3" />
                          <span className="line-clamp-1">
                            {formatDate(event.start_date)}
                            {event.end_date !== event.start_date &&
                              ` - ${formatDate(event.end_date)}`}
                          </span>
                        </div>

                        <p className="text-gray-600 line-clamp-2 text-sm">
                          {event.event_description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        ) : (
          <div className="text-center text-gray-500">
            {showPastEvents
              ? "No past events to display."
              : "No upcoming events to display."}
          </div>
        )}
      </div>
    </section>
  );
}
