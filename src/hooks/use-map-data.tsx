import { useQuery } from '@tanstack/react-query';
import { MapItem } from '@/types/map';
import artistsData from '@/data/artists';
import clubsData from '@/data/clubs';
import eventsData from '@/data/events.json';
import communityData from '@/data/community.json';

export const useMapData = () => {
  return useQuery({
    queryKey: ['map-data'],
    queryFn: async (): Promise<MapItem[]> => {
      const mapItems: MapItem[] = [];

      // Add artists
      artistsData.forEach(artist => {
        if (artist.coordinates) {
          mapItems.push({
            id: `artist-${artist.id}`,
            name: artist.name,
            type: 'artist',
            coordinates: artist.coordinates,
            country: artist.country,
            city: artist.city,
            description: artist.bio,
            image: artist.image,
            socialLinks: artist.socialLinks,
            genre: artist.primaryGenre
          });
        }
      });

      // Add clubs
      clubsData.forEach(club => {
        if (club.coordinates) {
          mapItems.push({
            id: `club-${club.id}`,
            name: club.name,
            type: 'club',
            coordinates: club.coordinates,
            country: club.country,
            city: club.city,
            description: club.description,
            image: club.image,
            website: club.website,
            socialLinks: club.socialLinks,
            openingHours: club.openingHours,
            musicStyle: club.musicStyle
          });
        }
      });

      // Add events
      eventsData.forEach(event => {
        if (event.coordinates) {
          mapItems.push({
            id: `event-${event.id}`,
            name: event.name,
            type: 'event',
            coordinates: event.coordinates,
            country: event.country,
            city: event.city,
            description: event.description,
            image: event.image,
            website: event.website,
            socialLinks: event.socialLinks,
            eventDate: event.date,
            eventEndDate: event.endDate,
            venue: event.venue
          });
        }
      });

      // Add community data
      communityData.forEach(community => {
        if (community.coordinates) {
          mapItems.push({
            id: `community-${community.id}`,
            name: community.name,
            type: community.type as any,
            coordinates: community.coordinates,
            country: community.country,
            city: community.city,
            description: community.description,
            image: community.image,
            socialLinks: community.socialLinks,
            verified: community.verified
          });
        }
      });

      console.info('Map data loaded:', {
        clubs: clubsData.length,
        artists: artistsData.length,
        events: eventsData.length,
        community: communityData.length,
        total: mapItems.length
      });

      return mapItems;
    }
  });
};
