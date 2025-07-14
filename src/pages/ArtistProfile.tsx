import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { useParams, useNavigate } from 'react-router-dom';
import { Play, Plus, ExternalLink, ArrowLeft, Music, Globe, Instagram, Twitter, Youtube, Music2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGlobalAudioPlayer } from '@/components/GlobalAudioPlayer';
import { useToast } from '@/hooks/use-toast';
import { ARTISTS, Artist, Song } from '@/data/artists';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { slugify } from '@/lib/slugUtils';

const ArtistProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { playNow, addToQueue } = useGlobalAudioPlayer();
  const { toast } = useToast();
  const [isHovering, setIsHovering] = useState(false);
  
  const artist = ARTISTS.find(artist => artist.id === id);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Enhanced safe string conversion that handles all edge cases
  const safeString = (value: any): string => {
    try {
      // Handle null/undefined first
      if (value === null || value === undefined) {
        return '';
      }
      
      // Handle primitives safely
      if (typeof value === 'string') {
        return value;
      }
      
      if (typeof value === 'number' && !isNaN(value) && isFinite(value)) {
        return value.toString();
      }
      
      if (typeof value === 'boolean') {
        return value.toString();
      }
      
      // Explicitly reject problematic types including Symbol
      if (typeof value === 'symbol' || typeof value === 'function' || typeof value === 'bigint') {
        console.warn('safeString: Rejecting problematic type:', typeof value);
        return '';
      }
      
      // Handle objects carefully
      if (typeof value === 'object') {
        // Don't try to convert objects to strings as they might contain Symbols
        console.warn('safeString: Rejecting object type');
        return '';
      }
      
      // Final fallback - return empty string instead of attempting conversion
      return '';
    } catch (error) {
      console.error('Error in safeString conversion:', error);
      return '';
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "https://afrobeats.party/AfrobeatsDAOMeta.png";
  };
  
  const getVideoId = (url: string): string => {
    if (!url) return '';
    
    if (url.includes('v=')) {
      return url.split('v=')[1]?.split('&')[0] || '';
    } else if (url.includes('youtu.be/')) {
      return url.split('youtu.be/')[1]?.split('?')[0] || '';
    }
    
    return url;
  };
  
  const playSong = (song: Song) => {
    if (!artist) return;
    
    const videoId = getVideoId(song.youtube);
    
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
  
  const addSongToQueue = (song: Song) => {
    if (!artist) return;
    
    const videoId = getVideoId(song.youtube);
    
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
  
  const playAllSongs = () => {
    if (!artist) return;
    
    const [firstSong, ...restSongs] = artist.top_songs;
    if (firstSong) {
      const videoId = getVideoId(firstSong.youtube);
      playNow({
        id: `${artist.id}-${firstSong.title}`,
        youtube: videoId,
        title: firstSong.title,
        artist: artist.name
      });
      
      restSongs.forEach(song => {
        const videoId = getVideoId(song.youtube);
        addToQueue({
          id: `${artist.id}-${song.title}`,
          youtube: videoId,
          title: song.title,
          artist: artist.name
        });
      });
      
      toast({
        title: "Playing All Songs",
        description: `Now playing ${artist.name}'s top songs`
      });
    }
  };

  const playAllSongsRandomly = () => {
    if (!artist) return;
    
    // Shuffle the songs array
    const shuffledSongs = [...artist.top_songs].sort(() => Math.random() - 0.5);
    const [firstSong, ...restSongs] = shuffledSongs;
    
    if (firstSong) {
      const videoId = getVideoId(firstSong.youtube);
      playNow({
        id: `${artist.id}-${firstSong.title}`,
        youtube: videoId,
        title: firstSong.title,
        artist: artist.name
      });
      
      restSongs.forEach(song => {
        const videoId = getVideoId(song.youtube);
        addToQueue({
          id: `${artist.id}-${song.title}`,
          youtube: videoId,
          title: song.title,
          artist: artist.name
        });
      });
      
      toast({
        title: "Shuffling & Playing",
        description: `Playing ${artist.name}'s songs randomly`
      });
    }
  };

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return Instagram;
      case 'twitter':
        return Twitter;
      case 'youtube':
        return Youtube;
      case 'spotify':
        return Music2;
      case 'soundcloud':
        return Music;
      case 'tiktok':
        return Music;
      case 'facebook':
        return ExternalLink;
      case 'linkedin':
        return ExternalLink;
      default:
        return ExternalLink;
    }
  };

  const getSocialLinks = () => {
    if (!artist) return [];
    
    const socialPlatforms = [
      { key: 'instagram', url: artist.instagram, label: 'Instagram' },
      { key: 'twitter', url: artist.twitter, label: 'Twitter' },
      { key: 'youtube', url: artist.youtube, label: 'YouTube' },
      { key: 'spotify', url: artist.spotify, label: 'Spotify' },
      { key: 'soundcloud', url: artist.soundcloud, label: 'SoundCloud' },
      { key: 'tiktok', url: artist.tiktok, label: 'TikTok' },
      { key: 'facebook', url: artist.facebook, label: 'Facebook' },
      { key: 'linkedin', url: artist.linkedin, label: 'LinkedIn' },
    ];
    
    return socialPlatforms.filter(platform => platform.url);
  };
  
  if (!artist) {
    return (
      <>
        <Helmet>
          <title>Artist Not Found | Afrobeats.party - African Music & Culture</title>
          <meta name="description" content="The requested artist could not be found. Discover amazing African artists and Afrobeats music on Afrobeats.party - your gateway to African culture." />
          <meta property="og:title" content="Artist Not Found | Afrobeats.party" />
          <meta property="og:description" content="Discover amazing African artists and Afrobeats music on Afrobeats.party" />
          <meta property="og:image" content="https://afrobeats.party/AfrobeatsDAOMeta.png" />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Artist Not Found | Afrobeats.party" />
          <meta name="twitter:description" content="Discover amazing African artists and Afrobeats music on Afrobeats.party" />
          <meta name="twitter:image" content="https://afrobeats.party/AfrobeatsDAOMeta.png" />
        </Helmet>
        <div className="min-h-screen bg-background pt-4">
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-4xl font-bold mb-4">Artist Not Found</h1>
            <p className="mb-6">The artist you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate('/music')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Music
            </Button>
          </div>
        </div>
      </>
    );
  }

  // Build safe meta values with guaranteed string outputs
  const safeName = safeString(artist.name) || 'Unknown Artist';
  const safeCountry = safeString(artist.country) || '';
  const safeGenre = safeString(artist.genre) || 'Afrobeats';
  const safeId = safeString(artist.id) || '';
  const safeImage = safeString(artist.image) || '';

  // Build meta strings with safe concatenation - avoid template literals
  const metaTitle = safeName + (safeCountry ? ' - ' + safeCountry : '') + ' ' + safeGenre + ' Artist | Afrobeats.party';
  const metaDescription = '🎵 Discover ' + safeName + '\'s music on Afrobeats.party! ' + (safeCountry ? 'This ' + safeCountry + ' artist ' : 'Listen to ') + (artist.top_songs?.length || 0) + ' top songs including their biggest hits. ' + (safeGenre ? 'Experience the best of ' + safeGenre + ' ' : 'Stream Afrobeats ') + 'music and join the global African music community.';
  const canonicalUrl = 'https://afrobeats.party/music/artist/' + safeId;
  const ogImage = safeImage ? 'https://afrobeats.party' + safeImage : 'https://afrobeats.party/AfrobeatsDAOMeta.png';
  const ogImageAlt = safeName + ' - ' + (safeCountry ? safeCountry + ' ' : '') + safeGenre + ' Artist Profile';
  
  // Build keywords safely
  const keywordsList = [
    safeName.toLowerCase(),
    'afrobeats artist',
    'african music',
    safeCountry.toLowerCase(),
    safeGenre.toLowerCase(),
    'afrobeats party',
    'african culture',
    'music streaming',
    'afrobeats dao',
    'nigerian music',
    'ghana music',
    'south african music'
  ].filter(keyword => keyword && keyword.length > 0);
  
  const seoKeywords = keywordsList.join(', ');
  
  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        
        <meta property="og:type" content="profile" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content={ogImageAlt} />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="800" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="Afrobeats.party" />
        <meta property="og:locale" content="en_US" />
        
        <meta property="music:musician" content={canonicalUrl} />
        <meta property="music:song_count" content={String(artist.top_songs?.length || 0)} />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@afrobeatsdao" />
        <meta name="twitter:creator" content="@afrobeatsdao" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content={ogImageAlt} />
        
        <link rel="canonical" href={canonicalUrl} />
        <meta name="keywords" content={seoKeywords} />
        <meta name="author" content="Afrobeats.party" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="theme-color" content="#008751" />
        
        {safeCountry && (
          <>
            <meta name="geo.region" content={safeCountry} />
            <meta name="geo.placename" content={safeCountry} />
          </>
        )}
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 py-8">
          <Button 
            variant="outline" 
            onClick={() => navigate('/music')} 
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Artists
          </Button>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <div 
                className="rounded-xl overflow-hidden shadow-lg mb-4 relative cursor-pointer group"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onClick={playAllSongsRandomly}
              >
                <img 
                  src={artist.image} 
                  alt={artist.name} 
                  className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={handleImageError} 
                />
                <div className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="bg-white rounded-full p-4 shadow-lg">
                    <Play className="w-8 h-8 text-[#008751] fill-current" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h1 className="text-3xl font-bold text-black mb-2">{artist.name}</h1>
                
                <div className="flex items-center justify-between mb-4 mt-3">
                  <Badge className="bg-[#008751] px-3 py-1">Afrobeats Artist</Badge>
                  <div className="flex items-center gap-2">
                    {artist.website && (
                      <a 
                        href={artist.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-8 h-8 text-[#008751] hover:bg-[#008751]/10 rounded-full transition-colors"
                        title="Website"
                      >
                        <Globe size={18} />
                      </a>
                    )}
                    {getSocialLinks().map((social, index) => {
                      const Icon = getSocialIcon(social.key);
                      return (
                        <a
                          key={index}
                          href={social.url!}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-8 h-8 text-[#008751] hover:bg-[#008751]/10 rounded-full transition-colors"
                          title={social.label}
                        >
                          <Icon size={18} />
                        </a>
                      );
                    })}
                  </div>
                </div>
                
                <p className="text-gray-600 mt-3 text-sm">
                  {artist.name} is known for combining African rhythms with contemporary sounds, 
                  creating a unique blend that has gained worldwide recognition.
                </p>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <div className="bg-white p-6 rounded-xl shadow-md mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-black flex items-center gap-2">
                    <Music size={24} className="text-[#008751]" />
                    Top Songs
                  </h2>
                  <Button 
                    onClick={playAllSongs}
                    className="bg-[#008751] text-white hover:bg-[#008751]/90"
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Play All
                  </Button>
                </div>
                
                <Separator className="mb-4" />
                
                <div className="space-y-4">
                  {artist.top_songs.map((song, index) => {
                    const videoId = getVideoId(song.youtube);
                    return (
                      <div 
                        key={index}
                        className="flex items-center justify-between p-3 rounded-md hover:bg-gray-50"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex-shrink-0 h-6 w-10 rounded bg-gray-100 overflow-hidden">
                            <img 
                              src={`https://img.youtube.com/vi/${videoId}/default.jpg`}
                              alt={song.title}
                              className="w-full h-full object-cover"
                              onError={handleImageError}
                            />
                          </div>
                          <div>
                            <Link 
                              to={`/music/artist/${artist.id}/${slugify(song.title)}`}
                              className="font-medium text-black hover:text-[#008751] transition-colors"
                            >
                              {song.title}
                            </Link>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 rounded-full text-[#008751] hover:bg-[#008751]/10"
                            onClick={() => playSong(song)}
                            title="Play Now"
                          >
                            <Play size={18} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 rounded-full text-[#008751] hover:bg-[#008751]/10"
                            onClick={() => addSongToQueue(song)}
                            title="Add to Queue"
                          >
                            <Plus size={18} />
                          </Button>
                          <a
                            href={song.youtube}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-9 w-9 rounded-full text-[#008751] hover:bg-[#008751]/10 flex items-center justify-center"
                            title="Open on YouTube"
                          >
                            <ExternalLink size={18} />
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-2xl font-bold text-black mb-4">Related Artists</h2>
                <Separator className="mb-4" />
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {ARTISTS.filter(a => a.id !== artist.id)
                    .slice(0, 6)
                    .map((relatedArtist) => (
                      <div 
                        key={relatedArtist.id}
                        className="cursor-pointer relative group"
                        onClick={() => navigate(`/music/artist/${relatedArtist.id}`)}
                      >
                        <div className="rounded-lg overflow-hidden h-24 relative">
                          <img 
                            src={relatedArtist.image} 
                            alt={relatedArtist.name}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            onError={handleImageError}
                          />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <p className="text-white font-medium text-center transform scale-90 group-hover:scale-100 transition-transform">
                              {relatedArtist.name}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default ArtistProfile;
