
import { useQuery } from '@tanstack/react-query';
import { MapItem } from '@/types/map';
import { CLUBS } from '@/data/clubs';
import { ARTISTS } from '@/data/artists';

// Get events data
const getEventsData = () => {
  // Sample events data - you can expand this with real events from your database
  return [
    {
      id: 'event-afronation-2024',
      name: 'Afro Nation Portugal 2024',
      location: 'Portimão, Portugal',
      coordinates: [-8.7613, 40.2033] as [number, number],
      date: '2024-07-03',
      endDate: '2024-07-06',
      venue: 'Praia da Rocha',
      image: '/afornationportugal.jpg'
    },
    {
      id: 'event-detty-december',
      name: 'Detty December Lagos',
      location: 'Lagos, Nigeria', 
      coordinates: [3.3792, 6.5244] as [number, number],
      date: '2024-12-25',
      endDate: '2024-12-31',
      venue: 'Eko Atlantic'
    },
    {
      id: 'event-afrofuture-detroit',
      name: 'Afrofuture Detroit',
      location: 'Detroit, United States',
      coordinates: [-83.0458, 42.3314] as [number, number],
      date: '2024-08-24',
      endDate: '2024-08-25',
      venue: 'Hart Plaza',
      image: '/afrofuture detroit.jpeg'
    }
  ];
};

// Convert existing club data
const getClubMapItems = (): MapItem[] => {
  return CLUBS.map(club => ({
    id: `club-${club.name.toLowerCase().replace(/\s+/g, '-')}`,
    name: club.name,
    type: 'club' as const,
    coordinates: club.coordinates,
    country: getCountryFromCity(club.city),
    city: club.city,
    description: club.general_rating,
    website: club.website,
    openingHours: club.hours,
    musicStyle: club.music
  }));
};

// Convert existing artist data with proper coordinates
const getArtistMapItems = (): MapItem[] => {
  return ARTISTS.map(artist => {
    // Get country from artist name or default to Nigeria
    const country = getArtistCountry(artist.name);
    
    return {
      id: `artist-${artist.id}`,
      name: artist.name,
      type: 'artist' as const,
      coordinates: getArtistCoordinates(country),
      country: country,
      description: `${artist.name} - Afrobeats Artist`,
      image: artist.image,
      socialLinks: {
        spotify: artist.spotify,
        instagram: artist.instagram,
        twitter: artist.twitter,
        youtube: artist.youtube
      },
      genre: 'Afrobeats'
    };
  });
};

// Convert events data
const getEventMapItems = (): MapItem[] => {
  const events = getEventsData();
  
  return events.map(event => ({
    id: event.id,
    name: event.name,
    type: 'event' as const,
    coordinates: event.coordinates,
    country: event.location.split(', ')[1] || event.location,
    city: event.location.split(', ')[0],
    description: `Afrobeats event at ${event.venue}`,
    eventDate: event.date,
    eventEndDate: event.endDate,
    venue: event.venue,
    image: event.image
  }));
};

// Helper function to get country from city
const getCountryFromCity = (city: string): string => {
  const cityToCountry: Record<string, string> = {
    'London': 'United Kingdom',
    'Bangkok': 'Thailand', 
    'Dublin': 'Ireland',
    'Amsterdam': 'Netherlands'
  };
  return cityToCountry[city] || city;
};

// Helper function to determine artist country based on name/origin
const getArtistCountry = (artistName: string): string => {
  // Map some artists to their known countries
  const artistCountryMap: Record<string, string> = {
    'Burna Boy': 'Nigeria',
    'Wizkid': 'Nigeria',
    'Davido': 'Nigeria',
    'Tems': 'Nigeria',
    'Asake': 'Nigeria',
    'Rema': 'Nigeria',
    'Ayra Starr': 'Nigeria',
    'Omah Lay': 'Nigeria',
    'Fireboy DML': 'Nigeria',
    'Joeboy': 'Nigeria',
    'King Promise': 'Ghana',
    'Black Sherif': 'Ghana',
    'Tyla': 'South Africa',
    'Focalistic': 'South Africa',
    'J Hus': 'United Kingdom',
    'NSG': 'United Kingdom',
    'Not3s': 'United Kingdom',
    'Darkoo': 'United Kingdom'
  };
  
  return artistCountryMap[artistName] || 'Nigeria'; // Default to Nigeria
};

// Helper function to get coordinates for artists based on country
const getArtistCoordinates = (country: string): [number, number] => {
  const countryCoordinates: Record<string, [number, number]> = {
    'Nigeria': [8.6753, 9.0820],
    'Ghana': [-1.0232, 7.9465],
    'South Africa': [22.9375, -30.5595],
    'United Kingdom': [-3.4360, 55.3781],
    'United States': [-95.7129, 37.0902],
    'Canada': [-106.3468, 56.1304],
    'France': [2.2137, 46.2276],
    'Germany': [10.4515, 51.1657]
  };
  return countryCoordinates[country] || [8.6753, 9.0820]; // Default to Nigeria
};

// Sample additional data for other types
const getAdditionalMapItems = (): MapItem[] => {
  return [
    // Sample Dancers
    {
      id: 'dancer-poco-lee',
      name: 'Poco Lee',
      type: 'dancer',
      coordinates: [3.3792, 6.5244],
      country: 'Nigeria',
      city: 'Lagos',
      description: 'Famous Afrobeats dancer and choreographer',
      socialLinks: {
        instagram: '@poco_lee'
      }
    },
    // Sample Influencers
    {
      id: 'influencer-korty-eo',
      name: 'Korty EO',
      type: 'influencer',
      coordinates: [3.3792, 6.5244],
      country: 'Nigeria',
      city: 'Lagos',
      description: 'Content creator and Afrobeats culture influencer',
      socialLinks: {
        youtube: '@KortyEO',
        instagram: '@korty_eo'
      }
    },
    // Sample Agencies
    {
      id: 'agency-mavin-records',
      name: 'Mavin Records',
      type: 'agency',
      coordinates: [3.3792, 6.5244],
      country: 'Nigeria',
      city: 'Lagos',
      description: 'Leading Nigerian record label',
      website: 'https://mavinrecords.com'
    },
    // Sample Groups
    {
      id: 'group-afrobeats-london',
      name: 'Afrobeats London Community',
      type: 'group',
      coordinates: [-0.1276, 51.5074],
      country: 'United Kingdom',
      city: 'London',
      description: 'London-based Afrobeats music community and events organizer'
    }
  ];
};

export const useMapData = () => {
  return useQuery({
    queryKey: ['map-data'],
    queryFn: async (): Promise<MapItem[]> => {
      const clubs = getClubMapItems();
      const artists = getArtistMapItems();
      const events = getEventMapItems();
      const additional = getAdditionalMapItems();
      
      return [...clubs, ...artists, ...events, ...additional];
    }
  });
};
