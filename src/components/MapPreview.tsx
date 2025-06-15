
import React, { useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapPreviewProps {
  location?: string;
}

export function MapPreview({ location = "world" }: MapPreviewProps) {
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

  return (
    <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center relative min-h-[300px]">
      <MapContainer 
        center={defaultCenter as L.LatLngExpression}
        zoom={defaultZoom} 
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
        className="z-0 rounded-lg"
        zoomControl={false}
        dragging={false}
        touchZoom={false}
        doubleClickZoom={false}
        keyboard={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
    </div>
  );
}
