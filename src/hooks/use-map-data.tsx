import { useQuery } from '@tanstack/react-query';
import { MapItem } from '@/types/map';
import { ARTISTS } from '@/data/artists';
import { CLUBS, getClubCountry } from '@/data/clubs';
import eventsData from '@/data/events.json';
import communityData from '@/data/community.json';

export const useMapData = () => {
  return useQuery({
    queryKey: ['map-data'],
    queryFn: async (): Promise<MapItem[]> => {
      const mapItems: MapItem[] = [];

      // Add artists
      ARTISTS.forEach(artist => {
        // Create coordinates from country (basic mapping for now)
        let coordinates: [number, number] | undefined;
        
        // Map countries to approximate coordinates
        const countryCoords: Record<string, [number, number]> = {
          'Nigeria': [7.3775, 9.0820],
          'Ghana': [-1.0232, 7.9465],
          'South Africa': [24.7136, -28.7282],
          'UK': [-3.4360, 55.3781],
          'United Kingdom': [-3.4360, 55.3781],
          'United States': [-95.7129, 37.0902],
          'Canada': [-106.3468, 56.1304]
        };

        if (artist.country && countryCoords[artist.country]) {
          coordinates = countryCoords[artist.country];
        }

        if (coordinates) {
          mapItems.push({
            id: `artist-${artist.id}`,
            name: artist.name,
            type: 'artist',
            coordinates,
            country: artist.country || 'Unknown',
            description: artist.genre ? `${artist.genre} artist` : undefined,
            image: artist.image,
            socialLinks: {
              instagram: artist.instagram?.replace('https://www.instagram.com/', ''),
              twitter: artist.twitter?.replace('https://x.com/', '').replace('https://twitter.com/', ''),
              youtube: artist.youtube,
              spotify: artist.spotify
            },
            genre: artist.genre,
            website: artist.website
          });
        }
      });

      // Add clubs
      CLUBS.forEach(club => {
        if (club.coordinates && club.coordinates.length === 2) {
          mapItems.push({
            id: `club-${club.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`,
            name: club.name,
            type: 'club',
            coordinates: [club.coordinates[0], club.coordinates[1]] as [number, number],
            country: getClubCountry(club.city) || "Unknown",
            city: club.city,
            description: club.type,
            openingHours: club.hours,
            musicStyle: club.music,
            website: club.website
          });
        }
      });

      // Add events (convert object to array)
      const eventsArray = Object.entries(eventsData);
      eventsArray.forEach(([eventName, event]) => {
        // Map event locations to coordinates
        const locationCoords: Record<string, [number, number]> = {
          'Portimão, Portugal': [-8.5376, 37.1364],
          'Detroit, MI, USA': [-83.0458, 42.3314],
          'Hart Plaza, Detroit, MI, USA': [-83.0440, 42.3288],
          'Accra, Ghana': [-0.1969, 5.6037],
          'Lagos, Nigeria': [3.3792, 6.5244],
          'Rabat, Morocco': [-6.8326, 34.0209],
          'Dubai, United Arab Emirates': [55.2708, 25.2048],
          'Ain Dubai, Bluewaters Island, Dubai, United Arab Emirates': [55.1200, 25.2100],
          'Bygrave Woods, Ashwell Road, Baldock Newnham, Hertfordshire, UK': [-0.1928, 51.9500],
          'Playa del Inglés, Gran Canaria, Spain': [-15.5500, 27.7600],
          'The Palladium Club, Bideford, England, UK': [-4.2026, 51.0200],
          'Brisbane, Australia (venue TBA)': [153.0251, -27.4705],
          'SOB\'s, 204 Varick Street, New York City, USA': [-74.0060, 40.7128],
          'Brooklyn Roots Collective, Brooklyn, NY, USA': [-73.9590, 40.6520],
          'Throw Social DC, Washington, DC, USA': [-77.0210, 38.8800],
          'Studio 338, 388 Boord Street, London, UK': [-0.0307, 51.5074],
          'Sefton Park, Liverpool, UK': [-2.9380, 53.3830],
          'Hart Plaza | Detroit, MI, USA': [-83.0458, 42.3314],
          'Quartier des spectacles, Montreal, QC, Canada': [-73.5673, 45.5088],
          'Stone Town, Zanzibar, Tanzania': [39.1923, -6.1639],
        };

        const coordinates = locationCoords[event.location];
        if (coordinates) {
          mapItems.push({
            id: `event-${eventName.replace(/\s+/g, '-').toLowerCase()}`,
            name: eventName,
            type: 'event',
            coordinates,
            country: event.location.includes('Portugal') ? 'Portugal' :
                     event.location.includes('USA') ? 'United States' :
                     event.location.includes('Ghana') ? 'Ghana' :
                     event.location.includes('Nigeria') ? 'Nigeria' :
                     event.location.includes('Morocco') ? 'Morocco' :
                     event.location.includes('Dubai') ? 'United Arab Emirates' :
                     event.location.includes('UK') ? 'United Kingdom' :
                     event.location.includes('Spain') ? 'Spain' :
                     event.location.includes('Australia') ? 'Australia' :
                     event.location.includes('Canada') ? 'Canada' :
                     event.location.includes('Tanzania') ? 'Tanzania' : 'Unknown',
            city: event.location.split(',')[0],
            description: event.event_description,
            image: event.image_url,
            website: event.website,
            eventDate: event.start_date,
            eventEndDate: event.end_date,
            venue: event.location
          });
        }
      });

      // Add community data
      communityData.forEach(community => {
        if (community.coordinates && community.coordinates.length === 2) {
          mapItems.push({
            id: `community-${community.id}`,
            name: community.name,
            type: 'community',
            coordinates: [community.coordinates[0], community.coordinates[1]] as [number, number],
            country: community.country,
            city: community.city,
            description: community.description,
            image: community.image,
            socialLinks: community.socialLinks,
            verified: community.verified
          });
        }
      });

      return mapItems;
    }
  });
};
