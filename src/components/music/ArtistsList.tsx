
import React, { useState, useMemo } from 'react';
import { ARTISTS } from '@/data/artists';
import { ArtistCard } from './ArtistCard';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const ArtistsList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredArtists = useMemo(() => {
    return ARTISTS.filter(artist => 
      artist.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div>
      <div className="relative mb-6 max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input 
          placeholder="Search artists by name..." 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
          className="pl-10 bg-white text-black"
        />
      </div>

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
