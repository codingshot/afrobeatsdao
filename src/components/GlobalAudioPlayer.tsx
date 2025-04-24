
import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import QueueDrawer from "./QueueDrawer";
import { 
  Play, Pause, SkipForward, SkipBack, Volume2, VolumeX,
  Repeat, Repeat1, Share2, Music2, Maximize, Minimize, Video, VideoOff, List, ListCollapse
} from "lucide-react";
import { VIBE_VIDEOS } from "@/components/VibeOfTheDay";
import { useIsMobile } from "@/hooks/use-mobile";

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
  duration: number;
  currentTime: number;
  isDragging: boolean;
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
  const isMobile = useIsMobile();
  const [videoVisible, setVideoVisible] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingTitle, setLoadingTitle] = useState<string>("Loading...");
  const playerContainerRef = useRef<HTMLDivElement | null>(null);
  const [queueVisible, setQueueVisible] = useState(false);
  const [showPlayedSongs, setShowPlayedSongs] = useState(false);
  const [playedSongs, setPlayedSongs] = useState<Set<string>>(new Set());

  const toggleQueueVisibility = useCallback(() => {
    setQueueVisible(prev => !prev);
  }, []);

  useEffect(() => {
    if (youtubeApiLoaded && player && !currentSong) {
      const defaultVideo = getRandomVibeVideo();
      playNow({
        id: `default-vibe-${defaultVideo}`,
        youtube: defaultVideo
      });
    }
  }, [youtubeApiLoaded, player, currentSong]);

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
          height: '240',
          width: '426',
          playerVars: {
            playsinline: 1,
            controls: 1,
          },
          events: {
            onStateChange: (event: any) => {
              if (event.data === window.YT.PlayerState.ENDED) {
                setIsLoading(false);
                if (repeat) {
                  event.target.playVideo();
                } else {
                  nextSong();
                }
              } else if (event.data === window.YT.PlayerState.PLAYING) {
                setIsLoading(false);
                setIsPlaying(true);
                const videoData = event.target.getVideoData();
                if (videoData) {
                  setVideoTitle(videoData.title || "Unknown Title");
                  setChannelTitle(videoData.author || "Unknown Channel");
                }
                setDuration(event.target.getDuration());
              } else if (event.data === window.YT.PlayerState.PAUSED) {
                setIsLoading(false);
                setIsPlaying(false);
              } else if (event.data === window.YT.PlayerState.BUFFERING) {
                setIsLoading(true);
              }
            },
            onError: (event: any) => {
              console.error("YouTube player error:", event);
              setIsLoading(false);
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
  }, [youtubeApiLoaded]);

  useEffect(() => {
    if (!player || !isPlaying) return;

    const interval = setInterval(() => {
      if (player.getCurrentTime && !isDragging) {
        setCurrentTime(player.getCurrentTime());
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [player, isPlaying, isDragging]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTimeChange = (value: number) => {
    if (player && player.seekTo) {
      player.seekTo(value);
      setCurrentTime(value);
    }
  };

  const playNow = useCallback((song: Song) => {
    setIsLoading(true);
    setLoadingTitle(song.title || "Loading...");
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
        setIsLoading(false);
        if (previousVideoData) {
          console.log("Error playing video, reverting to previous video");
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

  const toggleVideo = useCallback(() => {
    setVideoVisible(prev => !prev);
  }, []);

  const toggleExpandedView = useCallback(() => {
    setExpandedView(prev => !prev);
  }, []);

  useEffect(() => {
    if (currentSong?.id) {
      setPlayedSongs(prev => new Set([...prev, currentSong.id]));
    }
  }, [currentSong]);

  return (
    <GlobalAudioPlayerContext.Provider value={{
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
      duration,
      currentTime,
      isDragging,
    }}>
      {children}
      <div 
        ref={playerContainerRef} 
        className="fixed bottom-[80px] right-4 z-[100] bg-black/95 border border-white/10 rounded-lg overflow-hidden shadow-xl"
        style={{
          display: expandedView ? 'block' : 'none',
          visibility: videoVisible ? 'visible' : 'hidden',
          position: 'fixed',
          ...(expandedView && !videoVisible ? { left: '-9999px' } : { right: '4px' })
        }}
      >
        <div id="youtube-player"></div>
      </div>

      <QueueDrawer 
        queue={queue}
        isVisible={queueVisible}
        playNow={playNow}
        reorderQueue={reorderQueue}
        playedSongs={playedSongs}
        showPlayedSongs={showPlayedSongs}
        setShowPlayedSongs={setShowPlayedSongs}
      />

      <div className="fixed bottom-0 left-0 right-0 bg-black/95 border-t border-white/10 backdrop-blur-lg text-white p-4 z-50">
        {currentSong || isLoading ? (
          <div className="max-w-7xl mx-auto flex flex-col gap-2">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 min-w-0 w-full sm:w-auto">
                <div className="flex-shrink-0">
                  <Music2 className="h-8 w-8 sm:h-10 sm:w-10 text-[#FFD600]" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-medium truncate">
                    {isLoading ? loadingTitle : videoTitle}
                  </h3>
                  <p className="text-xs text-gray-400 truncate">
                    {isLoading ? "Loading..." : channelTitle}
                  </p>
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
                  onClick={toggleQueueVisibility}
                  className={`${queueVisible ? "text-[#FFD600]" : "text-white"} hover:bg-white/10`}
                  title={queueVisible ? "Hide queue" : "Show queue"}
                >
                  {queueVisible ? <ListCollapse className="h-5 w-5" /> : <List className="h-5 w-5" />}
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleVideo}
                  className="text-white hover:bg-white/10"
                  title={videoVisible ? "Hide video" : "Show video"}
                >
                  {videoVisible ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                </Button>
                
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
                    className="cursor-pointer flex-1"
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

            <div className="flex items-center gap-2 w-full px-2">
              <span className="text-xs text-gray-400 min-w-[40px]">
                {formatTime(currentTime)}
              </span>
              <Slider
                value={[currentTime]}
                min={0}
                max={duration}
                step={1}
                onValueChange={([value]) => {
                  setCurrentTime(value);
                  setIsDragging(true);
                }}
                onValueCommit={([value]) => {
                  handleTimeChange(value);
                  setIsDragging(false);
                }}
                className="cursor-pointer flex-1"
              />
              <span className="text-xs text-gray-400 min-w-[40px]">
                {formatTime(duration)}
              </span>
            </div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Music2 className="h-8 w-8 text-[#FFD600]" />
              <span className="text-sm">Afrobeats Player</span>
            </div>
            <Button 
              onClick={() => {
                const defaultVideo = getRandomVibeVideo();
                playNow({
                  id: `default-vibe-${defaultVideo}`,
                  youtube: defaultVideo,
                  title: "Random Vibe"
                });
              }}
              className="bg-[#FFD600] text-black hover:bg-[#FFD600]/90"
            >
              <Play className="mr-2 h-4 w-4" />
              Play Something
            </Button>
          </div>
        )}
      </div>
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
