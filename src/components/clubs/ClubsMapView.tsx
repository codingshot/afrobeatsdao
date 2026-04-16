
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import type { MapContainerProps } from 'react-leaflet';
import { Club, ClubFilters } from '@/types/club';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, ExternalLink, Music, Clock, Users } from 'lucide-react';
import { useCountryFlags } from '@/hooks/use-country-flags';
import { getClubCountry } from '@/data/clubs';
// The import below is handled by MapWrapper.tsx
// import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Badge } from '@/components/ui/badge';
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function openExternal(url: string | undefined) {
  const u = url?.trim();
  if (!u) return;
  window.open(u, "_blank", "noopener,noreferrer");
}

interface ClubsMapViewProps {
  clubs: Club[];
  filters?: ClubFilters;
  onSelectClub?: (club: Club) => void;
}

interface ExtendedMapContainerProps extends MapContainerProps {
  center: L.LatLngExpression;
  zoom: number;
  scrollWheelZoom: boolean;
}

const MapController = ({ clubs }: { clubs: Club[] }) => {
  const map = useMap();

  useEffect(() => {
    const validClubs = clubs.filter((club) => club.coordinates);
    if (validClubs.length === 0) return;

    if (validClubs.length === 1) {
      const c = validClubs[0].coordinates!;
      map.setView([c[1], c[0]], 12, { animate: true });
      return;
    }

    const bounds = L.latLngBounds(
      validClubs.map((club) => [club.coordinates![1], club.coordinates![0]] as L.LatLngExpression)
    );
    map.fitBounds(bounds, { padding: [56, 56], maxZoom: 11, animate: true });
  }, [clubs, map]);

  return null;
};

/** Captures Leaflet map instance for programmatic pan/zoom (MapContainer ref is not the map). */
const MapInstanceBridge = ({ onReady }: { onReady: (map: L.Map | null) => void }) => {
  const map = useMap();
  useEffect(() => {
    onReady(map);
    return () => onReady(null);
  }, [map, onReady]);
  return null;
};

