
import { useQuery } from '@tanstack/react-query';
import { MapItem } from '@/types/map';
import { CLUBS } from '@/data/clubs';
import { ARTISTS } from '@/data/artists';

// Get events data from the events page data
const getEventsData = () => {
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
    },
    {
      id: 'event-mawazine-morocco',
      name: 'Mawazine Festival',
      location: 'Rabat, Morocco',
      coordinates: [-6.8326, 34.0209] as [number, number],
      date: '2024-06-21',
      endDate: '2024-06-29',
      venue: 'Multiple Venues',
      image: '/mawazine.webp'
    },
    {
      id: 'event-afrobeats-london',
      name: 'Afrobeats in the Park London',
      location: 'London, United Kingdom',
      coordinates: [-0.1276, 51.5074] as [number, number],
      date: '2024-09-15',
      venue: 'Hyde Park'
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

// Improved helper to spread coordinates in a country with better distribution
const spreadCoordinatesInCountry = (baseCoords: [number, number], index: number, total: number): [number, number] => {
  if (total === 1) return baseCoords;
  
  // Create a more varied spread pattern
  const spreadRadius = Math.min(1.0, 0.3 + (total * 0.05)); // Larger spread for more artists
  const layers = Math.ceil(Math.sqrt(total)); // Create circular layers
  const layer = Math.floor(index / layers);
  const positionInLayer = index % layers;
  const angleIncrement = (2 * Math.PI) / Math.max(1, layers);
  
  const angle = angleIncrement * positionInLayer + (layer * Math.PI / 4); // Offset each layer
  const radius = spreadRadius * (0.3 + (layer * 0.2)); // Increase radius for outer layers
  
  const offsetLng = Math.cos(angle) * radius;
  const offsetLat = Math.sin(angle) * radius;
  
  return [
    baseCoords[0] + offsetLng,
    baseCoords[1] + offsetLat
  ];
};

// Convert existing artist data with proper coordinates and improved spread
const getArtistMapItems = (): MapItem[] => {
  // Group artists by country first
  const artistsByCountry: Record<string, typeof ARTISTS> = {};
  
  ARTISTS.forEach(artist => {
    const country = getArtistCountry(artist.name);
    if (!artistsByCountry[country]) {
      artistsByCountry[country] = [];
    }
    artistsByCountry[country].push(artist);
  });

  // Now create map items with improved spread coordinates
  const mapItems: MapItem[] = [];
  
  Object.entries(artistsByCountry).forEach(([country, artists]) => {
    const baseCoords = getArtistCoordinates(country);
    
    artists.forEach((artist, index) => {
      const spreadCoords = spreadCoordinatesInCountry(baseCoords, index, artists.length);
      
      mapItems.push({
        id: `artist-${artist.id}`,
        name: artist.name,
        type: 'artist' as const,
        coordinates: spreadCoords,
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
      });
    });
  });

  return mapItems;
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

// Updated and verified artist country mapping based on research
const getArtistCountry = (artistName: string): string => {
  const artistCountryMap: Record<string, string> = {
    // Nigerian Artists
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
    'Ruger': 'Nigeria',
    'BNXN': 'Nigeria',
    'Oxlade': 'Nigeria',
    'CKay': 'Nigeria',
    'Kizz Daniel': 'Nigeria',
    'Victony': 'Nigeria',
    'Seyi Vibez': 'Nigeria',
    'Shallipopi': 'Nigeria',
    'Young Jonn': 'Nigeria',
    'Skiibii': 'Nigeria',
    'Spyro': 'Nigeria',
    'Llona': 'Nigeria',
    'Qing Madi': 'Nigeria',
    'Cruel Santino': 'Nigeria',
    'Lojay': 'Nigeria',
    'Mr Eazi': 'Nigeria',
    'Tekno': 'Nigeria',
    'DJ Tunez': 'Nigeria',
    'Tempoe': 'Nigeria',
    'Azanti': 'Nigeria',
    'Kcee': 'Nigeria',
    'Adekunle Gold': 'Nigeria',
    'Odeal': 'Nigeria',
    'Olamide': 'Nigeria',
    'SPINALL': 'Nigeria',
    'Ayo Maff': 'Nigeria',
    '1da Banton': 'Nigeria',
    'Swizz Panache': 'Nigeria',
    'Phyno': 'Nigeria',
    'Tiwa Savage': 'Nigeria',
    'MOLIY': 'Nigeria',
    
    // Ghanaian Artists
    'King Promise': 'Ghana',
    'Black Sherif': 'Ghana',
    
    // South African Artists
    'Tyla': 'South Africa',
    'Focalistic': 'South Africa',
    'Costa Titch': 'South Africa',
    
    // UK-based Artists (many of Nigerian/African heritage but UK-based)
    'J Hus': 'United Kingdom',
    'NSG': 'United Kingdom',
    'Not3s': 'United Kingdom', 
    'Darkoo': 'United Kingdom',
    'Yxng Bane': 'United Kingdom',
    'B Young': 'United Kingdom',
    'ZieZie': 'United Kingdom',
    'Young T & Bugsey': 'United Kingdom',
    'Kojo Funds': 'United Kingdom',
    'Teejay': 'United Kingdom'
  };
  
  return artistCountryMap[artistName] || 'Nigeria';
};

// Helper function to get coordinates for artists based on country
const getArtistCoordinates = (country: string): [number, number] => {
  const countryCoordinates: Record<string, [number, number]> = {
    'Nigeria': [7.3775, 9.0765], // Center of Nigeria
    'Ghana': [-1.0232, 7.9465], // Center of Ghana
    'South Africa': [22.9375, -30.5595], // Center of South Africa
    'United Kingdom': [-3.4360, 55.3781], // Center of UK
    'United States': [-95.7129, 37.0902],
    'Canada': [-106.3468, 56.1304],
    'France': [2.2137, 46.2276],
    'Germany': [10.4515, 51.1657]
  };
  return countryCoordinates[country] || [7.3775, 9.0765];
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
      
      console.log('Map data loaded:', {
        clubs: clubs.length,
        artists: artists.length,
        events: events.length,
        additional: additional.length
      });
      
      return [...clubs, ...artists, ...events, ...additional];
    }
  });
};
