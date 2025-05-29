
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import { MapItem } from '@/types/map';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useMapData } from '@/hooks/use-map-data';
import { useIsMobile } from '@/hooks/use-mobile';
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

const createSimpleIcon = (type: string) => {
  const color = getMarkerColor(type);
  
  return L.divIcon({
    html: `
      <div style="
        background-color: ${color};
        width: 12px;
        height: 12px;
        border-radius: 50%;
        border: 1px solid white;
        box-shadow: 0 1px 3px rgba(0,0,0,0.3);
      "></div>
    `,
    className: 'simple-marker',
    iconSize: [12, 12],
    iconAnchor: [6, 6]
  });
};

export const MiniGlobalMap = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { data: mapData } = useMapData();
  const [items, setItems] = useState<MapItem[]>([]);

  useEffect(() => {
    if (mapData) {
      setItems(mapData);
    }
  }, [mapData]);

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
              
              <MapController items={items} />
              
              {items.map((item, index) => (
                item.coordinates ? (
                  <Marker 
                    key={`${item.id}-${index}`} 
                    position={[item.coordinates[1], item.coordinates[0]] as L.LatLngExpression}
                    icon={createSimpleIcon(item.type)}
                  />
                ) : null
              ))}
            </MapContainer>
            
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
