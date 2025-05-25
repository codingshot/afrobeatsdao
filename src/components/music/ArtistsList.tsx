
import React, { useMemo } from 'react';
import { ARTISTS } from '@/data/artists';
import { motion, AnimatePresence } from 'framer-motion';
import { ArtistCard } from './ArtistCard';

interface ArtistsListProps {
  searchQuery: string;
  sortMode?: "default" | "asc" | "desc";
}

const ArtistsList: React.FC<ArtistsListProps> = ({ searchQuery, sortMode = "default" }) => {
  const filteredArtists = useMemo(() => {
    let filtered = ARTISTS.filter(artist =>
      artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (artist.genre && artist.genre.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (artist.country && artist.country.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    if (sortMode === "asc") {
      filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortMode === "desc") {
      filtered = filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    return filtered;
  }, [searchQuery, sortMode]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <AnimatePresence>
        {filteredArtists.map((artist, index) => (
          <motion.div
            key={artist.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <ArtistCard artist={artist} />
          </motion.div>
        ))}
      </AnimatePresence>
      {filteredArtists.length === 0 && (
        <div className="col-span-full text-center py-8">
          <p className="text-lg text-black/70">No artists found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default ArtistsList;
