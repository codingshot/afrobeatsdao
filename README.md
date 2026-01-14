# AfrobeatsDAO

**URL**: https://lovable.dev/projects/d16edf1f-4126-499a-89e7-db99f81ad1c2

A comprehensive Afrobeats music platform featuring a global audio player, artist discovery, dance tutorials, event listings, and community features.

---

## Technology Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with shadcn/ui components
- **Routing**: React Router DOM v6
- **State Management**: React Context API
- **Audio**: YouTube IFrame API
- **Drag & Drop**: react-beautiful-dnd
- **Icons**: Lucide React
- **Animations**: Framer Motion

---

## Global Audio Player - Comprehensive Documentation

The Global Audio Player is a persistent, YouTube-powered music player that provides seamless audio playback across all pages of the application. It is implemented as a React Context provider that wraps the entire application.

### File Structure

```
src/components/
├── GlobalAudioPlayer.tsx    # Main player component & context provider
├── QueueDrawer.tsx          # Queue and history management drawer
├── MarkdownPreviewDialog.tsx # Export preview dialog
└── VibeOfTheDay.tsx         # Contains VIBE_VIDEOS array for random playback
```

---

### Core Architecture

#### Context Provider Pattern

The player uses React Context to provide global state and controls accessible from any component in the application.

```typescript
// Context type definition
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
```

#### Song Interface

```typescript
interface Song {
  id: string;        // Unique identifier for the song
  youtube: string;   // YouTube video URL or video ID
  title?: string;    // Optional display title
  artist?: string;   // Optional artist name
}
```

---

### State Management

#### Local Storage Persistence

The player persists the following state to `localStorage`:

| Key | Purpose |
|-----|---------|
| `afrobeats_current_song` | Currently playing song object |
| `afrobeats_queue` | Array of songs in the queue |
| `afrobeats_volume` | Volume level (0-100) |
| `afrobeats_repeat` | Repeat mode boolean |
| `afrobeats_played_songs` | Array of recently played song IDs |
| `afrobeats_video_visible` | Video visibility state boolean |

#### State Variables

| State | Type | Default | Description |
|-------|------|---------|-------------|
| `player` | any | null | YouTube player instance |
| `currentSong` | Song \| null | null | Currently playing song |
| `queue` | Song[] | [] | Queue of upcoming songs |
| `isPlaying` | boolean | false | Playback state |
| `volume` | number | 100 | Volume level (0-100) |
| `repeat` | boolean | false | Repeat mode |
| `youtubeApiLoaded` | boolean | false | YouTube API load state |
| `expandedView` | boolean | true | Player view mode |
| `videoTitle` | string | "Loading..." | Current video title from YouTube |
| `channelTitle` | string | "Loading..." | Channel name from YouTube |
| `previousVideoData` | Song \| null | null | Previous song for error recovery |
| `isMobile` | boolean | (detected) | Mobile device detection |
| `videoVisible` | boolean | false | Video player visibility |
| `duration` | number | 0 | Song duration in seconds |
| `currentTime` | number | 0 | Current playback position |
| `isDragging` | boolean | false | Seek slider drag state |
| `isLoading` | boolean | false | Loading state |
| `loadingTitle` | string | "Loading..." | Title shown during load |
| `queueVisible` | boolean | false | Queue drawer visibility |
| `showPlayedSongs` | boolean | false | Filter played songs in queue |
| `playedSongs` | Set\<string\> | new Set() | Set of played song IDs |
| `isInitialLoad` | boolean | true | Initial load flag |
| `thumbnailUrl` | string | "" | YouTube thumbnail URL |
| `showVolumeSlider` | boolean | false | Volume popup visibility (mobile) |

---

### Core Functions

#### `playNow(song: Song)`

Immediately plays a song, replacing the current track.

**Behavior:**
1. Sets loading state to true
2. Stores previous song for error recovery
3. Updates `currentSong` state
4. Sets `isPlaying` to true
5. Extracts video ID from YouTube URL
6. Calls `player.loadVideoById(videoId)`
7. Updates thumbnail URL

#### `addToQueue(song: Song)`

Adds a song to the end of the playback queue.

```typescript
const addToQueue = useCallback((song: Song) => {
  setQueue(prev => [...prev, song]);
}, []);
```

#### `removeFromQueue(songId: string)`

Removes a specific song from the queue by its ID.

