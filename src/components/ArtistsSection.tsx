import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ARTISTS, Artist } from '@/data/artists';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, ExternalLink, Music, Search, Globe } from 'lucide-react';
import { useGlobalAudioPlayer } from '@/components/GlobalAudioPlayer';
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

interface SongItemProps {
  song: {
    title: string;
    youtube: string;
  };
  artistName: string;
  index: number;
}

const SongItem = ({ song, artistName, index }: SongItemProps) => {
  const { playNow, addToQueue } = useGlobalAudioPlayer();
  const { toast } = useToast();
  
  const getYoutubeId = (url: string): string => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : url;
  };

  const handlePlay = () => {
    const videoId = getYoutubeId(song.youtube);
    playNow({
      id: `song-${videoId}`,
      youtube: videoId,
      title: song.title,
      artist: artistName
    });
    
    toast({
      title: "Now Playing",
      description: `${song.title} by ${artistName}`,
    });
  };

  const handleAddToQueue = () => {
    const videoId = getYoutubeId(song.youtube);
    addToQueue({
      id: `song-${videoId}`,
      youtube: videoId,
      title: song.title,
      artist: artistName
    });
    
    toast({
      title: "Added to Queue",
      description: `${song.title} by ${artistName}`,
    });
  };

  return (
    <div className="flex items-center justify-between p-3 bg-white/80 rounded-lg hover:bg-white transition-all">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#008751] text-white flex items-center justify-center flex-shrink-0">
          {index + 1}
        </div>
        <div>
          <h4 className="font-medium text-black">{song.title}</h4>
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="ghost"
          className="text-[#008751] hover:bg-[#008751]/10"
          onClick={handlePlay}
        >
          <Play className="h-4 w-4" />
          <span className="sr-only">Play</span>
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="text-[#008751] hover:bg-[#008751]/10"
          onClick={handleAddToQueue}
        >
          <Music className="h-4 w-4" />
          <span className="sr-only">Add to queue</span>
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="text-[#008751] hover:bg-[#008751]/10"
          asChild
        >
          <a href={song.youtube} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4" />
            <span className="sr-only">Open on YouTube</span>
          </a>
        </Button>
      </div>
    </div>
  );
};

const ArtistCard = ({ artist }: { artist: Artist }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "/AfrobeatsDAOMeta.png";
  };

  return (
    <motion.div 
      className="rounded-lg overflow-hidden shadow-lg bg-white h-full flex flex-col"
      whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div 
        className="relative pt-[100%] overflow-hidden bg-gray-100"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img 
          src={artist.image} 
          alt={artist.name} 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out"
          style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
          onError={handleImageError}
        />
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-black">{artist.name}</h3>
          {artist.website && (
            <Button 
              size="icon" 
              variant="ghost"
              asChild
              className="text-[#008751] hover:bg-[#008751]/10"
            >
              <a href={artist.website} target="_blank" rel="noopener noreferrer">
                <Globe className="h-4 w-4" />
                <span className="sr-only">Visit website</span>
              </a>
            </Button>
          )}
        </div>
        
        <Badge className="w-fit my-2 bg-[#008751] text-white hover:bg-[#008751]/90">
          Top Songs
        </Badge>
        
        <div className="space-y-2 mt-2 flex-1">
          {artist.top_songs.map((song, index) => (
            <SongItem
              key={`${artist.name}-song-${index}`}
              song={song}
              artistName={artist.name}
              index={index}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const SongsView = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredSongs = ARTISTS.flatMap(artist => 
    artist.top_songs.map(song => ({
      ...song,
      artist: artist.name,
      artistImage: artist.image
    }))
  ).filter(song => 
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full">
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search songs or artists..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-white border-gray-300"
        />
      </div>
      
      <Card className="w-full">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSongs.map((song, index) => (
              <SongItem 
                key={`song-list-${index}`}
                song={song}
                artistName={song.artist}
                index={index}
              />
            ))}
          </div>
          
          {filteredSongs.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No songs found matching your search query.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export function ArtistsSection() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredArtists = ARTISTS.filter(artist =>
    artist.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="artists" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-heading font-extrabold mb-4 flex items-center justify-center gap-3 text-black">
            <span>Top Artists</span>
            <span className="text-5xl">🎤</span>
          </h2>
          <p className="text-xl max-w-2xl mx-auto text-black">
            Discover the biggest names in Afrobeats and their hit songs.
          </p>
        </div>
        
        <div className="mb-8">
          <Tabs defaultValue="grid" className="w-full">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <TabsList className="bg-white border">
                <TabsTrigger 
                  value="grid"
                  className="text-black data-[state=active]:bg-[#008751] data-[state=active]:text-white"
                >
                  Artists Grid
                </TabsTrigger>
                <TabsTrigger 
                  value="songs"
                  className="text-black data-[state=active]:bg-[#008751] data-[state=active]:text-white"
                >
                  All Songs
                </TabsTrigger>
              </TabsList>
              
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search artists..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white border-gray-300"
                />
              </div>
            </div>
            
            <TabsContent value="grid" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArtists.map((artist) => (
                  <ArtistCard key={artist.name} artist={artist} />
                ))}
                
                {filteredArtists.length === 0 && (
                  <div className="col-span-full text-center py-8">
                    <p className="text-gray-500">No artists found matching your search query.</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="songs" className="mt-0">
              <SongsView />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Separator className="my-8" />
    </section>
  );
}
