
import React from 'react';
import { Footer } from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, ExternalLink, Music2, Headphones, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGlobalAudioPlayer } from "@/components/GlobalAudioPlayer";

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
  }
];

const Playlists = () => {
  const { playNow } = useGlobalAudioPlayer();

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "/AfrobeatsDAOMeta.png";
  };

  const playArtistSong = (artist: Artist) => {
    if (artist.youtube_id) {
      playNow({
        id: `artist-${artist.id}`,
        youtube: artist.youtube_id
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
        </div>
        
        <Tabs defaultValue="playlists" className="w-full max-w-6xl mx-auto">
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
            {PLAYLISTS.map(playlist => (
              <div 
                key={playlist.id} 
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
                  <h3 className="text-lg font-semibold">{playlist.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {playlist.description}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {playlist.platform === 'youtube' ? (
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => playNow({
                        id: playlist.id,
                        youtube: playlist.url.split('v=')[1] || playlist.url.split('youtu.be/')[1]
                      })}
                      className="text-[#008751] hover:text-[#008751]/90 hover:bg-[#008751]/10"
                    >
                      <Play className="h-5 w-5" />
                    </Button>
                  ) : (
                    <Button 
                      variant="ghost" 
                      size="icon"
                      asChild
                      className="text-[#008751] hover:text-[#008751]/90 hover:bg-[#008751]/10"
                    >
                      <a href={playlist.url} target="_blank" rel="noopener noreferrer">
                        {getPlatformIcon(playlist.platform)}
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="artists" className="mt-6 space-y-4">
            {TRENDING_ARTISTS.map(artist => (
              <div 
                key={artist.id} 
                className="flex items-center gap-4 p-4 bg-card rounded-lg border hover:bg-accent/5 transition-colors"
              >
                <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-full">
                  <img 
                    src={artist.image} 
                    alt={artist.name}
                    className="h-full w-full object-cover"
                    onError={handleImageError}
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold">{artist.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {artist.popular_song} • {artist.country}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {artist.youtube_id && (
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => playArtistSong(artist)}
                      className="text-[#008751] hover:text-[#008751]/90 hover:bg-[#008751]/10"
                    >
                      <Play className="h-5 w-5" />
                    </Button>
                  )}
                  
                  {artist.spotify_url && (
                    <Button 
                      variant="ghost" 
                      size="icon"
                      asChild
                      className="text-[#008751] hover:text-[#008751]/90 hover:bg-[#008751]/10"
                    >
                      <a href={artist.spotify_url} target="_blank" rel="noopener noreferrer">
                        <Headphones className="h-5 w-5" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Playlists;
