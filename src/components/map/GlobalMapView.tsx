import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { MapItem, MapItemType, MapFilters } from '@/types/map';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';
import { MapPin, ExternalLink, Calendar, Users, Music, Instagram, Twitter, Youtube, Globe, Clock } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface GlobalMapViewProps {
  items: MapItem[];
  filters: MapFilters;
  onFiltersChange: (filters: MapFilters) => void;
  isHomePage?: boolean;
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
    community: '#22D3EE', // Cyan
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
    community: '🌐',
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
    'Morocco': '🇲🇦',
    'Vietnam': '🇻🇳'
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

const formatYouTubeUrl = (url: string): string => {
  if (!url) return '';
  
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  if (url.includes('youtube.com')) {
    return `https://${url}`;
  }
  
  if (url.startsWith('@') || url.startsWith('/')) {
    return `https://youtube.com${url.startsWith('@') ? '/' + url : url}`;
  }
  
  return `https://youtube.com/${url}`;
};

const COUNTRIES = [
  'Nigeria', 'Ghana', 'South Africa', 'United Kingdom', 'United States',
  'Canada', 'France', 'Germany', 'Netherlands', 'Thailand', 'Ireland', 'Portugal', 'Morocco', 'Vietnam'
];

export const GlobalMapView: React.FC<GlobalMapViewProps> = ({ items, filters, onFiltersChange, isHomePage = false }) => {
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
      <div className={`rounded-lg overflow-hidden border border-[#008751] w-full bg-[#FEF7CD]/50 relative ${
        isHomePage ? 'h-full' : 'h-[70vh] md:h-[calc(100vh-250px)]'
      }`}>
        <MapContainer 
          center={defaultCenter as L.LatLngExpression}
          zoom={defaultZoom} 
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
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
                <Popup maxWidth={isMobile ? 300 : 400} className="custom-popup">
                  <div className="p-0">
                    <Card className="border-0 shadow-lg max-w-full bg-white rounded-lg overflow-hidden">
                      <CardContent className="p-0">
                        {/* Image header if available */}
                        {item.image && (
                          <div className="relative">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-full h-32 md:h-40 object-cover"
                            />
                            <div className="absolute top-2 right-2">
                              <Badge 
                                className="text-xs shadow-md"
                                style={{ backgroundColor: getMarkerColor(item.type), color: 'white' }}
                              >
                                {getTypeIcon(item.type)} {item.type}
                              </Badge>
                            </div>
                          </div>
                        )}
                        
                        <div className="p-4">
                          {/* Header with flag and name */}
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-2xl">{getCountryFlag(item.country)}</span>
                            <div className="flex-1">
                              <h3 className="text-lg md:text-xl font-bold text-black leading-tight">{item.name}</h3>
                              {item.city && (
                                <p className="text-sm text-muted-foreground">
                                  {item.city}, {item.country}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Type badge if no image */}
                          {!item.image && (
                            <div className="mb-3">
                              <Badge 
                                className="text-xs"
                                style={{ backgroundColor: getMarkerColor(item.type), color: 'white' }}
                              >
                                {getTypeIcon(item.type)} {item.type}
                              </Badge>
                            </div>
                          )}

                          {/* Description */}
                          {item.description && (
                            <p className="text-sm text-gray-600 mb-3 line-clamp-3">{item.description}</p>
                          )}

                          {/* Event specific info */}
                          {item.type === 'event' && item.eventDate && (
                            <div className="flex items-center gap-2 mb-3 p-2 bg-purple-50 rounded-md">
                              <Calendar className="h-4 w-4 text-purple-600" />
                              <div className="text-sm">
                                <span className="font-medium text-purple-900">{formatDate(item.eventDate)}</span>
                                {item.eventEndDate && (
                                  <span className="text-purple-700"> - {formatDate(item.eventEndDate)}</span>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Club specific info */}
                          {item.type === 'club' && (
                            <div className="space-y-2 mb-3">
                              {item.openingHours && (
                                <div className="flex items-center gap-2 text-sm">
                                  <Clock className="h-4 w-4 text-green-600" />
                                  <span className="text-gray-700">{item.openingHours}</span>
                                </div>
                              )}
                              {item.musicStyle && (
                                <div className="flex items-center gap-2 text-sm">
                                  <Music className="h-4 w-4 text-green-600" />
                                  <span className="text-gray-700">{item.musicStyle}</span>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Artist specific info */}
                          {item.type === 'artist' && item.genre && (
                            <div className="flex items-center gap-2 mb-3 text-sm">
                              <Music className="h-4 w-4 text-orange-600" />
                              <span className="text-gray-700">{item.genre}</span>
                            </div>
                          )}

                          {/* Social links */}
                          {item.socialLinks && (
                            <div className="flex gap-2 mb-4 flex-wrap">
                              {item.socialLinks.instagram && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8 w-8 p-0 border-pink-200 hover:bg-pink-50 hover:border-pink-300"
                                  onClick={() => window.open(`https://instagram.com/${item.socialLinks!.instagram}`, '_blank')}
                                >
                                  <Instagram className="h-4 w-4 text-pink-600" />
                                </Button>
                              )}
                              {item.socialLinks.twitter && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8 w-8 p-0 border-blue-200 hover:bg-blue-50 hover:border-blue-300"
                                  onClick={() => window.open(`https://twitter.com/${item.socialLinks!.twitter}`, '_blank')}
                                >
                                  <Twitter className="h-4 w-4 text-blue-600" />
                                </Button>
                              )}
                              {item.socialLinks.youtube && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8 w-8 p-0 border-red-200 hover:bg-red-50 hover:border-red-300"
                                  onClick={() => window.open(formatYouTubeUrl(item.socialLinks!.youtube), '_blank')}
                                >
                                  <Youtube className="h-4 w-4 text-red-600" />
                                </Button>
                              )}
                            </div>
                          )}

                          {/* Website button */}
                          {item.website && (
                            <Button 
                              className="w-full bg-[#008751] hover:bg-[#008751]/90 text-white shadow-md"
                              onClick={() => window.open(item.website, '_blank')}
                            >
                              <Globe className="mr-2 h-4 w-4" />
                              Visit Website
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </Popup>
              </Marker>
            ) : null
          ))}
        </MapContainer>

        {/* Only show overlays on full map page, not home page */}
        {!isHomePage && (
          <>
            {/* Overlaid Stats */}
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30">
              <Card className="bg-white/95 backdrop-blur-sm border-[#008751] shadow-lg">
                <CardContent className="p-2">
                  <div className="space-y-1.5">
                    {['artist', 'club', 'event', 'dancer', 'influencer', 'agency', 'group', 'community'].map(type => {
                      const count = items.filter(item => item.type === type).length;
                      return (
                        <div key={type} className="flex items-center gap-2">
                          <span className="text-xs">{getTypeIcon(type as MapItemType)}</span>
                          <span className="text-xs font-bold text-black min-w-[16px]">{count}</span>
                          <span className="text-xs text-black/70 capitalize">{type}s</span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Overlaid Country Filters */}
            <div className="absolute top-4 right-4 z-30 w-48">
              <Card className="bg-white/95 backdrop-blur-sm border-[#008751] shadow-lg">
                <CardContent className="p-3">
                  <h4 className="text-sm font-semibold text-black mb-2">Filter by Country</h4>
                  <div className="max-h-32 overflow-y-auto space-y-1">
                    {COUNTRIES.map((country) => (
                      <Badge
                        key={country}
                        variant={filters.countries.includes(country) ? "default" : "outline"}
                        className={`cursor-pointer transition-colors text-xs w-full justify-start hover:shadow-sm ${
                          filters.countries.includes(country)
                            ? "bg-[#008751] text-white hover:bg-[#008751]/90 shadow-sm"
                            : "text-black border-[#008751]/30 hover:bg-[#008751]/10 hover:border-[#008751]/50"
                        }`}
                        onClick={() => toggleCountry(country)}
                      >
                        <span className="mr-2">{getCountryFlag(country)}</span>
                        <span className="truncate">{country}</span>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
