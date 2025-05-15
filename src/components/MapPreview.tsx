
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
      
      // Clear any existing content
      mapContainerRef.current.innerHTML = '';
      
      // Add loading message
      const loadingEl = document.createElement('div');
      loadingEl.className = 'text-gray-500 absolute inset-0 flex items-center justify-center';
      loadingEl.textContent = 'Loading map...';
      mapContainerRef.current.appendChild(loadingEl);
      
      // Encode the location for the URL
      const encodedLocation = encodeURIComponent(location);
      
      // Create an image element for the static map
      const mapImage = new Image();
      
      mapImage.onload = () => {
        if (mapContainerRef.current) {
          mapContainerRef.current.innerHTML = '';
          mapImage.className = 'w-full h-full object-cover rounded-lg';
          mapContainerRef.current.appendChild(mapImage);
        }
      };
      
      mapImage.onerror = () => {
        if (mapContainerRef.current) {
          mapContainerRef.current.innerHTML = '';
          const errorEl = document.createElement('div');
          errorEl.className = 'text-red-500 absolute inset-0 flex items-center justify-center';
          errorEl.textContent = 'Could not load map for this location';
          mapContainerRef.current.appendChild(errorEl);
        }
      };
      
      // Set the source after attaching event handlers
      mapImage.src = `https://maps.googleapis.com/maps/api/staticmap?center=${encodedLocation}&zoom=14&size=600x300&maptype=roadmap&markers=color:green%7C${encodedLocation}&key=${apiKey}`;
      mapImage.alt = `Map of ${location}`;
    };
    
    // Add a slight delay to ensure container is fully rendered
    const timeoutId = setTimeout(loadMap, 300);
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, [location]);

  return (
    <div 
      ref={mapContainerRef}
      className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center relative"
    >
      <div className="text-gray-500">Loading map...</div>
    </div>
  );
}
