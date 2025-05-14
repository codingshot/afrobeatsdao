
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import type { MapContainerProps } from 'react-leaflet';
import { Club, ClubFilters } from '@/types/club';
import { Card, CardContent } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { MapPin, ExternalLink, Music, Clock, Users } from 'lucide-react';
import { useCountryFlags } from '@/hooks/use-country-flags';
// The import below is handled by MapWrapper.tsx
// import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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

const MapController = ({ clubs, filters }: { clubs: Club[], filters?: ClubFilters }) => {
  const map = useMap();
  
  useEffect(() => {
    if (clubs.length > 0) {
      const validClubs = clubs.filter(club => club.coordinates);
      
      if (validClubs.length > 0) {
        const bounds = L.latLngBounds(
          validClubs.map(club => [club.coordinates![1], club.coordinates![0]] as L.LatLngExpression)
        );
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    }
  }, [clubs, map]);
  
  return null;
};

const ClubsMapView: React.FC<ClubsMapViewProps> = ({ clubs, filters, onSelectClub }) => {
  const isMobile = useIsMobile();
  const { getFlag } = useCountryFlags();
  const defaultCenter = [20, 0] as [number, number];
  const defaultZoom = 2;
  const [hoveredClub, setHoveredClub] = useState<Club | null>(null);
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  const [mapRef, setMapRef] = useState<L.Map | null>(null);
  const [carouselApi, setCarouselApi] = useState<any>(null);
  
  useEffect(() => {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
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

  const getCountryFromCity = (city: string) => {
    if (city === "London") return "United Kingdom";
    if (city === "Bangkok") return "Thailand";
    if (city === "Dublin") return "Ireland";
    if (city === "Amsterdam") return "Netherlands";
    return "";
  };

  const handleCardSelect = (club: Club, index: number) => {
    setActiveCardIndex(index);
    if (mapRef && club.coordinates) {
      mapRef.setView([club.coordinates[1], club.coordinates[0]], 15, {
        animate: true,
        duration: 1
      });
    }
    if (onSelectClub) {
      onSelectClub(club);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg overflow-hidden border border-[#008751] h-[calc(100vh-350px)] md:h-[500px] w-full bg-[#FEF7CD]/50 relative">
        <MapContainer 
          center={defaultCenter as L.LatLngExpression}
          zoom={defaultZoom} 
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
          className="z-0"
          ref={setMapRef}
          {...{} as ExtendedMapContainerProps}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            {...{} as any}
          />
          
          <MapController clubs={clubs} filters={filters} />
          
          {clubs.map((club, index) => (
            club.coordinates ? (
              <Marker 
                key={`${club.name}-${index}`} 
                position={[club.coordinates[1], club.coordinates[0]] as L.LatLngExpression}
                eventHandlers={{
                  click: () => handleCardSelect(club, index),
                  mouseover: () => {
                    setHoveredClub(club);
                    setActiveCardIndex(index);
                  },
                  mouseout: () => {
                    setHoveredClub(null);
                  }
                }}
              >
                <Popup>
                  <Card className="border-0 shadow-none">
                    <CardContent className="p-2">
                      <div className="flex items-center gap-2 mb-2">
                        <img 
                          src={getFlag(getCountryFromCity(club.city))} 
                          alt={`${club.city} flag`}
                          className="w-6 h-4 object-cover rounded-sm"
                        />
                        <h3 className="text-lg font-bold">{club.name}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{club.city}</p>
                      
                      <div className="space-y-1 text-sm">
                        <p><span className="font-medium">Type:</span> {club.type}</p>
                        
                        <div className="flex items-center gap-1">
                          <Music className="h-3.5 w-3.5 text-muted-foreground" />
                          <div className="flex flex-wrap gap-1">
                            {club.music.split(',').map((genre, i) => (
                              <Badge key={i} variant="outline" className="text-xs bg-[#F97316]/10">
                                {genre.trim()}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        {club.hours && (
                          <div className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                            <span>{club.hours}</span>
                          </div>
                        )}
                        
                        {club.capacity && (
                          <div className="flex items-center gap-1">
                            <Users className="h-3.5 w-3.5 text-muted-foreground" />
                            <span>{club.capacity}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-2 mt-3">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="w-full sm:w-auto bg-[#008751] text-white hover:bg-[#008751]/90"
                          onClick={() => window.open(club.google_maps, '_blank')}
                        >
                          <MapPin className="mr-1 h-4 w-4" />
                          Open in Maps
                        </Button>
                        
                        {club.website && (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="w-full sm:w-auto bg-[#F97316] text-white hover:bg-[#F97316]/90"
                            onClick={() => window.open(club.website, '_blank')}
                          >
                            <ExternalLink className="mr-1 h-4 w-4" />
                            Website
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Popup>
              </Marker>
            ) : null
          ))}
        </MapContainer>
      </div>

      <div className="w-full px-4 relative">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
          setApi={setCarouselApi}
        >
          <CarouselContent>
            {clubs.map((club, index) => (
              <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4">
                <Card 
                  className={`p-2 h-full transition-all duration-200 cursor-pointer ${
                    hoveredClub?.name === club.name || index === activeCardIndex ? 'ring-2 ring-[#008751]' : ''
                  }`}
                  onClick={() => handleCardSelect(club, index)}
                  onMouseEnter={() => setHoveredClub(club)}
                  onMouseLeave={() => setHoveredClub(null)}
                >
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2">
                      <img 
                        src={getFlag(getCountryFromCity(club.city))} 
                        alt={`${club.city} flag`}
                        className="w-6 h-4 object-cover rounded-sm"
                      />
                      <h3 className="font-semibold text-black">{club.name}</h3>
                    </div>
                    
                    <p className="text-sm text-black">{club.city}</p>
                    
                    <div className="text-sm text-black">
                      {club.hours}
                    </div>
                    
                    <div className="flex gap-2">
                      {club.google_maps && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="flex-1 bg-[#008751] text-white hover:bg-[#008751]/90"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(club.google_maps, '_blank');
                          }}
                        >
                          <MapPin className="mr-1 h-4 w-4" />
                          Map
                        </Button>
                      )}
                      {club.website && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="flex-1 bg-[#F97316] text-white hover:bg-[#F97316]/90"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(club.website, '_blank');
                          }}
                        >
                          <ExternalLink className="mr-1 h-4 w-4" />
                          Website
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute -left-12 md:-left-16" />
          <CarouselNext className="absolute -right-12 md:-right-16" />
        </Carousel>
      </div>
    </div>
  );
};

export default ClubsMapView;
