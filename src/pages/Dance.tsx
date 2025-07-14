
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Music, Headphones, ArrowRight, Play, Plus, Filter } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useCountryFlags } from "@/hooks/use-country-flags";
import { danceCurriculum } from "@/data/dance-curriculum";
import { useGlobalAudioPlayer } from "@/components/GlobalAudioPlayer";
import { Helmet } from "react-helmet";
import { ResumableDances } from "@/components/dance/ResumableDances";
import { DanceProgressIndicator } from "@/components/dance/DanceProgressIndicator";
import { useDanceProgress } from "@/hooks/use-dance-progress";

const genreDescriptions = {
  afrobeats: "An energetic style from Nigeria and Ghana that blends traditional African movements with modern influences. Features powerful rhythmic footwork, hip movements, and expressive gestures, typically following faster-paced beats. Deeply connected to cultural identity and social expression, popularized through music videos and social media.",
  amapiano: "A South African style combining house, jazz, and kwaito elements. Features smoother, more melodic movements at a slower tempo (110-120 BPM), with an emphasis on fluid footwork. While Afrobeats is more energetic and percussive, Amapiano focuses on flowing, laid-back movements that follow melodic piano patterns. Has gained worldwide popularity through TikTok challenges."
};

const countries = Array.from(
  new Set(
    [...danceCurriculum.afrobeats, ...danceCurriculum.amapiano]
      .map(dance => dance.origin)
      .filter(Boolean)
  )
).sort();

const difficulties = Array.from(
  new Set(
    [...danceCurriculum.afrobeats, ...danceCurriculum.amapiano]
      .map(dance => dance.difficulty)
      .filter(Boolean)
  )
).sort();

