import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  Play, Pause, SkipForward, SkipBack, Volume2, VolumeX,
  Repeat, Repeat1, Share2, Music2, Maximize, Minimize
} from "lucide-react";
import { VIBE_VIDEOS } from "@/components/VibeOfTheDay";

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

export interface Song {
  id: string;
  youtube: string;
  title?: string;
  artist?: string;
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
  const [youtubeApiLoaded, setYoutubeApiLoaded] = useState(false);
  const [expandedView, setExpandedView] = useState(true);
  const [videoTitle, setVideoTitle] = useState<string>("Loading...");
  const [channelTitle, setChannelTitle] = useState<string>("Loading...");
  const [previousVideoData, setPreviousVideoData] = useState<Song | null>(null);
  const playerContainerRef = useRef<HTMLDivElement | null>(null);

  const getRandomVibeVideo = useCallback((excludeId?: string) => {
    const availableVideos = VIBE_VIDEOS.filter(id => id !== excludeId);
    const randomIndex = Math.floor(Math.random() * availableVideos.length);
    return availableVideos[randomIndex];
  }, []);

  useEffect(() => {
    if (!window.YT && !document.getElementById('youtube-iframe-api')) {
      const tag = document.createElement('script');
      tag.id = 'youtube-iframe-api';
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        setYoutubeApiLoaded(true);
      };
    } else if (window.YT) {
      setYoutubeApiLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (youtubeApiLoaded && playerContainerRef.current) {
      if (player) {
        try {
          player.destroy();
        } catch (e) {
          console.error("Error destroying player:", e);
        }
      }

      try {
        const newPlayer = new window.YT.Player('youtube-player', {
          height: expandedView ? '240' : '0',
          width: expandedView ? '426' : '0',
          events: {
            onStateChange: (event: any) => {
              if (event.data === window.YT.PlayerState.ENDED) {
                if (repeat) {
                  event.target.playVideo();
                } else {
                  nextSong();
                }
              } else if (event.data === window.YT.PlayerState.PLAYING) {
                setIsPlaying(true);
                const videoData = event.target.getVideoData();
                if (videoData) {
                  setVideoTitle(videoData.title || "Unknown Title");
                  setChannelTitle(videoData.author || "Unknown Channel");
                }
              } else if (event.data === window.YT.PlayerState.PAUSED) {
                setIsPlaying(false);
              }
            },
            onError: (event: any) => {
              console.error("YouTube player error:", event);
              if (previousVideoData) {
                console.log("Error playing video, reverting to previous video");
                setCurrentSong(previousVideoData);
                event.target.loadVideoById(previousVideoData.youtube);
              }
              setVideoTitle("Error loading video");
              setChannelTitle("Unknown");
            },
            onReady: (event: any) => {
              event.target.setVolume(volume);
              console.log("YouTube player ready");
            }
          },
        });
        setPlayer(newPlayer);
      } catch (e) {
        console.error("Error initializing YouTube player:", e);
      }
    }

    return () => {
      if (player) {
        try {
          player.destroy();
        } catch (e) {
          console.error("Error destroying player on unmount:", e);
        }
      }
    };
  }, [youtubeApiLoaded, expandedView]);

  useEffect(() => {
    if (player && player.setSize) {
      try {
        player.setSize(
          expandedView ? 426 : 0,
          expandedView ? 240 : 0
        );
      } catch (e) {
        console.error("Error resizing player:", e);
      }
    }
  }, [expandedView, player]);

  const playNow = useCallback((song: Song) => {
    if (currentSong) {
      setPreviousVideoData(currentSong);
    }
    setCurrentSong(song);
    setIsPlaying(true);
    if (player && player.loadVideoById) {
      try {
        let videoId;
        if (song.youtube.includes('v=')) {
          videoId = song.youtube.split('v=')[1].split('&')[0];
        } else if (song.youtube.includes('youtu.be/')) {
          videoId = song.youtube.split('youtu.be/')[1].split('?')[0];
        } else {
          videoId = song.youtube;
        }
        console.log("Loading video ID:", videoId);
        player.loadVideoById(videoId);
      } catch (e) {
        console.error("Error loading video:", e, song);
        if (previousVideoData) {
          console.log("Reverting to previous video");
          setCurrentSong(previousVideoData);
          player.loadVideoById(previousVideoData.youtube);
        }
      }
    }
  }, [player, currentSong, previousVideoData]);

  const addToQueue = useCallback((song: Song) => {
    setQueue(prev => [...prev, song]);
  }, []);

  const removeFromQueue = useCallback((songId: string) => {
    setQueue(prev => prev.filter(song => song.id !== songId));
  }, []);

  const togglePlay = useCallback(() => {
    if (player) {
      try {
        if (isPlaying) {
          player.pauseVideo();
        } else {
          player.playVideo();
        }
        setIsPlaying(!isPlaying);
      } catch (e) {
        console.error("Error toggling play state:", e);
      }
    }
  }, [isPlaying, player]);

  const nextSong = useCallback(() => {
    if (queue.length > 0) {
      const nextSong = queue[0];
      setQueue(prev => prev.slice(1));
      playNow(nextSong);
    } else {
      const currentVideoId = currentSong?.youtube.split('v=')[1]?.split('&')[0] || 
                           currentSong?.youtube.split('youtu.be/')[1]?.split('?')[0] || 
                           currentSong?.youtube;
      
      const newVibeVideo = getRandomVibeVideo(currentVideoId);
      playNow({
        id: `vibe-${newVibeVideo}`,
        youtube: newVibeVideo
      });
    }
  }, [queue, playNow, currentSong, getRandomVibeVideo]);

  const previousSong = useCallback(() => {
    if (player) {
      try {
        player.seekTo(0);
      } catch (e) {
        console.error("Error seeking to start:", e);
      }
    }
  }, [player]);

  const updateVolume = useCallback((value: number) => {
    if (player) {
      try {
        player.setVolume(value);
        setVolume(value);
      } catch (e) {
        console.error("Error setting volume:", e);
      }
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

  const toggleExpandedView = useCallback(() => {
    setExpandedView(prev => !prev);
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
      <div 
        ref={playerContainerRef} 
        className={`${expandedView ? 'block' : 'hidden'} fixed bottom-[80px] right-4 z-50 bg-black/95 border border-white/10 rounded-lg overflow-hidden shadow-xl`}
      >
        <div id="youtube-player"></div>
      </div>
      {currentSong && (
        <div className="fixed bottom-0 left-0 right-0 bg-black/95 border-t border-white/10 backdrop-blur-lg text-white p-4 z-50">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0 w-full sm:w-auto">
              <div className="flex-shrink-0">
                <Music2 className="h-8 w-8 sm:h-10 sm:w-10 text-[#FFD600]" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-medium truncate">{videoTitle}</h3>
                <p className="text-xs text-gray-400 truncate">{channelTitle}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
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

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
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
              
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleExpandedView}
                className="text-white hover:bg-white/10"
                title={expandedView ? "Collapse video" : "Show video"}
              >
                {expandedView ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
              </Button>
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
