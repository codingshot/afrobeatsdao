
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import type { MapContainerProps } from 'react-leaflet';
import { Club, ClubFilters } from '@/types/club';
import { Card, CardContent } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { MapPin, ExternalLink, Clock, Music, Users } from 'lucide-react';
import { useCountryFlags } from '@/hooks/use-country-flags';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Badge } from '@/components/ui/badge';

interface ClubsMapViewProps {
  clubs: Club[];
  filters?: ClubFilters;
  onSelectClub?: (club: Club) => void;
}

// Define MapContainer props extension to avoid TypeScript errors
interface ExtendedMapContainerProps extends MapContainerProps {
  center: L.LatLngExpression;
  zoom: number;
  scrollWheelZoom: boolean;
}

// Map Controller component to handle filtering and search
const MapController = ({ clubs, filters }: { clubs: Club[], filters?: ClubFilters }) => {
  const map = useMap();
  
  useEffect(() => {
    if (clubs.length > 0) {
      // If we have filtered clubs with coordinates, fit the map to show them all
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
  
  // Fix for Leaflet marker icons
  useEffect(() => {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    });
  }, []);

  // Helper function to get country based on city
  const getCountryFromCity = (city: string) => {
    if (city === "London") return "United Kingdom";
    if (city === "Bangkok") return "Thailand";
    if (city === "Dublin") return "Ireland";
    if (city === "Amsterdam") return "Netherlands";
    return "";
  };

  return (
    <div className="rounded-lg overflow-hidden border border-[#008751] h-[calc(100vh-250px)] md:h-[600px] w-full bg-[#FEF7CD]/50 relative">
      <MapContainer 
        center={defaultCenter as L.LatLngExpression}
        zoom={defaultZoom} 
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
        className="z-0"
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
                click: () => {
                  if (onSelectClub) onSelectClub(club);
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
  );
};

export default ClubsMapView;
