import React, { useState, useMemo, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { Footer } from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, ExternalLink, Music2, Headphones, Youtube, Search, Filter, List, ArrowUp, ArrowDown, Shuffle, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGlobalAudioPlayer } from "@/components/GlobalAudioPlayer";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ListMusic, MoveVertical } from 'lucide-react';
import ArtistsList from "@/components/music/ArtistsList";

interface Playlist {
  id: string;
  title: string;
  platform: 'spotify' | 'apple' | 'youtube';
  image: string;
  url: string;
  description: string;
}

const PLAYLISTS: Playlist[] = [{
  id: "spotify1",
  title: "Afrobeats Essentials",
  platform: "spotify",
  image: "https://mosaic.scdn.co/640/ab67616d0000b2733b812c8a29a8015e6ea11e35ab67616d0000b2735c5d15730deab2e48e2ae493ab67616d0000b273bb7610dfa8b8b17b2af9e81a",
  url: "https://open.spotify.com/playlist/37i9dQZF1DX5lDwDtPVwBk",
  description: "The essential Afrobeats tracks you need to know."
}, {
  id: "apple1",
  title: "Afrobeats Workout",
  platform: "apple",
  image: "https://is1-ssl.mzstatic.com/image/thumb/AMPCollection112/v4/76/49/61/764961b7-b7d8-f23e-7ff3-0ed85b5aaafb/25766af5-0af9-4116-9b7e-2312c9192dcd.png/1200x1200bb.jpg",
  url: "https://music.apple.com/us/playlist/afrobeats-workout/pl.e5d7380c73494c51b93e069d73da835f",
  description: "High-energy Afrobeats tracks to fuel your workout."
}, {
  id: "youtube1",
  title: "Afrobeats Party Mix",
  platform: "youtube",
  image: "https://i.ytimg.com/vi/hvf_K273XIY/maxresdefault.jpg",
  url: "https://www.youtube.com/watch?v=hvf_K273XIY",
  description: "The ultimate Afrobeats party mix to get you dancing."
}, {
  id: "spotify2",
  title: "Amapiano Groove",
  platform: "spotify",
  image: "https://i.scdn.co/image/ab67706f00000003a82b27885e044affb4a639e6",
  url: "https://open.spotify.com/playlist/37i9dQZF1DWZjbJwJ3EDVc",
  description: "The best of Amapiano, South Africa's hottest sound."
}, {
  id: "apple2",
  title: "Afrobeats Rising",
  platform: "apple",
  image: "https://is1-ssl.mzstatic.com/image/thumb/AMPCollection123/v4/e6/49/59/e649591a-d322-4d3c-9f97-9096e57e8b8f/bd7f4ba7-7873-4f72-a6a5-e3aa9b2c9b0e.png/1200x1200bb.jpg",
  url: "https://music.apple.com/us/playlist/afrobeats-rising/pl.19fe319322b84abf93e47d2e95c78201",
  description: "Fresh new Afrobeats talent on the rise."
}, {
  id: "youtube2",
  title: "Chill Afrobeats",
  platform: "youtube",
  image: "https://i.ytimg.com/vi/ul_Iy9HC0GE/maxresdefault.jpg",
  url: "https://www.youtube.com/watch?v=ul_Iy9HC0GE",
  description: "Relaxing Afrobeats for your chill sessions."
}, {
  id: "spotify3",
  title: "Afrobeats Dance Hits",
  platform: "spotify",
  image: "https://i.scdn.co/image/ab67706c0000da84fd0977be867a43a315e60e54",
  url: "https://open.spotify.com/playlist/4gTHcOTvHhr1nMFvTn9lZq",
  description: "The most danceable Afrobeats tracks of the moment."
}, {
  id: "apple3",
  title: "Amapiano Essentials",
  platform: "apple",
  image: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/c9/36/20/c9362006-9a28-4a74-b401-a2368b0afa58/196922028953_Cover.jpg/1200x1200bb.jpg",
  url: "https://music.apple.com/us/playlist/amapiano-essentials/pl.6bf4566575bc4c11b8a977cd5de77f8b",
  description: "Essential tracks from the Amapiano movement."
}, {
  id: "youtube3",
  title: "Afrobeats Live Mix",
  platform: "youtube",
  image: "https://i.ytimg.com/vi/WXgfbrxF8Bc/maxresdefault.jpg",
  url: "https://www.youtube.com/watch?v=WXgfbrxF8Bc",
  description: "Live DJ mix of the hottest Afrobeats tracks."
}];

