
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Music, Headphones, Share2, ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useCountryFlags } from "@/hooks/use-country-flags";
import { danceCurriculum } from "@/data/dance-curriculum";

const genreDescriptions = {
  afrobeats: "An energetic style from Nigeria and Ghana that blends traditional African movements with modern influences. Features powerful rhythmic footwork, hip movements, and expressive gestures, typically following faster-paced beats. Deeply connected to cultural identity and social expression, popularized through music videos and social media.",
  amapiano: "A South African style combining house, jazz, and kwaito elements. Features smoother, more melodic movements at a slower tempo (110-120 BPM), with an emphasis on fluid footwork. While Afrobeats is more energetic and percussive, Amapiano focuses on flowing, laid-back movements that follow melodic piano patterns. Has gained worldwide popularity through TikTok challenges."
};

const DancePage = () => {
  const [selectedGenre, setSelectedGenre] = useState("afrobeats");
  const isMobile = useIsMobile();
  const { getFlag } = useCountryFlags();
  const navigate = useNavigate();

  const handleDanceSelect = (dance: any) => {
    navigate(`/dance/${selectedGenre}/${dance.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-bold text-center mb-2 text-white font-heading">
          African Dance Curriculum
        </h1>
        <p className="text-center text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto text-sm sm:text-base">
          Learn authentic Afrobeats and Amapiano dances from beginner to advanced levels with our comprehensive curriculum.
        </p>

        <Card className="bg-black/70 border-[#FFD600] text-white mb-8">
          <CardHeader>
            <CardTitle className="text-[#FFD600]">Choose Your Dance Genre</CardTitle>
            <CardDescription className="text-gray-400">Select your preferred style</CardDescription>
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
                        ? "bg-[#008751] hover:bg-[#008751]/80" 
                        : "text-white border-white/20 hover:bg-white/10"
                    }`}
                  >
                    <Music className="mr-2 h-4 w-4" /> Afrobeats
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
                        ? "bg-[#008751] hover:bg-[#008751]/80" 
                        : "text-white border-white/20 hover:bg-white/10"
                    }`}
                  >
                    <Headphones className="mr-2 h-4 w-4" /> Amapiano
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
          {danceCurriculum[selectedGenre].map(dance => (
            <Card 
              key={dance.id}
              className="bg-black/70 border-white/20 hover:border-[#FFD600] transition-colors cursor-pointer text-white"
              onClick={() => handleDanceSelect(dance)}
            >
              {dance.tutorials && dance.tutorials[0] && (
                <div className="aspect-video w-full bg-gray-900">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${dance.tutorials[0].link.split('=')[1] || dance.tutorials[0].link.split('/').pop()}?controls=0`}
                    title={dance.name}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                </div>
              )}
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-[#FFD600]">{dance.name}</CardTitle>
                  {dance.origin && getFlag(dance.origin) && (
                    <img 
                      src={getFlag(dance.origin)} 
                      alt={dance.origin} 
                      className="w-6 h-4"
                      title={dance.origin}
                    />
                  )}
                </div>
                <CardDescription className="text-gray-400">
                  {dance.description.slice(0, 100)}...
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-[#FFD600] text-black px-2 py-0.5 rounded-full">
                    {dance.difficulty}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-white hover:text-[#FFD600] hover:bg-[#FFD600]/10"
                  >
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DancePage;
