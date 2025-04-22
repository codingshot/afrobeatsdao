import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Play, Youtube, Music, SkipForward, CircleChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCountryFlags } from "@/hooks/use-country-flags";
import { useGlobalAudioPlayer } from "@/components/GlobalAudioPlayer";
import { useDanceProgress } from "@/hooks/use-dance-progress";
import { Dance } from "./DanceDetails";
import { danceCurriculum } from "@/data/dance-curriculum";
import { Helmet } from "react-helmet";

interface DanceContentProps {
  dance: Dance;
}

export const DanceContent = ({ dance }: DanceContentProps) => {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [moduleVisible, setModuleVisible] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { getFlag } = useCountryFlags();
  
  const audioPlayer = useGlobalAudioPlayer();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { startDance, markModuleComplete, getDanceProgress } = useDanceProgress();
  const danceProgress = getDanceProgress(dance.id);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    console.log(`Viewing dance: ${dance.name} (${dance.id})`);
  }, [dance.id, dance.name]);

  const toggleModule = (index: number) => {
    setModuleVisible(moduleVisible === index ? null : index);
  };

  const createSongFromDanceData = (song: any) => ({
    id: `${song.title}-${song.artist}`,
    title: song.title,
    artist: song.artist,
    youtube: song.youtube,
  });

  const handlePlayNow = (song: any, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (audioPlayer && song) {
      try {
        audioPlayer.playNow(createSongFromDanceData(song));
        toast({
          title: "Now Playing",
          description: `${song.title} by ${song.artist}`,
        });
      } catch (error) {
        console.error("Error playing song:", error);
      }
    }
  };

  const handleAddToQueue = (song: any, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (audioPlayer && song) {
      try {
        audioPlayer.addToQueue(createSongFromDanceData(song));
        toast({
          title: "Added to Queue",
          description: `${song.title} by ${song.artist}`,
        });
      } catch (error) {
        console.error("Error adding song to queue:", error);
      }
    }
  };
  
  const handleModuleAction = (action: 'tutorial' | 'practice', moduleIndex: number, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    
    startDance(dance.id);
    markModuleComplete(dance.id, moduleIndex);
    
    if (action === 'practice' && dance.songs && dance.songs.length > 0) {
      const songIndex = moduleIndex % dance.songs.length;
      handlePlayNow(dance.songs[songIndex]);
    }
    
    toast({
      title: action === 'tutorial' ? "Tutorial Started" : "Practice Mode Started",
      description: `You've started ${action === 'tutorial' ? 'learning' : 'practicing'} ${dance.modules?.[moduleIndex] || "this module"}`,
    });
  };

  const findNextDance = () => {
    const categories = Object.keys(danceCurriculum);
    let currentCategoryIndex = -1;
    let currentDanceIndex = -1;

    categories.forEach((category, catIdx) => {
      const dances = danceCurriculum[category as keyof typeof danceCurriculum];
      const danceIdx = dances.findIndex(d => d.id === dance.id);
      if (danceIdx !== -1) {
        currentCategoryIndex = catIdx;
        currentDanceIndex = danceIdx;
      }
    });

    if (currentCategoryIndex === -1) return null;

    const currentCategory = categories[currentCategoryIndex];
    const dances = danceCurriculum[currentCategory as keyof typeof danceCurriculum];

    if (currentDanceIndex < dances.length - 1) {
      return {
        category: currentCategory,
        dance: dances[currentDanceIndex + 1]
      };
    }

    if (currentCategoryIndex < categories.length - 1) {
      const nextCategory = categories[currentCategoryIndex + 1];
      const nextCategoryDances = danceCurriculum[nextCategory as keyof typeof danceCurriculum];
      if (nextCategoryDances.length > 0) {
        return {
          category: nextCategory,
          dance: nextCategoryDances[0]
        };
      }
    }

    return null;
  };

  const handleNextDance = () => {
    const next = findNextDance();
    if (next) {
      navigate(`/dance/${next.category}/${next.dance.id}`);
    } else {
      toast({
        title: "Congratulations!",
        description: "You've reached the end of the dance curriculum!",
      });
    }
  };

  const calculateProgress = () => {
    if (!dance.modules || dance.modules.length === 0) return 0;
    return (danceProgress.moduleProgress.length * 100) / dance.modules.length;
  };

  const isTutorialAvailable = (tutorial: any) => {
    return tutorial && tutorial.link && (tutorial.link.includes('youtube.com') || tutorial.link.includes('youtu.be'));
  };

  return (
    <>
      <Helmet>
        <title>{dance.name} - Learn {dance.origin} Dance</title>
        <meta name="description" content={dance.description} />
        <meta property="og:title" content={`Learn ${dance.name} - African Dance Tutorial`} />
        <meta property="og:description" content={dance.description} />
        <meta property="og:type" content="article" />
        <meta name="keywords" content={`${dance.name.toLowerCase()}, ${dance.origin.toLowerCase()} dance, african dance tutorial, dance moves, ${dance.keyMoves?.map(m => m.name.toLowerCase()).join(', ')}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": `How to Dance ${dance.name}`,
            "description": dance.description,
            "totalTime": "PT2H",
            "step": dance.keyMoves?.map((move, index) => ({
              "@type": "HowToStep",
              "position": index + 1,
              "name": move.name,
              "itemListElement": move.steps.map(step => ({
                "@type": "HowToDirection",
                "text": step
              }))
            }))
          })}
        </script>
      </Helmet>

      <Card 
        className={`bg-black border-[#008751] text-white transition-opacity duration-500 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="p-4 sm:p-6 border-b border-[#008751]/30">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Progress:</span>
              <Progress 
                value={calculateProgress()} 
                className="w-32 sm:w-48 bg-gray-800"
              />
            </div>
            <Button
              onClick={handleNextDance}
              variant="outline"
              className="border-[#008751] bg-[#008751] text-white hover:bg-[#008751]/80 font-medium"
            >
              <CircleChevronRight className="mr-2 h-4 w-4" />
              Next Dance
            </Button>
          </div>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="p-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6 bg-gray-900">
            <TabsTrigger 
              value="overview" 
              className="data-[state=active]:bg-[#008751] data-[state=active]:text-white"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="learn" 
              className="data-[state=active]:bg-[#008751] data-[state=active]:text-white"
            >
              Step-by-Step
            </TabsTrigger>
            <TabsTrigger 
              value="music" 
              className="data-[state=active]:bg-[#008751] data-[state=active]:text-white"
            >
              Music
            </TabsTrigger>
            <TabsTrigger 
              value="culture" 
              className="data-[state=active]:bg-[#008751] data-[state=active]:text-white"
            >
              Cultural Context
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div>
              <h3 className="text-lg md:text-xl font-semibold mb-2 text-[#FFD600]">About {dance.name}</h3>
              <p className="text-gray-300 text-sm md:text-base">{dance.description}</p>
            </div>
            
            {dance.modules && (
              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-4 text-[#FFD600]">Learning Modules</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {dance.modules.map((module, idx) => (
                    <Card 
                      key={idx} 
                      className={`hover:bg-gray-900 transition-colors cursor-pointer bg-gray-900/50 border border-gray-800 ${moduleVisible === idx ? 'ring-2 ring-[#FFD600]' : ''}`}
                      onClick={() => toggleModule(idx)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-[#008751]/20 text-[#008751] flex items-center justify-center mr-3">
                            {idx + 1}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-sm md:text-base text-white">{module}</h4>
                            <p className="text-xs text-gray-400">
                              {idx === 0 ? "Beginner" : idx === 1 ? "Beginner-Intermediate" : 
                               idx === 2 ? "Intermediate" : "Advanced"}
                            </p>
                          </div>
                          <Badge
                            className={`ml-auto ${
                              danceProgress.moduleProgress.includes(idx)
                                ? "bg-[#008751]/20 text-[#008751]"
                                : "bg-[#FFD600]/20 text-[#FFD600]"
                            } hover:bg-[#FFD600]/30`}
                          >
                            {danceProgress.moduleProgress.includes(idx) ? 'Completed' : 'Start'}
                          </Badge>
                        </div>
                        
                        {moduleVisible === idx && (
                          <div className="mt-4 border-t border-gray-800 pt-4">
                            <div className="flex flex-col sm:flex-row gap-3 mb-3">
                              <Button 
                                variant="outline" 
                                className={`flex-1 ${
                                  dance.tutorials && dance.tutorials[0] 
                                  ? "border-[#008751] text-[#008751] hover:bg-[#008751]/10" 
                                  : "border-gray-600 text-gray-500 cursor-not-allowed"
                                }`}
                                onClick={() => dance.tutorials && dance.tutorials[0] && handleModuleAction('tutorial', idx)}
                                disabled={!dance.tutorials || !dance.tutorials[0]}
                              >
                                <Play className="mr-2 h-4 w-4" /> 
                                Tutorial
                                {(!dance.tutorials || !dance.tutorials[0]) && " (Unavailable)"}
                              </Button>
                              <Button 
                                variant="outline" 
                                className="flex-1 border-[#E63946] text-[#E63946] hover:bg-[#E63946]/10"
                                onClick={() => handleModuleAction('practice', idx)}
                              >
                                <Music className="mr-2 h-4 w-4" /> 
                                Practice
                              </Button>
                            </div>
                            <p className="text-sm text-gray-300">
                              This module covers the fundamental techniques for {module.toLowerCase()}. 
                              Great for {idx === 0 ? "absolute beginners" : idx === 1 ? "beginners with some experience" : 
                               idx === 2 ? "intermediate dancers" : "advanced dancers"}.
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="learn" className="space-y-6">
            {dance.tutorials && dance.tutorials[0] && (
              <div className="space-y-4">
                <h3 className="text-lg md:text-xl font-semibold text-[#FFD600]">Video Tutorial</h3>
                {isTutorialAvailable(dance.tutorials[0]) ? (
                  <>
                    <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
                      <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${dance.tutorials[0].link.split('=')[1] || dance.tutorials[0].link.split('/').pop()}`}
                        title={dance.tutorials[0].title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-white">{dance.tutorials[0].title}</h4>
                        <p className="text-sm text-gray-400">
                          By {dance.tutorials[0].creator || dance.tutorials[0].platform}
                        </p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-white border-gray-700 hover:bg-white/10"
                        onClick={() => window.open(dance.tutorials[0].link, '_blank')}
                      >
                        <Youtube className="mr-2 h-4 w-4" />
                        Open on YouTube
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="aspect-video bg-gray-900/50 rounded-lg flex items-center justify-center">
                    <p className="text-gray-400">Tutorial not available</p>
                  </div>
                )}
              </div>
            )}
            
            {dance.keyMoves && (
              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-4 text-[#FFD600]">Key Dance Moves</h3>
                <div className="space-y-4 sm:space-y-6">
                  {dance.keyMoves.map((move, idx) => (
                    <div key={idx} className="border border-gray-800 rounded-lg p-4 bg-gray-900/50">
                      <h4 className="font-semibold text-base sm:text-lg mb-2 text-white">{move.name}</h4>
                      <ol className="list-decimal pl-5 space-y-2 text-sm sm:text-base">
                        {move.steps.map((step, stepIdx) => (
                          <li key={stepIdx} className="text-gray-300">{step}</li>
                        ))}
                      </ol>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="music" className="space-y-6">
            {dance.songs && (
              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-4 text-[#FFD600]">Featured Songs</h3>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                  {dance.songs.map((song, idx) => (
                    <Card key={idx} className="overflow-hidden bg-gray-900 border-gray-800">
                      <div className="aspect-video">
                        <iframe
                          className="w-full h-full"
                          src={`https://www.youtube.com/embed/${song.youtube.split('=')[1] || song.youtube.split('/').pop()}`}
                          title={song.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                      <CardContent className="p-4">
                        <h4 className="font-medium text-sm md:text-base text-white">{song.title}</h4>
                        <p className="text-sm text-gray-400">{song.artist}</p>
                        <div className="flex items-center space-x-2 mt-3">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1 border-[#E63946] text-[#E63946] hover:bg-[#E63946]/10"
                            onClick={() => handlePlayNow(song)}
                          >
                            <Play className="mr-2 h-4 w-4" />
                            Play Now
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1 border-gray-700 text-white hover:bg-white/10"
                            onClick={() => handleAddToQueue(song)}
                          >
                            <SkipForward className="mr-2 h-4 w-4" />
                            Add to Queue
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="culture" className="space-y-6">
            {dance.culturalContext && (
              <div>
                <h3 className="text-xl font-semibold mb-4 text-[#FFD600]">Cultural Significance</h3>
                <Card className="bg-gray-900/50 border-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <p className="text-sm text-gray-400">Origin: </p>
                      <span className="ml-2 text-white font-medium">{dance.origin}</span>
                      {dance.origin && getFlag(dance.origin) && (
                        <img 
                          src={getFlag(dance.origin)} 
                          alt={dance.origin} 
                          className="w-6 h-4 ml-2"
                        />
                      )}
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      {dance.culturalContext}
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}
            
            <div>
              <h3 className="text-xl font-semibold mb-4 text-[#FFD600]">Historical Background</h3>
              <div className="space-y-4">
                {dance.origin === "Nigeria" || dance.origin === "Ghana" ? (
                  <Card className="bg-gray-900/50 border-gray-800">
                    <CardContent className="p-6">
                      <h4 className="font-semibold mb-2 text-white">Afrobeats Dance Evolution</h4>
                      <p className="text-gray-300 mb-4">
                        Afrobeats dance is a vibrant, energetic style originating from Sub-Saharan Africa, 
                        primarily Nigeria and Ghana, evolving alongside Afrobeats music—a fusion of highlife, 
                        hip-hop, jùjú, and global beats. It incorporates traditional African dance elements 
                        with modern urban influences, characterized by rhythmic footwork, hip movements, and 
                        expressive gestures.
                      </p>
                      <p className="text-gray-300">
                        Throughout the 2010s, dances like Azonto from Ghana and Shaku Shaku from Nigeria 
                        gained international recognition. By the 2020s, dances like Zanku had become global 
                        phenomena, spreading through social media and music videos.
                      </p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        <div className="flex items-center">
                          <span className="text-xs text-gray-400">Nigeria:</span>
                          <img src={getFlag("Nigeria")} alt="Nigeria" className="w-5 h-3 ml-1" />
                        </div>
                        <div className="flex items-center">
                          <span className="text-xs text-gray-400">Ghana:</span>
                          <img src={getFlag("Ghana")} alt="Ghana" className="w-5 h-3 ml-1" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="bg-gray-900/50 border-gray-800">
                    <CardContent className="p-6">
                      <h4 className="font-semibold mb-2 text-white">Amapiano Dance Evolution</h4>
                      <p className="text-gray-300 mb-4">
                        Amapiano, meaning "the pianos" in Zulu, is a South African genre blending deep house, 
                        jazz, kwaito, and Afrobeat, with dance styles emphasizing fluid, rhythmic footwork and 
                        expressive movements. Its dances are slower-paced (110–120 BPM) and melody-driven, 
                        often tied to specific tracks or challenges.
                      </p>
                      <p className="text-gray-300">
                        Emerging from South African townships in the mid-2010s, Amapiano dances gained global 
                        traction via platforms like TikTok, with viral challenges amplifying their reach. 
                        Dances like Gwara Gwara and more recently Tshwala Bam showcase the genre's 
                        cultural impact.
                      </p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        <div className="flex items-center">
                          <span className="text-xs text-gray-400">South Africa:</span>
                          <img src={getFlag("South Africa")} alt="South Africa" className="w-5 h-3 ml-1" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4 text-[#FFD600]">Additional Resources</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="bg-gray-900/50 border-gray-800">
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2 text-white">African Dance Dictionary</h4>
                    <p className="text-sm text-gray-400 mb-3">
                      Comprehensive collection of African dance tutorials and history
                    </p>
                    <Button variant="outline" size="sm" className="w-full text-white border-gray-700 hover:bg-white/10">
                      Visit Website
                    </Button>
                  </CardContent>
                </Card>
                <Card className="bg-gray-900/50 border-gray-800">
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2 text-white">Dance Communities</h4>
                    <p className="text-sm text-gray-400 mb-3">
                      Connect with dancers around the world
                    </p>
                    <Button variant="outline" size="sm" className="w-full text-white border-gray-700 hover:bg-white/10">
                      Join Community
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </>
  );
};
