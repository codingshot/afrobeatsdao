import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import QueueDrawer from "./QueueDrawer";
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Repeat, Repeat1, Share2, Music2, Maximize, Minimize, Video, VideoOff, List, ListCollapse } from "lucide-react";
import { VIBE_VIDEOS } from "@/components/VibeOfTheDay";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import { Avatar } from "@/components/ui/avatar";

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

// Local storage keys
const STORAGE_KEYS = {
  CURRENT_SONG: 'afrobeats_current_song',
  QUEUE: 'afrobeats_queue',
  VOLUME: 'afrobeats_volume',
  REPEAT: 'afrobeats_repeat',
  PLAYED_SONGS: 'afrobeats_played_songs',
  VIDEO_VISIBLE: 'afrobeats_video_visible'
};

// How many songs to remember as "recently played"
const RECENTLY_PLAYED_LIMIT = 10;

const GlobalAudioPlayerContext = createContext<GlobalAudioPlayerContextType | null>(null);

export const GlobalAudioPlayerProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
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
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    try {
      // Load volume
      const savedVolume = localStorage.getItem(STORAGE_KEYS.VOLUME);
      if (savedVolume) {
        setVolume(parseInt(savedVolume, 10));
      }
      
      // Load repeat setting
      const savedRepeat = localStorage.getItem(STORAGE_KEYS.REPEAT);
      if (savedRepeat) {
        setRepeat(savedRepeat === 'true');
      }
      
      // Load video visibility
      const savedVideoVisible = localStorage.getItem(STORAGE_KEYS.VIDEO_VISIBLE);
      if (savedVideoVisible) {
        setVideoVisible(savedVideoVisible === 'true');
      }

      // Load queue
      const savedQueue = localStorage.getItem(STORAGE_KEYS.QUEUE);
      if (savedQueue) {
        setQueue(JSON.parse(savedQueue));
      }
      
      // Load played songs
      const savedPlayedSongs = localStorage.getItem(STORAGE_KEYS.PLAYED_SONGS);
      if (savedPlayedSongs) {
        setPlayedSongs(new Set(JSON.parse(savedPlayedSongs)));
      }
      
      // Load current song
      const savedCurrentSong = localStorage.getItem(STORAGE_KEYS.CURRENT_SONG);
      if (savedCurrentSong) {
        const parsedSong = JSON.parse(savedCurrentSong);
        setCurrentSong(parsedSong);
        setLoadingTitle(parsedSong.title || "Loading...");
        
        // Set thumbnail URL for the saved song
        if (parsedSong.youtube) {
          const videoId = getVideoId(parsedSong.youtube);
          if (videoId) {
            setThumbnailUrl(`https://img.youtube.com/vi/${videoId}/default.jpg`);
          }
        }
      }
    } catch (e) {
      console.error("Error loading saved player state:", e);
    }
  }, []);

  useEffect(() => {
    if (isInitialLoad) return; // Skip on initial load
    
    try {
      if (currentSong) {
        localStorage.setItem(STORAGE_KEYS.CURRENT_SONG, JSON.stringify(currentSong));
      }
      
      localStorage.setItem(STORAGE_KEYS.QUEUE, JSON.stringify(queue));
      localStorage.setItem(STORAGE_KEYS.VOLUME, volume.toString());
      localStorage.setItem(STORAGE_KEYS.REPEAT, repeat.toString());
      localStorage.setItem(STORAGE_KEYS.VIDEO_VISIBLE, videoVisible.toString());
      
      // Convert Set to Array before saving
      localStorage.setItem(
        STORAGE_KEYS.PLAYED_SONGS, 
        JSON.stringify(Array.from(playedSongs))
      );
    } catch (e) {
      console.error("Error saving player state:", e);
    }
  }, [currentSong, queue, volume, repeat, videoVisible, playedSongs, isInitialLoad]);

  // Helper function to extract video ID from YouTube URL or ID string
  const getVideoId = useCallback((youtube: string): string => {
    if (youtube.includes('v=')) {
      return youtube.split('v=')[1].split('&')[0];
    } else if (youtube.includes('youtu.be/')) {
      return youtube.split('youtu.be/')[1].split('?')[0];
    }
    return youtube;
  }, []);

  const toggleQueueVisibility = useCallback(() => {
    console.log("Toggling queue visibility, current state:", queueVisible);
    setQueueVisible(prev => !prev);
  }, [queueVisible]);

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

  // Setup Media Session API for background playback control
  useEffect(() => {
    if ('mediaSession' in navigator && currentSong) {
      try {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: videoTitle || 'Unknown Title',
          artist: channelTitle || 'Unknown Artist',
          album: 'Afrobeats Player',
          artwork: [
            { 
              src: thumbnailUrl || '/AfrobeatsDAOMeta.png', 
              sizes: '128x128', 
              type: 'image/png' 
            }
          ]
        });
        
        // Set action handlers
        navigator.mediaSession.setActionHandler('play', togglePlay);
        navigator.mediaSession.setActionHandler('pause', togglePlay);
        navigator.mediaSession.setActionHandler('previoustrack', previousSong);
        navigator.mediaSession.setActionHandler('nexttrack', nextSong);
      } catch (error) {
        console.error("Error setting up Media Session:", error);
      }
    }
  }, [currentSong, videoTitle, channelTitle, thumbnailUrl]);

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
            controls: 1
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
                
                // Set thumbnail URL
                const videoId = getVideoId(currentSong?.youtube || "");
                if (videoId) {
                  setThumbnailUrl(`https://img.youtube.com/vi/${videoId}/default.jpg`);
                }
                
                // After first successful play, mark initial load as complete
                if (isInitialLoad) {
                  setIsInitialLoad(false);
                }
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
              
              if (currentSong) {
                const errorSong = {...currentSong};
                toast({
                  title: "Error playing song",
                  description: "This song couldn't be played. Adding to end of queue and moving to next."
                });
                
                setQueue(prevQueue => [...prevQueue, errorSong]);
                
                nextSong();
              } else if (previousVideoData) {
                console.log("Error playing video, reverting to previous video");
                setCurrentSong(previousVideoData);
                event.target.loadVideoById(previousVideoData.youtube);
              } else {
                setVideoTitle("Error loading video");
                setChannelTitle("Unknown");
              }
            },
            onReady: (event: any) => {
              event.target.setVolume(volume);
              console.log("YouTube player ready");
              
              // If we have a saved current song, load it
              if (currentSong && !isPlaying) {
                try {
                  event.target.loadVideoById(currentSong.youtube);
                  event.target.playVideo();
                } catch (e) {
                  console.error("Error loading saved video:", e);
                }
              }
            }
          }
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
        let videoId = getVideoId(song.youtube);
        console.log("Loading video ID:", videoId);
        player.loadVideoById(videoId);
        
        // Update thumbnail
        setThumbnailUrl(`https://img.youtube.com/vi/${videoId}/default.jpg`);
      } catch (e) {
        console.error("Error loading video:", e, song);
        setIsLoading(false);
        toast({
          title: "Error loading video",
          description: "Couldn't load the requested video. Trying next song."
        });
        nextSong();
      }
    }
  }, [player, currentSong, previousVideoData, getVideoId]);

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

  const findUnplayedSong = useCallback((currentId: string | undefined) => {
    // First try to find a song from queue that hasn't been played recently
    const unplayedQueueSong = queue.find(song => !playedSongs.has(song.id));
    if (unplayedQueueSong) {
      setQueue(prev => prev.filter(song => song.id !== unplayedQueueSong.id));
      return unplayedQueueSong;
    }
    
    // If no unplayed queue songs, get a random vibe video that hasn't been played
    const currentVideoId = currentId || 
                          currentSong?.youtube.split('v=')[1]?.split('&')[0] || 
                          currentSong?.youtube.split('youtu.be/')[1]?.split('?')[0] || 
                          currentSong?.youtube;
    
    // Find videos that haven't been played recently
    const recentlyPlayedIds = Array.from(playedSongs).slice(-RECENTLY_PLAYED_LIMIT);
    let vibeVideo = getRandomVibeVideo(currentVideoId);
    let attempts = 0;
    
    // Try to find a vibe video that hasn't been played recently
    while (recentlyPlayedIds.includes(`vibe-${vibeVideo}`) && attempts < 5) {
      vibeVideo = getRandomVibeVideo(currentVideoId);
      attempts++;
    }
    
    return {
      id: `vibe-${vibeVideo}`,
      youtube: vibeVideo
    };
  }, [queue, playedSongs, currentSong, getRandomVibeVideo]);

  const nextSong = useCallback(() => {
    if (queue.length > 0) {
      const nextSong = queue[0];
      setQueue(prev => prev.slice(1));
      playNow(nextSong);
    } else {
      const nextSong = findUnplayedSong(
        currentSong?.youtube.split('v=')[1]?.split('&')[0] || 
        currentSong?.youtube.split('youtu.be/')[1]?.split('?')[0] || 
        currentSong?.youtube
      );
      playNow(nextSong);
    }
  }, [queue, playNow, findUnplayedSong, currentSong]);

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
    if (!player || !isPlaying || isDragging) return;
    
    const interval = setInterval(() => {
      if (player.getCurrentTime) {
        try {
          const currentTime = player.getCurrentTime();
          setCurrentTime(currentTime);
        } catch (e) {
          console.error("Error getting current time:", e);
        }
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [player, isPlaying, isDragging]);

  useEffect(() => {
    if (currentSong?.id) {
      // Add current song to played songs
      setPlayedSongs(prev => {
        const newSet = new Set([...prev, currentSong.id]);
        
        // If we have too many played songs, remove the oldest ones
        if (newSet.size > RECENTLY_PLAYED_LIMIT * 2) {
          const array = Array.from(newSet);
          const newArray = array.slice(-RECENTLY_PLAYED_LIMIT);
          return new Set(newArray);
        }
        
        return newSet;
      });
    }
  }, [currentSong]);

  return <GlobalAudioPlayerContext.Provider value={{
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
    isDragging
  }}>
      {children}
      {/* Video player container - positioned flush with top of player on mobile */}
      <div ref={playerContainerRef} className={`fixed z-[200] bg-black/95 border border-white/10 rounded-lg overflow-hidden shadow-xl ${
        isMobile 
          ? 'bottom-[140px] right-4 left-4' 
          : 'bottom-[80px] right-4'
      }`} style={{
        display: expandedView ? 'block' : 'none',
        visibility: videoVisible ? 'visible' : 'hidden',
        ...(expandedView && !videoVisible ? {
          left: '-9999px'
        } : {})
      }}>
        <div id="youtube-player"></div>
      </div>

      <QueueDrawer queue={queue} isVisible={queueVisible} playNow={playNow} reorderQueue={reorderQueue} playedSongs={playedSongs} showPlayedSongs={showPlayedSongs} setShowPlayedSongs={setShowPlayedSongs} />

      {/* Audio player with improved mobile layout */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/95 border-t border-white/10 backdrop-blur-lg text-white p-3 z-[150]">
        {currentSong || isLoading ? (
          <div className="max-w-7xl mx-auto">
            {isMobile ? (
              // Mobile layout
              <div className="flex flex-col gap-3">
                {/* Title and Queue Button Row */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="flex-shrink-0">
                      {thumbnailUrl ? (
                        <Avatar className="h-8 w-8">
                          <img src={thumbnailUrl} alt="Thumbnail" className="object-cover w-full h-full" />
                        </Avatar>
                      ) : (
                        <Music2 className="h-8 w-8 text-[#FFD600]" />
                      )}
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
                  <Button variant="ghost" size="icon" onClick={toggleQueueVisibility} className={`${queueVisible ? "text-[#FFD600]" : "text-white"} hover:bg-white/10 flex-shrink-0`} title={queueVisible ? "Hide queue" : "Show queue"}>
                    {queueVisible ? <ListCollapse className="h-5 w-5" /> : <List className="h-5 w-5" />}
                  </Button>
                </div>

                {/* Time Slider */}
                <div className="flex items-center gap-2 w-full">
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

                {/* Controls Row */}
                <div className="flex items-center justify-center gap-4">
                  <Button variant="ghost" size="icon" onClick={previousSong} className="text-white hover:bg-white/10">
                    <SkipBack className="h-5 w-5" />
                  </Button>
                  
                  <Button variant="ghost" size="icon" onClick={togglePlay} className="text-white hover:bg-white/10">
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </Button>
                  
                  <Button variant="ghost" size="icon" onClick={nextSong} className="text-white hover:bg-white/10">
                    <SkipForward className="h-5 w-5" />
                  </Button>
                  
                  <Button variant="ghost" size="icon" onClick={toggleRepeat} className={`${repeat ? "text-[#FFD600]" : "text-white"} hover:bg-white/10`}>
                    {repeat ? <Repeat1 className="h-5 w-5" /> : <Repeat className="h-5 w-5" />}
                  </Button>
                </div>

                {/* Volume and Video Controls Row */}
                <div className="flex items-center justify-center gap-4">
                  {/* Volume Control with Vertical Popup */}
                  <div className="relative">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-white hover:bg-white/10"
                      onMouseEnter={() => setShowVolumeSlider(true)}
                      onMouseLeave={() => setShowVolumeSlider(false)}
                      onClick={() => setVolume(volume === 0 ? 100 : 0)}
                    >
                      {volume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                    </Button>
                    {showVolumeSlider && (
                      <div 
                        className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-black/90 p-2 rounded-lg"
                        onMouseEnter={() => setShowVolumeSlider(true)}
                        onMouseLeave={() => setShowVolumeSlider(false)}
                      >
                        <div className="h-24 w-8 flex items-center justify-center">
                          <Slider 
                            value={[volume]} 
                            min={0} 
                            max={100} 
                            step={1} 
                            orientation="vertical"
                            onValueChange={([value]) => updateVolume(value)} 
                            className="cursor-pointer h-20" 
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <Button variant="ghost" size="icon" onClick={toggleVideo} className="text-white hover:bg-white/10" title={videoVisible ? "Hide video" : "Show video"}>
                    {videoVisible ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                  </Button>
                </div>
              </div>
            ) : (
              // Desktop layout (keep existing)
              <div className="flex flex-col gap-2">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4 min-w-0 w-full sm:w-auto">
                    <div className="flex-shrink-0">
                      {thumbnailUrl ? (
                        <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                          <img src={thumbnailUrl} alt="Thumbnail" className="object-cover w-full h-full" />
                        </Avatar>
                      ) : (
                        <Music2 className="h-8 w-8 sm:h-10 sm:w-10 text-[#FFD600]" />
                      )}
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
                    <Button variant="ghost" size="icon" onClick={previousSong} className="text-white hover:bg-white/10">
                      <SkipBack className="h-5 w-5" />
                    </Button>
                    
                    <Button variant="ghost" size="icon" onClick={togglePlay} className="text-white hover:bg-white/10">
                      {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                    </Button>
                    
                    <Button variant="ghost" size="icon" onClick={nextSong} className="text-white hover:bg-white/10">
                      <SkipForward className="h-5 w-5" />
                    </Button>
                    
                    <Button variant="ghost" size="icon" onClick={toggleRepeat} className={`${repeat ? "text-[#FFD600]" : "text-white"} hover:bg-white/10`}>
                      {repeat ? <Repeat1 className="h-5 w-5" /> : <Repeat className="h-5 w-5" />}
                    </Button>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <Button variant="ghost" size="icon" onClick={toggleQueueVisibility} className={`${queueVisible ? "text-[#FFD600]" : "text-white"} hover:bg-white/10`} title={queueVisible ? "Hide queue" : "Show queue"}>
                      {queueVisible ? <ListCollapse className="h-5 w-5" /> : <List className="h-5 w-5" />}
                    </Button>
                    
                    <Button variant="ghost" size="icon" onClick={toggleVideo} className="text-white hover:bg-white/10" title={videoVisible ? "Hide video" : "Show video"}>
                      {videoVisible ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                    </Button>
                    
                    <Button variant="ghost" size="icon" onClick={() => setVolume(volume === 0 ? 100 : 0)} className="text-white hover:bg-white/10">
                      {volume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                    </Button>
                    
                    <div className="w-24">
                      <Slider value={[volume]} min={0} max={100} step={1} onValueChange={([value]) => updateVolume(value)} className="cursor-pointer flex-1" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full px-2">
                  <span className="text-xs text-gray-400 min-w-[40px]">
                    {formatTime(currentTime)}
                  </span>
                  <Slider value={[currentTime]} min={0} max={duration} step={1} onValueChange={([value]) => {
                setCurrentTime(value);
                setIsDragging(true);
              }} onValueCommit={([value]) => {
                handleTimeChange(value);
                setIsDragging(false);
              }} className="cursor-pointer flex-1" />
                  <span className="text-xs text-gray-400 min-w-[40px]">
                    {formatTime(duration)}
                  </span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Music2 className="h-8 w-8 text-[#FFD600]" />
              <span className="text-sm">Afrobeats Player</span>
            </div>
            <Button onClick={() => {
              const defaultVideo = getRandomVibeVideo();
              playNow({
                id: `default-vibe-${defaultVideo}`,
                youtube: defaultVideo,
                title: "Random Vibe"
              });
            }} className="bg-[#FFD600] text-black hover:bg-[#FFD600]/90">
              <Play className="mr-2 h-4 w-4" />
              Play Something
            </Button>
          </div>
        )}
      </div>
    </GlobalAudioPlayerContext.Provider>;
};

export const useGlobalAudioPlayer = () => {
  const context = useContext(GlobalAudioPlayerContext);
  if (!context) {
    throw new Error("useGlobalAudioPlayer must be used within a GlobalAudioPlayerProvider");
  }
  return context;
};
