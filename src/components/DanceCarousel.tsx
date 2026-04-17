import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Play, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { danceCurriculum } from "@/data/dance-curriculum";
import { useCountryFlags } from "@/hooks/use-country-flags";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { getFirstCurriculumYoutubeVideoId } from "@/lib/danceYoutube";

// Helper function to get all dances from the curriculum
const getAllDances = () => {
  const allDances: any[] = [];
  Object.keys(danceCurriculum).forEach((genre) => {
    danceCurriculum[genre as keyof typeof danceCurriculum].forEach((dance) => {
      allDances.push({
        ...dance,
        genre,
      });
    });
  });
  return allDances;
};

const GALLERY_DANCES = getAllDances().slice(0, 8);

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty.toLowerCase()) {
    case "easy":
    case "easy-medium":
      return "bg-green-200 text-green-800 border-green-300";
    case "medium":
      return "bg-yellow-200 text-yellow-800 border-yellow-300";
    case "medium-hard":
      return "bg-orange-200 text-orange-800 border-orange-300";
    case "hard":
      return "bg-red-200 text-red-800 border-red-300";
    default:
      return "bg-gray-200 text-gray-800 border-gray-300";
  }
};

export function DanceCarousel() {
  const navigate = useNavigate();
  const { getFlag } = useCountryFlags();
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const videoRefs = useRef<Record<string, HTMLIFrameElement | null>>({});

  const handleDanceClick = (genre: string, id: string) => {
    navigate(`/dance/${genre}/${id}`);
  };

  // Play dance tutorial
  const handlePlayVideo = (
    event: React.MouseEvent<HTMLButtonElement>,
    danceId: string
  ) => {
    event.stopPropagation();

    if (isPlaying === danceId) {
      const iframe = videoRefs.current[danceId];
      if (iframe) {
        const src = iframe.src;
        iframe.src = src;
      }
      setIsPlaying(null);
      return;
    }

    // Stop any currently playing video
    if (isPlaying && videoRefs.current[isPlaying]) {
      const iframe = videoRefs.current[isPlaying];
      if (iframe) {
        const src = iframe.src;
        iframe.src = src;
      }
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
    const regex =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = youtubeLink.match(regex);
    return match ? match[1] : null;
  };

  return (
    <section id="dances" className="py-14 bg-white font-afro">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="mb-2 text-4xl font-heading font-bold text-slate-900">Dance Moves</h2>
            <p className="max-w-2xl text-lg text-gray-700 sm:text-xl">
              Learn the hottest Afrobeats and Amapiano dance moves
            </p>
          </div>
          <Button
            onClick={() => navigate("/dance")}
            className="bg-[#264653] hover:bg-blue-800 text-white font-heading px-6 py-2 rounded-full shadow-md flex items-center gap-2"
          >
            <span>See All</span>
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Button>
        </div>

        <Carousel
          ref={carouselRef}
          className="w-full"
          opts={{
            align: "start",
            loop: true,
            watchDrag: !isPlaying,
          }}
        >
          <CarouselContent className="-ml-4">
            {GALLERY_DANCES.map((dance) => {
              const videoId = getFirstCurriculumYoutubeVideoId(dance) || null;
              const flagUrl = getFlag(dance.origin);
              const cardKey = `${dance.genre}-${dance.id}`;
              return (
                <CarouselItem
                  key={dance.id}
                  className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <Card
                    className="rounded-xl overflow-hidden shadow-lg border-none hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"
                    onClick={() => handleDanceClick(dance.genre, dance.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleDanceClick(dance.genre, dance.id);
                      }
                    }}
                  >
                    <CardContent className="relative aspect-video p-0">
                      <div className="pointer-events-none absolute left-2 top-2 z-10">
                        {flagUrl && (
                          <Badge className="bg-blue-100 text-blue-800 border-blue-300 flex items-center gap-1 shadow-sm w-fit px-2 py-1">
                            <img
                              src={flagUrl}
                              alt={dance.origin}
                              className="w-4 h-3"
                            />
                            {dance.origin}
                          </Badge>
                        )}
                      </div>

                      <div className="absolute top-2 right-2 z-10">
                        <Badge
                          className={`${getDifficultyColor(
                            dance.difficulty
                          )} shadow-sm w-fit px-2 py-1`}
                        >
                          {dance.difficulty}
                        </Badge>
                      </div>

                      {isPlaying === dance.id && videoId ? (
                        <div
                          className="absolute inset-0 z-20 bg-black"
                          onClick={(e) => e.stopPropagation()}
                          role="presentation"
                        >
                          <iframe
                            ref={(el) => registerVideoRef(dance.id, el)}
                            className="h-full w-full border-0"
                            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                            title={`${dance.name} tutorial preview`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            referrerPolicy="strict-origin-when-cross-origin"
                          />
                        </div>
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
                    <CardFooter className="p-4 flex-1 flex flex-col items-center text-center">
                      <h3 className="text-xl font-bold text-black">
                        {dance.name}
                      </h3>
                    </CardFooter>
                  </Card>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="left-1" />
          <CarouselNext className="right-1" />
        </Carousel>
      </div>
    </section>
  );
}
