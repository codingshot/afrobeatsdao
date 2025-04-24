
import React from 'react';
import { ARTISTS } from '@/data/artists';
import { ArtistCard } from './ArtistCard';

const ArtistsList: React.FC<{ searchQuery: string }> = ({ searchQuery }) => {
  const filteredArtists = ARTISTS.filter(artist => 
    artist.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
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
  );
};

export default ArtistsList;