const ClubsMapView: React.FC<ClubsMapViewProps> = ({ clubs, onSelectClub }) => {
  const { getFlag } = useCountryFlags();
  const defaultCenter = [20, 0] as [number, number];
  const defaultZoom = 2;
  const [hoveredClub, setHoveredClub] = useState<Club | null>(null);
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  const [mapRef, setMapRef] = useState<L.Map | null>(null);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);

  const handleMapReady = useCallback((map: L.Map | null) => {
    setMapRef(map);
  }, []);

  const venueIcon = useMemo(
    () =>
      L.divIcon({
        className: "clubs-map-marker-wrap",
        html: `<div class="clubs-map-marker-dot" aria-hidden="true"></div>`,
        iconSize: [26, 26],
        iconAnchor: [13, 13],
        popupAnchor: [0, -10],
      }),
    []
  );

  useEffect(() => {
    type IconProto = typeof L.Icon.Default.prototype & { _getIconUrl?: string };
    delete (L.Icon.Default.prototype as IconProto)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    });
  }, []);

  useEffect(() => {
    if (carouselApi) {
      carouselApi.scrollTo(activeCardIndex);
    }
  }, [activeCardIndex, carouselApi]);

  const handleCardSelect = (club: Club, index: number) => {
    setActiveCardIndex(index);
    if (mapRef && club.coordinates) {
      mapRef.flyTo([club.coordinates[1], club.coordinates[0]], 14, { duration: 0.85 });
    }
    onSelectClub?.(club);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-xl overflow-hidden border border-[#008751]/25 shadow-md ring-1 ring-black/5 h-[min(52vh,420px)] sm:h-[min(56vh,480px)] md:h-[520px] w-full bg-muted/30 relative">
        <MapContainer 
          center={defaultCenter as L.LatLngExpression}
          zoom={defaultZoom} 
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom
          className="z-0 [&_.leaflet-control-attribution]:text-[10px] [&_.leaflet-control-attribution]:bg-white/90"
          {...{} as ExtendedMapContainerProps}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />

          <MapInstanceBridge onReady={handleMapReady} />
          <MapController clubs={clubs} />

          {clubs.map((club, index) =>
            club.coordinates ? (
              <Marker
                key={`${club.city}-${club.name}`}
                position={[club.coordinates[1], club.coordinates[0]] as L.LatLngExpression}
                icon={venueIcon}
                eventHandlers={{
                  click: () => handleCardSelect(club, index),
                  mouseover: () => {
                    setHoveredClub(club);
                    setActiveCardIndex(index);
                  },
                  mouseout: () => setHoveredClub(null),
                }}
              >
                <Popup className="clubs-leaflet-popup" maxWidth={280} minWidth={240}>
                  <Card className="border-0 shadow-none bg-transparent">
                    <CardContent className="p-1">
                      <div className="flex items-start gap-2 mb-2">
                        <img
                          src={getFlag(getClubCountry(club.city))}
                          alt=""
                          className="w-7 h-5 object-cover rounded-sm shrink-0 border border-border"
                        />
                        <div>
                          <h3 className="text-base font-heading font-bold leading-tight">{club.name}</h3>
                          <p className="text-xs text-muted-foreground font-medium">{club.city}</p>
                        </div>
                      </div>

                      <div className="space-y-2 text-xs">
                        <p className="text-foreground/90 leading-snug">{club.type}</p>

                        <div className="flex items-start gap-1.5">
                          <Music className="h-3.5 w-3.5 text-[#008751] shrink-0 mt-0.5" />
                          <div className="flex flex-wrap gap-1">
                            {club.music.split(",").map((genre, i) => (
                              <Badge key={i} variant="secondary" className="text-[10px] px-1.5 py-0 font-normal">
                                {genre.trim()}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {club.hours && (
                          <div className="flex items-start gap-1.5 text-muted-foreground">
                            <Clock className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                            <span className="leading-snug">{club.hours}</span>
                          </div>
                        )}

                        {club.capacity && (
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <Users className="h-3.5 w-3.5 shrink-0" />
                            <span>{club.capacity}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-2 mt-3 pt-2 border-t border-border/60">
                        {club.google_maps?.trim() && (
                          <Button
                            type="button"
                            size="sm"
                            className="w-full bg-[#008751] text-white hover:bg-[#008751]/90"
                            onClick={() => openExternal(club.google_maps)}
                          >
                            <MapPin className="mr-1.5 h-3.5 w-3.5" />
                            Directions
                          </Button>
                        )}
                        {club.website?.trim() && (
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            className="w-full border-[#FFD600]/60 text-foreground hover:bg-[#FFD600]/15"
                            onClick={() => openExternal(club.website)}
                          >
                            <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                            Official site
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Popup>
              </Marker>
            ) : null
          )}
        </MapContainer>
      </div>

      <div className="w-full relative px-1 sm:px-8 md:px-12">
        <p className="text-center text-xs text-muted-foreground mb-2 md:hidden">Tap a card to fly the map to that venue</p>
        <Carousel
          opts={{
            align: "start",
            loop: clubs.length > 2,
          }}
          className="w-full"
          setApi={setCarouselApi}
        >
          <CarouselContent className="-ml-2 md:-ml-3">
            {clubs.map((club, index) => (
              <CarouselItem key={`${club.city}-${club.name}`} className="pl-2 md:pl-3 basis-[85%] sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <Card
                  role="button"
                  tabIndex={0}
                  className={`h-full border-[#008751]/15 transition-all duration-200 cursor-pointer hover:shadow-lg hover:border-[#008751]/35 ${
                    hoveredClub?.name === club.name || index === activeCardIndex
                      ? "ring-2 ring-[#008751] shadow-md scale-[1.02]"
                      : ""
                  }`}
                  onClick={() => handleCardSelect(club, index)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleCardSelect(club, index);
                    }
                  }}
                  onMouseEnter={() => setHoveredClub(club)}
                  onMouseLeave={() => setHoveredClub(null)}
                >
                  <div className="h-1 bg-gradient-to-r from-[#008751] via-[#FFD600] to-[#008751]" />
                  <CardContent className="space-y-3 p-4">
                    <div className="flex items-start gap-2">
                      <img
                        src={getFlag(getClubCountry(club.city))}
                        alt=""
                        className="w-7 h-5 object-cover rounded-sm border border-border shrink-0"
                      />
                      <div className="min-w-0">
                        <h3 className="font-heading font-semibold text-foreground leading-snug line-clamp-2">{club.name}</h3>
                        <p className="text-xs text-muted-foreground font-medium mt-0.5">{club.city}</p>
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{club.hours}</p>

                    <div className="flex gap-2 pt-1">
                      {club.google_maps?.trim() && (
                        <Button
                          type="button"
                          size="sm"
                          className="flex-1 h-8 text-xs bg-[#008751] text-white hover:bg-[#008751]/90"
                          onClick={(e) => {
                            e.stopPropagation();
                            openExternal(club.google_maps);
                          }}
                        >
                          <MapPin className="mr-1 h-3.5 w-3.5" />
                          Map
                        </Button>
                      )}
                      {club.website?.trim() && (
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          className="flex-1 h-8 text-xs border-[#008751]/30 hover:bg-[#008751]/10"
                          onClick={(e) => {
                            e.stopPropagation();
                            openExternal(club.website);
                          }}
                        >
                          <ExternalLink className="mr-1 h-3.5 w-3.5" />
                          Site
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 sm:-left-1 md:-left-2 border-[#008751]/30 bg-background/95 shadow-sm" />
          <CarouselNext className="right-0 sm:-right-1 md:-right-2 border-[#008751]/30 bg-background/95 shadow-sm" />
        </Carousel>
      </div>
    </div>
  );
};

export default ClubsMapView;
