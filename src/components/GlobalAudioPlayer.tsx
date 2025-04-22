
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  Play, Pause, SkipForward, SkipBack, Volume2, VolumeX,
  Repeat, Repeat1, Share2, Music2 
} from "lucide-react";

// Add type declarations for the YouTube IFrame API
declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  youtube: string;
}

interface GlobalAudioPlayerContextType {
  currentSong: Song | null;
  queue: Song[];
  isPlaying: boolean;
  playNow: (song: Song) => void;
  addToQueue: (song: Song) => void;
  removeFromQueue: (songId: string) => void;
  togglePlay: () => void;
  nextSong: () => void;
  previousSong: () => void;
  setVolume: (value: number) => void;
  toggleRepeat: () => void;
  reorderQueue: (from: number, to: number) => void;
}

const GlobalAudioPlayerContext = createContext<GlobalAudioPlayerContextType | null>(null);

export const GlobalAudioPlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const [player, setPlayer] = useState<any>(null);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [queue, setQueue] = useState<Song[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(100);
  const [repeat, setRepeat] = useState(false);

  useEffect(() => {
    // Load YouTube API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      const newPlayer = new window.YT.Player('youtube-player', {
        height: '0',
        width: '0',
        events: {
          onStateChange: (event: any) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              if (repeat) {
                event.target.playVideo();
              } else {
                nextSong();
              }
            }
          },
        },
      });
      setPlayer(newPlayer);
    };
  }, []);

  const playNow = useCallback((song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    if (player && player.loadVideoById) {
      const videoId = song.youtube.split('=')[1] || song.youtube.split('/').pop();
      player.loadVideoById(videoId);
    }
  }, [player]);

  const addToQueue = useCallback((song: Song) => {
    setQueue(prev => [...prev, song]);
  }, []);

  const removeFromQueue = useCallback((songId: string) => {
    setQueue(prev => prev.filter(song => song.id !== songId));
  }, []);

  const togglePlay = useCallback(() => {
    if (player) {
      if (isPlaying) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying, player]);

  const nextSong = useCallback(() => {
    if (queue.length > 0) {
      const nextSong = queue[0];
      setQueue(prev => prev.slice(1));
      playNow(nextSong);
    }
  }, [queue, playNow]);

  const previousSong = useCallback(() => {
    // Restart current song
    if (player) {
      player.seekTo(0);
    }
  }, [player]);

  const updateVolume = useCallback((value: number) => {
    if (player) {
      player.setVolume(value);
      setVolume(value);
    }
  }, [player]);

  const toggleRepeat = useCallback(() => {
    setRepeat(prev => !prev);
  }, []);

  const reorderQueue = useCallback((from: number, to: number) => {
    setQueue(prev => {
      const newQueue = [...prev];
      const [removed] = newQueue.splice(from, 1);
      newQueue.splice(to, 0, removed);
      return newQueue;
    });
  }, []);

  return (
    <GlobalAudioPlayerContext.Provider
      value={{
        currentSong,
        queue,
        isPlaying,
        playNow,
        addToQueue,
        removeFromQueue,
        togglePlay,
        nextSong,
        previousSong,
        setVolume: updateVolume,
        toggleRepeat,
        reorderQueue,
      }}
    >
      {children}
      <div id="youtube-player"></div>
      {currentSong && (
        <div className="fixed bottom-0 left-0 right-0 bg-black/95 border-t border-white/10 backdrop-blur-lg text-white p-4 z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              <div className="flex-shrink-0">
                <Music2 className="h-10 w-10 text-[#FFD600]" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-medium truncate">{currentSong.title}</h3>
                <p className="text-xs text-gray-400 truncate">{currentSong.artist}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={previousSong}
                className="text-white hover:bg-white/10"
              >
                <SkipBack className="h-5 w-5" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={togglePlay}
                className="text-white hover:bg-white/10"
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={nextSong}
                className="text-white hover:bg-white/10"
              >
                <SkipForward className="h-5 w-5" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleRepeat}
                className={`${repeat ? "text-[#FFD600]" : "text-white"} hover:bg-white/10`}
              >
                {repeat ? <Repeat1 className="h-5 w-5" /> : <Repeat className="h-5 w-5" />}
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setVolume(volume === 0 ? 100 : 0)}
                className="text-white hover:bg-white/10"
              >
                {volume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </Button>
              
              <div className="w-24">
                <Slider
                  value={[volume]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={([value]) => updateVolume(value)}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </GlobalAudioPlayerContext.Provider>
  );
};

export const useGlobalAudioPlayer = () => {
  const context = useContext(GlobalAudioPlayerContext);
  if (!context) {
    throw new Error("useGlobalAudioPlayer must be used within a GlobalAudioPlayerProvider");
  }
  return context;
};
