import { createContext, useContext, useState, useEffect, useLayoutEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import QueueDrawer from "./QueueDrawer";
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Repeat, Repeat1, Share2, Music2, Maximize, Minimize, Video, VideoOff, List, ListCollapse, Sparkles } from "lucide-react";
import { VIBE_VIDEOS } from "@/components/VibeOfTheDay";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import { Avatar } from "@/components/ui/avatar";
import { getYoutubeVideoId } from "@/lib/youtubeVideoId";
import { collectRandomPlayableSongs, shuffleArray } from "@/lib/randomSongPool";
import {
  appendToQueueCapped,
  getPlayableVideoId,
  parseStoredQueue,
  parseStoredSong,
  reorderQueueSafe,
  MAX_QUEUE_LENGTH,
} from "@/lib/globalAudioPlayerSupport";
import { buildYoutubeArtwork, positionStateForMediaSession } from "@/lib/mediaSessionSupport";

/** Minimal typing for the iframe API surface we use */
export interface YoutubePlayerApi {
  destroy(): void;
  loadVideoById(id: string): void;
  playVideo(): void;
  pauseVideo(): void;
  seekTo(seconds: number, allowSeekAhead?: boolean): void;
  setVolume(v: number): void;
  getDuration(): number;
  getCurrentTime(): number;
  getVideoData(): { title?: string; author?: string };
}

interface YoutubePlayerStateEvent {
  data: number;
  target: YoutubePlayerApi;
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: {
      Player: new (elementId: string, options: Record<string, unknown>) => YoutubePlayerApi;
      PlayerState: {
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
        BUFFERING: number;
      };
    };
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
  /** Random track now + shuffled lineup prepended to the queue (I'm feeling lucky). */
  feelingLucky: () => void;
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

/** How many shuffled tracks to queue after the first random play. */
const FEELING_LUCKY_LINEUP = 14;

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
  const [player, setPlayer] = useState<YoutubePlayerApi | null>(null);
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

  const currentSongRef = useRef<Song | null>(null);
  const volumeRef = useRef(volume);
  const previousVideoDataRef = useRef<Song | null>(null);
  /** Avoid redundant loadVideoById when player instance + track unchanged. */
  const lastSyncedPlayerLoadRef = useRef<{ player: YoutubePlayerApi | null; key: string }>({
    player: null,
    key: "",
  });
  const persistTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const persistSnapshotRef = useRef({
    currentSong: null as Song | null,
    queue: [] as Song[],
    volume: 100,
    repeat: false,
    videoVisible: false,
    playedSongs: new Set<string>(),
    isInitialLoad: true,
  });
  const playerApiRef = useRef<YoutubePlayerApi | null>(null);
  const isPlayingRef = useRef(false);
  const pausedWhileHiddenTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  type MediaBridge = {
    togglePlay: () => void;
    nextSong: () => void;
    previousSong: () => void;
    seekBy: (deltaSec: number) => void;
    feelingLucky: () => void;
  };
  const noop = () => {};
  const mediaBridgeRef = useRef<MediaBridge>({
    togglePlay: noop,
    nextSong: noop,
    previousSong: noop,
    seekBy: () => {},
    feelingLucky: noop,
  });

  useEffect(() => {
    currentSongRef.current = currentSong;
  }, [currentSong]);

