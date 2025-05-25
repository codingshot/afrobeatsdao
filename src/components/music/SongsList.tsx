
import React, { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Play, List, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useGlobalAudioPlayer } from "@/components/GlobalAudioPlayer";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ARTISTS } from "@/data/artists";

interface Song {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  youtube: string;
  genre?: string;
}

interface SongsListProps {
  searchQuery: string;
  sortMode: "default" | "asc" | "desc";
}

const SongsList: React.FC<SongsListProps> = ({ searchQuery, sortMode }) => {
  const { playNow, addToQueue } = useGlobalAudioPlayer();
  const { toast } = useToast();
  const [artistFilter, setArtistFilter] = useState("all");

  // Map songs from artists data
  const allSongs = useMemo(() => {
    const songs: Song[] = [];
    ARTISTS.forEach(artist => {
      artist.top_songs.forEach((song, index) => {
        // Extract YouTube video ID from URL
        let youtubeId = song.youtube;
        if (song.youtube.includes('youtube.com/watch?v=')) {
          youtubeId = song.youtube.split('v=')[1]?.split('&')[0] || '';
        } else if (song.youtube.includes('youtu.be/')) {
          youtubeId = song.youtube.split('youtu.be/')[1]?.split('?')[0] || '';
        }
        
        songs.push({
          id: `${artist.id}-${index}`,
          title: song.title,
          artist: artist.name,
          artistId: artist.id,
          youtube: youtubeId,
          genre: artist.genre
        });
      });
    });
    return songs;
  }, []);

  const uniqueArtists = useMemo(() => {
    const artists = Array.from(new Set(allSongs.map(song => song.artist))).sort();
    return artists;
  }, [allSongs]);

  const filteredSongs = useMemo(() => {
    let filtered = allSongs.filter(song => {
      const matchesSearch = song.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          song.artist.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesArtist = artistFilter === "all" || song.artist === artistFilter;
      return matchesSearch && matchesArtist;
    });

    if (sortMode === "asc") {
      filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortMode === "desc") {
      filtered = filtered.sort((a, b) => b.title.localeCompare(a.title));
    }

    return filtered;
  }, [allSongs, searchQuery, sortMode, artistFilter]);

  const handlePlay = (song: Song) => {
    playNow({
      id: song.id,
      youtube: song.youtube,
      title: song.title,
      artist: song.artist
    });
  };

  const handleAddToQueue = (song: Song) => {
    addToQueue({
      id: song.id,
      youtube: song.youtube,
      title: song.title,
      artist: song.artist
    });
    toast({
      title: "Added to queue",
      description: `${song.title} by ${song.artist} will play next`
    });
  };

  const getVideoThumbnail = (videoId: string) => {
    return `https://img.youtube.com/vi/${videoId}/default.jpg`;
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 mb-4">
        <Select value={artistFilter} onValueChange={setArtistFilter}>
          <SelectTrigger className="w-[200px] bg-white text-black">
            <SelectValue placeholder="Filter by artist" />
          </SelectTrigger>
          <SelectContent className="bg-white text-black">
            <SelectItem value="all">All Artists</SelectItem>
            {uniqueArtists.map(artist => (
              <SelectItem key={artist} value={artist}>{artist}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <AnimatePresence>
        {filteredSongs.length > 0 ? filteredSongs.map(song => (
          <motion.div 
            key={song.id} 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, height: 0 }} 
            transition={{ duration: 0.3 }} 
            className="flex items-center gap-4 p-4 bg-white rounded-lg border hover:bg-accent/5 transition-colors w-full"
          >
            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
              <img 
                src={getVideoThumbnail(song.youtube)} 
                alt={song.title} 
                className="h-full w-full object-cover" 
                onError={(e) => {
                  e.currentTarget.src = "/AfrobeatsDAOMeta.png";
                }} 
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-semibold text-black">{song.title}</h3>
                <span className="text-gray-400">•</span>
                <Link 
                  to={`/music/artist/${song.artistId}`}
                  className="text-lg text-[#008751] hover:text-[#008751]/90 hover:underline"
                >
                  {song.artist}
                </Link>
              </div>
              {song.genre && (
                <Badge variant="outline" className="bg-white text-black">
                  {song.genre}
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => handlePlay(song)} 
                className="text-[#008751] hover:text-[#008751]/90 hover:bg-[#008751]/10"
              >
                <Play className="h-5 w-5" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => handleAddToQueue(song)} 
                className="text-[#008751] hover:text-[#008751]/90 hover:bg-[#008751]/10"
              >
                <List className="h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        )) : (
          <div className="text-center py-8">
            <p className="text-lg text-black/70">No songs found. Try adjusting your filters.</p>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SongsList;
