import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
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

  // Find the artist and song with more flexible matching
  const artist = ARTISTS.find(a => a.id === artistId);
  let song = artist?.top_songs.find(s => slugify(s.title) === songSlug);
  
  // If exact match fails, try partial matching
  if (!song && artist && songSlug) {
    song = artist.top_songs.find(s => 
      slugify(s.title).includes(songSlug) || 
      songSlug.includes(slugify(s.title)) ||
      s.title.toLowerCase().includes(songSlug.replace(/-/g, ' '))
    );
  }

  if (!artist || !song) {
    console.log('Debug: Artist found:', !!artist);
    console.log('Debug: Song found:', !!song);
    console.log('Debug: Artist ID:', artistId);
    console.log('Debug: Song slug:', songSlug);
    if (artist) {
      console.log('Debug: Available songs:', artist.top_songs.map(s => ({ title: s.title, slug: slugify(s.title) })));
    }
    
    return (
      <>
        <Helmet>
          <title>Song Not Found | Afrobeats.party - African Music & Culture</title>
          <meta name="description" content="Song not found on Afrobeats.party - Discover the best African music, artists, and Afrobeats culture. Join the global Afrobeats community." />
          <meta property="og:title" content="Song Not Found | Afrobeats.party" />
          <meta property="og:description" content="Discover the best African music, artists, and Afrobeats culture on Afrobeats.party" />
          <meta property="og:image" content="https://afrobeats.party/AfrobeatsDAOMeta.png" />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Song Not Found | Afrobeats.party" />
          <meta name="twitter:description" content="Discover the best African music, artists, and Afrobeats culture on Afrobeats.party" />
          <meta name="twitter:image" content="https://afrobeats.party/AfrobeatsDAOMeta.png" />
        </Helmet>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Song Not Found</h1>
            <p className="mb-4">Could not find the requested song.</p>
            <Link to="/music" className="text-[#008751] hover:underline">
              Back to Music
            </Link>
          </div>
        </div>
      </>
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
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const standardThumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  
  // Enhanced SEO meta data with dynamic content
  const metaTitle = `${song.title} by ${artist.name}${artist.country ? ` - ${artist.country}` : ''} | Afrobeats.party`;
  const metaDescription = `🎵 Listen to "${song.title}" by ${artist.name} on Afrobeats.party. ${artist.country ? `Discover this ${artist.country} artist's ` : 'Explore '}${artist.genre || 'Afrobeats'} music and join the global African music community. Stream now!`;
  const canonicalUrl = `https://afrobeats.party/music/artist/${artistId}/${songSlug}`;
  
  // Use YouTube thumbnail as primary OG image, ensure it's a full URL
  const ogImage = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : 
                 (artist.image ? `https://afrobeats.party${artist.image}` : 'https://afrobeats.party/AfrobeatsDAOMeta.png');
  const ogImageAlt = `${song.title} by ${artist.name} - ${artist.genre || 'Afrobeats'} Music Video`;
  
  // Enhanced keywords for better SEO
  const seoKeywords = [
    song.title.toLowerCase(),
    artist.name.toLowerCase(),
    'afrobeats',
    'african music',
    artist.country?.toLowerCase(),
    artist.genre?.toLowerCase(),
    'afrobeats party',
    'music streaming',
    'african artists',
    'afrobeats dao',
    'nigerian music',
    'ghana music',
    'south african music'
  ].filter(Boolean).join(', ');
  
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
    e.currentTarget.src = "https://afrobeats.party/AfrobeatsDAOMeta.png";
  };

  // Create structured data with proper sanitization
  const createStructuredData = () => {
    try {
      const data = {
        "@context": "https://schema.org",
        "@type": "MusicRecording",
        "name": String(song.title || ''),
        "description": metaDescription,
        "url": canonicalUrl,
        "image": ogImage,
        "genre": String(artist.genre || "Afrobeats"),
        "datePublished": new Date().toISOString().split('T')[0],
        "inLanguage": "en",
        "byArtist": {
          "@type": "MusicGroup",
          "name": String(artist.name || ''),
          "image": artist.image ? `https://afrobeats.party${artist.image}` : 'https://afrobeats.party/AfrobeatsDAOMeta.png',
          "genre": String(artist.genre || "Afrobeats"),
          ...(artist.country && { "foundingLocation": String(artist.country) }),
          "url": `https://afrobeats.party/music/artist/${artistId}`,
          "sameAs": [
            artist.spotify,
            artist.instagram,
            artist.twitter,
            artist.youtube
          ].filter(Boolean).map(url => String(url))
        },
        "isPartOf": {
          "@type": "WebSite",
          "name": "Afrobeats.party",
          "url": "https://afrobeats.party",
          "description": "Global platform for African music and Afrobeats culture"
        },
        "potentialAction": {
          "@type": "ListenAction",
          "target": String(song.youtube || ''),
          "expectsAcceptanceOf": {
            "@type": "Offer",
            "category": "free"
          }
        }
      };
      
      return JSON.stringify(data);
    } catch (error) {
      console.error('Error creating structured data:', error);
      return JSON.stringify({
        "@context": "https://schema.org",
        "@type": "MusicRecording",
        "name": String(song.title || ''),
        "description": metaDescription
      });
    }
  };

  // Get related songs from the same artist (excluding current song)
  const relatedSongs = artist.top_songs.filter(s => s.title !== song.title);

  // Get random songs from other artists
  const otherArtistsSongs = ARTISTS
    .filter(a => a.id !== artist.id)
    .flatMap(a => a.top_songs.map(s => ({ ...s, artistName: a.name, artistId: a.id })))
    .sort(() => Math.random() - 0.5)
    .slice(0, 6);

  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="music.song" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content={ogImageAlt} />
        <meta property="og:image:width" content="1280" />
        <meta property="og:image:height" content="720" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="Afrobeats.party" />
        <meta property="og:locale" content="en_US" />
        
        {/* Music specific Open Graph */}
        <meta property="music:song" content={canonicalUrl} />
        <meta property="music:musician" content={`https://afrobeats.party/music/artist/${artist.id}`} />
        <meta property="music:album" content={artist.name} />
        <meta property="music:duration" content="180" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@afrobeatsdao" />
        <meta name="twitter:creator" content="@afrobeatsdao" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content={ogImageAlt} />
        
        {/* Additional SEO */}
        <link rel="canonical" href={canonicalUrl} />
        <meta name="keywords" content={seoKeywords} />
        <meta name="author" content="Afrobeats.party" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="theme-color" content="#008751" />
        
        {/* Geographic SEO */}
        {artist.country && (
          <>
            <meta name="geo.region" content={artist.country} />
            <meta name="geo.placename" content={artist.country} />
          </>
        )}
        
        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {createStructuredData()}
        </script>
      </Helmet>
      
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

              {/* Related Songs from Other Artists */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>You Might Also Like</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {otherArtistsSongs.map((relatedSong, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
                        <img 
                          src={`https://img.youtube.com/vi/${getVideoId(relatedSong.youtube)}/default.jpg`}
                          alt={relatedSong.title}
                          className="w-12 h-8 object-cover rounded"
                          onError={handleImageError}
                        />
                        <div className="flex-1 min-w-0">
                          <Link 
                            to={`/music/artist/${relatedSong.artistId}/${slugify(relatedSong.title)}`}
                            className="font-medium text-sm text-black hover:text-[#008751] transition-colors block truncate"
                          >
                            {relatedSong.title}
                          </Link>
                          <Link 
                            to={`/music/artist/${relatedSong.artistId}`}
                            className="text-xs text-gray-600 hover:text-[#008751] transition-colors"
                          >
                            {relatedSong.artistName}
                          </Link>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 rounded-full text-[#008751] hover:bg-[#008751]/10"
                            onClick={() => {
                              const relatedVideoId = getVideoId(relatedSong.youtube);
                              playNow({
                                id: `${relatedSong.artistId}-${relatedSong.title}`,
                                youtube: relatedVideoId,
                                title: relatedSong.title,
                                artist: relatedSong.artistName
                              });
                            }}
                          >
                            <Play size={14} />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 rounded-full text-[#008751] hover:bg-[#008751]/10"
                            onClick={() => {
                              const relatedVideoId = getVideoId(relatedSong.youtube);
                              addToQueue({
                                id: `${relatedSong.artistId}-${relatedSong.title}`,
                                youtube: relatedVideoId,
                                title: relatedSong.title,
                                artist: relatedSong.artistName
                              });
                            }}
                          >
                            <Plus size={14} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
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

              {/* More by Artist */}
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
                            to={`/music/artist/${artist.id}/${slugify(relatedSong.title)}`}
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
    </>
  );
};

export default Song;
