
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { CLUBS } from '@/data/clubs';
import { useCountryFlags } from '@/hooks/use-country-flags';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const ClubsSection = () => {
  const navigate = useNavigate();
  const { getFlag } = useCountryFlags();
  
  const getCountryFromCity = (city: string) => {
    if (city === "London") return "United Kingdom";
    if (city === "Bangkok") return "Thailand";
    if (city === "Dublin") return "Ireland";
    if (city === "Amsterdam") return "Netherlands";
    return "";
  };

  return (
    <section className="w-full py-12 bg-[#FEF7CD]">
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Clubs</h2>
          <Button onClick={() => navigate('/clubs')} variant="outline">
            See All Clubs
          </Button>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {CLUBS.map((club, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                <Card className="overflow-hidden transition-all hover:shadow-md">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-2 mb-3">
                      <img 
                        src={getFlag(getCountryFromCity(club.city))} 
                        alt={`${club.city} flag`}
                        className="w-6 h-4 object-cover rounded-sm mt-1"
                      />
                      <div>
                        <h3 className="font-semibold text-lg">{club.name}</h3>
                        <p className="text-sm text-muted-foreground">{club.city}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{club.general_rating}</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
};
