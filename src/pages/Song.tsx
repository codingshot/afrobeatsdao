
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Plus, ExternalLink, Share2 } from "lucide-react";
import { useGlobalAudioPlayer } from "@/components/GlobalAudioPlayer";
import { useToast } from "@/hooks/use-toast";
import { ARTISTS } from "@/data/artists";
import { slugify, deslugify } from "@/lib/slugUtils";

const Song = () => {
  const { artistId, songSlug } = useParams();
  const { playNow, addToQueue } = useGlobalAudioPlayer();
  const { toast } = useToast();

  // Find the artist and song
  const artist = ARTISTS.find(a => a.id === artistId);
  const song = artist?.top_songs.find(s => slugify(s.title.split(' ')[0]) === songSlug);

  if (!artist || !song) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Song Not Found</h1>
          <Link to="/music" className="text-[#008751] hover:underline">
            Back to Music
          </Link>
        </div>
      </div>
    );
  }

  const getVideoId = (url: string): string => {
    if (!url) return '';
    
    if (url.includes('v=')) {
      return url.split('v=')[1]?.split('&')[0] || '';
    } else if (url.includes('youtu.be/')) {
      return url.split('youtu.be/')[1]?.split('?')[0] || '';
    }
    
    return url;
  };

  const videoId = getVideoId(song.youtube);
  
  const handlePlay = () => {
    playNow({
      id: `${artist.id}-${song.title}`,
      youtube: videoId,
      title: song.title,
      artist: artist.name
    });
    
    toast({
      title: "Now Playing",
      description: `${song.title} by ${artist.name}`
    });
  };
  
  const handleAddToQueue = () => {
    addToQueue({
      id: `${artist.id}-${song.title}`,
      youtube: videoId,
      title: song.title,
      artist: artist.name
    });
    
    toast({
      title: "Added to Queue",
      description: `${song.title} by ${artist.name}`
    });
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      toast({
        title: "Link Copied",
        description: "Song link copied to clipboard"
      });
    });
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "/AfrobeatsDAOMeta.png";
  };

  // Get related songs from the same artist (excluding current song)
  const relatedSongs = artist.top_songs.filter(s => s.title !== song.title);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-600">
          <Link to="/music" className="hover:text-[#008751]">Music</Link>
          <span className="mx-2">/</span>
          <Link to={`/music/artist/${artist.id}`} className="hover:text-[#008751]">{artist.name}</Link>
          <span className="mx-2">/</span>
          <span className="text-black">{song.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* YouTube Video */}
            <div className="mb-6">
              <div className="aspect-video w-full">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title={song.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg shadow-lg"
                ></iframe>
              </div>
            </div>

            {/* Song Info */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">{song.title}</CardTitle>
                    <Link 
                      to={`/music/artist/${artist.id}`}
                      className="text-lg text-[#008751] hover:underline font-semibold"
                    >
                      {artist.name}
                    </Link>
                    {artist.genre && (
                      <Badge variant="secondary" className="ml-2">
                        {artist.genre}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button onClick={handlePlay} className="bg-[#008751] hover:bg-[#008751]/90">
                      <Play className="mr-2 h-4 w-4" />
                      Play
                    </Button>
                    <Button onClick={handleAddToQueue} variant="outline">
                      <Plus className="mr-2 h-4 w-4" />
                      Queue
                    </Button>
                    <Button onClick={handleShare} variant="outline" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Artist Info */}
            <Card>
              <CardHeader>
                <CardTitle>Artist</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-4">
                  <img 
                    src={artist.image} 
                    alt={artist.name}
                    className="w-16 h-16 rounded-full object-cover"
                    onError={handleImageError}
                  />
                  <div>
                    <Link 
                      to={`/music/artist/${artist.id}`}
                      className="font-semibold text-lg hover:text-[#008751]"
                    >
                      {artist.name}
                    </Link>
                    {artist.country && (
                      <p className="text-sm text-gray-600">{artist.country}</p>
                    )}
                  </div>
                </div>
                
                <Link 
                  to={`/music/artist/${artist.id}`}
                  className="w-full block text-center py-2 bg-[#008751] text-white rounded-md hover:bg-[#008751]/90 transition-colors text-sm"
                >
                  View Artist Profile
                </Link>

                {artist.website && (
                  <a 
                    href={artist.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full block text-center py-2 mt-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm"
                  >
                    <ExternalLink className="inline mr-2 h-4 w-4" />
                    Website
                  </a>
                )}
              </CardContent>
            </Card>

            {/* Related Songs */}
            {relatedSongs.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>More by {artist.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {relatedSongs.slice(0, 5).map((relatedSong, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <Link 
                          to={`/music/artist/${artist.id}/${slugify(relatedSong.title.split(' ')[0])}`}
                          className="flex-1 truncate hover:text-[#008751] text-sm"
                        >
                          {relatedSong.title}
                        </Link>
                        <div className="flex items-center space-x-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-7 w-7 rounded-full text-[#008751] hover:bg-[#008751]/10"
                            onClick={() => {
                              const relatedVideoId = getVideoId(relatedSong.youtube);
                              playNow({
                                id: `${artist.id}-${relatedSong.title}`,
                                youtube: relatedVideoId,
                                title: relatedSong.title,
                                artist: artist.name
                              });
                            }}
                          >
                            <Play size={12} />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-7 w-7 rounded-full text-[#008751] hover:bg-[#008751]/10"
                            onClick={() => {
                              const relatedVideoId = getVideoId(relatedSong.youtube);
                              addToQueue({
                                id: `${artist.id}-${relatedSong.title}`,
                                youtube: relatedVideoId,
                                title: relatedSong.title,
                                artist: artist.name
                              });
                            }}
                          >
                            <Plus size={12} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Song;
