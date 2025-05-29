
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { MapItem, MapItemType, MapFilters } from '@/types/map';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';
import { MapPin, ExternalLink, Calendar, Users, Music, Instagram, Twitter, Youtube } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface GlobalMapViewProps {
  items: MapItem[];
  filters: MapFilters;
  onFiltersChange: (filters: MapFilters) => void;
}

const MapController = ({ items }: { items: MapItem[] }) => {
  const map = useMap();
  
  useEffect(() => {
    if (items.length > 0) {
      const validItems = items.filter(item => item.coordinates);
      
      if (validItems.length > 0) {
        const bounds = L.latLngBounds(
          validItems.map(item => [item.coordinates[1], item.coordinates[0]] as L.LatLngExpression)
        );
        map.fitBounds(bounds, { padding: [20, 20] });
      }
    }
  }, [items, map]);
  
  return null;
};

const getMarkerColor = (type: MapItemType): string => {
  const colors: Record<MapItemType, string> = {
    artist: '#F97316', // Orange
    club: '#008751',   // Green
    event: '#8B5CF6',  // Purple
    dancer: '#EC4899', // Pink
    influencer: '#3B82F6', // Blue
    agency: '#6366F1', // Indigo
    group: '#10B981', // Emerald
    user: '#6B7280'   // Gray
  };
  return colors[type];
};

const getTypeIcon = (type: MapItemType): string => {
  const icons: Record<MapItemType, string> = {
    artist: '🎤',
    club: '🎵',
    event: '🎪',
    dancer: '💃',
    influencer: '📱',
    agency: '🏢',
    group: '👥',
    user: '👤'
  };
  return icons[type];
};

const getCountryFlag = (countryName: string): string => {
  const flagMap: Record<string, string> = {
    'Nigeria': '🇳🇬',
    'Ghana': '🇬🇭', 
    'South Africa': '🇿🇦',
    'United Kingdom': '🇬🇧',
    'United States': '🇺🇸',
    'Canada': '🇨🇦',
    'France': '🇫🇷',
    'Germany': '🇩🇪',
    'Netherlands': '🇳🇱',
    'Thailand': '🇹🇭',
    'Ireland': '🇮🇪',
    'Portugal': '🇵🇹',
    'Morocco': '🇲🇦'
  };
  return flagMap[countryName] || '🏳️';
};

const createCustomIcon = (type: MapItemType) => {
  const color = getMarkerColor(type);
  
  return L.divIcon({
    html: `
      <div style="
        background-color: ${color};
        width: 25px;
        height: 25px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
      ">
        ${getTypeIcon(type)}
      </div>
    `,
    className: 'custom-div-icon',
    iconSize: [25, 25],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12]
  });
};

const COUNTRIES = [
  'Nigeria', 'Ghana', 'South Africa', 'United Kingdom', 'United States',
  'Canada', 'France', 'Germany', 'Netherlands', 'Thailand', 'Ireland', 'Portugal', 'Morocco'
];

