
import React, { useState, useMemo } from 'react';
import { Footer } from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, ExternalLink, Music2, Headphones, Youtube, Search, Filter, List, ArrowUp, ArrowDown, Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGlobalAudioPlayer } from "@/components/GlobalAudioPlayer";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { FlippableAlbum } from "@/components/FlippableAlbum";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

interface Playlist {
  id: string;
  title: string;
  platform: 'spotify' | 'apple' | 'youtube';
  image: string;
  url: string;
  description: string;
}

interface Artist {
  id: string;
  name: string;
  image: string;
  country: string;
  popular_song: string;
  spotify_url?: string;
  youtube_id?: string;
}

const PLAYLISTS: Playlist[] = [
  {
    id: "spotify1",
    title: "Afrobeats Essentials",
    platform: "spotify",
    image: "https://mosaic.scdn.co/640/ab67616d0000b2733b812c8a29a8015e6ea11e35ab67616d0000b2735c5d15730deab2e48e2ae493ab67616d0000b2737d2ca0bc0cc6c94710f13a51ab67616d0000b273bb7610dfa8b8b17b2af9e81a",
    url: "https://open.spotify.com/playlist/37i9dQZF1DX5lDwDtPVwBk",
    description: "The essential Afrobeats tracks you need to know."
  },
  {
    id: "apple1",
    title: "Afrobeats Workout",
    platform: "apple",
    image: "https://is1-ssl.mzstatic.com/image/thumb/AMPCollection112/v4/76/49/61/764961b7-b7d8-f23e-7ff3-0ed85b5aaafb/25766af5-0af9-4116-9b7e-2312c9192dcd.png/1200x1200bb.jpg",
    url: "https://music.apple.com/us/playlist/afrobeats-workout/pl.e5d7380c73494c51b93e069d73da835f",
    description: "High-energy Afrobeats tracks to fuel your workout."
  },
  {
    id: "youtube1",
    title: "Afrobeats Party Mix",
    platform: "youtube",
    image: "https://i.ytimg.com/vi/hvf_K273XIY/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=hvf_K273XIY",
    description: "The ultimate Afrobeats party mix to get you dancing."
  },
  {
    id: "spotify2",
    title: "Amapiano Groove",
    platform: "spotify",
    image: "https://i.scdn.co/image/ab67706f00000003a82b27885e044affb4a639e6",
    url: "https://open.spotify.com/playlist/37i9dQZF1DWZjbJwJ3EDVc",
    description: "The best of Amapiano, South Africa's hottest sound."
  },
  {
    id: "apple2",
    title: "Afrobeats Rising",
    platform: "apple",
    image: "https://is1-ssl.mzstatic.com/image/thumb/AMPCollection123/v4/e6/49/59/e649591a-d322-4d3c-9f97-9096e57e8b8f/bd7f4ba7-7873-4f72-a6a5-e3aa9b2c9b0e.png/1200x1200bb.jpg",
    url: "https://music.apple.com/us/playlist/afrobeats-rising/pl.19fe319322b84abf93e47d2e95c78201",
    description: "Fresh new Afrobeats talent on the rise."
  },
  {
    id: "youtube2",
    title: "Chill Afrobeats",
    platform: "youtube",
    image: "https://i.ytimg.com/vi/ul_Iy9HC0GE/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=ul_Iy9HC0GE",
    description: "Relaxing Afrobeats for your chill sessions."
  },
  {
    id: "spotify3",
    title: "Afrobeats Dance Hits",
    platform: "spotify",
    image: "https://i.scdn.co/image/ab67706c0000da84fd0977be867a43a315e60e54",
    url: "https://open.spotify.com/playlist/4gTHcOTvHhr1nMFvTn9lZq",
    description: "The most danceable Afrobeats tracks of the moment."
  },
  {
    id: "apple3",
    title: "Amapiano Essentials",
    platform: "apple",
    image: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/c9/36/20/c9362006-9a28-4a74-b401-a2368b0afa58/196922028953_Cover.jpg/1200x1200bb.jpg",
    url: "https://music.apple.com/us/playlist/amapiano-essentials/pl.6bf4566575bc4c11b8a977cd5de77f8b",
    description: "Essential tracks from the Amapiano movement."
  },
  {
    id: "youtube3",
    title: "Afrobeats Live Mix",
    platform: "youtube",
    image: "https://i.ytimg.com/vi/WXgfbrxF8Bc/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=WXgfbrxF8Bc",
    description: "Live DJ mix of the hottest Afrobeats tracks."
  }
];

