
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { CLUBS, getClubCountry } from '@/data/clubs';
import { useCountryFlags } from '@/hooks/use-country-flags';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export const ClubsSection = () => {
  const navigate = useNavigate();
  const {
    getFlag
  } = useCountryFlags();

  const openExternal = (url: string) => {
    const u = url.trim();
    if (!u) return;
    window.open(u, "_blank", "noopener,noreferrer");
  };

  const handleClubClick = (club: (typeof CLUBS)[0]) => {
    if (club.website?.trim()) {
      openExternal(club.website);
    } else if (club.google_maps?.trim()) {
      openExternal(club.google_maps);
    } else {
      navigate("/clubs");
    }
  };

  return (
    <section className="w-full py-14 bg-gradient-to-b from-afro-teal via-afro-teal to-afro-teal/90 border-y border-black/5">
      <div className="container">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#008751] mb-1">Nightlife</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900">Featured clubs</h2>
            <p className="text-slate-600 text-sm mt-1 max-w-xl">Tap a card to open the venue — or browse the full map on the clubs page.</p>
          </div>
          <Button
            type="button"
            onClick={() => navigate("/clubs")}
            className="shrink-0 bg-[#008751] text-white hover:bg-[#008751]/90 shadow-sm"
          >
            Clubs map &amp; filters
          </Button>
        </div>

        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {CLUBS.map((club, index) => (
              <CarouselItem key={`${club.city}-${club.name}-${index}`} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                <Card
                  role="button"
                  tabIndex={0}
                  className="overflow-hidden cursor-pointer border-slate-900/10 shadow-md transition-all duration-200 hover:shadow-xl hover:-translate-y-1 hover:border-[#008751]/30 group"
                  onClick={() => handleClubClick(club)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleClubClick(club);
                    }
                  }}
                >
                  <div className="h-1 bg-gradient-to-r from-[#008751] via-[#FFD600] to-[#008751]" />
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3 mb-3">
                      <img
                        src={getFlag(getClubCountry(club.city))}
                        alt=""
                        className="w-8 h-5 object-cover rounded-sm border border-black/10 mt-0.5"
                      />
                      <div className="min-w-0">
                        <h3 className="font-heading font-semibold text-lg text-slate-900 leading-snug group-hover:text-[#008751] transition-colors">
                          {club.name}
                        </h3>
                        <p className="text-sm text-slate-600 font-medium">{club.city}</p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">{club.general_rating}</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex border-slate-300 bg-white/90 shadow" />
          <CarouselNext className="hidden md:flex border-slate-300 bg-white/90 shadow" />
        </Carousel>
      </div>
    </section>
  );
};
