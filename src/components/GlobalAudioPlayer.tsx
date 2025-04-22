import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  Play, Pause, SkipForward, SkipBack, 
  Repeat, Repeat1, Music, Volume2, Shuffle 
} from "lucide-react";

export type Song = {
  id: string;
  title: string;
  artist: string;
  youtube: string;
  thumbnail?: string;
};

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
  }
}

type GlobalAudioPlayerProps = {
  initialQueue?: Song[];
};

export const GlobalAudioPlayer = ({ initialQueue = [] }: GlobalAudioPlayerProps) => {
  const [queue, setQueue] = useState<Song[]>(initialQueue);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [volume, setVolume] = useState(70);
  const [repeatMode, setRepeatMode] = useState<'none' | 'all' | 'one'>('none');
  const [isShuffle, setIsShuffle] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);
  const youtubeIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (queue.length > 0 && currentIndex === -1) {
      setCurrentIndex(0);
    }
  }, [queue, currentIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        togglePlay();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPlaying]);

  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      console.log("YouTube API ready");
    };

    return () => {
    };
  }, []);

  const getYoutubeId = (url: string): string => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : "";
  };

  const play = (index: number) => {
    if (index >= 0 && index < queue.length) {
      setCurrentIndex(index);
      setIsPlaying(true);
      
      const videoId = getYoutubeId(queue[index].youtube);
      youtubeIdRef.current = videoId;
      
      if (audioRef.current) {
        audioRef.current.src = `https://www.youtube.com/embed/${videoId}`;
        audioRef.current.play();
      }
    }
  };

  const togglePlay = () => {
    if (currentIndex === -1 && queue.length > 0) {
      play(0);
    } else if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextSong = () => {
    if (queue.length === 0) return;
    
    let nextIndex: number;
    
    if (isShuffle) {
      const availableIndices = [...Array(queue.length).keys()].filter(i => i !== currentIndex);
      nextIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    } else {
      nextIndex = (currentIndex + 1) % queue.length;
    }
    
    play(nextIndex);
  };

  const prevSong = () => {
    if (queue.length === 0) return;
    
    let prevIndex: number;
    
    if (audioRef.current && audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0;
      return;
    } else if (isShuffle) {
      const availableIndices = [...Array(queue.length).keys()].filter(i => i !== currentIndex);
      prevIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    } else {
      prevIndex = (currentIndex - 1 + queue.length) % queue.length;
    }
    
    play(prevIndex);
  };

  const handleSongEnd = () => {
    if (repeatMode === 'one') {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    } else if (repeatMode === 'all' || queue.length > 1) {
      nextSong();
    } else {
      setIsPlaying(false);
    }
  };

  const toggleRepeatMode = () => {
    const modes: ('none' | 'all' | 'one')[] = ['none', 'all', 'one'];
    const currentIndex = modes.indexOf(repeatMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setRepeatMode(modes[nextIndex]);
  };

  const toggleShuffle = () => {
    setIsShuffle(!isShuffle);
  };

  const changePlaybackRate = () => {
    const rates = [0.5, 0.75, 1, 1.25, 1.5, 2];
    const currentIndex = rates.indexOf(playbackRate);
    const nextIndex = (currentIndex + 1) % rates.length;
    const newRate = rates[nextIndex];
    
    setPlaybackRate(newRate);
    if (audioRef.current) {
      audioRef.current.playbackRate = newRate;
    }
  };

  const handleVolumeChange = (newValue: number[]) => {
    const volumeValue = newValue[0];
    setVolume(volumeValue);
    if (audioRef.current) {
      audioRef.current.volume = volumeValue / 100;
    }
  };

  const addToQueue = (song: Song) => {
    setQueue(prev => [...prev, song]);
  };

  const playNow = (song: Song) => {
    const songIndex = queue.findIndex(s => s.id === song.id);
    
    if (songIndex !== -1) {
      play(songIndex);
    } else {
      setQueue(prev => [...prev, song]);
      play(queue.length);
    }
  };

  const removeFromQueue = (index: number) => {
    if (index === currentIndex) {
      nextSong();
    }
    
    setQueue(prev => {
      const newQueue = [...prev];
      newQueue.splice(index, 1);
      return newQueue;
    });
    
    if (index < currentIndex) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const moveInQueue = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return;
    
    const newQueue = [...queue];
    const [removed] = newQueue.splice(fromIndex, 1);
    newQueue.splice(toIndex, 0, removed);
    
    setQueue(newQueue);
    
    if (currentIndex === fromIndex) {
      setCurrentIndex(toIndex);
    } else if (
      (currentIndex > fromIndex && currentIndex <= toIndex) || 
      (currentIndex < fromIndex && currentIndex >= toIndex)
    ) {
      setCurrentIndex(
        currentIndex + (fromIndex < toIndex ? -1 : 1)
      );
    }
  };

  const currentSong = queue[currentIndex];

  return (
    <>
      <audio 
        ref={audioRef}
        onEnded={handleSongEnd}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      
      <Card className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 bg-black text-white border-afro-teal ${isExpanded ? 'h-80' : 'h-20'}`}>
        <CardContent className="p-0 h-full flex flex-col">
          <div className="flex items-center justify-between p-3 h-20">
            <div className="flex items-center flex-1 min-w-0">
              {currentSong ? (
                <>
                  {currentSong.thumbnail ? (
                    <img 
                      src={currentSong.thumbnail} 
                      alt={currentSong.title} 
                      className="w-12 h-12 rounded-md mr-3 object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-afro-teal/20 rounded-md flex items-center justify-center mr-3">
                      <Music className="w-6 h-6 text-afro-teal" />
                    </div>
                  )}
                  <div className="truncate mr-2">
                    <p className="font-medium text-sm truncate">{currentSong.title}</p>
                    <p className="text-xs text-gray-400 truncate">{currentSong.artist}</p>
                  </div>
                </>
              ) : (
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-afro-teal/20 rounded-md flex items-center justify-center mr-3">
                    <Music className="w-6 h-6 text-afro-teal" />
                  </div>
                  <p className="text-sm text-gray-400">No song selected</p>
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-center flex-1 space-x-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-white/10"
                onClick={toggleShuffle}
              >
                <Shuffle className={`h-5 w-5 ${isShuffle ? 'text-afro-teal' : 'text-gray-400'}`} />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon"
                className="text-white hover:bg-white/10"
                onClick={prevSong}
                disabled={queue.length === 0}
              >
                <SkipBack className="h-5 w-5" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon"
                className="bg-afro-yellow/90 text-black hover:bg-afro-yellow rounded-full h-10 w-10"
                onClick={togglePlay}
                disabled={queue.length === 0}
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5" />
                )}
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon"
                className="text-white hover:bg-white/10"
                onClick={nextSong}
                disabled={queue.length === 0}
              >
                <SkipForward className="h-5 w-5" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon"
                className="text-white hover:bg-white/10"
                onClick={toggleRepeatMode}
              >
                {repeatMode === 'one' ? (
                  <Repeat1 className="h-5 w-5 text-afro-teal" />
                ) : repeatMode === 'all' ? (
                  <Repeat className="h-5 w-5 text-afro-teal" />
                ) : (
                  <Repeat className="h-5 w-5 text-gray-400" />
                )}
              </Button>
            </div>
            
            <div className="flex items-center space-x-2 flex-1 justify-end">
              <Button 
                variant="ghost" 
                size="sm"
                className="text-xs text-gray-400 hover:bg-white/10"
                onClick={changePlaybackRate}
              >
                {playbackRate}x
              </Button>
              
              <div className="hidden sm:flex items-center space-x-2 w-24">
                <Volume2 className="h-4 w-4 text-gray-400" />
                <Slider
                  value={[volume]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={handleVolumeChange}
                  className="w-full"
                />
              </div>
              
              <Button 
                variant="ghost" 
                size="icon"
                className="text-white hover:bg-white/10"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <span className="sr-only">{isExpanded ? 'Collapse' : 'Expand'}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                >
                  <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
              </Button>
            </div>
          </div>
          
          {isExpanded && (
            <div className="p-4 overflow-y-auto flex-1">
              <h3 className="font-heading text-lg mb-2 text-afro-yellow">Queue</h3>
              {queue.length === 0 ? (
                <p className="text-gray-400 text-sm">Your queue is empty</p>
              ) : (
                <div className="space-y-2">
                  {queue.map((song, index) => (
                    <div 
                      key={`${song.id}-${index}`}
                      className={`flex items-center p-2 rounded-md ${index === currentIndex ? 'bg-afro-teal/20' : 'hover:bg-white/5'}`}
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 mr-2"
                        onClick={() => play(index)}
                      >
                        {index === currentIndex && isPlaying ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </Button>
                      <div className="flex-1 min-w-0 mr-2">
                        <p className={`truncate text-sm ${index === currentIndex ? 'text-afro-yellow' : 'text-white'}`}>
                          {song.title}
                        </p>
                        <p className="truncate text-xs text-gray-400">{song.artist}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/10"
                        onClick={() => removeFromQueue(index)}
                      >
                        <span className="sr-only">Remove</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className={`h-20 w-full ${isExpanded ? 'hidden' : 'block'}`}></div>
    </>
  );
};

export const useGlobalAudioPlayer = () => {
  const [globalPlayerState] = useState({
    addToQueue: (song: Song) => {
      const event = new CustomEvent('addToQueue', { detail: song });
      window.dispatchEvent(event);
    },
    playNow: (song: Song) => {
      const event = new CustomEvent('playNow', { detail: song });
      window.dispatchEvent(event);
    },
    clearQueue: () => {
      const event = new CustomEvent('clearQueue');
      window.dispatchEvent(event);
    }
  });
  
  return globalPlayerState;
};

export const GlobalAudioPlayerProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [queue, setQueue] = useState<Song[]>([]);
  
  useEffect(() => {
    const handleAddToQueue = (event: CustomEvent<Song>) => {
      setQueue(prev => [...prev, event.detail]);
    };
    
    const handlePlayNow = (event: CustomEvent<Song>) => {
      const song = event.detail;
      setQueue(prev => {
        const songIndex = prev.findIndex(s => s.id === song.id);
        
        if (songIndex !== -1) {
          const newQueue = [...prev];
          const [removed] = newQueue.splice(songIndex, 1);
          return [removed, ...newQueue];
        } else {
          return [song, ...prev];
        }
      });
    };
    
    const handleClearQueue = () => {
      setQueue([]);
    };

    window.addEventListener('addToQueue', handleAddToQueue as EventListener);
    window.addEventListener('playNow', handlePlayNow as EventListener);
    window.addEventListener('clearQueue', handleClearQueue);

    return () => {
      window.removeEventListener('addToQueue', handleAddToQueue as EventListener);
      window.removeEventListener('playNow', handlePlayNow as EventListener);
      window.removeEventListener('clearQueue', handleClearQueue);
    };
  }, []);
  
  return (
    <>
      {children}
      <GlobalAudioPlayer initialQueue={queue} />
    </>
  );
};