const TRENDING_ARTISTS: Artist[] = [
  {
    id: "artist1",
    name: "Burna Boy",
    image: "https://yt3.googleusercontent.com/UHxIQ_eSaVvuQXC9-9_KMQQlZoFXYKOZewWJlIC2vqe9qE3CddSr_l7cdFKOhVGQ_xkzAsui=s900-c-k-c0x00ffffff-no-rj",
    country: "Nigeria",
    popular_song: "Last Last",
    spotify_url: "https://open.spotify.com/artist/3wcj11K77LjEY1PkEazffa",
    youtube_id: "6xd4oIP6Uws"
  },
  {
    id: "artist2",
    name: "Tems",
    image: "https://yt3.googleusercontent.com/JdSAgciXGXVaKFJ9s8wDGS-Kcw_MTT-g9k7q87F9mYyWJTJYUM1E_-0NxBp-q1KXgZUwNsoE=s900-c-k-c0x00ffffff-no-rj",
    country: "Nigeria",
    popular_song: "Free Mind",
    spotify_url: "https://open.spotify.com/artist/687cZJR45JO7jhk1LHIbgq",
    youtube_id: "yaie5Uia4k8"
  },
  {
    id: "artist3",
    name: "Asake",
    image: "https://i0.wp.com/www.withinnigeria.com/wp-content/uploads/2022/09/Asake-ft-Burna-Boy-Sungba-Remix.jpg",
    country: "Nigeria",
    popular_song: "Sungba (Remix)",
    spotify_url: "https://open.spotify.com/artist/0mWIlRR5WVW6H8KBG0lUyl",
    youtube_id: "Sn0dNiKbyz4"
  },
  {
    id: "artist4",
    name: "Wizkid",
    image: "https://yt3.googleusercontent.com/ytc/AIf8zZQVVWD2LiCgQzpIXI4UkM0e3Lq0dWQ2TKc6qwjd=s900-c-k-c0x00ffffff-no-rj",
    country: "Nigeria",
    popular_song: "Essence",
    spotify_url: "https://open.spotify.com/artist/3tVQdUvClmAT7URs9V3rsp",
    youtube_id: "KkSOaV5h8r8"
  },
  {
    id: "artist5",
    name: "Ayra Starr",
    image: "https://images.genius.com/2a78ec7d134e3c31f7711c28760adff1.1000x1000x1.jpg",
    country: "Nigeria",
    popular_song: "Rush",
    spotify_url: "https://open.spotify.com/artist/09kHO4pHCfePbhutKuheQr",
    youtube_id: "HUiHKse-YgM"
  },
  {
    id: "artist6",
    name: "Uncle Waffles",
    image: "https://media.pitchfork.com/photos/6321aeb7203036c1089ad84f/master/pass/Uncle-Waffles.jpg",
    country: "South Africa",
    popular_song: "Tanzania",
    spotify_url: "https://open.spotify.com/artist/2C7xu0MSn3WBY9XIT9CWol",
    youtube_id: "MtQdhe_EH6Q"
  }
];

