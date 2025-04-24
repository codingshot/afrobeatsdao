
import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import YouTube from "react-youtube";
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Mic2, MicOff, Maximize } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useIsClient } from "@/hooks/use-client";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Track {
  id: string;
  youtube: string;
  title: string;
  artist?: string;
}

interface GlobalAudioPlayerContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  isCameraOn: boolean;
  isAudioOn: boolean;
  playTrack: (index: number) => void;
  playNow: (track: Track) => void;
  togglePlay: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
  toggleMute: () => void;
  toggleCamera: () => void;
  toggleAudio: () => void;
  queue: Track[];
  addToQueue: (track: Track) => void;
  removeFromQueue: (trackId: string) => void;
}

const GlobalAudioPlayerContext = createContext<GlobalAudioPlayerContextType | undefined>(undefined);

export const useGlobalAudioPlayer = () => {
  const context = useContext(GlobalAudioPlayerContext);
  if (!context) {
    throw new Error("useGlobalAudioPlayer must be used within a GlobalAudioPlayerProvider");
  }
  return context;
};

export const GlobalAudioPlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [queue, setQueue] = useState<Track[]>([]);

  const playerRef = useRef<any>(null);
  const isClient = useIsClient();
  const isMobile = useIsMobile();

  const playTrack = (index: number) => {
    if (index >= 0 && index < queue.length) {
      setCurrentTrack(queue[index]);
      setQueue(queue.slice(index));
      setIsPlaying(true);
    }
  };

  const playNow = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    if (queue.length > 1) {
      const next = queue[1];
      setCurrentTrack(next);
      setQueue(queue.slice(1));
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };

  const prevTrack = () => {
    // TODO: Implement going to the previous track
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleCamera = () => {
    setIsCameraOn(!isCameraOn);
  };

  const toggleAudio = () => {
    setIsAudioOn(!isAudioOn);
  };

  const addToQueue = (track: Track) => {
    setQueue((prevQueue) => [...prevQueue, track]);
  };

  const removeFromQueue = (trackId: string) => {
    setQueue((prevQueue) => prevQueue.filter((track) => track.id !== trackId));
  };

  const youtubeOptions = {
    height: isMobile ? '200' : '390',
    width: isMobile ? '300' : '640',
    playerVars: {
      autoplay: isPlaying ? 1 : 0,
      playsinline: 1, // Mobile playback without fullscreen
    },
  };

  useEffect(() => {
    if (playerRef.current && currentTrack) {
      if (isPlaying) {
        playerRef.current.internalPlayer.playVideo();
      } else {
        playerRef.current.internalPlayer.pauseVideo();
      }
    }
  }, [isPlaying, currentTrack]);

  const value = {
    currentTrack,
    isPlaying,
    volume,
    isMuted,
    isCameraOn,
    isAudioOn,
    playTrack,
    playNow,
    togglePlay,
    nextTrack,
    prevTrack,
    setVolume,
    toggleMute,
    toggleCamera,
    toggleAudio,
    queue,
    addToQueue,
    removeFromQueue,
  };

  return (
    <GlobalAudioPlayerContext.Provider value={value}>
      {children}
      {currentTrack && (
        <div className="fixed bottom-0 left-0 right-0 bg-black/90 text-white p-4 backdrop-blur-lg border-t border-white/10">
          <div className="container mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {currentTrack.artist && <div className="text-sm">{currentTrack.artist}</div>}
              <div className="font-bold">{currentTrack.title}</div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
                onClick={prevTrack}
                disabled={true}
              >
                <SkipBack className="h-5 w-5" />
                <span className="sr-only">Previous</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
                onClick={togglePlay}
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                <span className="sr-only">{isPlaying ? "Pause" : "Play"}</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
                onClick={nextTrack}
              >
                <SkipForward className="h-5 w-5" />
                <span className="sr-only">Next</span>
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
                onClick={toggleMute}
              >
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                <span className="sr-only">Toggle Mute</span>
              </Button>

              <Slider
                defaultValue={[volume]}
                max={100}
                step={1}
                onValueChange={handleVolumeChange}
                aria-label="volume"
                className="w-24 md:w-32"
              />

              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
                onClick={toggleCamera}
                disabled={true}
              >
                {isCameraOn ? <Mic2 className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                <span className="sr-only">Toggle Camera</span>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
                onClick={toggleAudio}
                disabled={true}
              >
                {isAudioOn ? <Mic2 className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                <span className="sr-only">Toggle Audio</span>
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/10"
                  >
                    <Maximize className="h-5 w-5" />
                    <span className="sr-only">Expand Queue</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-black/95 text-white border-white/10">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Up Next</DialogTitle>
                  </DialogHeader>
                  <div className="mt-4 space-y-4 max-h-[60vh] overflow-y-auto">
                    {queue.map((track, index) => (
                      <div
                        key={`${track.id}-${index}`}
                        className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="font-medium">{track.title}</h4>
                            {track.artist && <p className="text-sm text-gray-400">{track.artist}</p>}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-white hover:bg-white/10"
                          onClick={() => playTrack(index)}
                        >
                          <Play className="h-4 w-4" />
                          <span className="sr-only">Play</span>
                        </Button>
                      </div>
                    ))}
                    {queue.length === 0 && (
                      <div className="text-center py-8 text-gray-400">No tracks in queue</div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      )}
      {isClient && currentTrack && (
        <div className="hidden">
          <YouTube
            videoId={currentTrack.youtube}
            opts={youtubeOptions}
            ref={playerRef}
            onReady={(event) => {
              // Access to player in all event handlers via event.target
              playerRef.current = event.target;
            }}
            onStateChange={(event) => {
              if (event.data === 0) {
                nextTrack();
              }
            }}
            // Remove the onVolumeChange prop since it's not supported by the YouTube component
          />
        </div>
      )}
    </GlobalAudioPlayerContext.Provider>
  );
};
