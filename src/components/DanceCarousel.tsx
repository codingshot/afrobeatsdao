
import { useState, useRef, useCallback } from "react";
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

type CurriculumGenre = keyof typeof danceCurriculum;
type CurriculumDance = (typeof danceCurriculum)["afrobeats"][number];
type DanceWithGenre = CurriculumDance & { genre: CurriculumGenre };

const DEFAULT_POSTER = "/AfrobeatsDAOMeta.png";

const getAllDances = (): DanceWithGenre[] => {
  const allDances: DanceWithGenre[] = [];
  (["afrobeats", "amapiano"] as const).forEach((genre) => {
    danceCurriculum[genre].forEach((dance) => {
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
  const d = difficulty.toLowerCase().trim();
  switch (d) {
    case "easy":
    case "easy-medium":
    case "beginner":
      return "bg-green-200 text-green-800 border-green-300";
    case "medium":
      return "bg-yellow-200 text-yellow-800 border-yellow-300";
    case "medium-hard":
      return "bg-orange-200 text-orange-800 border-orange-300";
    case "hard":
    case "advanced":
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

  const registerVideoRef = useCallback((id: string, el: HTMLIFrameElement | null) => {
    if (el) {
      videoRefs.current[id] = el;
    } else {
      delete videoRefs.current[id];
    }
  }, []);

  const handlePlayVideo = (event: React.MouseEvent<HTMLButtonElement>, danceId: string) => {
    event.stopPropagation();
    event.preventDefault();

    if (isPlaying === danceId) {
      const iframe = videoRefs.current[danceId];
      if (iframe) {
        const src = iframe.src;
        iframe.src = src;
      }
      setIsPlaying(null);
      return;
    }

    if (isPlaying && videoRefs.current[isPlaying]) {
      const iframe = videoRefs.current[isPlaying];
      if (iframe) {
        const src = iframe.src;
        iframe.src = src;
      }
    }

    setIsPlaying(danceId);
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
            type="button"
            onClick={() => navigate("/dance")}
            className="shrink-0 rounded-full bg-[#264653] px-6 py-2 font-heading text-white shadow-md hover:bg-blue-800 flex items-center gap-2"
          >
            <span>See All</span>
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Button>
        </div>

        <Carousel
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
                <CarouselItem key={cardKey} className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <Card
                    role="link"
                    tabIndex={0}
                    className="flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border-none shadow-lg transition-shadow duration-300 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#008751] focus-visible:ring-offset-2"
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
                          <Badge className="flex w-fit items-center gap-1 border-blue-300 bg-blue-100 px-2 py-1 text-blue-800 shadow-sm">
                            <img src={flagUrl} alt="" className="h-3 w-4" />
                            <span className="sr-only">Origin: </span>
                            {dance.origin}
                          </Badge>
                        )}
                      </div>

                      <div className="pointer-events-none absolute right-2 top-2 z-10">
                        <Badge
                          className={`w-fit px-2 py-1 shadow-sm ${getDifficultyColor(dance.difficulty)}`}
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
                        <div className="relative h-full w-full min-h-0 bg-gray-900">
                          <img
                            src={dance.image || DEFAULT_POSTER}
                            alt=""
                            className="absolute inset-0 h-full w-full object-cover"
                            loading="lazy"
                            onError={(e) => {
                              const img = e.currentTarget;
                              if (img.src.endsWith(DEFAULT_POSTER.replace(/^\//, "")) || img.dataset.fallback === "1") return;
                              img.dataset.fallback = "1";
                              img.src = DEFAULT_POSTER;
                            }}
                          />
                          {videoId && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                              <Button
                                type="button"
                                onClick={(e) => handlePlayVideo(e, dance.id)}
                                className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E63946]/80 text-white hover:bg-[#E63946]"
                                aria-label={`Play ${dance.name} preview`}
                              >
                                <Play className="h-6 w-6" aria-hidden />
                              </Button>
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="flex flex-1 flex-col items-center p-4 text-center">
                      <h3 className="text-xl font-bold text-black">{dance.name}</h3>
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
