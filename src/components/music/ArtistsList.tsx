
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { artists } from '@/data/artists';
import { motion, AnimatePresence } from 'framer-motion';

interface ArtistsListProps {
  searchQuery: string;
  sortMode?: "default" | "asc" | "desc";
}

const ArtistsList: React.FC<ArtistsListProps> = ({ searchQuery, sortMode = "default" }) => {
  const filteredArtists = useMemo(() => {
    let filtered = artists.filter(artist =>
      artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist.country.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortMode === "asc") {
      filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortMode === "desc") {
      filtered = filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    return filtered;
  }, [searchQuery, sortMode]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      <AnimatePresence>
        {filteredArtists.map((artist, index) => (
          <motion.div
            key={artist.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Link
              to={`/music/artist/${artist.id}`}
              className="block group hover:scale-105 transition-transform duration-200"
            >
              <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-square mb-3 overflow-hidden rounded-lg">
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = "/AfrobeatsDAOMeta.png";
                    }}
                  />
                </div>
                <h3 className="font-semibold text-black group-hover:text-[#008751] transition-colors">
                  {artist.name}
                </h3>
                <p className="text-sm text-black/70">{artist.genre}</p>
                <p className="text-xs text-black/50">{artist.country}</p>
              </div>
            </Link>
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
