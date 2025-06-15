
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useMapData } from '@/hooks/use-map-data';

interface MapPreviewProps {
  location?: string;
}

export function MapPreview({ location = "world" }: MapPreviewProps) {
  const { data: mapItems, isLoading } = useMapData();

  useEffect(() => {
    // Fix for default markers in Leaflet
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    });
  }, []);

  // Default center and zoom for world view
  const defaultCenter = [20, 0] as [number, number];
  const defaultZoom = 2;

  if (isLoading) {
    return (
      <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center relative min-h-[300px]">
        <div className="text-gray-500">Loading map...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center relative min-h-[300px]">
      <MapContainer 
        center={defaultCenter as L.LatLngExpression}
        zoom={defaultZoom} 
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
        className="z-0 rounded-lg"
        zoomControl={true}
        dragging={true}
        touchZoom={true}
        doubleClickZoom={true}
        keyboard={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {mapItems && mapItems.map((item) => (
          <Marker 
            key={item.id} 
            position={[item.coordinates[1], item.coordinates[0]] as L.LatLngExpression}
          >
            <Popup>
              <div className="text-sm">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">{item.type}</p>
                {item.city && <p className="text-gray-500">{item.city}, {item.country}</p>}
                {item.description && <p className="mt-1">{item.description}</p>}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
