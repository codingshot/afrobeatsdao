
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Play, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { danceCurriculum } from "@/data/dance-curriculum";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

// Helper function to get all dances from the curriculum
const getAllDances = () => {
  const allDances: any[] = [];
  Object.keys(danceCurriculum).forEach(genre => {
    danceCurriculum[genre as keyof typeof danceCurriculum].forEach(dance => {
      allDances.push({
        ...dance,
        genre
      });
    });
  });
  return allDances;
};

export function DanceCarousel() {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Record<string, HTMLIFrameElement>>({});
  const dances = getAllDances();

  // Handle navigation to dance details
  const handleDanceClick = (genre: string, id: string) => {
    navigate(`/dance/${genre}/${id}`);
  };

  // Play dance tutorial
  const handlePlayVideo = (event: React.MouseEvent<HTMLButtonElement>, danceId: string) => {
    event.stopPropagation();
    
    if (isPlaying === danceId) {
      setIsPlaying(null);
      return;
    }
    
    // Stop any currently playing video
    if (isPlaying && videoRefs.current[isPlaying]) {
      const iframe = videoRefs.current[isPlaying];
      const src = iframe.src;
      iframe.src = src;
    }
    
    setIsPlaying(danceId);
    setIsPaused(true);
  };

  // Register video refs
  const registerVideoRef = (id: string, ref: HTMLIFrameElement) => {
    if (ref) {
      videoRefs.current[id] = ref;
    }
  };

  // Get tutorial YouTube ID from the first tutorial link
  const getVideoId = (tutorials: any[]) => {
    if (!tutorials || tutorials.length === 0) return null;
    
    const youtubeLink = tutorials[0]?.link;
    if (!youtubeLink) return null;
    
    // Extract YouTube video ID
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = youtubeLink.match(regex);
    return match ? match[1] : null;
  };

  return (
    <section id="dances" className="py-14 bg-white font-afro">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-4xl font-heading font-bold mb-2 text-slate-900">
              Dance Moves
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl">
              Learn the hottest Afrobeats and Amapiano dance moves
            </p>
          </div>
          <Button 
            onClick={() => navigate('/dance')}
            className="bg-[#264653] hover:bg-blue-800 text-white font-heading px-6 py-2 rounded-full shadow-md flex items-center gap-2"
          >
            <span>See All</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        
        <Carousel 
          ref={carouselRef}
          className="w-full"
          opts={{
            align: "start",
            loop: true,
            watchDrag: !isPlaying
          }}
        >
          <CarouselContent className="-ml-4">
            {dances.slice(0, 8).map((dance) => {
              const videoId = getVideoId(dance.tutorials);
              return (
                <CarouselItem key={dance.id} className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <Card 
                    className="rounded-xl overflow-hidden shadow-lg border-none hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"
                    onClick={() => handleDanceClick(dance.genre, dance.id)}
                  >
                    <CardContent className="p-0 aspect-video relative">
                      {isPlaying === dance.id && videoId ? (
                        <iframe
                          ref={(ref) => ref && registerVideoRef(dance.id, ref)}
                          className="w-full h-full"
                          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                          title={`${dance.name} Tutorial`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      ) : (
                        <>
                          <div 
                            className="w-full h-full bg-cover bg-center"
                            style={{ backgroundImage: `url(${dance.image})` }}
                          >
                            {videoId && (
                              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                <Button
                                  onClick={(e) => handlePlayVideo(e, dance.id)}
                                  className="bg-[#E63946]/80 hover:bg-[#E63946] text-white rounded-full w-12 h-12 flex items-center justify-center"
                                >
                                  <Play className="w-6 h-6" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </CardContent>
                    <CardFooter className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-black mb-1">{dance.name}</h3>
                        <p className="text-sm text-gray-500">Origin: {dance.origin}</p>
                      </div>
                      <div className="mt-3">
                        <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded-full">
                          {dance.difficulty}
                        </span>
                      </div>
                    </CardFooter>
                  </Card>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="left-2 lg:-left-12" />
          <CarouselNext className="right-2 lg:-right-12" />
        </Carousel>
      </div>
    </section>
  );
}
