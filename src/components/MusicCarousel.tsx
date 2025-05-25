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

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "/AfrobeatsDAOMeta.png";
  };

  return (
    <div className="bg-white py-6 overflow-hidden border-b border-black">
      <div className="relative">
        <div className="flex animate-[scroll_30s_linear_infinite] gap-6">
          {/* Duplicate songs for seamless loop */}
          {[...allSongs, ...allSongs].map((song, index) => (
            <div 
              key={`${song.id}-${index}`}
              className="flex items-center bg-gray-50 rounded-lg p-3 min-w-[300px] border hover:bg-gray-100 transition-colors gap-3"
            >
              {/* Song thumbnail with text overlay */}
              <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md relative">
                <img 
                  src={getVideoThumbnail(song.youtube)} 
                  alt={song.title} 
                  className="h-full w-full object-cover" 
                  onError={handleImageError} 
                />
                {/* Text overlay on thumbnail */}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-xs p-1">
                  <div 
                    className="font-semibold text-center leading-tight truncate w-full" 
                    title={song.title}
                  >
                    {song.title}
                  </div>
                  <div className="text-[10px] text-center truncate w-full mt-0.5">
                    {song.artist}
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-1 ml-auto">
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default MusicCarousel;
