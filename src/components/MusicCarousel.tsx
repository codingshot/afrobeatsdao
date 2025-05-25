import React, { useMemo, useRef, useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Play, List } from "lucide-react";
import { useGlobalAudioPlayer } from "@/components/GlobalAudioPlayer";
import { useToast } from "@/hooks/use-toast";
import { ARTISTS } from "@/data/artists";
import { Link } from "react-router-dom";
import { slugify } from "@/lib/slugUtils";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [currentTranslateX, setCurrentTranslateX] = useState(0);
  const animationRef = useRef<number>();

  // Get all songs from artists data and randomize them
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
    
    // Randomize the array using Fisher-Yates shuffle
    const shuffled = [...songs];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    return shuffled.slice(0, 20); // Show first 20 songs after randomization
  }, []);

  // Smooth continuous scrolling animation
  useEffect(() => {
    if (!isPaused && !isDragging && containerRef.current) {
      const animate = () => {
        setCurrentTranslateX(prev => {
          const newValue = prev - 0.5; // Adjust speed here
          const containerWidth = (allSongs.length * 324); // 300px width + 24px gap
          
          // Reset when we've scrolled past the first set
          if (Math.abs(newValue) >= containerWidth) {
            return 0;
          }
          return newValue;
        });
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused, isDragging, allSongs.length]);

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

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(containerRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - (containerRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2;
    const newScrollLeft = scrollLeft - walk;
    containerRef.current.scrollLeft = newScrollLeft;
    
    // Update the translate position based on manual scroll
    setCurrentTranslateX(-newScrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    setIsDragging(false);
  };

  return (
    <div className="bg-white py-6 overflow-hidden border-b-2 border-black relative px-6">
      <div 
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div 
          ref={containerRef}
          className={`flex gap-6 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} overflow-x-hidden`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          style={{ 
            userSelect: 'none',
            transform: `translateX(${currentTranslateX}px)`,
            transition: isDragging ? 'none' : 'transform 0.1s linear',
            width: 'fit-content'
          }}
        >
          {/* Duplicate songs for seamless loop */}
          {[...allSongs, ...allSongs].map((song, index) => (
            <div 
              key={`${song.id}-${index}`}
              className="flex items-center bg-gray-50 rounded-lg p-3 min-w-[300px] border hover:bg-gray-100 transition-colors gap-3 flex-shrink-0"
            >
              {/* Song thumbnail */}
              <Link 
                to={`/music/artist/${song.artistId}/${slugify(song.title.split(' ')[0])}`}
                className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md hover:opacity-80 transition-opacity"
                onClick={(e) => isDragging && e.preventDefault()}
              >
                <img 
                  src={getVideoThumbnail(song.youtube)} 
                  alt={song.title} 
                  className="h-full w-full object-cover" 
                  onError={handleImageError} 
                />
              </Link>

              {/* Song info next to thumbnail */}
              <div className="flex-1 min-w-0 h-12 flex flex-col justify-center">
                <Link 
                  to={`/music/artist/${song.artistId}/${slugify(song.title.split(' ')[0])}`}
                  className="font-semibold text-sm text-black truncate leading-tight hover:text-[#008751] transition-colors" 
                  title={song.title}
                  onClick={(e) => isDragging && e.preventDefault()}
                >
                  {song.title}
                </Link>
                <Link 
                  to={`/music/artist/${song.artistId}`}
                  className="text-xs text-gray-600 truncate leading-tight hover:text-[#008751] transition-colors"
                  onClick={(e) => isDragging && e.preventDefault()}
                >
                  {song.artist}
                </Link>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-1 ml-auto">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={(e) => {
                    e.preventDefault();
                    handlePlay(song);
                  }} 
                  className="h-8 w-8 text-[#008751] hover:text-[#008751]/90 hover:bg-[#008751]/10"
                >
                  <Play className="h-4 w-4" />
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddToQueue(song);
                  }} 
                  className="h-8 w-8 text-[#008751] hover:text-[#008751]/90 hover:bg-[#008751]/10"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* See Songs Button positioned at bottom center, overlapping the border with highest z-index */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-[9999]">
        <Link to="/music?tab=songs">
          <Button 
            variant="default"
            className="bg-black text-white hover:bg-gray-800 px-6 py-2 font-semibold border-2 border-black shadow-lg"
          >
            See Songs
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default MusicCarousel;
