import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Music, Headphones, ArrowRight, Play, Plus } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useCountryFlags } from "@/hooks/use-country-flags";
import { danceCurriculum } from "@/data/dance-curriculum";
import { useGlobalAudioPlayer } from "@/components/GlobalAudioPlayer";
import { Helmet } from "react-helmet";

const genreDescriptions = {
  afrobeats: "An energetic style from Nigeria and Ghana that blends traditional African movements with modern influences. Features powerful rhythmic footwork, hip movements, and expressive gestures, typically following faster-paced beats. Deeply connected to cultural identity and social expression, popularized through music videos and social media.",
  amapiano: "A South African style combining house, jazz, and kwaito elements. Features smoother, more melodic movements at a slower tempo (110-120 BPM), with an emphasis on fluid footwork. While Afrobeats is more energetic and percussive, Amapiano focuses on flowing, laid-back movements that follow melodic piano patterns. Has gained worldwide popularity through TikTok challenges."
};

const DancePage = () => {
  const [selectedGenre, setSelectedGenre] = useState("afrobeats");
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();
  const { getFlag } = useCountryFlags();
  const navigate = useNavigate();
  const audioPlayer = useGlobalAudioPlayer();

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handleDanceSelect = (dance: any) => {
    navigate(`/dance/${selectedGenre}/${dance.id}`);
  };

  const handlePlaySong = (e: React.MouseEvent, song: any) => {
    e.stopPropagation();
    if (song && song.youtube && song.title && song.artist && audioPlayer && audioPlayer.playNow) {
      audioPlayer.playNow({
        id: `${song.artist}-${song.title}`,
        title: song.title,
        artist: song.artist,
        youtube: song.youtube
      });
    }
  };

  const handleAddToQueue = (e: React.MouseEvent, song: any) => {
    e.stopPropagation();
    if (song && song.youtube && song.title && song.artist && audioPlayer && audioPlayer.addToQueue) {
      audioPlayer.addToQueue({
        id: `${song.artist}-${song.title}`,
        title: song.title,
        artist: song.artist,
        youtube: song.youtube
      });
    }
  };

  const genreCount = danceCurriculum[selectedGenre].length;
  const metaDescription = `Learn ${genreCount} authentic ${selectedGenre} dances from beginner to advanced levels. Master popular moves like ${danceCurriculum[selectedGenre].slice(0, 3).map(d => d.name).join(', ')} and more!`;

  return (
    <>
      <Helmet>
        <title>African Dance Curriculum - Learn {selectedGenre.charAt(0).toUpperCase() + selectedGenre.slice(1)} Dances</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={`Learn ${selectedGenre} Dance - African Dance Curriculum`} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <meta name="keywords" content={`african dance, ${selectedGenre}, dance tutorial, dance curriculum, ${danceCurriculum[selectedGenre].map(d => d.name.toLowerCase()).join(', ')}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            "name": `African Dance Curriculum - ${selectedGenre}`,
            "description": metaDescription,
            "provider": {
              "@type": "Organization",
              "name": "Afrobeats DAO",
              "sameAs": "https://afrobeats.party"
            },
            "coursePrerequisites": "No prior dance experience required",
            "numberOfLessons": genreCount,
            "teaches": danceCurriculum[selectedGenre].map(d => d.name).join(', ')
          })}
        </script>
      </Helmet>

      <div 
        className={`min-h-screen bg-gradient-to-b from-black to-gray-900 py-8 px-4 sm:px-6 lg:px-8 transition-opacity duration-500 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <h1 
            className="text-3xl sm:text-5xl font-bold text-center mb-2 text-white font-heading"
            role="heading"
            aria-level={1}
          >
            African Dance Curriculum
          </h1>
          <p className="text-center text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto text-sm sm:text-base">
            Learn authentic Afrobeats and Amapiano dances from beginner to advanced levels with our comprehensive curriculum.
          </p>

          <Card className="bg-[#FFD600] border-[#FFD600] text-black mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="text-black font-heading">Quick Start Guide</CardTitle>
              <CardDescription className="text-black/80 font-medium">Choose your style and start learning today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant={selectedGenre === "afrobeats" ? "default" : "outline"}
                      onClick={() => setSelectedGenre("afrobeats")}
                      className={`justify-start ${
                        selectedGenre === "afrobeats" 
                          ? "bg-[#008751] hover:bg-[#008751]/80 text-white" 
                          : "bg-white/80 text-black border-black/20 hover:bg-white"
                      }`}
                    >
                      <Music className="mr-2 h-4 w-4" /> Afrobeats Dance
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-sm bg-black/90 text-white border-white/20 p-3">
                    {genreDescriptions.afrobeats}
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant={selectedGenre === "amapiano" ? "default" : "outline"}
                      onClick={() => setSelectedGenre("amapiano")}
                      className={`justify-start ${
                        selectedGenre === "amapiano" 
                          ? "bg-[#008751] hover:bg-[#008751]/80 text-white" 
                          : "bg-white/80 text-black border-black/20 hover:bg-white"
                      }`}
                    >
                      <Headphones className="mr-2 h-4 w-4" /> Amapiano Dance
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-sm bg-black/90 text-white border-white/20 p-3">
                    {genreDescriptions.amapiano}
                  </TooltipContent>
                </Tooltip>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {danceCurriculum[selectedGenre].map((dance, index) => (
              <Card 
                key={dance.id}
                className="bg-black/70 border-white/20 hover:border-[#FFD600] transition-colors cursor-pointer text-white overflow-hidden animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => handleDanceSelect(dance)}
              >
                {dance.tutorials && dance.tutorials[0] && (
                  <div className="aspect-video w-full bg-gray-900 relative group">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${dance.tutorials[0].link.split('=')[1] || dance.tutorials[0].link.split('/').pop()}?controls=0`}
                      title={dance.name}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="default" className="bg-[#FFD600] text-black hover:bg-[#FFD600]/80">
                        Learn {dance.name}
                      </Button>
                    </div>
                  </div>
                )}
                <CardHeader className="bg-[#FFD600] text-black p-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-heading">{dance.name}</CardTitle>
                    {dance.origin && getFlag(dance.origin) && (
                      <img 
                        src={getFlag(dance.origin)} 
                        alt={dance.origin} 
                        className="w-6 h-4"
                        title={dance.origin}
                      />
                    )}
                  </div>
                  <CardDescription className="text-black/80 font-medium line-clamp-2">
                    {dance.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-3">
                  <div className="mb-3">
                    <span className="text-xs bg-[#FFD600] text-black px-2 py-0.5 rounded-full font-medium">
                      {dance.difficulty}
                    </span>
                  </div>
                  
                  {dance.keyMoves && dance.keyMoves.length > 0 && (
                    <div className="mb-3">
                      <h4 className="text-sm font-semibold mb-1 text-[#FFD600]">Key Moves:</h4>
                      <ul className="text-xs text-gray-300 space-y-1 list-disc list-inside">
                        {dance.keyMoves.slice(0, 2).map((move, idx) => (
                          <li key={idx}>{move.name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {dance.songs && dance.songs.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold mb-1 text-[#FFD600]">Trending Songs:</h4>
                      <ul className="text-xs text-gray-300 space-y-2">
                        {dance.songs.slice(0, 2).map((song, idx) => (
                          <li key={idx} className="flex items-center justify-between">
                            <span className="truncate">{song.title}</span>
                            <div className="flex space-x-1">
                              <Button 
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 text-white hover:text-[#FFD600] hover:bg-[#FFD600]/10"
                                onClick={(e) => handlePlaySong(e, song)}
                                title="Play Now"
                              >
                                <Play className="h-3 w-3" />
                              </Button>
                              <Button 
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 text-white hover:text-[#FFD600] hover:bg-[#FFD600]/10"
                                onClick={(e) => handleAddToQueue(e, song)}
                                title="Add to Queue"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <Button 
                    variant="white" 
                    size="sm"
                    className="w-full mt-3 justify-between"
                  >
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DancePage;
