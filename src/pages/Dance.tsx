import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Play, Music, Youtube, Instagram, Share2, Headphones, Volume2, SkipForward } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useCountryFlags } from "@/hooks/use-country-flags";
import { Song, useGlobalAudioPlayer } from "@/components/GlobalAudioPlayer";
import { Badge } from "@/components/ui/badge";

const danceCurriculum = {
  afrobeats: [
    {
      id: "zanku",
      name: "Zanku (Legwork)",
      origin: "Nigeria",
      description: "A popular dance move that involves intricate legwork and arm movements. Popularized by Nigerian artist Zlatan Ibile in 2018.",
      difficulty: "Medium",
      image: "https://placehold.co/600x400/7d4aff/ffffff?text=Zanku",
      modules: [
        "Basic Legwork Technique",
        "Arm Swing Coordination",
        "Body Bounce Variations",
        "Advanced Zanku Combinations"
      ],
      keyMoves: [
        {
          name: "Basic Legwork",
          steps: [
            "Feet shoulder-width apart, knees slightly bent",
            "Lift right foot, tap forward, cross over left leg",
            "Repeat with left foot, keeping rhythm (100-120 BPM)",
            "Add bounce for flow"
          ]
        },
        {
          name: "Arm Swing",
          steps: [
            "Swing right arm forward as left leg steps, and vice versa",
            "Add loose, punching motions for style"
          ]
        },
        {
          name: "Body Bounce",
          steps: [
            "Deepen knee bend, sway torso side-to-side",
            "Sync with Afrobeat tempo"
          ]
        }
      ],
      notableDancers: ["Zlatan Ibile", "Poco Lee", "Dancegod Lloyd", "Temprah"],
      songs: [
        {
          title: "Zanku (Legwork)",
          artist: "Zlatan Ibile",
          youtube: "https://www.youtube.com/watch?v=6R1zDsq2oXI",
          spotify: "https://open.spotify.com/track/2iVEsyq3nOvsn6yY2fK8y8"
        },
        {
          title: "Soapy",
          artist: "Naira Marley",
          youtube: "https://www.youtube.com/watch?v=5L0G91i0AZU",
          spotify: "https://open.spotify.com/track/3hWpsq7VFSW03BXfH6mUjC"
        }
      ],
      tutorials: [
        {
          title: "Zanku Dance Tutorial by Poco Lee",
          platform: "YouTube",
          link: "https://www.youtube.com/watch?v=9z4uF4v3Z8k"
        },
        {
          title: "15-Second Zanku Breakdown",
          platform: "TikTok",
          creator: "@dancegodlloyd",
          link: "#"
        }
      ],
      culturalContext: "Zanku embodies Nigerian youth culture, blending street swagger with communal joy. It's a storytelling medium, expressing resilience and has become a symbol of Nigeria's global Afrobeats influence."
    },
    {
      id: "azonto",
      name: "Azonto",
      origin: "Ghana",
      description: "A dance that originated in Ghana, characterized by complex hand and leg movements that often mimic everyday activities.",
      difficulty: "Medium-Hard",
      image: "https://placehold.co/600x400/f97316/ffffff?text=Azonto",
      modules: [
        "Hip Sway Fundamentals",
        "Mime Action Techniques",
        "Footwork Patterns",
        "Azonto Choreography"
      ],
      keyMoves: [
        {
          name: "Hip Sway",
          steps: [
            "Feet apart, knees bent, hips loose",
            "Shift hips left-right, syncing with rhythm",
            "Keep upper body relaxed"
          ]
        },
        {
          name: "Mime Actions",
          steps: [
            "Mimic daily tasks (washing, driving, etc.)",
            "Example: Extend arms, rotate wrists (stirring pot)"
          ]
        },
        {
          name: "Footwork",
          steps: [
            "Step right foot forward, then left, with shuffle",
            "Sync with hip sways"
          ]
        }
      ],
      notableDancers: ["Sarkodie", "Fuse ODG", "Afrobeast", "Incredible Zigi"],
      songs: [
        {
          title: "Azonto",
          artist: "Fuse ODG",
          youtube: "https://www.youtube.com/watch?v=RXV0YaN3Rhg",
          spotify: "https://open.spotify.com/track/3Yk3k3KCuCZ8vQXcV2W6pM"
        },
        {
          title: "U Go Kill Me",
          artist: "Sarkodie",
          youtube: "https://www.youtube.com/watch?v=3Y9z7rK8VqM",
          spotify: "https://open.spotify.com/track/5b3z8z7Y8z9xQz3x4Y5z6Z"
        }
      ],
      tutorials: [
        {
          title: "Azonto Dance Tutorial",
          platform: "YouTube",
          creator: "DWP Academy",
          link: "https://www.youtube.com/watch?v=7z8z9xQz3x4"
        },
        {
          title: "Azonto Basics",
          platform: "Instagram",
          creator: "@incrediblezigi",
          link: "#"
        }
      ],
      culturalContext: "Azonto celebrates Ghanaian identity, blending Ga movements with modern flair. Performed at gatherings, it reflects joy and creativity and represents Ghana's contribution to global Afrobeats culture."
    },
    {
      id: "shaku-shaku",
      name: "Shaku Shaku",
      origin: "Nigeria",
      description: "A street dance that originated from the streets of Lagos, involving crossed arms and specific leg movements.",
      difficulty: "Easy-Medium",
      image: "https://placehold.co/600x400/008751/ffffff?text=Shaku+Shaku",
      modules: [
        "Cross-Step Basics",
        "Arm Movement Technique",
        "Body Shake Coordination",
        "Shaku Shaku Freestyle"
      ],
      culturalContext: "Shaku Shaku emerged from Lagos streets in the mid-2010s and reflects urban Nigerian youth expression and creativity."
    }
  ],
  amapiano: [
    {
      id: "gwara-gwara",
      name: "Gwara Gwara",
      origin: "South Africa",
      description: "A popular dance move that involves a rolling hand movement while stepping side to side. Made globally famous after being featured in several music videos.",
      difficulty: "Medium",
      image: "https://placehold.co/600x400/FFD600/000000?text=Gwara+Gwara",
      modules: [
        "Leg Wind Technique",
        "Arm Swing Coordination",
        "Shoulder Pop Mastery",
        "Gwara Gwara Combinations"
      ],
      keyMoves: [
        {
          name: "Leg Wind",
          steps: [
            "Weight on left leg, lift right leg slightly",
            "Rotate right leg outward, plant down",
            "Repeat with left leg, keeping rhythm"
          ]
        },
        {
          name: "Arm Swing",
          steps: [
            "Swing left arm as right leg winds, and vice versa",
            "Keep arms loose"
          ]
        },
        {
          name: "Shoulder Pop",
          steps: [
            "Pop right shoulder as right leg winds",
            "Alternate with left shoulder"
          ]
        }
      ],
      notableDancers: ["DJ Bongz", "Hope Ramafalo", "Laduma Ngxokolo", "Hlogi Mash"],
      songs: [
        {
          title: "Ofana Nawe",
          artist: "DJ Bongz",
          youtube: "https://www.youtube.com/watch?v=8z9xQz3x4Y5",
          spotify: "https://open.spotify.com/track/4b3z8z7Y8z9xQz3x4Y5z6Z"
        },
        {
          title: "Ke Star",
          artist: "Focalistic",
          youtube: "https://www.youtube.com/watch?v=3z8z7Y8z9xQz3x4Y5",
          spotify: "https://open.spotify.com/track/5b3z8z7Y8z9xQz3x4Y5z6Z"
        }
      ],
      tutorials: [
        {
          title: "Gwara Gwara Tutorial",
          platform: "YouTube",
          creator: "Hope Ramafalo",
          link: "https://www.youtube.com/watch?v=7z8z9xQz3x4Y5"
        },
        {
          title: "Learn Gwara Gwara",
          platform: "TikTok",
          creator: "@hoperamafalo",
          link: "#"
        }
      ],
      culturalContext: "Gwara Gwara reflects township resilience, blending traditional and modern influences. Performed at events, it fosters community and showcases Amapiano's global rise and South African innovation."
    },
    {
      id: "tshwala-bam",
      name: "Tshwala Bam",
      origin: "South Africa",
      description: "A trending Amapiano dance that went viral on social media in 2024. Features distinctive side steps and arm movements.",
      difficulty: "Easy-Medium",
      image: "https://placehold.co/600x400/ffd600/000000?text=Tshwala+Bam",
      modules: [
        "Side Step Fundamentals",
        "Arm Wave Technique",
        "Hip Dip Variations",
        "Tshwala Bam Flow"
      ],
      keyMoves: [
        {
          name: "Side Step",
          steps: [
            "Feet shoulder-width apart, knees bent",
            "Step right foot to side, drag left foot",
            "Repeat left, syncing bassline (110-120 BPM)"
          ]
        },
        {
          name: "Arm Wave",
          steps: [
            "Extend arms, wave right arm as right foot steps",
            "Alternate with left arm, fluid motion"
          ]
        },
        {
          name: "Hip Dip",
          steps: [
            "Dip hips right as right foot steps, then left",
            "Add bounce for groove"
          ]
        }
      ],
      notableDancers: ["TitoM & Yuppe", "Hope Ramafalo", "Limpopo Boy", "Neema Mwande"],
      songs: [
        {
          title: "Tshwala Bam",
          artist: "TitoM & Yuppe",
          youtube: "https://www.youtube.com/watch?v=3z8z7Y8z9xQz3x4Y5z6",
          spotify: "https://open.spotify.com/track/2iZ8z7Y8z9xQz3x4Y5z6Z0"
        },
        {
          title: "Soweto Baby",
          artist: "DJ Maphorisa",
          youtube: "https://www.youtube.com/watch?v=8z9xQz3x4Y5z6Z7",
          spotify: "https://open.spotify.com/track/5b3z8z7Y8z9xQz3x4Y5z6Z"
        }
      ],
      tutorials: [
        {
          title: "Tshwala Bam Tutorial",
          platform: "YouTube",
          creator: "Limpopo Boy",
          link: "https://www.youtube.com/watch?v=7z8z9xQz3x4Y5z6"
        },
        {
          title: "Tshwala Bam Basics",
          platform: "Instagram",
          creator: "@neemamwande",
          link: "#"
        }
      ],
      culturalContext: "Tshwala Bam reflects Amapiano's social media evolution, uniting dancers via viral challenges. It embodies township energy and showcases Amapiano's global dominance."
    },
    {
      id: "vosho",
      name: "Vosho",
      origin: "South Africa",
      description: "A dance characterized by rapid squatting movements while maintaining rhythm. Requires strong leg muscles and balance.",
      difficulty: "Hard",
      image: "https://placehold.co/600x400/008751/ffffff?text=Vosho",
      modules: [
        "Deep Stomp Technique",
        "Arm Swing Coordination",
        "Hip Sway Mastery",
        "Vosho Endurance"
      ],
      culturalContext: "Vosho emerged from Gauteng townships in the late 2010s, representing youth expressiveness and physicality. It symbolizes strength and resilience."
    }
  ]
};