```typescript
const removeFromQueue = useCallback((songId: string) => {
  setQueue(prev => prev.filter(song => song.id !== songId));
}, []);
```

#### `togglePlay()`

Toggles between play and pause states.

**Behavior:**
- If playing → calls `player.pauseVideo()`
- If paused → calls `player.playVideo()`
- Updates `isPlaying` state

#### `nextSong()`

Advances to the next song.

**Behavior:**
1. If queue has songs → plays first song in queue, removes from queue
2. If queue is empty → calls `findUnplayedSong()` to get a random vibe video

#### `previousSong()`

Seeks to the beginning of the current song.

```typescript
const previousSong = useCallback(() => {
  if (player) {
    player.seekTo(0);
  }
}, [player]);
```

#### `updateVolume(value: number)`

Sets the playback volume.

```typescript
const updateVolume = useCallback((value: number) => {
  if (player) {
    player.setVolume(value);
    setVolume(value);
  }
}, [player]);
```

#### `toggleRepeat()`

Toggles repeat mode on/off.

#### `reorderQueue(from: number, to: number)`

Reorders the queue via drag and drop.

```typescript
const reorderQueue = useCallback((from: number, to: number) => {
  setQueue(prev => {
    const newQueue = [...prev];
    const [removed] = newQueue.splice(from, 1);
    newQueue.splice(to, 0, removed);
    return newQueue;
  });
}, []);
```

#### `toggleVideo()`

Toggles YouTube video player visibility.

#### `toggleExpandedView()`

Toggles between expanded and collapsed player views.

#### `toggleQueueVisibility()`

Shows/hides the queue drawer.

---

### Helper Functions

#### `getVideoId(youtube: string)`

Extracts video ID from various YouTube URL formats.

**Supported formats:**
- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- Direct video ID string

```typescript
const getVideoId = useCallback((youtube: string): string => {
  if (youtube.includes('v=')) {
    return youtube.split('v=')[1].split('&')[0];
  } else if (youtube.includes('youtu.be/')) {
    return youtube.split('youtu.be/')[1].split('?')[0];
  }
  return youtube;
}, []);
```

#### `formatTime(seconds: number)`

Formats seconds into `MM:SS` display format.

```typescript
const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};
```

#### `getRandomVibeVideo(excludeId?: string)`

Returns a random video from `VIBE_VIDEOS` array, optionally excluding a specific ID.

```typescript
const getRandomVibeVideo = useCallback((excludeId?: string) => {
  const availableVideos = VIBE_VIDEOS.filter(id => id !== excludeId);
  const randomIndex = Math.floor(Math.random() * availableVideos.length);
  return availableVideos[randomIndex];
}, []);
```

#### `findUnplayedSong(currentId: string | undefined)`

Intelligently finds the next song to play.

**Algorithm:**
1. First, searches queue for unplayed songs
2. If all queue songs played, gets random vibe video
3. Tries up to 5 times to avoid recently played videos
4. Returns a Song object

---

### YouTube Integration

#### API Loading

The player dynamically loads the YouTube IFrame API:

```typescript
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
```

#### Player Initialization

```typescript
const newPlayer = new window.YT.Player('youtube-player', {
  height: '240',
  width: '426',
  playerVars: {
    playsinline: 1,
    controls: 1
  },
  events: {
    onStateChange: handleStateChange,
    onError: handleError,
    onReady: handleReady
  }
});
```

#### Event Handlers

**onStateChange:**
- `ENDED` → Plays next song or repeats current
- `PLAYING` → Updates metadata, sets duration
- `PAUSED` → Updates isPlaying state
- `BUFFERING` → Sets loading state

**onError:**
- Logs error to console
- Shows toast notification
- Adds failed song to end of queue
- Plays next song
- Falls back to previous video if available

**onReady:**
- Sets initial volume
- Loads saved current song if available

---

### Media Session API Integration

The player integrates with the browser's Media Session API for background playback control:

```typescript
useEffect(() => {
  if ('mediaSession' in navigator && currentSong) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: videoTitle || 'Unknown Title',
      artist: channelTitle || 'Unknown Artist',
      album: 'Afrobeats Player',
      artwork: [{ 
        src: thumbnailUrl || '/AfrobeatsDAOMeta.png', 
        sizes: '128x128', 
        type: 'image/png' 
      }]
    });
    
    navigator.mediaSession.setActionHandler('play', togglePlay);
    navigator.mediaSession.setActionHandler('pause', togglePlay);
    navigator.mediaSession.setActionHandler('previoustrack', previousSong);
    navigator.mediaSession.setActionHandler('nexttrack', nextSong);
  }
}, [currentSong, videoTitle, channelTitle, thumbnailUrl]);
```

