
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useMapData } from "@/hooks/use-map-data";
import { useNavigate } from "react-router-dom";
import { MapFilters as MapFiltersType, MapItem, MapItemType } from "@/types/map";
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Music, Globe, Instagram, Twitter, Youtube } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';

const getMarkerColor = (type: MapItemType): string => {
  const colors: Record<MapItemType, string> = {
    artist: '#F97316',
    club: '#008751',
    event: '#8B5CF6',
    dancer: '#EC4899',
    influencer: '#3B82F6',
    agency: '#6366F1',
    group: '#10B981',
    community: '#22D3EE',
    user: '#6B7280'
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

export function MiniGlobalMap() {
  const [filters] = useState<MapFiltersType>({
    types: ['all'],
    countries: [],
    searchQuery: '',
    dateRange: undefined
  });
  const navigate = useNavigate();
  
  const { data: mapItems = [], isLoading } = useMapData();

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

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-xl text-gray-700">Loading map data...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-heading font-bold mb-4 text-black">
            Global Afrobeats Network
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Discover Afrobeats events, clubs, and communities worldwide
          </p>
        </div>

        {/* Map Content with fixed height */}
        <div className="bg-gray-50 rounded-lg p-4 h-96 mb-6 overflow-hidden relative">
          <MapContainer 
            center={[20, 0] as L.LatLngExpression}
            zoom={2} 
            style={{ height: '100%', width: '100%', zIndex: 1 }}
            scrollWheelZoom={true}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {mapItems.map((item, index) => (
              item.coordinates ? (
                <Marker 
                  key={`${item.id}-${index}`} 
                  position={[item.coordinates[1], item.coordinates[0]] as L.LatLngExpression}
                  icon={createCustomIcon(item.type)}
                >
                  <Popup maxWidth={300} className="custom-popup">
                    <div className="p-0">
                      <Card className="border-0 shadow-lg max-w-full bg-white rounded-lg overflow-hidden">
                        <CardContent className="p-0">
                          {/* Image header if available */}
                          {item.image && (
                            <div className="relative">
                              <img 
                                src={item.image} 
                                alt={item.name}
                                className="w-full h-32 object-cover"
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
                                <h3 className="text-lg font-bold text-black leading-tight">{item.name}</h3>
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

          {/* Legend - positioned absolutely within the map container */}
          <div className="absolute bottom-4 left-4 z-[1000]">
            <Card className="bg-white/95 backdrop-blur-sm border-[#008751] shadow-lg">
              <CardContent className="p-2">
                <h4 className="text-xs font-semibold text-black mb-2">Legend</h4>
                <div className="space-y-1">
                  {['artist', 'club', 'event', 'dancer', 'influencer', 'agency', 'group', 'community'].map(type => {
                    const count = mapItems.filter(item => item.type === type).length;
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
        </div>

        {/* Action Buttons */}
        <div className="text-center flex gap-4 justify-center">
          <Button 
            onClick={() => navigate('/map')}
            size="lg"
            className="bg-afro-teal text-white hover:bg-afro-teal/90"
          >
            Explore Full Map
          </Button>
          <Button 
            onClick={() => navigate('/chapters')}
            size="lg"
            className="bg-afro-yellow text-black hover:bg-afro-yellow/90"
          >
            Start Chapter
          </Button>
        </div>
      </div>
    </section>
  );
}