const DancePage = () => {
  const [selectedGenre, setSelectedGenre] = useState("all"); // "all", "afrobeats", "amapiano"
  const [selectedCountry, setSelectedCountry] = useState("all");  // Changed from "" to "all"
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");  // Changed from "" to "all"
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();
  const { getFlag } = useCountryFlags();
  const navigate = useNavigate();
  const audioPlayer = useGlobalAudioPlayer();
  const { startDance } = useDanceProgress();

  useEffect(() => {
    setIsLoading(false);
  }, []);

  // Ultra-safe string conversion that explicitly handles ALL edge cases
  const safeString = (value: any): string => {
    try {
      // Handle null/undefined first
      if (value === null || value === undefined) {
        return '';
      }
      
      // Handle primitives
      if (typeof value === 'string') {
        return value;
      }
      
      if (typeof value === 'number' && !isNaN(value) && isFinite(value)) {
        return String(value);
      }
      
      if (typeof value === 'boolean') {
        return String(value);
      }
      
      // Explicitly reject ALL non-serializable types
      if (typeof value === 'symbol' || typeof value === 'function' || typeof value === 'bigint') {
        console.warn('Dance.tsx safeString: Rejecting non-serializable type:', typeof value);
        return '';
      }
      
      // Handle objects and arrays (convert to empty string to avoid issues)
      if (typeof value === 'object') {
        console.warn('Dance.tsx safeString: Rejecting object type:', value);
        return '';
      }
      
      // Final fallback - should never reach here
      console.warn('Dance.tsx safeString: Unknown type encountered:', typeof value, value);
      return '';
    } catch (error) {
      console.error('Error in Dance.tsx safeString conversion:', error, value);
      return '';
    }
  };

  // Safe meta value builder with validation
  const buildSafeMetaValue = (template: string, ...values: any[]): string => {
    try {
      // Convert all values to safe strings and filter out empty ones
      const safeValues = values.map(v => safeString(v)).filter(v => v.length > 0);
      let result = template;
      
      // Replace placeholders with safe values
      safeValues.forEach((value, index) => {
        result = result.replace(`{${index}}`, value);
      });
      
      // Clean up any remaining placeholders
      result = result.replace(/\{[0-9]+\}/g, '');
      
      // Final safety check
      const finalResult = safeString(result);
      return finalResult || 'African Dance - Afrobeats.party';
    } catch (error) {
      console.error('Error building safe meta value:', error);
      return 'African Dance - Afrobeats.party';
    }
  };

  const handleDanceSelect = (dance: any) => {
    // Mark the dance as started when selected
    startDance(dance.id);
    navigate(`/dance/${selectedGenre === "all" ? dance.genre : selectedGenre}/${dance.id}`);
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

  const filterDances = () => {
    let filteredDances: any[] = [];

    if (selectedGenre === "all") {
      // Combine both genres, adding a genre property to each dance
      filteredDances = [
        ...danceCurriculum.afrobeats.map(dance => ({ ...dance, genre: "afrobeats" })),
        ...danceCurriculum.amapiano.map(dance => ({ ...dance, genre: "amapiano" }))
      ];
    } else {
      // Just use the selected genre
      filteredDances = danceCurriculum[selectedGenre as keyof typeof danceCurriculum].map(dance => ({
        ...dance,
        genre: selectedGenre
      }));
    }

    // Apply country filter if selected
    if (selectedCountry && selectedCountry !== "all") {
      filteredDances = filteredDances.filter(dance => dance.origin === selectedCountry);
    }

    // Apply difficulty filter if selected
    if (selectedDifficulty && selectedDifficulty !== "all") {
      filteredDances = filteredDances.filter(dance => dance.difficulty === selectedDifficulty);
    }

    return filteredDances;
  };

  const filteredDances = filterDances();
  const genreCount = filteredDances.length;
  
  // Build safe meta values using the enhanced utility
  const safeGenre = safeString(selectedGenre === "all" ? "African" : selectedGenre);
  const safeGenreCount = safeString(genreCount);
  const safeDifficulties = difficulties.map(d => safeString(d)).filter(Boolean).join(', ');
  
  const metaDescription = buildSafeMetaValue(
    'Learn {0} authentic {1} dances from beginner to advanced levels. Interactive tutorials, cultural context, and music recommendations included.',
    safeGenreCount,
    safeGenre
  );
  const metaTitle = buildSafeMetaValue('African Dance Curriculum - Learn {0} Dances', safeGenre);
  const metaKeywords = buildSafeMetaValue('african dance, {0}, dance tutorial, dance curriculum, {1} level', safeString(selectedGenre), safeDifficulties);
  
  // Final validation for Helmet - ensure no Symbols can pass through
  const validateForHelmet = (value: any, fallback: string = 'African Dance - Afrobeats.party'): string => {
    const safe = safeString(value);
    if (typeof safe !== 'string' || safe.length === 0) {
      console.warn('Dance.tsx validateForHelmet: Invalid value, using fallback:', value);
      return fallback;
    }
    return safe;
  };

  const clearFilters = () => {
    setSelectedCountry("all");  // Changed from "" to "all"
    setSelectedDifficulty("all");  // Changed from "" to "all"
  };

  return (
    <>
      <Helmet>
        <title>{validateForHelmet(metaTitle)}</title>
        <meta name="description" content={validateForHelmet(metaDescription)} />
        <meta property="og:title" content={validateForHelmet(`Learn ${safeGenre} Dance - Interactive Tutorials`)} />
        <meta property="og:description" content={validateForHelmet(metaDescription)} />
        <meta property="og:type" content="website" />
        <meta name="keywords" content={validateForHelmet(metaKeywords)} />
        <link rel="canonical" href="https://afrobeats.party/dance" />
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

          {/* Resumable Dances Section */}
          <ResumableDances />

          {/* Genre Selection & Filters */}
          <Card className="bg-[#FFD600] border-[#FFD600] text-black mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="text-black font-heading">Dance Styles</CardTitle>
              <CardDescription className="text-black/80 font-medium">Choose your style and start learning today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4">
                {/* Genre Toggle Group */}
                <div className="w-full">
                  <ToggleGroup 
                    type="single" 
                    value={selectedGenre} 
                    onValueChange={(value) => value && setSelectedGenre(value)}
                    className="w-full justify-start border border-black/10 rounded-md p-1 bg-white/80"
                  >
                    <ToggleGroupItem 
                      value="all" 
                      className={`rounded ${
                        selectedGenre === "all" 
                          ? "bg-[#008751] text-white" 
                          : "bg-transparent text-black"
                      }`}
                    >
                      All Styles
                    </ToggleGroupItem>
                    <ToggleGroupItem 
                      value="afrobeats" 
                      className={`rounded ${
                        selectedGenre === "afrobeats" 
                          ? "bg-[#008751] text-white" 
                          : "bg-transparent text-black"
                      }`}
                    >
                      <Music className="mr-2 h-4 w-4" /> Afrobeats
                    </ToggleGroupItem>
                    <ToggleGroupItem 
                      value="amapiano" 
                      className={`rounded ${
                        selectedGenre === "amapiano" 
                          ? "bg-[#008751] text-white" 
                          : "bg-transparent text-black"
                      }`}
                    >
                      <Headphones className="mr-2 h-4 w-4" /> Amapiano
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="w-full sm:w-auto">
                    <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                      <SelectTrigger className="bg-white/80 border-black/10 text-black w-full sm:w-[180px]">
                        <SelectValue placeholder="Filter by Country" />
                      </SelectTrigger>
                      <SelectContent className="bg-white text-black border-black/10 z-50">
                        <SelectItem value="all">All Countries</SelectItem>
                        {countries.map(country => (
                          <SelectItem key={country} value={country} className="flex items-center">
                            {country} {getFlag(country) && (
                              <img src={getFlag(country)} alt={country} className="w-4 h-3 ml-2" />
                            )}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="w-full sm:w-auto">
                    <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                      <SelectTrigger className="bg-white/80 border-black/10 text-black w-full sm:w-[180px]">
                        <SelectValue placeholder="Filter by Difficulty" />
                      </SelectTrigger>
                      <SelectContent className="bg-white text-black border-black/10 z-50">
                        <SelectItem value="all">All Difficulties</SelectItem>
                        {difficulties.map(difficulty => (
                          <SelectItem key={difficulty} value={difficulty}>{difficulty}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {(selectedCountry !== "all" || selectedDifficulty !== "all") && (
                    <Button 
                      variant="outline" 
                      onClick={clearFilters}
                      className="bg-white/80 border-black/10 text-black hover:bg-white"
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dance Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 dance-grid">
            {filteredDances.length === 0 ? (
              <div className="col-span-full text-center py-10">
                <p className="text-white text-lg">No dances match your current filters.</p>
                <Button 
                  variant="default" 
                  className="mt-4 bg-[#FFD600] text-black hover:bg-[#FFD600]/80"
                  onClick={clearFilters}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              filteredDances.map((dance, index) => (
                <Card 
                  key={`${dance.genre}-${dance.id}`}
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
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-xs bg-[#FFD600] text-black px-2 py-0.5 rounded-full font-medium">
                        {dance.difficulty}
                      </span>
                      
                      {/* Genre badge when viewing All Styles */}
                      {selectedGenre === "all" && (
                        <span className="text-xs bg-gray-800 text-white px-2 py-0.5 rounded-full">
                          {dance.genre}
                        </span>
                      )}
                    </div>
                    
                    {/* Progress Indicator */}
                    <DanceProgressIndicator danceId={dance.id} totalModules={dance.keyMoves?.length || 5} />
                    
                    {dance.keyMoves && dance.keyMoves.length > 0 && (
                      <div className="mb-3 mt-3">
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
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DancePage;