  useEffect(() => {
    playerApiRef.current = player;
  }, [player]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    volumeRef.current = volume;
  }, [volume]);

  useEffect(() => {
    previousVideoDataRef.current = previousVideoData;
  }, [previousVideoData]);

  // Hydrate from localStorage before passive effects (bootstrap / YouTube) read queue & currentSong.
  useLayoutEffect(() => {
    try {
      // Load volume
      const savedVolume = localStorage.getItem(STORAGE_KEYS.VOLUME);
      if (savedVolume) {
        const parsed = parseInt(savedVolume, 10);
        if (Number.isFinite(parsed)) {
          setVolume(Math.min(100, Math.max(0, parsed)));
        }
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

      const savedQueue = localStorage.getItem(STORAGE_KEYS.QUEUE);
      setQueue(parseStoredQueue(savedQueue));
      
      // Load played songs
      const savedPlayedSongs = localStorage.getItem(STORAGE_KEYS.PLAYED_SONGS);
      if (savedPlayedSongs) {
        try {
          const arr = JSON.parse(savedPlayedSongs) as unknown;
          if (Array.isArray(arr) && arr.every((x) => typeof x === "string")) {
            setPlayedSongs(new Set(arr));
          }
        } catch {
          /* ignore corrupt played history */
        }
      }
      
      const savedCurrentSong = localStorage.getItem(STORAGE_KEYS.CURRENT_SONG);
      const parsedSong = parseStoredSong(savedCurrentSong);
      if (parsedSong) {
        const vid = getPlayableVideoId(parsedSong.youtube);
        if (vid) {
          setCurrentSong(parsedSong);
          setLoadingTitle(parsedSong.title || "Loading...");
          setThumbnailUrl(`https://img.youtube.com/vi/${vid}/default.jpg`);
        } else {
          try {
            localStorage.removeItem(STORAGE_KEYS.CURRENT_SONG);
          } catch {
            /* ignore */
          }
        }
      }
    } catch (e) {
      console.error("Error loading saved player state:", e);
    }
  }, []);

  useEffect(() => {
    if (isInitialLoad) return;

    if (persistTimerRef.current) clearTimeout(persistTimerRef.current);
    persistTimerRef.current = setTimeout(() => {
      persistTimerRef.current = null;
      const p = persistSnapshotRef.current;
      if (p.isInitialLoad) return;
      try {
        if (p.currentSong) {
          localStorage.setItem(STORAGE_KEYS.CURRENT_SONG, JSON.stringify(p.currentSong));
        } else {
          localStorage.removeItem(STORAGE_KEYS.CURRENT_SONG);
        }

        localStorage.setItem(STORAGE_KEYS.QUEUE, JSON.stringify(p.queue));
        localStorage.setItem(STORAGE_KEYS.VOLUME, p.volume.toString());
        localStorage.setItem(STORAGE_KEYS.REPEAT, p.repeat.toString());
        localStorage.setItem(STORAGE_KEYS.VIDEO_VISIBLE, p.videoVisible.toString());
        localStorage.setItem(STORAGE_KEYS.PLAYED_SONGS, JSON.stringify(Array.from(p.playedSongs)));
      } catch (e) {
        console.error("Error saving player state:", e);
      }
    }, 320);

    return () => {
      if (persistTimerRef.current) {
        clearTimeout(persistTimerRef.current);
        persistTimerRef.current = null;
      }
    };
  }, [currentSong, queue, volume, repeat, videoVisible, playedSongs, isInitialLoad]);

  useEffect(() => {
    const flush = () => {
      const p = persistSnapshotRef.current;
      if (p.isInitialLoad) return;
      try {
        if (p.currentSong) {
          localStorage.setItem(STORAGE_KEYS.CURRENT_SONG, JSON.stringify(p.currentSong));
        } else {
          localStorage.removeItem(STORAGE_KEYS.CURRENT_SONG);
        }
        localStorage.setItem(STORAGE_KEYS.QUEUE, JSON.stringify(p.queue));
        localStorage.setItem(STORAGE_KEYS.VOLUME, p.volume.toString());
        localStorage.setItem(STORAGE_KEYS.REPEAT, p.repeat.toString());
        localStorage.setItem(STORAGE_KEYS.VIDEO_VISIBLE, p.videoVisible.toString());
        localStorage.setItem(STORAGE_KEYS.PLAYED_SONGS, JSON.stringify(Array.from(p.playedSongs)));
      } catch (e) {
        console.error("Error flushing player state:", e);
      }
    };
    window.addEventListener("pagehide", flush);
    return () => {
      window.removeEventListener("pagehide", flush);
      flush();
    };
  }, []);

  const toggleQueueVisibility = useCallback(() => {
    setQueueVisible((prev) => !prev);
  }, []);

  useEffect(() => {
    if (!queueVisible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setQueueVisible(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [queueVisible]);

  const getRandomVibeVideo = useCallback((excludeId?: string) => {
    const availableVideos = VIBE_VIDEOS.filter(id => id !== excludeId);
    const randomIndex = Math.floor(Math.random() * availableVideos.length);
    return availableVideos[randomIndex];
  }, []);

  const repeatRef = useRef(repeat);
  useEffect(() => {
    repeatRef.current = repeat;
  }, [repeat]);

  const nextSongRef = useRef<() => void>(() => {});

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

  const playNow = useCallback(
    (song: Song) => {
      const videoId = getPlayableVideoId(song.youtube);
      if (!videoId) {
        setIsLoading(false);
        toast({
          title: "Cannot play",
          description: "This track does not have a valid YouTube video link.",
        });
        return;
      }

      setIsLoading(true);
      setLoadingTitle(song.title || "Loading...");
      const prev = currentSongRef.current;
      if (prev) setPreviousVideoData(prev);
      setCurrentSong(song);
      setIsPlaying(true);

      if (player?.loadVideoById) {
        try {
          player.loadVideoById(videoId);
          lastSyncedPlayerLoadRef.current = {
            player,
            key: `${videoId}\0${song.id}`,
          };
          setThumbnailUrl(`https://img.youtube.com/vi/${videoId}/default.jpg`);
        } catch (e) {
          console.error("Error loading video:", e, song);
          setIsLoading(false);
          toast({
            title: "Error loading video",
            description: "Couldn't load the requested video. Trying next song.",
          });
          nextSongRef.current();
        }
      }
    },
    [player, toast]
  );

  // When the iframe becomes ready after playNow(...), or restore from storage set currentSong before player existed.
  useEffect(() => {
    if (!player?.loadVideoById || !currentSong?.youtube) return;
    const videoId = getPlayableVideoId(currentSong.youtube);
    if (!videoId) return;
    const key = `${videoId}\0${currentSong.id}`;
    if (
      lastSyncedPlayerLoadRef.current.player === player &&
      lastSyncedPlayerLoadRef.current.key === key
    ) {
      return;
    }
    lastSyncedPlayerLoadRef.current = { player, key };
    try {
      player.loadVideoById(videoId);
      setThumbnailUrl(`https://img.youtube.com/vi/${videoId}/default.jpg`);
      if (isPlaying) {
        player.playVideo();
      }
    } catch (e) {
      console.error("Error syncing video into YouTube player:", e, currentSong);
      setIsLoading(false);
      toast({
        title: "Error loading video",
        description: "Couldn't load the requested video. Trying next song.",
      });
      nextSongRef.current();
    }
  }, [player, currentSong, isPlaying, toast]);

  useEffect(() => {
    if (!youtubeApiLoaded || !player || currentSong) return;

    if (queue.length > 0) {
      const first = queue[0];
      setQueue((prev) => prev.slice(1));
      playNow(first);
      return;
    }

    const defaultVideo = getRandomVibeVideo();
    playNow({
      id: `default-vibe-${defaultVideo}`,
      youtube: defaultVideo,
    });
  }, [youtubeApiLoaded, player, currentSong, queue, playNow, getRandomVibeVideo]);

  const addToQueue = useCallback((song: Song) => {
    setQueue((prev) => appendToQueueCapped(prev, song, MAX_QUEUE_LENGTH));
  }, []);

  const feelingLucky = useCallback(() => {
    const pool = collectRandomPlayableSongs();
    if (pool.length === 0) {
      toast({
        title: "Nothing to play",
        description: "No tracks are available for random mode yet.",
      });
      return;
    }
    const shuffled = shuffleArray(pool);
    const first = shuffled[0] as Song;
    const lineup = shuffled.slice(1, 1 + FEELING_LUCKY_LINEUP) as Song[];
    playNow(first);
    setQueue((prev) => {
      const merged = [...lineup, ...prev];
      return merged.length > MAX_QUEUE_LENGTH ? merged.slice(0, MAX_QUEUE_LENGTH) : merged;
    });
    toast({
      title: "I'm feeling lucky",
      description: `Now playing ${first.title ?? "a random pick"}${first.artist ? ` · ${first.artist}` : ""}. ${lineup.length} more lined up next.`,
    });
  }, [playNow, toast]);

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
    const rawYt = currentSong?.youtube;
    const currentVideoId =
      currentId || (rawYt ? getYoutubeVideoId(rawYt) : undefined);
    
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
        currentSong?.youtube ? getYoutubeVideoId(currentSong.youtube) : undefined
      );
      playNow(nextSong);
    }
  }, [queue, playNow, findUnplayedSong, currentSong]);

  nextSongRef.current = nextSong;

  const previousSong = useCallback(() => {
    const p = player;
    if (!p?.seekTo || !p.getCurrentTime) return;
    try {
      const t = p.getCurrentTime();
      if (t > 3) {
        p.seekTo(0, true);
        setCurrentTime(0);
        return;
      }
      const prev = previousVideoDataRef.current;
      const vid = prev?.youtube ? getPlayableVideoId(prev.youtube) : null;
      if (prev && vid) {
        playNow(prev);
        return;
      }
      p.seekTo(0, true);
      setCurrentTime(0);
    } catch (e) {
      console.error("Error on previous track:", e);
    }
  }, [player, playNow]);

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

  const seekBy = useCallback((deltaSeconds: number) => {
    const p = player;
    if (!p?.getCurrentTime || !p.seekTo || !p.getDuration) return;
    try {
      const dur = p.getDuration();
      if (!Number.isFinite(dur) || dur <= 0) return;
      const t = p.getCurrentTime();
      const next = Math.min(Math.max(0, t + deltaSeconds), dur);
      p.seekTo(next, true);
      setCurrentTime(next);
    } catch (e) {
      console.error("Error seeking:", e);
    }
  }, [player]);

  const toggleRepeat = useCallback(() => {
    setRepeat(prev => !prev);
  }, []);

  const reorderQueue = useCallback((from: number, to: number) => {
    setQueue((prev) => {
      const next = reorderQueueSafe(prev, from, to);
      return next ?? prev;
    });
  }, []);

  useEffect(() => {
    if (!youtubeApiLoaded || !playerContainerRef.current) return;
    const YT = window.YT;
    if (!YT) return;

    let instance: YoutubePlayerApi | null = null;
    try {
      const origin = typeof window !== "undefined" ? window.location.origin : undefined;
      instance = new YT.Player("youtube-player", {
        height: "240",
        width: "426",
        playerVars: {
          playsinline: 1,
          controls: 1,
          ...(origin ? { origin } : {}),
        },
        events: {
          onStateChange: (event: YoutubePlayerStateEvent) => {
            if (event.data === YT.PlayerState.ENDED) {
              setIsLoading(false);
              if (repeatRef.current) {
                event.target.playVideo();
              } else {
                nextSongRef.current();
              }
            } else if (event.data === YT.PlayerState.PLAYING) {
              if (pausedWhileHiddenTimerRef.current) {
                clearTimeout(pausedWhileHiddenTimerRef.current);
                pausedWhileHiddenTimerRef.current = null;
              }
              setIsLoading(false);
              setIsPlaying(true);
              const videoData = event.target.getVideoData();
              if (videoData) {
                setVideoTitle(videoData.title || "Unknown Title");
                setChannelTitle(videoData.author || "Unknown Channel");
              }
              setDuration(event.target.getDuration());

              const yt = currentSongRef.current?.youtube || "";
              const videoId = getYoutubeVideoId(yt);
              if (videoId) {
                setThumbnailUrl(`https://img.youtube.com/vi/${videoId}/default.jpg`);
              }

              setIsInitialLoad((v) => (v ? false : v));
            } else if (event.data === YT.PlayerState.PAUSED) {
              setIsLoading(false);
              if (pausedWhileHiddenTimerRef.current) {
                clearTimeout(pausedWhileHiddenTimerRef.current);
                pausedWhileHiddenTimerRef.current = null;
              }
              if (typeof document !== "undefined" && document.hidden) {
                pausedWhileHiddenTimerRef.current = setTimeout(() => {
                  pausedWhileHiddenTimerRef.current = null;
                  setIsPlaying(false);
                }, 900);
              } else {
                setIsPlaying(false);
              }
            } else if (event.data === YT.PlayerState.BUFFERING) {
              setIsLoading(true);
            }
          },
          onError: (event: YoutubePlayerStateEvent) => {
            console.error("YouTube player error:", event);
            setIsLoading(false);

            const songNow = currentSongRef.current;
            if (songNow) {
              toast({
                title: "Error playing song",
                description: "This track could not be played. Skipping to the next item.",
              });
              nextSongRef.current();
            } else {
              const prev = previousVideoDataRef.current;
              const pv = prev?.youtube ? getPlayableVideoId(prev.youtube) : null;
              if (prev && pv) {
                setCurrentSong(prev);
                event.target.loadVideoById(pv);
              } else {
                setVideoTitle("Error loading video");
                setChannelTitle("Unknown");
              }
            }
          },
          onReady: (event: YoutubePlayerStateEvent) => {
            event.target.setVolume(volumeRef.current);
            // Initial cue/load is handled by the player↔currentSong sync effect so it runs after React state and refs are committed.
          },
        },
      });
      setPlayer(instance);
    } catch (e) {
      console.error("Error initializing YouTube player:", e);
    }

    return () => {
      if (pausedWhileHiddenTimerRef.current) {
        clearTimeout(pausedWhileHiddenTimerRef.current);
        pausedWhileHiddenTimerRef.current = null;
      }
      if (instance) {
        try {
          instance.destroy();
        } catch (e) {
          console.error("Error destroying player on unmount:", e);
        }
      }
    };
  }, [youtubeApiLoaded, toast]);

  useEffect(() => {
    if (!("mediaSession" in navigator)) return;
    const clear = (action: MediaSessionAction) => {
      try {
        navigator.mediaSession.setActionHandler(action, null);
      } catch {
        /* action unsupported */
      }
    };
    const b = () => mediaBridgeRef.current;
    try {
      navigator.mediaSession.setActionHandler("play", () => b().togglePlay());
      navigator.mediaSession.setActionHandler("pause", () => b().togglePlay());
      navigator.mediaSession.setActionHandler("previoustrack", () => b().previousSong());
      navigator.mediaSession.setActionHandler("nexttrack", () => b().nextSong());
      navigator.mediaSession.setActionHandler("seekbackward", (details?: MediaSessionActionDetails) => {
        const off = typeof details?.seekOffset === "number" ? details.seekOffset : 10;
        b().seekBy(-off);
      });
      navigator.mediaSession.setActionHandler("seekforward", (details?: MediaSessionActionDetails) => {
        const off = typeof details?.seekOffset === "number" ? details.seekOffset : 10;
        b().seekBy(off);
      });
    } catch (error) {
      console.error("Error registering Media Session handlers:", error);
    }
    try {
      navigator.mediaSession.setActionHandler("stop", () => {
        const p = playerApiRef.current;
        if (p?.pauseVideo) p.pauseVideo();
        setIsPlaying(false);
      });
    } catch {
      /* stop unsupported */
    }
    return () => {
      (
        [
          "play",
          "pause",
          "previoustrack",
          "nexttrack",
          "seekbackward",
          "seekforward",
          "stop",
        ] as MediaSessionAction[]
      ).forEach(clear);
    };
  }, []);

  useEffect(() => {
    if (!("mediaSession" in navigator)) return;
    if (!currentSong) {
      try {
        navigator.mediaSession.metadata = null;
        navigator.mediaSession.playbackState = "none";
      } catch {
        /* ignore */
      }
      return;
    }
    const vid = getPlayableVideoId(currentSong.youtube);
    const fallback =
      typeof window !== "undefined"
        ? `${window.location.origin}/AfrobeatsDAOMeta.png`
        : "https://afrobeats.party/AfrobeatsDAOMeta.png";
    const artSrc =
      thumbnailUrl && (thumbnailUrl.startsWith("http://") || thumbnailUrl.startsWith("https://"))
        ? thumbnailUrl
        : fallback;
    const art = buildYoutubeArtwork(vid, artSrc);
    try {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: videoTitle || currentSong.title || "Unknown Title",
        artist: channelTitle || currentSong.artist || "Unknown Artist",
        album: "Afrobeats.party",
        artwork: art,
      });
    } catch (error) {
      console.error("Error setting Media Session metadata:", error);
    }
  }, [currentSong, videoTitle, channelTitle, thumbnailUrl]);

  useEffect(() => {
    if (!("mediaSession" in navigator) || !currentSong) return;
    try {
      navigator.mediaSession.playbackState = isPlaying ? "playing" : "paused";
    } catch {
      /* ignore */
    }
  }, [isPlaying, currentSong]);

  useEffect(() => {
    if (!("mediaSession" in navigator) || !navigator.mediaSession.setPositionState) return;
    if (!currentSong || !isPlaying || isDragging) return;
    const ps = positionStateForMediaSession(duration, currentTime, 1);
    if (!ps) return;
    try {
      navigator.mediaSession.setPositionState(ps);
    } catch {
      /* duration may still be 0 on some tracks */
    }
  }, [currentSong, isPlaying, isDragging, duration, currentTime]);

  const toggleVideo = useCallback(() => {
    setVideoVisible(prev => !prev);
  }, []);

  const toggleExpandedView = useCallback(() => {
    setExpandedView(prev => !prev);
  }, []);

  useEffect(() => {
    if (!player || !isPlaying || isDragging) return;

    let intervalId: ReturnType<typeof setInterval>;

    const tick = () => {
      if (player.getCurrentTime) {
        try {
          setCurrentTime(player.getCurrentTime());
        } catch (e) {
          console.error("Error getting current time:", e);
        }
      }
    };

    const arm = () => {
      if (intervalId) clearInterval(intervalId);
      const ms = typeof document !== "undefined" && document.hidden ? 5000 : 1000;
      intervalId = setInterval(tick, ms);
    };

    arm();
    const onVis = () => arm();
    document.addEventListener("visibilitychange", onVis);

    return () => {
      document.removeEventListener("visibilitychange", onVis);
      if (intervalId) clearInterval(intervalId);
    };
  }, [player, isPlaying, isDragging]);

  /** When returning to the tab, nudge playback — mobile browsers often pause hidden embeds while audio may still be intended. */
  useEffect(() => {
    const onVis = () => {
      if (document.hidden) return;
      const p = playerApiRef.current;
      if (!p?.playVideo || !isPlayingRef.current) return;
      try {
        p.playVideo();
      } catch {
        /* ignore */
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

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

  mediaBridgeRef.current = {
    togglePlay,
    nextSong,
    previousSong,
    seekBy,
    feelingLucky,
  };

  persistSnapshotRef.current = {
    currentSong,
    queue,
    volume,
    repeat,
    videoVisible,
    playedSongs,
    isInitialLoad,
  };

  return <GlobalAudioPlayerContext.Provider value={{
    currentSong,
    queue,
    isPlaying,
    playNow,
    addToQueue,
    feelingLucky,
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
      {/* Video player container - positioned flush with top of player above song title */}
      <div ref={playerContainerRef} className={`fixed z-[200] bg-black/95 border border-white/10 rounded-lg overflow-hidden shadow-xl ${
        isMobile 
          ? 'bottom-[100px] right-4 left-4' 
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
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={toggleQueueVisibility}
                    className={`min-h-11 min-w-11 shrink-0 ${queueVisible ? "text-[#FFD600]" : "text-white"} hover:bg-white/10`}
                    title={queueVisible ? "Hide queue" : "Show queue"}
                    aria-label={queueVisible ? "Hide playback queue" : "Show playback queue"}
                    aria-expanded={queueVisible}
                  >
                    {queueVisible ? <ListCollapse className="h-5 w-5" aria-hidden /> : <List className="h-5 w-5" aria-hidden />}
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
                    max={duration > 0 ? duration : 1} 
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
                    aria-label="Seek in current track"
                  />
                  <span className="text-xs text-gray-400 min-w-[40px]">
                    {formatTime(duration)}
                  </span>
                </div>

                {/* Main Controls Row - Play/Pause, Previous, Next, Repeat, Volume, Video */}
                <div className="flex items-center justify-center gap-2 sm:gap-4">
                  <Button type="button" variant="ghost" size="icon" onClick={previousSong} className="min-h-11 min-w-11 text-white hover:bg-white/10" aria-label="Skip to start of track">
                    <SkipBack className="h-4 w-4" aria-hidden />
                  </Button>
                  
                  <Button type="button" variant="ghost" size="icon" onClick={togglePlay} className="min-h-11 min-w-11 text-white hover:bg-white/10" aria-label={isPlaying ? "Pause" : "Play"}>
                    {isPlaying ? <Pause className="h-5 w-5" aria-hidden /> : <Play className="h-5 w-5" aria-hidden />}
                  </Button>
                  
                  <Button type="button" variant="ghost" size="icon" onClick={nextSong} className="min-h-11 min-w-11 text-white hover:bg-white/10" aria-label="Next track">
                    <SkipForward className="h-4 w-4" aria-hidden />
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={feelingLucky}
                    className="min-h-11 min-w-11 text-[#FFD600] hover:bg-[#FFD600]/15"
                    title="I'm feeling lucky — random song + random queue"
                    aria-label="I'm feeling lucky — play a random song and queue more random tracks"
                  >
                    <Sparkles className="h-4 w-4" aria-hidden />
                  </Button>
                  
                  <Button type="button" variant="ghost" size="icon" onClick={toggleRepeat} className={`min-h-11 min-w-11 ${repeat ? "text-[#FFD600]" : "text-white"} hover:bg-white/10`} aria-label={repeat ? "Repeat one: on" : "Repeat: off"}>
                    {repeat ? <Repeat1 className="h-4 w-4" aria-hidden /> : <Repeat className="h-4 w-4" aria-hidden />}
                  </Button>

                  {/* Volume Control with Vertical Popup */}
                  <div className="relative">
                    <Button 
                      type="button"
                      variant="ghost" 
                      size="icon" 
                      className="min-h-11 min-w-11 text-white hover:bg-white/10"
                      onMouseEnter={() => setShowVolumeSlider(true)}
                      onMouseLeave={() => setShowVolumeSlider(false)}
                      onClick={() => setVolume(volume === 0 ? 100 : 0)}
                      aria-label={volume === 0 ? "Unmute" : "Mute"}
                    >
                      {volume === 0 ? <VolumeX className="h-4 w-4" aria-hidden /> : <Volume2 className="h-4 w-4" aria-hidden />}
                    </Button>
                    {showVolumeSlider && (
                      <div 
                        className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-black/90 p-2 rounded-lg"
                        onMouseEnter={() => setShowVolumeSlider(true)}
                        onMouseLeave={() => setShowVolumeSlider(false)}
                      >
                        <div className="h-20 w-6 flex items-center justify-center">
                          <Slider 
                            value={[volume]} 
                            min={0} 
                            max={100} 
                            step={1} 
                            orientation="vertical"
                            onValueChange={([value]) => updateVolume(value)} 
                            className="cursor-pointer h-16" 
                            aria-label="Volume"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <Button type="button" variant="ghost" size="icon" onClick={toggleVideo} className="min-h-11 min-w-11 text-white hover:bg-white/10" title={videoVisible ? "Hide video" : "Show video"} aria-label={videoVisible ? "Hide video player" : "Show video player"}>
                    {videoVisible ? <Video className="h-4 w-4" aria-hidden /> : <VideoOff className="h-4 w-4" aria-hidden />}
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
                    <Button type="button" variant="ghost" size="icon" onClick={previousSong} className="min-h-11 min-w-11 text-white hover:bg-white/10" aria-label="Skip to start of track">
                      <SkipBack className="h-5 w-5" aria-hidden />
                    </Button>
                    
                    <Button type="button" variant="ghost" size="icon" onClick={togglePlay} className="min-h-11 min-w-11 text-white hover:bg-white/10" aria-label={isPlaying ? "Pause" : "Play"}>
                      {isPlaying ? <Pause className="h-5 w-5" aria-hidden /> : <Play className="h-5 w-5" aria-hidden />}
                    </Button>
                    
                    <Button type="button" variant="ghost" size="icon" onClick={nextSong} className="min-h-11 min-w-11 text-white hover:bg-white/10" aria-label="Next track">
                      <SkipForward className="h-5 w-5" aria-hidden />
                    </Button>

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={feelingLucky}
                      className="min-h-11 min-w-11 text-[#FFD600] hover:bg-[#FFD600]/15"
                      title="I'm feeling lucky — random song + random queue"
                      aria-label="I'm feeling lucky — play a random song and queue more random tracks"
                    >
                      <Sparkles className="h-5 w-5" aria-hidden />
                    </Button>
                    
                    <Button type="button" variant="ghost" size="icon" onClick={toggleRepeat} className={`min-h-11 min-w-11 ${repeat ? "text-[#FFD600]" : "text-white"} hover:bg-white/10`} aria-label={repeat ? "Repeat one: on" : "Repeat: off"}>
                      {repeat ? <Repeat1 className="h-5 w-5" aria-hidden /> : <Repeat className="h-5 w-5" aria-hidden />}
                    </Button>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <Button type="button" variant="ghost" size="icon" onClick={toggleQueueVisibility} className={`min-h-11 min-w-11 ${queueVisible ? "text-[#FFD600]" : "text-white"} hover:bg-white/10`} title={queueVisible ? "Hide queue" : "Show queue"} aria-label={queueVisible ? "Hide playback queue" : "Show playback queue"} aria-expanded={queueVisible}>
                      {queueVisible ? <ListCollapse className="h-5 w-5" aria-hidden /> : <List className="h-5 w-5" aria-hidden />}
                    </Button>
                    
                    <Button type="button" variant="ghost" size="icon" onClick={toggleVideo} className="min-h-11 min-w-11 text-white hover:bg-white/10" title={videoVisible ? "Hide video" : "Show video"} aria-label={videoVisible ? "Hide video player" : "Show video player"}>
                      {videoVisible ? <Video className="h-5 w-5" aria-hidden /> : <VideoOff className="h-5 w-5" aria-hidden />}
                    </Button>
                    
                    <Button type="button" variant="ghost" size="icon" onClick={() => setVolume(volume === 0 ? 100 : 0)} className="min-h-11 min-w-11 text-white hover:bg-white/10" aria-label={volume === 0 ? "Unmute" : "Mute"}>
                      {volume === 0 ? <VolumeX className="h-5 w-5" aria-hidden /> : <Volume2 className="h-5 w-5" aria-hidden />}
                    </Button>
                    
                    <div className="w-24">
                      <Slider value={[volume]} min={0} max={100} step={1} onValueChange={([value]) => updateVolume(value)} className="cursor-pointer flex-1" aria-label="Volume" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full px-2">
                  <span className="text-xs text-gray-400 min-w-[40px]">
                    {formatTime(currentTime)}
                  </span>
                  <Slider value={[currentTime]} min={0} max={duration > 0 ? duration : 1} step={1} onValueChange={([value]) => {
                setCurrentTime(value);
                setIsDragging(true);
              }} onValueCommit={([value]) => {
                handleTimeChange(value);
                setIsDragging(false);
              }} className="cursor-pointer flex-1" aria-label="Seek in current track" />
                  <span className="text-xs text-gray-400 min-w-[40px]">
                    {formatTime(duration)}
                  </span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex items-center gap-4">
              <Music2 className="h-8 w-8 text-[#FFD600]" aria-hidden />
              <span className="text-sm">Afrobeats Player</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={feelingLucky}
                className="min-h-11 border-[#FFD600] text-[#FFD600] hover:bg-[#FFD600]/10"
                title="I'm feeling lucky — random song + random queue"
                aria-label="I'm feeling lucky — play a random song and queue more random tracks"
              >
                <Sparkles className="mr-2 h-4 w-4" aria-hidden />
                I&apos;m feeling lucky
              </Button>
              <Button
                type="button"
                onClick={() => {
              const defaultVideo = getRandomVibeVideo();
              playNow({
                id: `default-vibe-${defaultVideo}`,
                youtube: defaultVideo,
                title: "Random Vibe"
              });
            }}
                className="min-h-11 bg-[#FFD600] text-black hover:bg-[#FFD600]/90"
                aria-label="Play a random vibe video"
              >
              <Play className="mr-2 h-4 w-4" aria-hidden />
              Play Something
            </Button>
            </div>
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