---

### UI Layout

#### Positioning

The player is fixed to the bottom of the viewport:

```css
position: fixed;
bottom: 0;
left: 0;
right: 0;
z-index: 150;
```

#### Color Scheme

| Element | Color |
|---------|-------|
| Background | `bg-black/95` (95% opacity black) |
| Border | `border-white/10` (10% opacity white) |
| Text | `text-white` |
| Accent | `#FFD600` (Golden yellow) |
| Secondary text | `text-gray-400` |

#### Desktop Layout (3-column)

```
┌─────────────────────────────────────────────────────────────────────┐
│ [Thumbnail] Title          [<<][▶][>>][🔁]    [Queue][Video][🔊]━━━ │
│             Channel                                                  │
├─────────────────────────────────────────────────────────────────────┤
│ 0:00 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 3:45 │
└─────────────────────────────────────────────────────────────────────┘
```

**Column 1 (Left):** Song info with thumbnail, title, channel
**Column 2 (Center):** Playback controls (Previous, Play/Pause, Next, Repeat)
**Column 3 (Right):** Queue toggle, Video toggle, Volume controls

#### Mobile Layout (Vertical Stack)

```
┌─────────────────────────────────────────────┐
│ [Thumbnail] Title                    [Queue]│
│             Channel                         │
├─────────────────────────────────────────────┤
│ 0:00 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 3:45 │
├─────────────────────────────────────────────┤
│     [<<] [▶] [>>] [🔁] [🔊] [📹]          │
└─────────────────────────────────────────────┘
```

**Row 1:** Song info + Queue button
**Row 2:** Time slider with current/total time
**Row 3:** All controls centered

---

### Control Buttons

| Icon | Component | Action |
|------|-----------|--------|
| `<SkipBack />` | Previous | Seeks to start of song |
| `<Play />` / `<Pause />` | Play/Pause | Toggle playback |
| `<SkipForward />` | Next | Play next song |
| `<Repeat />` / `<Repeat1 />` | Repeat | Toggle repeat mode |
| `<List />` / `<ListCollapse />` | Queue | Toggle queue drawer |
| `<Video />` / `<VideoOff />` | Video | Toggle video visibility |
| `<Volume2 />` / `<VolumeX />` | Volume | Mute/unmute or show slider |

#### Active State Styling

Active controls use accent color: `text-[#FFD600]`

---

### Volume Control

#### Desktop

Horizontal slider inline with controls:

```typescript
<div className="w-24">
  <Slider 
    value={[volume]} 
    min={0} 
    max={100} 
    step={1} 
    onValueChange={([value]) => updateVolume(value)} 
  />
</div>
```

#### Mobile

Vertical popup slider on hover/tap:

```typescript
<div className="relative">
  <Button 
    onMouseEnter={() => setShowVolumeSlider(true)}
    onMouseLeave={() => setShowVolumeSlider(false)}
    onClick={() => setVolume(volume === 0 ? 100 : 0)}
  >
    {volume === 0 ? <VolumeX /> : <Volume2 />}
  </Button>
  {showVolumeSlider && (
    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2">
      <Slider orientation="vertical" className="h-16" ... />
    </div>
  )}
</div>
```

---

### Time/Seek Slider

#### Functionality

- Displays current position and total duration
- Drag to seek (sets `isDragging` state)
- Updates on release via `onValueCommit`

```typescript
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
/>
```

#### Time Update Loop

```typescript
useEffect(() => {
  if (!player || !isPlaying || isDragging) return;
  
  const interval = setInterval(() => {
    if (player.getCurrentTime) {
      setCurrentTime(player.getCurrentTime());
    }
  }, 1000);
  
  return () => clearInterval(interval);
}, [player, isPlaying, isDragging]);
```

---

### Video Player Container

The YouTube video is rendered in a positioned container:

```typescript
<div 
  ref={playerContainerRef} 
  className={`fixed z-[200] bg-black/95 border border-white/10 rounded-lg overflow-hidden shadow-xl ${
    isMobile 
      ? 'bottom-[100px] right-4 left-4' 
      : 'bottom-[80px] right-4'
  }`}
  style={{
    display: expandedView ? 'block' : 'none',
    visibility: videoVisible ? 'visible' : 'hidden',
    ...(expandedView && !videoVisible ? { left: '-9999px' } : {})
  }}
>
  <div id="youtube-player"></div>
</div>
```

