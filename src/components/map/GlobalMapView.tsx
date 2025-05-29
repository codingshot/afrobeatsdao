
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { MapItem, MapItemType } from '@/types/map';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';
import { MapPin, ExternalLink, Calendar, Users, Music, Instagram, Twitter, Youtube } from 'lucide-react';
import { useCountryFlags } from '@/hooks/use-country-flags';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface GlobalMapViewProps {
  items: MapItem[];
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
        map.fitBounds(bounds, { padding: [50, 50] });
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

const createCustomIcon = (type: MapItemType) => {
  const color = getMarkerColor(type);
  
  return L.divIcon({
    html: `
      <div style="
        background-color: ${color};
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
      ">
        ${getTypeIcon(type)}
      </div>
    `,
    className: 'custom-div-icon',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15]
  });
};

export const GlobalMapView: React.FC<GlobalMapViewProps> = ({ items }) => {
  const isMobile = useIsMobile();
  const { getFlag } = useCountryFlags();
  const defaultCenter = [20, 0] as [number, number];
  const defaultZoom = 2;
  const [hoveredItem, setHoveredItem] = useState<MapItem | null>(null);

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
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 mb-4">
        {['artist', 'club', 'event', 'dancer', 'influencer', 'agency', 'group', 'user'].map(type => {
          const count = items.filter(item => item.type === type).length;
          return (
            <Card key={type} className="p-2">
              <div className="text-center">
                <div className="text-lg font-bold text-black">{count}</div>
                <div className="text-xs text-black/70 capitalize flex items-center justify-center gap-1">
                  <span>{getTypeIcon(type as MapItemType)}</span>
                  {type}s
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Map */}
      <div className="rounded-lg overflow-hidden border border-[#008751] h-[calc(100vh-250px)] w-full bg-[#FEF7CD]/50 relative">
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
                eventHandlers={{
                  mouseover: () => setHoveredItem(item),
                  mouseout: () => setHoveredItem(null)
                }}
              >
                <Popup>
                  <Card className="border-0 shadow-none max-w-sm">
                    <CardContent className="p-3">
                      <div className="flex items-center gap-2 mb-2">
                        {item.country && (
                          <img 
                            src={getFlag(item.country)} 
                            alt={`${item.country} flag`}
                            className="w-6 h-4 object-cover rounded-sm"
                          />
                        )}
                        <h3 className="text-lg font-bold text-black">{item.name}</h3>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <Badge 
                          className="text-xs"
                          style={{ backgroundColor: getMarkerColor(item.type), color: 'white' }}
                        >
                          {getTypeIcon(item.type)} {item.type}
                        </Badge>
                        {item.city && (
                          <span className="text-sm text-muted-foreground">{item.city}, {item.country}</span>
                        )}
                      </div>

                      {item.description && (
                        <p className="text-sm text-black mb-3">{item.description}</p>
                      )}

                      {/* Event specific info */}
                      {item.type === 'event' && item.eventDate && (
                        <div className="flex items-center gap-1 mb-2 text-sm text-black">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{formatDate(item.eventDate)}</span>
                          {item.eventEndDate && (
                            <span> - {formatDate(item.eventEndDate)}</span>
                          )}
                        </div>
                      )}

                      {/* Club specific info */}
                      {item.type === 'club' && item.openingHours && (
                        <div className="text-sm text-black mb-2">
                          <strong>Hours:</strong> {item.openingHours}
                        </div>
                      )}

                      {/* Music style for clubs */}
                      {item.musicStyle && (
                        <div className="flex items-center gap-1 mb-2 text-sm text-black">
                          <Music className="h-4 w-4 text-muted-foreground" />
                          <span>{item.musicStyle}</span>
                        </div>
                      )}

                      {/* Social links */}
                      {item.socialLinks && (
                        <div className="flex gap-2 mb-3">
                          {item.socialLinks.instagram && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="p-1 h-8 w-8"
                              onClick={() => window.open(`https://instagram.com/${item.socialLinks!.instagram}`, '_blank')}
                            >
                              <Instagram className="h-4 w-4" />
                            </Button>
                          )}
                          {item.socialLinks.twitter && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="p-1 h-8 w-8"
                              onClick={() => window.open(`https://twitter.com/${item.socialLinks!.twitter}`, '_blank')}
                            >
                              <Twitter className="h-4 w-4" />
                            </Button>
                          )}
                          {item.socialLinks.youtube && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="p-1 h-8 w-8"
                              onClick={() => window.open(`https://youtube.com/${item.socialLinks!.youtube}`, '_blank')}
                            >
                              <Youtube className="h-4 w-4" />
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
                            className="flex-1 bg-[#F97316] text-white hover:bg-[#F97316]/90"
                            onClick={() => window.open(item.website, '_blank')}
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
    </div>
  );
};
