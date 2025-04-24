import React from 'react';
import { Helmet } from "react-helmet";
import { ARTISTS } from '@/data/artists';
import { ArtistCard } from './ArtistCard';

const ArtistsList: React.FC<{ searchQuery: string }> = ({ searchQuery }) => {
  const filteredArtists = ARTISTS.filter(artist => 
    artist.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>African Artists Directory - Discover Afrobeats & Amapiano Musicians</title>
        <meta name="description" content={`Explore our directory of ${ARTISTS.length} African artists. Discover Afrobeats and Amapiano musicians, their top songs, and latest releases.`} />
        <meta property="og:title" content="African Artists Directory" />
        <meta property="og:type" content="website" />
        <meta name="keywords" content={`african artists, ${ARTISTS.map(artist => artist.name.toLowerCase()).join(', ')}, afrobeats musicians`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": ARTISTS.map((artist, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "MusicGroup",
                "name": artist.name,
                "image": artist.image,
                "@id": `/music/artist/${artist.id}`
              }
            }))
          })}
        </script>
      </Helmet>

      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredArtists.map((artist) => (
            <div key={artist.id}>
              <ArtistCard artist={artist} />
            </div>
          ))}
        </div>
        
        {filteredArtists.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No artists found</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </>
  );
};

export default ArtistsList;
