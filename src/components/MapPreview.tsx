
import React, { useEffect, useRef } from 'react';

interface MapPreviewProps {
  location?: string;
}

export function MapPreview({ location = "world" }: MapPreviewProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const apiKey = 'AIzaSyAEqA2TLmk6L6G1N4XcgTXDpxuoDsSBj5Q'; // Google Maps API key for static maps

  useEffect(() => {
    if (!mapContainerRef.current) return;
    
    console.log('MapPreview: Loading map with location:', location);
    
    // Create a function to load the map
    const loadMap = () => {
      if (!mapContainerRef.current) return;
      
      console.log('MapPreview: Starting map load process');
      
      // Clear any existing content
      mapContainerRef.current.innerHTML = '';
      
      // Add loading message
      const loadingEl = document.createElement('div');
      loadingEl.className = 'text-gray-500 absolute inset-0 flex items-center justify-center bg-gray-100';
      loadingEl.textContent = 'Loading map...';
      mapContainerRef.current.appendChild(loadingEl);
      
      // Create an image element for the static map
      const mapImage = new Image();
      
      mapImage.onload = () => {
        console.log('MapPreview: Map image loaded successfully');
        if (mapContainerRef.current) {
          mapContainerRef.current.innerHTML = '';
          mapImage.className = 'w-full h-full object-cover rounded-lg';
          mapContainerRef.current.appendChild(mapImage);
        }
      };
      
      mapImage.onerror = (error) => {
        console.error('MapPreview: Error loading map image:', error);
        if (mapContainerRef.current) {
          mapContainerRef.current.innerHTML = '';
          const errorEl = document.createElement('div');
          errorEl.className = 'text-red-500 absolute inset-0 flex items-center justify-center bg-gray-100 text-center p-4';
          errorEl.textContent = 'Could not load map for this location';
          mapContainerRef.current.appendChild(errorEl);
        }
      };
      
      // Handle global world view vs specific location
      let mapUrl;
      if (location === "world") {
        // Global world view - no markers, just the world map
        mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=0,0&zoom=1&size=600x300&maptype=roadmap&key=${apiKey}`;
      } else {
        // Specific location with marker
        const encodedLocation = encodeURIComponent(location);
        mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${encodedLocation}&zoom=14&size=600x300&maptype=roadmap&markers=color:green%7C${encodedLocation}&key=${apiKey}`;
      }
      
      console.log('MapPreview: Loading map URL:', mapUrl);
      
      // Set the source after attaching event handlers
      mapImage.src = mapUrl;
      mapImage.alt = location === "world" ? "Global map" : `Map of ${location}`;
    };
    
    // Load map immediately instead of with delay
    loadMap();
    
    return () => {
      if (mapContainerRef.current) {
        mapContainerRef.current.innerHTML = '';
      }
    };
  }, [location, apiKey]);

  return (
    <div 
      ref={mapContainerRef}
      className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center relative min-h-[300px]"
    >
      <div className="text-gray-500">Loading map...</div>
    </div>
  );
}
