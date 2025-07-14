
import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Plus, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Artist, Song } from '@/data/artists';
import { useGlobalAudioPlayer } from '@/components/GlobalAudioPlayer';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { slugify } from '@/lib/slugUtils';

interface ArtistCardProps {
  artist: Artist;
}

export const ArtistCard: React.FC<ArtistCardProps> = ({ artist }) => {
  const { playNow, addToQueue } = useGlobalAudioPlayer();
  const { toast } = useToast();

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "/AfrobeatsDAOMeta.png";
  };
  
  const getVideoId = (url: string): string => {
    if (!url) return '';
    
    console.log('Original URL:', url);
    
    // Handle different YouTube URL formats
    let videoId = '';
    
    if (url.includes('youtube.com/watch?v=')) {
      videoId = url.split('v=')[1]?.split('&')[0] || '';
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0] || '';
    } else if (url.includes('youtube.com/embed/')) {
      videoId = url.split('embed/')[1]?.split('?')[0] || '';
    } else {
      // If it's already just a video ID
      videoId = url;
    }
    
    console.log('Extracted video ID:', videoId);
    return videoId;
  };
  
  const playSong = (song: Song) => {
    const videoId = getVideoId(song.youtube);
    
    console.log('Playing song:', song.title, 'with video ID:', videoId);
    
    if (!videoId) {
      toast({
        title: "Error",
        description: "Invalid YouTube URL for this song"
      });
      return;
    }
    
    playNow({
      id: `${artist.id}-${song.title}`,
      youtube: videoId,
      title: song.title,
      artist: artist.name
    });
    
    toast({
      title: "Now Playing",
      description: `${song.title} by ${artist.name}`
    });
  };
  
  const addSongToQueue = (song: Song) => {
    const videoId = getVideoId(song.youtube);
    
    if (!videoId) {
      toast({
        title: "Error",
        description: "Invalid YouTube URL for this song"
      });
      return;
    }
    
    addToQueue({
      id: `${artist.id}-${song.title}`,
      youtube: videoId,
      title: song.title,
      artist: artist.name
    });
    
    toast({
      title: "Added to Queue",
      description: `${song.title} by ${artist.name}`
    });
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300 bg-white">
      <CardContent className="p-0 flex flex-col flex-1">
        <Link to={`/music/artist/${artist.id}`} className="block overflow-hidden">
          <div className="relative aspect-square overflow-hidden group">
            <img 
              src={artist.image} 
              alt={artist.name} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={handleImageError} 
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Badge className="bg-[#008751]/80 text-white px-3 py-1">View Profile</Badge>
            </div>
          </div>
        </Link>
        
        <div className="p-4 flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <Link to={`/music/artist/${artist.id}`} className="hover:underline">
              <h3 className="text-xl font-bold text-black">{artist.name}</h3>
            </Link>
            
            {artist.website && (
              <a href={artist.website} target="_blank" rel="noopener noreferrer" className="text-[#008751] hover:text-[#008751]/80">
                <ExternalLink size={18} />
              </a>
            )}
          </div>
          
          <div className="space-y-2 mt-2 flex-1">
            {artist.top_songs.map((song, index) => (
              <div key={index} className="flex items-center justify-between border-b pb-2 last:border-0">
                <Link 
                  to={`/music/artist/${artist.id}/${slugify(song.title)}`}
                  className="text-sm text-black font-medium truncate max-w-[150px] hover:text-[#008751] transition-colors"
                >
                  {song.title}
                </Link>
                <div className="flex items-center space-x-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-7 w-7 rounded-full text-[#008751] hover:bg-[#008751]/10"
                    onClick={() => playSong(song)}
                  >
                    <Play size={15} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-7 w-7 rounded-full text-[#008751] hover:bg-[#008751]/10"
                    onClick={() => addSongToQueue(song)}
                  >
                    <Plus size={15} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-2">
            <Link 
              to={`/music/artist/${artist.id}`} 
              className="w-full block text-center py-2 bg-[#008751] text-white rounded-md hover:bg-[#008751]/90 transition-colors text-sm"
            >
              View All Songs
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
