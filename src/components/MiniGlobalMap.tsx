import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { MapItem } from '@/types/map';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useMapData } from '@/hooks/use-map-data';
import { useIsMobile } from '@/hooks/use-mobile';
import { Globe, Instagram, Twitter, Youtube, Calendar, Clock, Music } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

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

const getMarkerColor = (type: string): string => {
  const colors: Record<string, string> = {
    artist: '#F97316',
    club: '#008751',
    event: '#8B5CF6',
    dancer: '#EC4899',
    influencer: '#3B82F6',
    agency: '#6366F1',
    group: '#10B981',
    user: '#6B7280'
  };
  return colors[type] || '#6B7280';
};

const getTypeIcon = (type: string): string => {
  const icons: Record<string, string> = {
    artist: '🎤',
    club: '🎵',
    event: '🎪',
    dancer: '💃',
    influencer: '📱',
    agency: '🏢',
    group: '👥',
    user: '👤'
  };
  return icons[type] || '👤';
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

const createSimpleIcon = (type: string) => {
  const color = getMarkerColor(type);
  
  return L.divIcon({
    html: `
      <div style="
        background-color: ${color};
        width: 15px;
        height: 15px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 8px;
        cursor: pointer;
      ">
        ${getTypeIcon(type)}
      </div>
    `,
    className: 'simple-marker',
    iconSize: [15, 15],
    iconAnchor: [7, 7],
    popupAnchor: [0, -7]
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
  'Canada', 'France', 'Germany', 'Netherlands', 'Thailand', 'Ireland', 'Portugal', 'Morocco'
];

export const MiniGlobalMap = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { data: mapData } = useMapData();
  const [items, setItems] = useState<MapItem[]>([]);
  const [countryFilters, setCountryFilters] = useState<string[]>([]);

  useEffect(() => {
    if (mapData) {
      setItems(mapData);
    }
  }, [mapData]);

  const filteredItems = items.filter(item => 
    countryFilters.length === 0 || countryFilters.includes(item.country)
  );

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
    setCountryFilters(prev => 
      prev.includes(country)
        ? prev.filter(c => c !== country)
        : [...prev, country]
    );
  };

  return (
    <section className="py-14 bg-gradient-to-br from-afro-yellow to-afro-orange">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-heading font-bold mb-4 text-black">
            See Afrobeats Movement Spreading Around the World
          </h2>
          <p className="text-xl text-black/80 max-w-2xl mx-auto">
            From Lagos to London, Toronto to Tokyo - the Afrobeats culture is connecting communities globally
          </p>
        </div>
        
        <div className="relative">
          <div className="rounded-lg overflow-hidden border-2 border-afro-teal h-[50vh] w-full bg-white/10 relative">
            <MapContainer 
              center={defaultCenter as L.LatLngExpression}
              zoom={defaultZoom} 
              style={{ height: '100%', width: '100%' }}
              scrollWheelZoom={false}
              dragging={!isMobile}
              touchZoom={false}
              doubleClickZoom={false}
              className="z-0"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              
              <MapController items={filteredItems} />
              
              {filteredItems.map((item, index) => (
                item.coordinates ? (
                  <Marker 
                    key={`${item.id}-${index}`} 
                    position={[item.coordinates[1], item.coordinates[0]] as L.LatLngExpression}
                    icon={createSimpleIcon(item.type)}
                  >
                    <Popup maxWidth={isMobile ? 280 : 350} className="custom-popup">
                      <div className="p-0">
                        <Card className="border-0 shadow-lg max-w-full bg-white rounded-lg overflow-hidden">
                          <CardContent className="p-0">
                            {/* Image header if available */}
                            {item.image && (
                              <div className="relative">
                                <img 
                                  src={item.image} 
                                  alt={item.name}
                                  className="w-full h-24 md:h-32 object-cover"
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
                            
                            <div className="p-3">
                              {/* Header with flag and name */}
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-xl">{getCountryFlag(item.country)}</span>
                                <div className="flex-1">
                                  <h3 className="text-base md:text-lg font-bold text-black leading-tight">{item.name}</h3>
                                  {item.city && (
                                    <p className="text-xs text-muted-foreground">
                                      {item.city}, {item.country}
                                    </p>
                                  )}
                                </div>
                              </div>

                              {/* Type badge if no image */}
                              {!item.image && (
                                <div className="mb-2">
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
                                <p className="text-xs text-gray-600 mb-2 line-clamp-2">{item.description}</p>
                              )}

                              {/* Event specific info */}
                              {item.type === 'event' && item.eventDate && (
                                <div className="flex items-center gap-1 mb-2 p-1.5 bg-purple-50 rounded-md">
                                  <Calendar className="h-3 w-3 text-purple-600" />
                                  <div className="text-xs">
                                    <span className="font-medium text-purple-900">{formatDate(item.eventDate)}</span>
                                    {item.eventEndDate && (
                                      <span className="text-purple-700"> - {formatDate(item.eventEndDate)}</span>
                                    )}
                                  </div>
                                </div>
                              )}

                              {/* Club specific info */}
                              {item.type === 'club' && (
                                <div className="space-y-1 mb-2">
                                  {item.openingHours && (
                                    <div className="flex items-center gap-1 text-xs">
                                      <Clock className="h-3 w-3 text-green-600" />
                                      <span className="text-gray-700">{item.openingHours}</span>
                                    </div>
                                  )}
                                  {item.musicStyle && (
                                    <div className="flex items-center gap-1 text-xs">
                                      <Music className="h-3 w-3 text-green-600" />
                                      <span className="text-gray-700">{item.musicStyle}</span>
                                    </div>
                                  )}
                                </div>
                              )}

                              {/* Social links */}
                              {item.socialLinks && (
                                <div className="flex gap-1 mb-2 flex-wrap">
                                  {item.socialLinks.instagram && (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="h-6 w-6 p-0 border-pink-200 hover:bg-pink-50"
                                      onClick={() => window.open(`https://instagram.com/${item.socialLinks!.instagram}`, '_blank')}
                                    >
                                      <Instagram className="h-3 w-3 text-pink-600" />
                                    </Button>
                                  )}
                                  {item.socialLinks.twitter && (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="h-6 w-6 p-0 border-blue-200 hover:bg-blue-50"
                                      onClick={() => window.open(`https://twitter.com/${item.socialLinks!.twitter}`, '_blank')}
                                    >
                                      <Twitter className="h-3 w-3 text-blue-600" />
                                    </Button>
                                  )}
                                  {item.socialLinks.youtube && (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="h-6 w-6 p-0 border-red-200 hover:bg-red-50"
                                      onClick={() => window.open(formatYouTubeUrl(item.socialLinks!.youtube), '_blank')}
                                    >
                                      <Youtube className="h-3 w-3 text-red-600" />
                                    </Button>
                                  )}
                                </div>
                              )}

                              {/* Website button */}
                              {item.website && (
                                <Button 
                                  className="w-full bg-[#008751] hover:bg-[#008751]/90 text-white text-xs h-7"
                                  onClick={() => window.open(item.website, '_blank')}
                                >
                                  <Globe className="mr-1 h-3 w-3" />
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

            {/* Stats overlay - moved to bottom right */}
            <div className="absolute right-2 bottom-16 z-[500]">
              <Card className="bg-white/90 backdrop-blur-sm border-afro-teal shadow-lg">
                <CardContent className="p-2">
                  <div className="grid grid-cols-2 gap-1 text-xs">
                    {['artist', 'club', 'event', 'dancer'].map(type => {
                      const count = filteredItems.filter(item => item.type === type).length;
                      return (
                        <div key={type} className="flex items-center gap-1">
                          <span className="text-xs">{getTypeIcon(type)}</span>
                          <span className="font-bold text-black">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Country filters overlay - compact version */}
            <div className="absolute top-2 right-2 z-[500] w-40">
              <Card className="bg-white/90 backdrop-blur-sm border-afro-teal shadow-lg">
                <CardContent className="p-2">
                  <h4 className="text-xs font-semibold text-black mb-1">Filter Countries</h4>
                  <div className="max-h-24 overflow-y-auto space-y-0.5">
                    {COUNTRIES.slice(0, 6).map((country) => (
                      <Badge
                        key={country}
                        variant={countryFilters.includes(country) ? "default" : "outline"}
                        className={`cursor-pointer transition-colors text-xs w-full justify-start hover:shadow-sm ${
                          countryFilters.includes(country)
                            ? "bg-afro-teal text-white hover:bg-afro-teal/90"
                            : "text-black border-afro-teal/30 hover:bg-afro-teal/10"
                        }`}
                        onClick={() => toggleCountry(country)}
                      >
                        <span className="mr-1">{getCountryFlag(country)}</span>
                        <span className="truncate text-xs">{country}</span>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Overlay button */}
            <div className="absolute bottom-4 right-4 z-[1000]">
              <Button 
                onClick={() => navigate('/map')}
                className="bg-afro-teal text-white hover:bg-afro-teal/90 font-heading shadow-lg"
              >
                Explore Full Map
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