export const GlobalMapView: React.FC<GlobalMapViewProps> = ({ items, filters, onFiltersChange }) => {
  const isMobile = useIsMobile();
  const defaultCenter = [20, 0] as [number, number];
  const defaultZoom = isMobile ? 1 : 2;

  useEffect(() => {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    });
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const toggleCountry = (country: string) => {
    const newCountries = filters.countries.includes(country)
      ? filters.countries.filter(c => c !== country)
      : [...filters.countries, country];
    
    onFiltersChange({ ...filters, countries: newCountries });
  };

  return (
    <div className="relative">
      {/* Map */}
      <div className="rounded-lg overflow-hidden border border-[#008751] h-[70vh] md:h-[calc(100vh-250px)] w-full bg-[#FEF7CD]/50 relative">
        <MapContainer 
          center={defaultCenter as L.LatLngExpression}
          zoom={defaultZoom} 
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
          className="z-0"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          <MapController items={items} />
          
          {items.map((item, index) => (
            item.coordinates ? (
              <Marker 
                key={`${item.id}-${index}`} 
                position={[item.coordinates[1], item.coordinates[0]] as L.LatLngExpression}
                icon={createCustomIcon(item.type)}
              >
                <Popup maxWidth={isMobile ? 250 : 350}>
                  <Card className="border-0 shadow-none max-w-full">
                    <CardContent className="p-2 md:p-3">
                      {/* Image if available */}
                      {item.image && (
                        <div className="mb-2">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-24 md:h-32 object-cover rounded-md"
                          />
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">{getCountryFlag(item.country)}</span>
                        <h3 className="text-sm md:text-lg font-bold text-black flex-1">{item.name}</h3>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <Badge 
                          className="text-xs"
                          style={{ backgroundColor: getMarkerColor(item.type), color: 'white' }}
                        >
                          {getTypeIcon(item.type)} {item.type}
                        </Badge>
                        {item.city && (
                          <span className="text-xs md:text-sm text-muted-foreground">
                            {item.city}, {item.country}
                          </span>
                        )}
                      </div>

                      {item.description && (
                        <p className="text-xs md:text-sm text-black mb-2 md:mb-3 line-clamp-2">{item.description}</p>
                      )}

                      {/* Event specific info */}
                      {item.type === 'event' && item.eventDate && (
                        <div className="flex items-center gap-1 mb-2 text-xs md:text-sm text-black">
                          <Calendar className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
                          <span>{formatDate(item.eventDate)}</span>
                          {item.eventEndDate && (
                            <span> - {formatDate(item.eventEndDate)}</span>
                          )}
                        </div>
                      )}

                      {/* Club specific info */}
                      {item.type === 'club' && item.openingHours && (
                        <div className="text-xs md:text-sm text-black mb-2">
                          <strong>Hours:</strong> {item.openingHours}
                        </div>
                      )}

                      {/* Music style for clubs */}
                      {item.musicStyle && (
                        <div className="flex items-center gap-1 mb-2 text-xs md:text-sm text-black">
                          <Music className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
                          <span className="truncate">{item.musicStyle}</span>
                        </div>
                      )}

                      {/* Social links */}
                      {item.socialLinks && (
                        <div className="flex gap-1 md:gap-2 mb-2 md:mb-3 flex-wrap">
                          {item.socialLinks.instagram && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="p-1 h-6 w-6 md:h-8 md:w-8"
                              onClick={() => window.open(`https://instagram.com/${item.socialLinks!.instagram}`, '_blank')}
                            >
                              <Instagram className="h-3 w-3 md:h-4 md:w-4" />
                            </Button>
                          )}
                          {item.socialLinks.twitter && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="p-1 h-6 w-6 md:h-8 md:w-8"
                              onClick={() => window.open(`https://twitter.com/${item.socialLinks!.twitter}`, '_blank')}
                            >
                              <Twitter className="h-3 w-3 md:h-4 md:w-4" />
                            </Button>
                          )}
                          {item.socialLinks.youtube && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="p-1 h-6 w-6 md:h-8 md:w-8"
                              onClick={() => window.open(`https://youtube.com/${item.socialLinks!.youtube}`, '_blank')}
                            >
                              <Youtube className="h-3 w-3 md:h-4 md:w-4" />
                            </Button>
                          )}
                        </div>
                      )}

                      {/* Action buttons */}
                      <div className="flex gap-2">
                        {item.website && (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1 bg-[#F97316] text-white hover:bg-[#F97316]/90 text-xs"
                            onClick={() => window.open(item.website, '_blank')}
                          >
                            <ExternalLink className="mr-1 h-3 w-3 md:h-4 md:w-4" />
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

        {/* Overlaid Stats - Bottom Left to avoid player */}
        <div className="absolute bottom-4 left-4 z-[1000] max-w-[calc(100%-8rem)]">
          <Card className="bg-white/90 backdrop-blur-sm border-[#008751]">
            <CardContent className="p-2 md:p-3">
              <div className="grid grid-cols-4 md:grid-cols-8 gap-1 md:gap-2">
                {['artist', 'club', 'event', 'dancer', 'influencer', 'agency', 'group', 'user'].map(type => {
                  const count = items.filter(item => item.type === type).length;
                  return (
                    <div key={type} className="text-center">
                      <div className="text-sm md:text-lg font-bold text-black">{count}</div>
                      <div className="text-xs text-black/70 capitalize flex items-center justify-center gap-1">
                        <span className="text-xs">{getTypeIcon(type as MapItemType)}</span>
                        <span className="hidden sm:inline">{type}s</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Overlaid Country Filters - Top Right to avoid zoom controls */}
        <div className="absolute top-4 right-4 z-[1000] w-48">
          <Card className="bg-white/90 backdrop-blur-sm border-[#008751]">
            <CardContent className="p-2">
              <div className="max-h-32 overflow-y-auto space-y-1">
                {COUNTRIES.map((country) => (
                  <Badge
                    key={country}
                    variant={filters.countries.includes(country) ? "default" : "outline"}
                    className={`cursor-pointer transition-colors text-xs w-full justify-start ${
                      filters.countries.includes(country)
                        ? "bg-[#F97316] text-white hover:bg-[#F97316]/90"
                        : "text-black border-[#F97316] hover:bg-[#F97316]/10"
                    }`}
                    onClick={() => toggleCountry(country)}
                  >
                    <span className="mr-2">{getCountryFlag(country)}</span>
                    <span>{country}</span>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
