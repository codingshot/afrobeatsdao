
import React, { useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Play, List } from "lucide-react";
import { useGlobalAudioPlayer } from "@/components/GlobalAudioPlayer";
import { useToast } from "@/hooks/use-toast";
import { ARTISTS } from "@/data/artists";

interface Song {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  youtube: string;
}

const MusicCarousel: React.FC = () => {
  const { playNow, addToQueue } = useGlobalAudioPlayer();
  const { toast } = useToast();

  // Get all songs from artists data
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
          youtube: youtubeId
        });
      });
    });
    return songs.slice(0, 20); // Show first 20 songs
  }, []);

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

  const getArtistImage = (artistId: string) => {
    const artist = ARTISTS.find(a => a.id === artistId);
    return artist?.image || "/AfrobeatsDAOMeta.png";
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "/AfrobeatsDAOMeta.png";
  };

  return (
    <div className="bg-white py-6 overflow-hidden">
      <div className="relative">
        <div className="flex animate-[scroll_30s_linear_infinite] gap-6">
          {/* Duplicate songs for seamless loop */}
          {[...allSongs, ...allSongs].map((song, index) => (
            <div 
              key={`${song.id}-${index}`}
              className="flex flex-col bg-gray-50 rounded-lg p-3 min-w-[300px] border hover:bg-gray-100 transition-colors"
            >
              {/* Top row: Song thumbnail, title and controls */}
              <div className="flex items-center gap-3 mb-2">
                {/* Song thumbnail */}
                <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md">
                  <img 
                    src={getVideoThumbnail(song.youtube)} 
                    alt={song.title} 
                    className="h-full w-full object-cover" 
                    onError={(e) => {
                      e.currentTarget.src = "/AfrobeatsDAOMeta.png";
                    }} 
                  />
                </div>
                
                {/* Song title with hover tooltip */}
                <div className="flex-1 min-w-0">
                  <h4 
                    className="text-sm font-semibold text-black truncate cursor-default" 
                    title={song.title}
                  >
                    {song.title}
                  </h4>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handlePlay(song)} 
                    className="h-8 w-8 text-[#008751] hover:text-[#008751]/90 hover:bg-[#008751]/10"
                  >
                    <Play className="h-4 w-4" />
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleAddToQueue(song)} 
                    className="h-8 w-8 text-[#008751] hover:text-[#008751]/90 hover:bg-[#008751]/10"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Bottom row: Artist info */}
              <div className="flex items-center gap-2 ml-[60px]">
                <div className="h-5 w-5 flex-shrink-0 overflow-hidden rounded-full">
                  <img 
                    src={getArtistImage(song.artistId)} 
                    alt={song.artist} 
                    className="h-full w-full object-cover" 
                    onError={handleImageError} 
                  />
                </div>
                <span className="text-xs text-[#008751] font-medium truncate">
                  {song.artist}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MusicCarousel;