**Desktop positioning:** Bottom right, above player bar
**Mobile positioning:** Full width with margins, above player bar

---

### Empty State

When no song is playing:

```typescript
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
```

---

### Queue Drawer Component

Location: `src/components/QueueDrawer.tsx`

#### Props

```typescript
interface QueueDrawerProps {
  queue: Song[];
  isVisible: boolean;
  playNow: (song: Song) => void;
  reorderQueue: (from: number, to: number) => void;
  playedSongs: Set<string>;
  showPlayedSongs: boolean;
  setShowPlayedSongs: (show: boolean) => void;
}
```

#### Features

1. **Tabs:** Queue / History switching
2. **Drag & Drop:** Reorder queue items
3. **Minimizable:** Collapse to small header
4. **Export:** Download queue/history as markdown

#### Layout

```
┌─────────────────────────────────────┐
│ [Queue] [History]           [—]     │
├─────────────────────────────────────┤
│                                     │
│ [≡] [Thumb] Title           [Played]│
│             Artist                  │
│                                     │
│ [≡] [Thumb] Title                   │
│             Artist                  │
│                                     │
│ [≡] [Thumb] Title                   │
│             Artist                  │
│                                     │
├─────────────────────────────────────┤
│     [📥 Export Queue]              │
└─────────────────────────────────────┘
```

#### Positioning

```css
position: fixed;
right: 4 (1rem);
bottom: 80px;
width: 350px;
z-index: 40;
```

#### Drag & Drop Implementation

Uses `react-beautiful-dnd`:

```typescript
<DragDropContext onDragEnd={handleDragEnd}>
  <Droppable droppableId="queue-drawer-droppable">
    {(provided) => (
      <div {...provided.droppableProps} ref={provided.innerRef}>
        {filteredQueue.map((song, index) => (
          <Draggable 
            key={`queue-drawer-item-${song.id}`} 
            draggableId={`queue-drawer-item-${song.id}`} 
            index={index}
          >
            {(provided) => (
              <div ref={provided.innerRef} {...provided.draggableProps}>
                <div {...provided.dragHandleProps}>
                  <MoveVertical />
                </div>
                {/* Song content */}
              </div>
            )}
          </Draggable>
        ))}
        {provided.placeholder}
      </div>
    )}
  </Droppable>
</DragDropContext>
```

#### Queue Item

```typescript
<div className="flex items-center gap-3 p-2 rounded-md hover:bg-accent/10 group">
  {/* Drag handle */}
  <div {...provided.dragHandleProps}>
    <MoveVertical className="h-4 w-4" />
  </div>
  
  {/* Thumbnail with play overlay */}
  <div className="relative w-16 h-12 rounded-md overflow-hidden">
    <img src={getVideoThumbnail(videoId)} />
    <Button 
      className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-black/50"
      onClick={() => playNow(song)}
    >
      <Play />
    </Button>
  </div>
  
  {/* Song info */}
  <div className="flex-1 min-w-0">
    <h4 className="font-medium text-sm truncate text-black">
      {song.title || "Title of video"}
    </h4>
    <p className="text-xs text-muted-foreground truncate">
      {song.artist || "Unknown Artist"}
    </p>
  </div>
  
  {/* Played badge */}
  {playedSongs.has(song.id) && (
    <Badge variant="outline">Played</Badge>
  )}
</div>
```

#### History Tab

Displays recently played songs (without drag & drop):

```typescript
{playedSongsList.map((song, index) => (
  <div key={`history-item-${song.id}`} className="flex items-center gap-3 p-2">
    {/* Same structure as queue item, without drag handle */}
  </div>
))}
```

#### Export Functionality

Generates markdown content for queue or history:

