
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsItem, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Play, Music, Youtube, Instagram, Share2, Headphones } from "lucide-react";

// Dance curriculum data
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

const DanceOfDay = () => {
  const [selectedGenre, setSelectedGenre] = useState("afrobeats");
  const [selectedDance, setSelectedDance] = useState(danceCurriculum.afrobeats[0]);
  const [selectedTab, setSelectedTab] = useState("overview");

  // Handle dance selection
  const handleDanceSelect = (dance) => {
    const foundDance = [...danceCurriculum.afrobeats, ...danceCurriculum.amapiano].find(d => d.id === dance.id);
    if (foundDance) {
      setSelectedDance(foundDance);
      setSelectedTab("overview");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-afrobg to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2 text-afro-black">African Dance Curriculum</h1>
        <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
          Learn authentic Afrobeats and Amapiano dances from beginner to advanced levels with our comprehensive curriculum. 
          Featuring cultural context, step-by-step tutorials, and progress tracking.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-3">
            <div className="sticky top-4 space-y-6">
              {/* Genre Selector */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Dance Styles</CardTitle>
                  <CardDescription>Choose your dance genre</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col space-y-2">
                    <Button 
                      variant={selectedGenre === "afrobeats" ? "default" : "outline"}
                      onClick={() => setSelectedGenre("afrobeats")}
                      className="justify-start"
                    >
                      <Music className="mr-2" /> Afrobeats
                    </Button>
                    <Button 
                      variant={selectedGenre === "amapiano" ? "default" : "outline"}
                      onClick={() => setSelectedGenre("amapiano")}
                      className="justify-start"
                    >
                      <Headphones className="mr-2" /> Amapiano
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Dance List */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>{selectedGenre === "afrobeats" ? "Afrobeats" : "Amapiano"} Dances</CardTitle>
                  <CardDescription>Select a dance to learn</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col space-y-2">
                    {danceCurriculum[selectedGenre].map(dance => (
                      <Button 
                        key={dance.id}
                        variant={selectedDance.id === dance.id ? "default" : "outline"}
                        onClick={() => handleDanceSelect(dance)}
                        className="justify-start text-left"
                      >
                        {dance.name}
                        <span className="ml-auto text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                          {dance.difficulty}
                        </span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Progress Tracking */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Your Progress</CardTitle>
                  <CardDescription>Track your learning journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Zanku</span>
                        <span>30%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-primary h-2.5 rounded-full" style={{ width: "30%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Gwara Gwara</span>
                        <span>15%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-primary h-2.5 rounded-full" style={{ width: "15%" }}></div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">View All Progress</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Main Content Area */}
          <div className="lg:col-span-9">
            <Card className="shadow-lg">
              {/* Dance Header */}
              <div className="relative">
                <div className="h-48 md:h-64 bg-gradient-to-r from-primary to-afro-orange rounded-t-lg flex items-center justify-center overflow-hidden">
                  <h2 className="text-3xl md:text-4xl font-bold text-white z-10 text-center px-4">
                    {selectedDance.name}
                  </h2>
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>
                <div className="absolute bottom-0 left-0 bg-white px-4 py-1 rounded-tr-lg">
                  <p className="text-sm font-medium">Origin: <span className="text-primary">{selectedDance.origin}</span></p>
                </div>
                <div className="absolute bottom-0 right-0 bg-white px-4 py-1 rounded-tl-lg">
                  <p className="text-sm font-medium">Difficulty: <span className="text-primary">{selectedDance.difficulty}</span></p>
                </div>
              </div>
              
              {/* Content Tabs */}
              <Tabs value={selectedTab} onValueChange={setSelectedTab} className="p-6">
                <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="learn">Step-by-Step</TabsTrigger>
                  <TabsTrigger value="music">Music</TabsTrigger>
                  <TabsTrigger value="culture">Cultural Context</TabsTrigger>
                </TabsList>
                
                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">About {selectedDance.name}</h3>
                    <p className="text-gray-700">{selectedDance.description}</p>
                  </div>
                  
                  {/* Learning Modules */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Learning Modules</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {selectedDance.modules && selectedDance.modules.map((module, idx) => (
                        <Card key={idx} className="hover:bg-gray-50 transition-colors">
                          <CardContent className="p-4 flex items-center">
                            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3">
                              {idx + 1}
                            </div>
                            <div>
                              <h4 className="font-medium">{module}</h4>
                              <p className="text-xs text-gray-500">
                                {idx === 0 ? "Beginner" : idx === 1 ? "Beginner-Intermediate" : 
                                 idx === 2 ? "Intermediate" : "Advanced"}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                  
                  {/* Notable Dancers */}
                  {selectedDance.notableDancers && (
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Notable Dancers & Choreographers</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedDance.notableDancers.map((dancer, idx) => (
                          <span key={idx} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                            {dancer}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Practice Challenge */}
                  <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-2">
                          🔥
                        </span>
                        Weekly Challenge
                      </h3>
                      <p className="mb-4">Record a 15-second clip of your {selectedDance.name} skills and share it with #AfroVibes2025!</p>
                      <Button>Join Challenge</Button>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Learn Tab */}
                <TabsContent value="learn" className="space-y-6">
                  {/* Video Placeholder */}
                  <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center mb-6">
                    <div className="text-center">
                      <Play size={48} className="mx-auto mb-2 text-gray-400" />
                      <p className="text-gray-500">Tutorial video preview</p>
                    </div>
                  </div>
                  
                  {/* Step-by-Step */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Key Dance Moves</h3>
                    <div className="space-y-6">
                      {selectedDance.keyMoves && selectedDance.keyMoves.map((move, idx) => (
                        <div key={idx} className="border rounded-lg p-4">
                          <h4 className="font-semibold text-lg mb-2">{move.name}</h4>
                          <ol className="list-decimal pl-5 space-y-2">
                            {move.steps.map((step, stepIdx) => (
                              <li key={stepIdx} className="text-gray-700">{step}</li>
                            ))}
                          </ol>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* External Tutorials */}
                  {selectedDance.tutorials && (
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Tutorial Videos</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {selectedDance.tutorials.map((tutorial, idx) => (
                          <Card key={idx}>
                            <CardContent className="p-4">
                              <div className="flex items-center mb-2">
                                {tutorial.platform === "YouTube" ? (
                                  <Youtube className="text-red-600 mr-2" size={20} />
                                ) : tutorial.platform === "TikTok" ? (
                                  <span className="mr-2 text-black font-bold">TT</span>
                                ) : (
                                  <Instagram className="text-pink-600 mr-2" size={20} />
                                )}
                                <span className="text-sm text-gray-500">{tutorial.platform}</span>
                              </div>
                              <h4 className="font-medium">{tutorial.title}</h4>
                              {tutorial.creator && (
                                <p className="text-xs text-gray-500 mb-2">By {tutorial.creator}</p>
                              )}
                              <Button variant="outline" size="sm" className="w-full" asChild>
                                <a href={tutorial.link} target="_blank" rel="noopener noreferrer">
                                  Watch Tutorial
                                </a>
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Practice Tips */}
                  <Card className="bg-gray-50">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-2">Practice Tips</h3>
                      <ul className="list-disc pl-5 space-y-1 text-gray-700">
                        <li>Start slowly, focusing on technique before speed</li>
                        <li>Practice in front of a mirror to check your form</li>
                        <li>Record yourself to track your progress</li>
                        <li>Try 10-15 minutes of daily practice for best results</li>
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Music Tab */}
                <TabsContent value="music" className="space-y-6">
                  <h3 className="text-xl font-semibold mb-4">Popular Songs for {selectedDance.name}</h3>
                  
                  {selectedDance.songs && (
                    <div className="space-y-4">
                      {selectedDance.songs.map((song, idx) => (
                        <Card key={idx}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium">{song.title}</h4>
                                <p className="text-sm text-gray-500">{song.artist}</p>
                              </div>
                              <div className="flex space-x-2">
                                <Button variant="outline" size="icon" className="h-8 w-8" asChild>
                                  <a href={song.youtube} target="_blank" rel="noopener noreferrer">
                                    <Youtube size={16} />
                                  </a>
                                </Button>
                                {song.spotify && (
                                  <Button variant="outline" size="icon" className="h-8 w-8 bg-[#1DB954] text-white hover:bg-[#1DB954]/90 border-0" asChild>
                                    <a href={song.spotify} target="_blank" rel="noopener noreferrer">
                                      <Headphones size={16} />
                                    </a>
                                  </Button>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                  
                  {/* Practice Playlists */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Practice Playlists</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Card className="bg-gradient-to-br from-[#1DB954]/90 to-[#1DB954] text-white">
                        <CardContent className="p-6">
                          <Headphones className="mb-2" size={24} />
                          <h4 className="font-semibold text-lg">{selectedDance.name} Beats</h4>
                          <p className="text-sm opacity-80 mb-4">20 songs • 1h 15m</p>
                          <Button variant="secondary" size="sm" className="bg-white text-[#1DB954] hover:bg-white/90">
                            Listen on Spotify
                          </Button>
                        </CardContent>
                      </Card>
                      <Card className="bg-gradient-to-br from-red-500/90 to-red-500 text-white">
                        <CardContent className="p-6">
                          <Youtube className="mb-2" size={24} />
                          <h4 className="font-semibold text-lg">Dance Practice Mix</h4>
                          <p className="text-sm opacity-80 mb-4">15 videos • 45m</p>
                          <Button variant="secondary" size="sm" className="bg-white text-red-500 hover:bg-white/90">
                            Watch on YouTube
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Cultural Context Tab */}
                <TabsContent value="culture" className="space-y-6">
                  {selectedDance.culturalContext && (
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Cultural Significance</h3>
                      <Card className="bg-gray-50">
                        <CardContent className="p-6">
                          <p className="text-gray-700 leading-relaxed">
                            {selectedDance.culturalContext}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                  
                  {/* Historical Context */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Historical Background</h3>
                    <div className="space-y-4">
                      {selectedGenre === "afrobeats" ? (
                        <Card>
                          <CardContent className="p-6">
                            <h4 className="font-semibold mb-2">Afrobeats Dance Evolution</h4>
                            <p className="text-gray-700 mb-4">
                              Afrobeats dance is a vibrant, energetic style originating from Sub-Saharan Africa, 
                              primarily Nigeria and Ghana, evolving alongside Afrobeats music—a fusion of highlife, 
                              hip-hop, jùjú, and global beats. It incorporates traditional African dance elements 
                              with modern urban influences, characterized by rhythmic footwork, hip movements, and 
                              expressive gestures.
                            </p>
                            <p className="text-gray-700">
                              Throughout the 2010s, dances like Azonto from Ghana and Shaku Shaku from Nigeria 
                              gained international recognition. By the 2020s, dances like Zanku had become global 
                              phenomena, spreading through social media and music videos.
                            </p>
                          </CardContent>
                        </Card>
                      ) : (
                        <Card>
                          <CardContent className="p-6">
                            <h4 className="font-semibold mb-2">Amapiano Dance Evolution</h4>
                            <p className="text-gray-700 mb-4">
                              Amapiano, meaning "the pianos" in Zulu, is a South African genre blending deep house, 
                              jazz, kwaito, and Afrobeat, with dance styles emphasizing fluid, rhythmic footwork and 
                              expressive movements. Its dances are slower-paced (110–120 BPM) and melody-driven, 
                              often tied to specific tracks or challenges.
                            </p>
                            <p className="text-gray-700">
                              Emerging from South African townships in the mid-2010s, Amapiano dances gained global 
                              traction via platforms like TikTok, with viral challenges amplifying their reach. 
                              Dances like Gwara Gwara and more recently Tshwala Bam showcase the genre's 
                              cultural impact.
                            </p>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </div>
                  
                  {/* Resources */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Additional Resources</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <h4 className="font-medium mb-2">African Dance Dictionary</h4>
                          <p className="text-sm text-gray-500 mb-3">
                            Comprehensive collection of African dance tutorials and history
                          </p>
                          <Button variant="outline" size="sm" className="w-full">
                            Visit Website
                          </Button>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <h4 className="font-medium mb-2">Dance Communities</h4>
                          <p className="text-sm text-gray-500 mb-3">
                            Connect with dancers around the world
                          </p>
                          <Button variant="outline" size="sm" className="w-full">
                            Join Community
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              {/* Social Sharing & Navigation */}
              <div className="p-6 pt-0 flex flex-wrap justify-between items-center gap-4">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Share2 className="mr-2 h-4 w-4" /> Share
                  </Button>
                  <Button variant="outline" size="sm">
                    Save for Later
                  </Button>
                </div>
                
                {/* Dance Carousel for Quick Navigation */}
                <div className="w-full mt-4">
                  <h3 className="text-sm font-medium mb-2">Explore Other Dances</h3>
                  <Carousel className="w-full">
                    <CarouselContent>
                      {[...danceCurriculum.afrobeats, ...danceCurriculum.amapiano].map(dance => (
                        <CarouselItem key={dance.id} className="md:basis-1/3 lg:basis-1/4">
                          <div className="p-1">
                            <Card className="cursor-pointer hover:shadow-md transition-shadow" 
                                 onClick={() => handleDanceSelect(dance)}>
                              <div className="h-24 bg-gray-100 rounded-t-lg flex items-center justify-center"
                                   style={{ 
                                     backgroundImage: `url(${dance.image})`, 
                                     backgroundSize: 'cover',
                                     backgroundPosition: 'center'
                                   }}>
                                <div className="absolute inset-0 bg-black/30 rounded-t-lg"></div>
                                <h4 className="text-white font-semibold z-10 text-center px-2">{dance.name}</h4>
                              </div>
                              <div className="p-2 text-xs text-center">
                                <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                  {dance.difficulty}
                                </span>
                              </div>
                            </Card>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-0" />
                    <CarouselNext className="right-0" />
                  </Carousel>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DanceOfDay;
