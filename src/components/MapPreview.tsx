
import React, { useEffect, useRef } from 'react';

interface MapPreviewProps {
  location: string;
}

export function MapPreview({ location }: MapPreviewProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const apiKey = 'AIzaSyAEqA2TLmk6L6G1N4XcgTXDpxuoDsSBj5Q'; // Google Maps API key for static maps

  useEffect(() => {
    if (!mapContainerRef.current) return;
    
    // Create a function to load the map
    const loadMap = () => {
      if (!mapContainerRef.current) return;
      
      // Encode the location for the URL
      const encodedLocation = encodeURIComponent(location);
      
      // Create an image element for the static map
      const mapImage = document.createElement('img');
      mapImage.src = `https://maps.googleapis.com/maps/api/staticmap?center=${encodedLocation}&zoom=14&size=600x300&maptype=roadmap&markers=color:green%7C${encodedLocation}&key=${apiKey}`;
      mapImage.alt = `Map of ${location}`;
      mapImage.className = 'w-full h-full object-cover rounded-lg';
      
      // Clear the container and append the image
      const container = mapContainerRef.current;
      container.innerHTML = '';
      container.appendChild(mapImage);
    };
    
    // Load the map
    loadMap();
  }, [location]);

  return (
    <div 
      ref={mapContainerRef}
      className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center"
    >
      <div className="text-gray-500">Loading map...</div>
    </div>
  );
}