```typescript
const generateMarkdownContent = (tab: TabType) => {
  let content = "# Afrobeats Music History\n\n";
  
  if (tab === "queue") {
    content += "## Current Queue\n\n";
    filteredQueue.forEach((song, index) => {
      content += `${index + 1}. **${song.title}** - ${song.artist}\n`;
      content += `   - [Watch Video](https://www.youtube.com/watch?v=${videoId})\n\n`;
    });
  }
  // ... similar for history
  
  content += `Exported on ${new Date().toLocaleString()}\n`;
  return content;
};
```

Download function:

```typescript
const handleDownload = () => {
  const blob = new Blob([markdownContent], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = "afrobeats-queue.md";
  a.click();
  URL.revokeObjectURL(url);
};
```

#### Empty States

**Queue empty:**
```
[ListMusic icon]
Your queue is empty
Add songs from playlists
```

**History empty:**
```
[ListMusic icon]
No play history yet
Songs will appear here after playing
```

---

### Recently Played Tracking

The player tracks recently played songs to avoid repetition:

```typescript
const RECENTLY_PLAYED_LIMIT = 10;

useEffect(() => {
  if (currentSong?.id) {
    setPlayedSongs(prev => {
      const newSet = new Set([...prev, currentSong.id]);
      
      // Limit size to prevent unbounded growth
      if (newSet.size > RECENTLY_PLAYED_LIMIT * 2) {
        const array = Array.from(newSet);
        const newArray = array.slice(-RECENTLY_PLAYED_LIMIT);
        return new Set(newArray);
      }
      
      return newSet;
    });
  }
}, [currentSong]);
```

---

### Error Handling

```typescript
onError: (event: any) => {
  console.error("YouTube player error:", event);
  setIsLoading(false);
  
  if (currentSong) {
    // Show error toast
    toast({
      title: "Error playing song",
      description: "This song couldn't be played. Adding to end of queue and moving to next."
    });
    
    // Add failed song to end of queue for retry
    setQueue(prevQueue => [...prevQueue, currentSong]);
    
    // Play next song
    nextSong();
  } else if (previousVideoData) {
    // Revert to previous video
    setCurrentSong(previousVideoData);
    event.target.loadVideoById(previousVideoData.youtube);
  } else {
    setVideoTitle("Error loading video");
    setChannelTitle("Unknown");
  }
}
```

---

### Usage in Components

#### Accessing the Player Context

```typescript
import { useGlobalAudioPlayer } from '@/components/GlobalAudioPlayer';

const MyComponent = () => {
  const { playNow, addToQueue, isPlaying, togglePlay } = useGlobalAudioPlayer();
  
  const handlePlay = () => {
    playNow({
      id: 'song-123',
      youtube: 'dQw4w9WgXcQ',
      title: 'Song Title',
      artist: 'Artist Name'
    });
  };
  
  return <button onClick={handlePlay}>Play</button>;
};
```

#### Provider Setup (App.tsx)

```typescript
import { GlobalAudioPlayerProvider } from '@/components/GlobalAudioPlayer';

function App() {
  return (
    <GlobalAudioPlayerProvider>
      <Routes>
        {/* ... routes */}
      </Routes>
    </GlobalAudioPlayerProvider>
  );
}
```

---

### Thumbnail Handling

YouTube thumbnails are fetched using:

```typescript
const getVideoThumbnail = (videoId: string) => {
  return `https://img.youtube.com/vi/${videoId}/default.jpg`;
};
```

Fallback on error:

```typescript
<img 
  src={getVideoThumbnail(videoId)}
  onError={(e) => {
    e.currentTarget.src = "/AfrobeatsDAOMeta.png";
  }}
/>
```

---

### Dependencies

```json
{
  "react-beautiful-dnd": "^13.1.1",  // Drag & drop
  "lucide-react": "^0.462.0",         // Icons
  "@radix-ui/react-slider": "...",    // Slider component (via shadcn)
  "@radix-ui/react-tabs": "...",      // Tabs component (via shadcn)
  "@radix-ui/react-scroll-area": "...", // Scroll area (via shadcn)
  "@radix-ui/react-avatar": "..."     // Avatar component (via shadcn)
}
```

---

### TypeScript Global Declaration

```typescript
declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}
```

---

## How to Edit This Code

### Use Lovable

Simply visit the [Lovable Project](https://lovable.dev/projects/d16edf1f-4126-499a-89e7-db99f81ad1c2) and start prompting.

### Use Your Preferred IDE

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm i

# Start the development server
npm run dev
```

---

## Deployment

Open [Lovable](https://lovable.dev/projects/d16edf1f-4126-499a-89e7-db99f81ad1c2) and click on Share → Publish.

### Custom Domain

Navigate to Project > Settings > Domains and click Connect Domain.

Read more: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
