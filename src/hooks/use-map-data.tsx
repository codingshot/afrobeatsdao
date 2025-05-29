
import { useQuery } from '@tanstack/react-query';
import { MapItem } from '@/types/map';
import { CLUBS } from '@/data/clubs';
import { ARTISTS } from '@/data/artists';

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

// Convert existing artist data
const getArtistMapItems = (): MapItem[] => {
  return ARTISTS.map(artist => ({
    id: `artist-${artist.id}`,
    name: artist.name,
    type: 'artist' as const,
    coordinates: getArtistCoordinates(artist.origin || 'Nigeria'),
    country: artist.origin || 'Nigeria',
    description: artist.bio || `${artist.name} - Afrobeats Artist`,
    image: artist.image,
    socialLinks: {
      spotify: artist.spotify,
      instagram: artist.socialLinks?.instagram,
      twitter: artist.socialLinks?.twitter,
      youtube: artist.socialLinks?.youtube
    },
    genre: 'Afrobeats'
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

// Helper function to get coordinates for artists based on origin
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
    // Sample Events
    {
      id: 'event-afronation-2024',
      name: 'Afro Nation Portugal 2024',
      type: 'event',
      coordinates: [-8.7613, 40.2033],
      country: 'Portugal',
      city: 'Portimão',
      description: 'The biggest Afrobeats festival in Europe',
      eventDate: '2024-07-03',
      eventEndDate: '2024-07-06',
      venue: 'Praia da Rocha',
      website: 'https://afronation.com'
    },
    {
      id: 'event-detty-december',
      name: 'Detty December Lagos',
      type: 'event',
      coordinates: [3.3792, 6.5244],
      country: 'Nigeria',
      city: 'Lagos',
      description: 'Annual December music festival in Lagos',
      eventDate: '2024-12-25',
      eventEndDate: '2024-12-31',
      venue: 'Eko Atlantic'
    },
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
    {
      id: 'agency-spaceship-collective',
      name: 'Spaceship Collective',
      type: 'agency',
      coordinates: [3.3792, 6.5244],
      country: 'Nigeria',
      city: 'Lagos',
      description: 'Music management and marketing agency'
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
      const additional = getAdditionalMapItems();
      
      return [...clubs, ...artists, ...additional];
    }
  });
};