const Playlists = () => {
  const { playNow, addToQueue, queue } = useGlobalAudioPlayer();
  const { toast } = useToast();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [queueVisible, setQueueVisible] = useState(false);
  const [sortMode, setSortMode] = useState<"default" | "asc" | "desc">("default");
  
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "/AfrobeatsDAOMeta.png";
  };

  const playArtistSong = (artist: Artist) => {
    if (artist.youtube_id) {
      playNow({
        id: `artist-${artist.id}`,
        youtube: artist.youtube_id,
        title: artist.popular_song,
        artist: artist.name
      });
      
      toast({
        title: "Now playing",
        description: `${artist.popular_song} by ${artist.name}`,
      });
    }
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
        description: `${playlist.title} will play next`,
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
      const matchesSearch = 
        playlist.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        playlist.description.toLowerCase().includes(searchQuery.toLowerCase());
        
      const matchesPlatform = platformFilter === "all" || playlist.platform === platformFilter;
      
      return matchesSearch && matchesPlatform;
    });
    
    if (sortMode === "asc") {
      filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortMode === "desc") {
      filtered = [...filtered].sort((a, b) => b.title.localeCompare(a.title));
    }
    
    return filtered;
  }, [searchQuery, platformFilter, sortMode]);
  
  const filteredArtists = useMemo(() => {
    return TRENDING_ARTISTS.filter(artist => 
      artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist.popular_song.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-background pt-20">
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-heading font-extrabold mb-4">
            Afrobeats Playlists
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Discover the best curated Afrobeats playlists across major streaming platforms.
          </p>
          <meta name="description" content="Explore the best Afrobeats and Amapiano playlists from Spotify, Apple Music and YouTube. Stream African music featuring artists like Burna Boy, Wizkid, Tems, Asake, and more." />
          <meta name="keywords" content="afrobeats playlists, amapiano playlists, african music, spotify afrobeats, youtube afrobeats, apple music afrobeats, burna boy, wizkid, tems, asake" />
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search playlists or artists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={platformFilter} onValueChange={setPlatformFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Platforms</SelectItem>
                <SelectItem value="spotify">Spotify</SelectItem>
                <SelectItem value="apple">Apple Music</SelectItem>
                <SelectItem value="youtube">YouTube</SelectItem>
              </SelectContent>
            </Select>
            
            <Button 
              variant="outline" 
              onClick={handleSort}
              className="flex items-center gap-1 min-w-[130px]"
            >
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
            
            <Button 
              variant="outline" 
              onClick={() => setQueueVisible(!queueVisible)}
            >
              {queueVisible ? "Hide Queue" : "Show Queue"}
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          <div className={`col-span-1 md:col-span-2 lg:col-span-3 ${queueVisible ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
            <Tabs defaultValue="playlists" className="w-full">
              <TabsList className="w-full grid grid-cols-2 mb-8 bg-accent/10">
                <TabsTrigger 
                  value="playlists"
                  className="data-[state=active]:bg-[#008751] data-[state=active]:text-white"
                >
                  Top Playlists
                </TabsTrigger>
                <TabsTrigger 
                  value="artists"
                  className="data-[state=active]:bg-[#008751] data-[state=active]:text-white"
                >
                  Trending Artists
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="playlists" className="mt-6 space-y-4">
                <AnimatePresence>
                  {filteredPlaylists.length > 0 ? (
                    filteredPlaylists.map(playlist => (
                      <motion.div
                        key={playlist.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center gap-4 p-4 bg-card rounded-lg border hover:bg-accent/5 transition-colors"
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
                            <Badge variant="outline" className="flex items-center gap-1.5">
                              {getPlatformIcon(playlist.platform)}
                              <span className="capitalize">{playlist.platform}</span>
                            </Badge>
                          </div>
                          <h3 className="text-lg font-semibold mt-1">{playlist.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
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
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-lg text-muted-foreground">No playlists found. Try adjusting your filters.</p>
                    </div>
                  )}
                </AnimatePresence>
              </TabsContent>
              
              <TabsContent value="artists" className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {filteredArtists.map(artist => (
                    <motion.div 
                      key={artist.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col items-center p-4 bg-card rounded-lg border hover:bg-accent/5 transition-colors"
                    >
                      <div className="h-32 w-32 overflow-hidden rounded-full mb-4">
                        <img 
                          src={artist.image} 
                          alt={artist.name}
                          className="h-full w-full object-cover"
                          onError={handleImageError}
                        />
                      </div>
                      
                      <h3 className="text-xl font-semibold text-center">{artist.name}</h3>
                      <Badge variant="outline" className="my-1">{artist.country}</Badge>
                      <p className="text-sm text-muted-foreground text-center mb-4">
                        Popular: {artist.popular_song}
                      </p>
                      
                      <div className="flex items-center gap-3 mt-2">
                        {artist.youtube_id && (
                          <Button 
                            onClick={() => playArtistSong(artist)}
                            size="sm"
                            className="bg-[#008751] hover:bg-[#008751]/90"
                          >
                            <Play className="mr-2 h-4 w-4" />
                            Play Track
                          </Button>
                        )}
                        
                        {artist.spotify_url && (
                          <Button 
                            variant="outline"
                            size="sm"
                            asChild
                          >
                            <a href={artist.spotify_url} target="_blank" rel="noopener noreferrer">
                              <Headphones className="mr-2 h-4 w-4" />
                              Spotify
                            </a>
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {queueVisible && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="col-span-1 lg:col-span-1"
            >
              <Card className="h-full border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Up Next</h3>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => {
                        const randomPlaylist = PLAYLISTS.filter(p => p.platform === "youtube")[
                          Math.floor(Math.random() * PLAYLISTS.filter(p => p.platform === "youtube").length)
                        ];
                        if (randomPlaylist) handleAddToQueue(randomPlaylist);
                      }}
                    >
                      <Shuffle className="h-4 w-4 mr-2" />
                      Shuffle
                    </Button>
                  </div>
                  
                  <Separator className="mb-4" />
                  
                  <ScrollArea className="h-[500px] pr-4">
                    {queue.length > 0 ? (
                      <div className="space-y-3">
                        {queue.map((song, index) => (
                          <div 
                            key={`${song.id}-${index}`}
                            className="flex items-center gap-3 p-2 rounded-md hover:bg-accent/10"
                          >
                            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-primary/10 rounded-md">
                              {index + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm truncate">{song.title || "Unknown Title"}</h4>
                              <p className="text-xs text-muted-foreground truncate">{song.artist || "Unknown Artist"}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <p>Your queue is empty</p>
                        <p className="text-sm mt-2">Add songs from playlists</p>
                      </div>
                    )}
                  </ScrollArea>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
        
        <div className="mt-12 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Featured Album</h2>
          <FlippableAlbum coverImage="/AfrobeatsDAOMeta.png" />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Playlists;
