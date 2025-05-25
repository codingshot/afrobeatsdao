
import React from 'react';
import { Button } from "@/components/ui/button";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { useGlobalAudioPlayer } from "@/components/GlobalAudioPlayer";
import { useToast } from "@/hooks/use-toast";
import { ARTISTS } from "@/data/artists";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ArtistsCarousel: React.FC = () => {
  const { playNow, addToQueue } = useGlobalAudioPlayer();
  const { toast } = useToast();

  const getVideoId = (url: string): string => {
    if (!url) return '';
    
    if (url.includes('v=')) {
      return url.split('v=')[1]?.split('&')[0] || '';
    } else if (url.includes('youtu.be/')) {
      return url.split('youtu.be/')[1]?.split('?')[0] || '';
    }
    
    return url;
  };

  const playArtistSongs = (artist: any) => {
    if (artist.top_songs.length === 0) return;
    
    // Shuffle the songs array
    const shuffledSongs = [...artist.top_songs].sort(() => Math.random() - 0.5);
    const [firstSong, ...restSongs] = shuffledSongs;
    
    if (firstSong) {
      const videoId = getVideoId(firstSong.youtube);
      playNow({
        id: `${artist.id}-${firstSong.title}`,
        youtube: videoId,
        title: firstSong.title,
        artist: artist.name
      });
      
      restSongs.forEach(song => {
        const videoId = getVideoId(song.youtube);
        addToQueue({
          id: `${artist.id}-${song.title}`,
          youtube: videoId,
          title: song.title,
          artist: artist.name
        });
      });
      
      toast({
        title: "Shuffling & Playing",
        description: `Playing ${artist.name}'s songs randomly`
      });
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "/AfrobeatsDAOMeta.png";
  };

  return (
    <div className="bg-white py-8 border-b-2 border-black relative">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-black">Featured Artists</h2>
          <Link to="/music?tab=artists">
            <Button className="bg-[#008751] text-white hover:bg-[#008751]/90">
              See All Artists
            </Button>
          </Link>
        </div>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {ARTISTS.slice(0, 12).map((artist) => (
              <CarouselItem key={artist.id} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors group">
                  <div className="relative aspect-square overflow-hidden rounded-md mb-3 group-hover:opacity-90 transition-opacity">
                    <img 
                      src={artist.image} 
                      alt={artist.name} 
                      className="w-full h-full object-cover"
                      onError={handleImageError}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => playArtistSongs(artist)}
                        className="h-12 w-12 bg-white/90 rounded-full text-[#008751] hover:bg-white hover:scale-110 transition-all"
                      >
                        <Play className="h-6 w-6 fill-current" />
                      </Button>
                    </div>
                  </div>
                  
                  <Link 
                    to={`/music/artist/${artist.id}`}
                    className="block text-center"
                  >
                    <h3 className="font-semibold text-black hover:text-[#008751] transition-colors truncate">
                      {artist.name}
                    </h3>
                  </Link>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg border-0">
            <ChevronLeft className="h-5 w-5" />
          </CarouselPrevious>
          
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg border-0">
            <ChevronRight className="h-5 w-5" />
          </CarouselNext>
        </Carousel>
      </div>
    </div>
  );
};

export default ArtistsCarousel;
