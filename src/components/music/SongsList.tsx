
import React, { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Play, List, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useGlobalAudioPlayer } from "@/components/GlobalAudioPlayer";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Song {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  youtube: string;
  genre?: string;
}

// Sample songs data - in a real app this would come from an API
const SONGS: Song[] = [
  {
    id: "burna-1",
    title: "Last Last",
    artist: "Burna Boy",
    artistId: "burna-boy",
    youtube: "6pOqqtLrOEg",
    genre: "Afrobeats"
  },
  {
    id: "wizkid-1",
    title: "Essence (feat. Tems)",
    artist: "Wizkid",
    artistId: "wizkid",
    youtube: "oKD-MVtOoMQ",
    genre: "Afrobeats"
  },
  {
    id: "davido-1",
    title: "FEM",
    artist: "Davido",
    artistId: "davido",
    youtube: "5VmfgZPTwTs",
    genre: "Afrobeats"
  },
  {
    id: "rema-1",
    title: "Calm Down",
    artist: "Rema",
    artistId: "rema",
    youtube: "WcIcVapfqXw",
    genre: "Afrobeats"
  },
  {
    id: "tems-1",
    title: "Free Mind",
    artist: "Tems",
    artistId: "tems",
    youtube: "8lJO_VcbWgM",
    genre: "Afrobeats"
  },
  {
    id: "asake-1",
    title: "Sungba",
    artist: "Asake",
    artistId: "asake",
    youtube: "1XxlMPaXsWU",
    genre: "Afrobeats"
  },
  {
    id: "omahlay-1",
    title: "Attention",
    artist: "Omah Lay",
    artistId: "omah-lay",
    youtube: "B86WDZNox2Q",
    genre: "Afrobeats"
  },
  {
    id: "victony-1",
    title: "Holy Father",
    artist: "Victony",
    artistId: "victony",
    youtube: "PNEXFz1DKUk",
    genre: "Afrobeats"
  },
  {
    id: "focalistic-1",
    title: "Ke Star",
    artist: "Focalistic",
    artistId: "focalistic",
    youtube: "qjbz_7nONj8",
    genre: "Amapiano"
  },
  {
    id: "tyla-1",
    title: "Water",
    artist: "Tyla",
    artistId: "tyla",
    youtube: "o8CvTp0mI4Q",
    genre: "Amapiano"
  }
];

interface SongsListProps {
  searchQuery: string;
  sortMode: "default" | "asc" | "desc";
}

const SongsList: React.FC<SongsListProps> = ({ searchQuery, sortMode }) => {
  const { playNow, addToQueue } = useGlobalAudioPlayer();
  const { toast } = useToast();
  const [artistFilter, setArtistFilter] = useState("all");

  const uniqueArtists = useMemo(() => {
    const artists = Array.from(new Set(SONGS.map(song => song.artist))).sort();
    return artists;
  }, []);

  const filteredSongs = useMemo(() => {
    let filtered = SONGS.filter(song => {
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
  }, [searchQuery, sortMode, artistFilter]);

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
            <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
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
              <h3 className="text-lg font-semibold text-black">{song.title}</h3>
              <Link 
                to={`/music/artist/${song.artistId}`}
                className="text-sm text-[#008751] hover:text-[#008751]/90 hover:underline"
              >
                {song.artist}
              </Link>
              {song.genre && (
                <Badge variant="outline" className="mt-1 bg-white text-black">
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