const Playlists = () => {
  console.log("Playlists component rendering");

  let audioPlayerContext;
  try {
    audioPlayerContext = useGlobalAudioPlayer();
    console.log("GlobalAudioPlayer context successfully obtained");
  } catch (error) {
    console.error("Error using GlobalAudioPlayer:", error);
    audioPlayerContext = {
      playNow: () => console.log("Mock playNow called"),
      addToQueue: () => console.log("Mock addToQueue called"),
      queue: []
    };
  }
  const {
    playNow,
    addToQueue,
    queue,
    currentSong,
    reorderQueue
  } = audioPlayerContext;
  const {
    toast
  } = useToast();

  useEffect(() => {
    console.log("Playlists component mounted");
    return () => console.log("Playlists component unmounted");
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [queueVisible, setQueueVisible] = useState(true);
  const [sortMode, setSortMode] = useState<"default" | "asc" | "desc">("default");
  const [showPlayedSongs, setShowPlayedSongs] = useState(false);
  const [playedSongs, setPlayedSongs] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (currentSong?.id) {
      setPlayedSongs(prev => new Set([...prev, currentSong.id]));
    }
  }, [currentSong]);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "/AfrobeatsDAOMeta.png";
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'spotify':
        return <Headphones className="h-5 w-5" />;
      case 'apple':
        return <Music2 className="h-5 w-5" />;
      case 'youtube':
        return <Youtube className="h-5 w-5" />;
      default:
        return <Music2 className="h-5 w-5" />;
    }
  };

  const handleAddToQueue = (playlist: Playlist) => {
    if (playlist.platform === 'youtube') {
      const videoId = playlist.url.split('v=')[1] || playlist.url.split('youtu.be/')[1];
      addToQueue({
        id: playlist.id,
        youtube: videoId,
        title: playlist.title,
        artist: "Playlist"
      });
      toast({
        title: "Added to queue",
        description: `${playlist.title} will play next`
      });
    }
  };

  const handleSort = () => {
    if (sortMode === "default") setSortMode("asc");
    else if (sortMode === "asc") setSortMode("desc");
    else setSortMode("default");
  };

  const filteredPlaylists = useMemo(() => {
    let filtered = PLAYLISTS.filter(playlist => {
      const matchesSearch = playlist.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          playlist.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPlatform = platformFilter === "all" || playlist.platform === platformFilter;
      return matchesSearch && matchesPlatform;
    });
    
    filtered = filtered.sort((a, b) => {
      if (a.platform === 'youtube' && b.platform !== 'youtube') return -1;
      if (a.platform !== 'youtube' && b.platform === 'youtube') return 1;
      if (sortMode === "asc") return a.title.localeCompare(b.title);
      if (sortMode === "desc") return b.title.localeCompare(a.title);
      return 0;
    });
    
    return filtered;
  }, [searchQuery, platformFilter, sortMode]);

  const getVideoThumbnail = (videoId: string) => {
    return `https://img.youtube.com/vi/${videoId}/default.jpg`;
  };

  const getVideoIdFromUrl = (url: string): string => {
    if (url.includes('v=')) {
      return url.split('v=')[1]?.split('&')[0] || '';
    } else if (url.includes('youtu.be/')) {
      return url.split('youtu.be/')[1]?.split('?')[0] || '';
    }
    return url;
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    reorderQueue(result.source.index, result.destination.index);
  };

  const exportQueueAsMarkdown = () => {
    let markdownContent = "# Afrobeats Music Queue\n\n";
    
    markdownContent += "## Current Queue\n\n";
    if (filteredQueue.length === 0) {
      markdownContent += "*Queue is empty*\n\n";
    } else {
      filteredQueue.forEach((song, index) => {
        markdownContent += `${index + 1}. **${song.title || "Unknown Title"}** - ${song.artist || "Unknown Artist"}\n`;
        markdownContent += `   - Video ID: ${getVideoIdFromUrl(song.youtube)}\n`;
        markdownContent += `   - URL: https://www.youtube.com/watch?v=${getVideoIdFromUrl(song.youtube)}\n\n`;
      });
    }
    
    markdownContent += "## Play History\n\n";
    if (playedSongs.size === 0) {
      markdownContent += "*No play history*\n\n";
    } else {
      Array.from(playedSongs).forEach((id, index) => {
        const song = queue.find(s => s.id === id) || { id, youtube: id.replace('vibe-', ''), title: 'Previously played song', artist: '' };
        markdownContent += `${index + 1}. **${song.title || "Unknown Title"}** - ${song.artist || "Unknown Artist"}\n`;
        markdownContent += `   - Video ID: ${getVideoIdFromUrl(song.youtube)}\n`;
        markdownContent += `   - URL: https://www.youtube.com/watch?v=${getVideoIdFromUrl(song.youtube)}\n\n`;
      });
    }
    
    markdownContent += "---\n";
    markdownContent += `Exported on ${new Date().toLocaleString()}\n`;
    
    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "afrobeats-music-collection.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Export successful",
      description: "Music collection exported as markdown file"
    });
  };

  const filteredQueue = queue.filter(song => !showPlayedSongs || !playedSongs.has(song.id));

  const metaDescription = `Discover the best ${platformFilter === "all" ? "Afrobeats" : platformFilter} music playlists. ${filteredPlaylists.length} curated playlists featuring top African artists and trending songs.`;

  return (
    <>
      <Helmet>
        <title>African Music Playlists - Afrobeats & Amapiano Collections</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content="African Music Playlists - Discover Afrobeats & Amapiano" />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <meta name="keywords" content="afrobeats playlists, amapiano playlists, african music, spotify playlists, youtube playlists" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MusicPlaylist",
            "name": "African Music Playlists",
            "numTracks": filteredPlaylists.length,
            "description": metaDescription,
            "genre": ["Afrobeats", "Amapiano", "African Music"],
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background pt-4">
        <main className="container mx-auto px-4 py-4">
          <div className="flex flex-col items-center text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-heading font-extrabold mb-4 text-black">Afrobeats Music</h1>
            <p className="text-xl max-w-2xl mx-auto text-black/90">
              Listen to the top Afrobeats playlists, music, and artists
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 mb-6 w-full">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
              <Input 
                placeholder="Search playlists or artists..." 
                value={searchQuery} 
                onChange={e => setSearchQuery(e.target.value)} 
                className="pl-10 bg-white text-black w-full" 
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={platformFilter} onValueChange={setPlatformFilter}>
                <SelectTrigger className="w-[150px] bg-white text-black">
                  <SelectValue placeholder="Platform" />
                </SelectTrigger>
                <SelectContent className="bg-white text-black">
                  <SelectItem value="all">All Platforms</SelectItem>
                  <SelectItem value="spotify">Spotify</SelectItem>
                  <SelectItem value="apple">Apple Music</SelectItem>
                  <SelectItem value="youtube">YouTube</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" onClick={handleSort} className="flex items-center gap-1 min-w-[130px] bg-white text-black">
                {sortMode === "default" ? (
                  <>
                    <List className="h-4 w-4" />
                    <span>Default</span>
                  </>
                ) : sortMode === "asc" ? (
                  <>
                    <ArrowUp className="h-4 w-4" />
                    <span>A to Z</span>
                  </>
                ) : (
                  <>
                    <ArrowDown className="h-4 w-4" />
                    <span>Z to A</span>
                  </>
                )}
              </Button>
              
              <Button variant="outline" onClick={() => setQueueVisible(!queueVisible)} className="bg-white text-black">
                {queueVisible ? "Hide Queue" : "Show Queue"}
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div className={`col-span-1 md:col-span-2 lg:col-span-3 ${queueVisible ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
              <Tabs defaultValue="artists" className="w-full">
                <TabsList className="w-full grid grid-cols-2 mb-8 bg-white">
                  <TabsTrigger value="artists" className="text-black data-[state=active]:bg-[#008751] data-[state=active]:text-white">
                    Artists
                  </TabsTrigger>
                  <TabsTrigger value="playlists" className="text-black data-[state=active]:bg-[#008751] data-[state=active]:text-white">
                    Top Playlists
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="artists" className="mt-6">
                  <ArtistsList searchQuery={searchQuery} />
                </TabsContent>
                
                <TabsContent value="playlists" className="mt-6 space-y-4 w-full">
                  <AnimatePresence>
                    {filteredPlaylists.length > 0 ? filteredPlaylists.map(playlist => (
                      <motion.div 
                        key={playlist.id} 
                        initial={{ opacity: 0, y: 10 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, height: 0 }} 
                        transition={{ duration: 0.3 }} 
                        className="flex items-center gap-4 p-4 bg-white rounded-lg border hover:bg-accent/5 transition-colors w-full"
                      >
                        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                          <img 
                            src={playlist.image} 
                            alt={playlist.title} 
                            className="h-full w-full object-cover" 
                            onError={handleImageError} 
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="flex items-center gap-1.5 bg-white text-black">
                              {getPlatformIcon(playlist.platform)}
                              <span className="capitalize">{playlist.platform}</span>
                            </Badge>
                          </div>
                          <h3 className="text-lg font-semibold mt-1 text-black">{playlist.title}</h3>
                          <p className="text-sm text-black/70 line-clamp-2">
                            {playlist.description}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          {playlist.platform === 'youtube' ? (
                            <>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => playNow({
                                  id: playlist.id,
                                  youtube: playlist.url.split('v=')[1] || playlist.url.split('youtu.be/')[1],
                                  title: playlist.title,
                                  artist: "Playlist"
                                })} 
                                className="text-[#008751] hover:text-[#008751]/90 hover:bg-[#008751]/10"
                              >
                                <Play className="h-5 w-5" />
                              </Button>
                              
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => handleAddToQueue(playlist)} 
                                className="text-[#008751] hover:text-[#008751]/90 hover:bg-[#008751]/10"
                              >
                                <List className="h-5 w-5" />
                              </Button>
                            </>
                          ) : (
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              asChild 
                              className="text-[#008751] hover:text-[#008751]/90 hover:bg-[#008751]/10"
                            >
                              <a href={playlist.url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-5 w-5" />
                              </a>
                            </Button>
                          )}
                        </div>
                      </motion.div>
                    )) : (
                      <div className="text-center py-8">
                        <p className="text-lg text-black/70">No playlists found. Try adjusting your filters.</p>
                      </div>
                    )}
                  </AnimatePresence>
                </TabsContent>
              </Tabs>
            </div>
            
            {queueVisible && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                className="col-span-1 lg:col-span-1 sticky top-4"
              >
                <Card className="h-full border bg-white">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-black">Up Next</h3>
                        <Badge variant="outline" className="ml-2">
                          {filteredQueue.length}
                        </Badge>
                      </div>
                    </div>
                    
                    <Separator className="mb-4" />
                    
                    <ScrollArea className="h-[500px] pr-4">
                      {filteredQueue.length > 0 ? (
                        <DragDropContext onDragEnd={handleDragEnd}>
                          <Droppable droppableId="playlist-queue-droppable">
                            {provided => (
                              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
                                {filteredQueue.map((song, index) => {
                                  const videoId = getVideoIdFromUrl(song.youtube);
                                  return (
                                    <Draggable 
                                      key={`playlist-${song.id}`} 
                                      draggableId={`playlist-${song.id}`} 
                                      index={index}
                                    >
                                      {provided => (
                                        <div 
                                          ref={provided.innerRef} 
                                          {...provided.draggableProps} 
                                          className="flex items-center gap-3 p-2 rounded-md hover:bg-accent/10 group"
                                        >
                                          <div {...provided.dragHandleProps} className="text-gray-400 hover:text-gray-600 cursor-grab">
                                            <MoveVertical className="h-4 w-4" />
                                          </div>
                                          
                                          <div className="relative flex-shrink-0 w-16 h-12 rounded-md overflow-hidden">
                                            <img 
                                              src={getVideoThumbnail(videoId)} 
                                              alt={song.title || "Video thumbnail"} 
                                              className="w-full h-full object-cover" 
                                              onError={e => {
                                                e.currentTarget.src = "/AfrobeatsDAOMeta.png";
                                              }} 
                                            />
                                            <Button 
                                              variant="ghost" 
                                              size="icon" 
                                              className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-black/50 hover:bg-black/70 text-white" 
                                              onClick={() => playNow(song)}
                                            >
                                              <Play className="h-4 w-4" />
                                            </Button>
                                          </div>
                                          
                                          <div className="flex-1 min-w-0">
                                            <h4 className="font-medium text-sm truncate">
                                              {song.title || "Unknown Title"}
                                            </h4>
                                            <p className="text-xs text-muted-foreground truncate">
                                              {song.artist || "Unknown Artist"}
                                            </p>
                                          </div>
                                          
                                          {playedSongs.has(song.id) && (
                                            <Badge variant="outline" className="ml-auto">
                                              Played
                                            </Badge>
                                          )}
                                        </div>
                                      )}
                                    </Draggable>
                                  );
                                })}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                        </DragDropContext>
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          <ListMusic className="h-8 w-8 mx-auto mb-2 opacity-50" />
                          <p>Your queue is empty</p>
                          <p className="text-sm mt-2">Add songs from playlists</p>
                        </div>
                      )}
                    </ScrollArea>
                    
                    <Button 
                      variant="outline" 
                      className="w-full mt-4 flex items-center gap-2 bg-white text-black"
                      onClick={exportQueueAsMarkdown}
                    >
                      <Download className="h-4 w-4" />
                      Export Music Collection
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Playlists;