const DancePage = () => {
  const [selectedGenre, setSelectedGenre] = useState("afrobeats");
  const [selectedDance, setSelectedDance] = useState(danceCurriculum.afrobeats[0]);
  const [selectedTab, setSelectedTab] = useState("overview");
  const [quickStartVisible, setQuickStartVisible] = useState(true);
  const [moduleVisible, setModuleVisible] = useState<number | null>(null);
  const isMobile = useIsMobile();
  const { getFlag } = useCountryFlags();
  const audioPlayer = useGlobalAudioPlayer();

  const handleDanceSelect = (dance: any) => {
    const foundDance = [...danceCurriculum.afrobeats, ...danceCurriculum.amapiano].find(d => d.id === dance.id);
    if (foundDance) {
      setSelectedDance(foundDance);
      setSelectedTab("overview");
    }
  };

  const toggleModule = (index: number) => {
    if (moduleVisible === index) {
      setModuleVisible(null);
    } else {
      setModuleVisible(index);
    }
  };

  const createSongFromDanceData = (song: any): Song => {
    return {
      id: song.title + song.artist,
      title: song.title,
      artist: song.artist,
      youtube: song.youtube,
    };
  };

  const playSong = (song: any) => {
    audioPlayer.playNow(createSongFromDanceData(song));
  };

  const addSongToQueue = (song: any) => {
    audioPlayer.addToQueue(createSongFromDanceData(song));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-bold text-center mb-2 text-white font-heading">
          African Dance Curriculum
        </h1>
        <p className="text-center text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto text-sm sm:text-base">
          Learn authentic Afrobeats and Amapiano dances from beginner to advanced levels with our comprehensive curriculum. 
          Featuring cultural context, step-by-step tutorials, and progress tracking.
        </p>
        
        {quickStartVisible && (
          <Card className="mb-8 border border-[#FFD600] bg-black/70 shadow-lg shadow-[#FFD600]/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-2xl text-[#FFD600] font-heading">Quick Start Guide</CardTitle>
                <CardDescription className="text-gray-300">Begin your dance journey in just a few steps</CardDescription>
              </div>
              <Button 
                variant="ghost" 
                className="text-white hover:bg-white/10" 
                onClick={() => setQuickStartVisible(false)}
              >
                <span className="sr-only">Close</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#E63946]/20 p-4 rounded-lg border border-[#E63946]/40">
                  <div className="w-12 h-12 bg-[#E63946]/30 text-[#E63946] rounded-full flex items-center justify-center mb-3">
                    <span className="text-xl font-bold">1</span>
                  </div>
                  <h3 className="font-medium text-white mb-2">Choose a Dance Style</h3>
                  <p className="text-sm text-gray-300 mb-3">Select either Afrobeats or Amapiano to start your journey</p>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant={selectedGenre === "afrobeats" ? "default" : "outline"}
                      onClick={() => setSelectedGenre("afrobeats")}
                      className={selectedGenre === "afrobeats" ? "bg-[#E63946] hover:bg-[#E63946]/80" : ""}
                    >
                      Afrobeats
                    </Button>
                    <Button 
                      size="sm" 
                      variant={selectedGenre === "amapiano" ? "default" : "outline"}
                      onClick={() => setSelectedGenre("amapiano")}
                      className={selectedGenre === "amapiano" ? "bg-[#E63946] hover:bg-[#E63946]/80" : ""}
                    >
                      Amapiano
                    </Button>
                  </div>
                </div>
                
                <div className="bg-[#008751]/20 p-4 rounded-lg border border-[#008751]/40">
                  <div className="w-12 h-12 bg-[#008751]/30 text-[#008751] rounded-full flex items-center justify-center mb-3">
                    <span className="text-xl font-bold">2</span>
                  </div>
                  <h3 className="font-medium text-white mb-2">Pick a Specific Dance</h3>
                  <p className="text-sm text-gray-300 mb-3">Explore our curated collection of authentic dances</p>
                  <div className="grid grid-cols-2 gap-2">
                    {danceCurriculum[selectedGenre].slice(0, 4).map((dance) => (
                      <Button 
                        key={dance.id}
                        size="sm" 
                        variant={selectedDance.id === dance.id ? "default" : "outline"}
                        onClick={() => handleDanceSelect(dance)}
                        className={selectedDance.id === dance.id ? "bg-[#008751] hover:bg-[#008751]/80" : ""}
                      >
                        {dance.name}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="bg-[#FFD600]/20 p-4 rounded-lg border border-[#FFD600]/40">
                  <div className="w-12 h-12 bg-[#FFD600]/30 text-[#FFD600] rounded-full flex items-center justify-center mb-3">
                    <span className="text-xl font-bold">3</span>
                  </div>
                  <h3 className="font-medium text-white mb-2">Start Learning</h3>
                  <p className="text-sm text-gray-300 mb-3">Jump straight into step-by-step tutorials</p>
                  <Button 
                    className="w-full bg-[#FFD600] hover:bg-[#FFD600]/80 text-black"
                    onClick={() => {
                      setSelectedTab("learn");
                      setQuickStartVisible(false);
                    }}
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Start Learning {selectedDance.name}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8">
          <div className={`${isMobile ? 'order-2' : 'lg:col-span-3'}`}>
            <div className={`${isMobile ? 'space-y-4' : 'sticky top-4 space-y-6'}`}>
              <Card className="bg-black border-[#008751] text-white">
                <CardHeader className="pb-3">
                  <CardTitle className="text-[#FFD600]">Dance Styles</CardTitle>
                  <CardDescription className="text-gray-400">Choose your dance genre</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col space-y-2">
                    <Button 
                      variant={selectedGenre === "afrobeats" ? "default" : "outline"}
                      onClick={() => setSelectedGenre("afrobeats")}
                      className={`justify-start ${selectedGenre === "afrobeats" ? "bg-[#008751] hover:bg-[#008751]/80" : "text-white border-gray-700 hover:bg-white/10"}`}
                    >
                      <Music className="mr-2 h-4 w-4" /> Afrobeats
                    </Button>
                    <Button 
                      variant={selectedGenre === "amapiano" ? "default" : "outline"}
                      onClick={() => setSelectedGenre("amapiano")}
                      className={`justify-start ${selectedGenre === "amapiano" ? "bg-[#008751] hover:bg-[#008751]/80" : "text-white border-gray-700 hover:bg-white/10"}`}
                    >
                      <Headphones className="mr-2 h-4 w-4" /> Amapiano
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-black border-[#008751] text-white">
                <CardHeader className="pb-3">
                  <CardTitle className="text-[#FFD600]">{selectedGenre === "afrobeats" ? "Afrobeats" : "Amapiano"} Dances</CardTitle>
                  <CardDescription className="text-gray-400">Select a dance to learn</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col space-y-2">
                    {danceCurriculum[selectedGenre].map(dance => (
                      <Button 
                        key={dance.id}
                        variant={selectedDance.id === dance.id ? "default" : "outline"}
                        onClick={() => handleDanceSelect(dance)}
                        className={`justify-start text-left ${selectedDance.id === dance.id ? "bg-[#008751] hover:bg-[#008751]/80" : "text-white border-gray-700 hover:bg-white/10"}`}
                      >
                        <div className="flex items-center w-full">
                          <span>{dance.name}</span>
                          {dance.origin && getFlag(dance.origin) && (
                            <img 
                              src={getFlag(dance.origin)} 
                              alt={dance.origin} 
                              className="w-5 h-3 ml-2"
                              title={dance.origin}
                            />
                          )}
                          <span className="ml-auto text-xs bg-[#FFD600]/80 text-black px-2 py-0.5 rounded-full">
                            {dance.difficulty}
                          </span>
                        </div>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {selectedDance.songs && (
                <Card className="bg-black border-[#FFD600] text-white">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-[#FFD600]">Trending Songs</CardTitle>
                    <CardDescription className="text-gray-400">Popular tracks for {selectedDance.name}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedDance.songs.map((song, idx) => (
                        <div key={idx} className="flex items-center p-2 rounded hover:bg-white/5 group">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 mr-2 text-[#FFD600] hover:bg-[#FFD600]/20 hover:text-[#FFD600]"
                            onClick={() => playSong(song)}
                          >
                            <Play className="h-4 w-4" />
                          </Button>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">{song.title}</p>
                            <p className="text-xs text-gray-400 truncate">{song.artist}</p>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-white hover:bg-white/10"
                            onClick={() => addSongToQueue(song)}
                          >
                            <SkipForward className="h-4 w-4" />
                            <span className="sr-only">Add to queue</span>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
          
          <div className={`${isMobile ? 'order-1' : 'lg:col-span-9'}`}>
            <Card className="shadow-lg bg-black border-[#008751] text-white">
              <div className="relative">
                <div className="h-36 sm:h-48 md:h-64 bg-gradient-to-r from-[#008751] to-[#F97316] rounded-t-lg flex items-center justify-center overflow-hidden">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white z-10 text-center px-4 font-heading">
                    {selectedDance.name}
                  </h2>
                  <div className="absolute inset-0 bg-black/30"></div>
                </div>
                <div className="absolute bottom-0 left-0 bg-black/70 backdrop-blur-sm px-2 sm:px-4 py-1 rounded-tr-lg">
                  <div className="flex items-center">
                    <p className="text-xs sm:text-sm font-medium text-white">Origin: <span className="text-[#FFD600]">{selectedDance.origin}</span></p>
                    {selectedDance.origin && getFlag(selectedDance.origin) && (
                      <img 
                        src={getFlag(selectedDance.origin)} 
                        alt={selectedDance.origin} 
                        className="w-5 h-3 ml-2"
                      />
                    )}
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 bg-black/70 backdrop-blur-sm px-2 sm:px-4 py-1 rounded-tl-lg">
                  <p className="text-xs sm:text-sm font-medium text-white">Difficulty: <span className="text-[#FFD600]">{selectedDance.difficulty}</span></p>
                </div>
              </div>
              
              <Tabs value={selectedTab} onValueChange={setSelectedTab} className="p-4 sm:p-6">
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
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 text-[#FFD600]">About {selectedDance.name}</h3>
                    <p className="text-gray-300 text-sm sm:text-base">{selectedDance.description}</p>
                  </div>
                  
                  {selectedDance.modules && (
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold mb-4 text-[#FFD600]">Learning Modules</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {selectedDance.modules.map((module, idx) => (
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
                                  <h4 className="font-medium text-sm sm:text-base text-white">{module}</h4>
                                  <p className="text-xs text-gray-400">
                                    {idx === 0 ? "Beginner" : idx === 1 ? "Beginner-Intermediate" : 
                                     idx === 2 ? "Intermediate" : "Advanced"}
                                  </p>
                                </div>
                                <Badge
                                  className="ml-auto bg-[#FFD600]/20 text-[#FFD600] hover:bg-[#FFD600]/30"
                                >
                                  {moduleVisible === idx ? 'Selected' : 'Start'}
                                </Badge>
                              </div>
                              
                              {moduleVisible === idx && (
                                <div className="mt-4 border-t border-gray-800 pt-4">
                                  <div className="flex flex-col sm:flex-row gap-3 mb-3">
                                    <Button variant="outline" className="flex-1 border-[#008751] text-[#008751] hover:bg-[#008751]/10">
                                      <Play className="mr-2 h-4 w-4" /> 
                                      Tutorial
                                    </Button>
                                    <Button variant="outline" className="flex-1 border-[#E63946] text-[#E63946] hover:bg-[#E63946]/10">
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
                  {selectedDance.tutorials && selectedDance.tutorials[0] && (
                    <div className="space-y-4">
                      <h3 className="text-lg sm:text-xl font-semibold text-[#FFD600]">Video Tutorial</h3>
                      <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
                        <iframe
                          className="w-full h-full"
                          src={`https://www.youtube.com/embed/${selectedDance.tutorials[0].link.split('=')[1] || selectedDance.tutorials[0].link.split('/').pop()}`}
                          title={selectedDance.tutorials[0].title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-white">{selectedDance.tutorials[0].title}</h4>
                          <p className="text-sm text-gray-400">
                            By {selectedDance.tutorials[0].creator || selectedDance.tutorials[0].platform}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="text-white border-gray-700 hover:bg-white/10">
                            <Youtube className="mr-2 h-4 w-4" />
                            Open on YouTube
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {selectedDance.keyMoves && (
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold mb-4 text-[#FFD600]">Key Dance Moves</h3>
                      <div className="space-y-4 sm:space-y-6">
                        {selectedDance.keyMoves.map((move, idx) => (
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
                  {selectedDance.songs && (
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold mb-4 text-[#FFD600]">Featured Songs</h3>
                      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                        {selectedDance.songs.map((song, idx) => (
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
                              <h4 className="font-medium text-sm sm:text-base text-white">{song.title}</h4>
                              <p className="text-sm text-gray-400">{song.artist}</p>
                              <div className="flex items-center space-x-2 mt-3">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="flex-1 border-[#E63946] text-[#E63946] hover:bg-[#E63946]/10"
                                  onClick={() => playSong(song)}
                                >
                                  <Play className="mr-2 h-4 w-4" />
                                  Play Now
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="flex-1 border-gray-700 text-white hover:bg-white/10"
                                  onClick={() => addSongToQueue(song)}
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
                  {selectedDance.culturalContext && (
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-[#FFD600]">Cultural Significance</h3>
                      <Card className="bg-gray-900/50 border-gray-800">
                        <CardContent className="p-6">
                          <div className="flex items-center mb-4">
                            <p className="text-sm text-gray-400">Origin: </p>
                            <span className="ml-2 text-white font-medium">{selectedDance.origin}</span>
                            {selectedDance.origin && getFlag(selectedDance.origin) && (
                              <img 
                                src={getFlag(selectedDance.origin)} 
                                alt={selectedDance.origin} 
                                className="w-6 h-4 ml-2"
                              />
                            )}
                          </div>
                          <p className="text-gray-300 leading-relaxed">
                            {selectedDance.culturalContext}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-[#FFD600]">Historical Background</h3>
                    <div className="space-y-4">
                      {selectedGenre === "afrobeats" ? (
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
              
              <div className="p-4 sm:p-6 pt-0">
                <div className="flex flex-wrap justify-between items-center gap-4">
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-white border-gray-700 hover:bg-white/10"
                    >
                      <Share2 className="mr-2 h-4 w-4" /> Share
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-white border-gray-700 hover:bg-white/10"
                    >
                      Save for Later
                    </Button>
                  </div>
                </div>
                
                <div className="w-full mt-4">
                  <h3 className="text-sm font-medium mb-2 text-gray-300">Explore Other Dances</h3>
                  <Carousel className="w-full">
                    <CarouselContent>
                      {[...danceCurriculum.afrobeats, ...danceCurriculum.amapiano].map(dance => (
                        <CarouselItem key={dance.id} className="md:basis-1/3 lg:basis-1/4">
                          <div className="p-1">
                            <Card 
                              className="cursor-pointer hover:shadow-md transition-shadow bg-gray-900/50 border-gray-800 hover:border-[#FFD600]" 
                              onClick={() => handleDanceSelect(dance)}
                            >
                              <div 
                                className="h-24 rounded-t-lg flex items-center justify-center relative"
                                style={{ 
                                  backgroundImage: `url(${dance.image})`, 
                                  backgroundSize: 'cover',
                                  backgroundPosition: 'center'
                                }}
                              >
                                <div className="absolute inset-0 bg-black/50 rounded-t-lg"></div>
                                <div className="z-10 flex items-center justify-center">
                                  <h4 className="text-white font-semibold text-center px-2">{dance.name}</h4>
                                  {dance.origin && getFlag(dance.origin) && (
                                    <img 
                                      src={getFlag(dance.origin)} 
                                      alt={dance.origin} 
                                      className="w-5 h-3 ml-2"
                                    />
                                  )}
                                </div>
                              </div>
                              <div className="p-2 flex items-center justify-between">
                                <span className="bg-[#FFD600]/80 text-black text-xs px-2 py-0.5 rounded-full">
                                  {dance.difficulty}
                                </span>
                                <span className="text-xs text-gray-400">
                                  {dance.origin}
                                </span>
                              </div>
                            </Card>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden sm:flex" />
                    <CarouselNext className="hidden sm:flex" />
                  </Carousel>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      
      <div className="h-24"></div>
    </div>
  );
};

export default DancePage;
