
import React, { useEffect, useRef } from 'react';

interface MapPreviewProps {
  location?: string;
}

export function MapPreview({ location = "world" }: MapPreviewProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);

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
      
      // For now, let's use a fallback world map image since the Google Maps API is having issues
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
          // Create a simple fallback visual
          const fallbackEl = document.createElement('div');
          fallbackEl.className = 'w-full h-full bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center relative overflow-hidden';
          fallbackEl.innerHTML = `
            <div class="absolute inset-0 opacity-20">
              <div class="absolute top-4 left-4 w-8 h-6 bg-green-400 rounded"></div>
              <div class="absolute top-8 right-8 w-6 h-4 bg-green-500 rounded"></div>
              <div class="absolute bottom-6 left-8 w-10 h-8 bg-green-600 rounded"></div>
              <div class="absolute bottom-4 right-4 w-12 h-6 bg-green-400 rounded"></div>
            </div>
            <div class="text-2xl text-gray-600">🌍</div>
          `;
          mapContainerRef.current.appendChild(fallbackEl);
        }
      };
      
      // Use a simple world map placeholder image
      if (location === "world") {
        // Try to use a simple world map SVG or fallback to our custom design
        mapImage.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDYwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjN0REMEY5Ii8+CjxwYXRoIGQ9Ik01MCA1MEgxNTBWMTUwSDUwVjUwWiIgZmlsbD0iIzEwQjk4MSIvPgo8cGF0aCBkPSJNMjAwIDEwMEgyODBWMTgwSDIwMFYxMDBaIiBmaWxsPSIjMTBCOTgxIi8+CjxwYXRoIGQ9Ik0zNTAgODBINDMwVjE2MEgzNTBWODBaIiBmaWxsPSIjMTBCOTgxIi8+CjxwYXRoIGQ9Ik00ODAgMTIwSDU1MFYxOTBINDgwVjEyMFoiIGZpbGw9IiMxMEI5ODEiLz4KPC9zdmc+';
      } else {
        // For specific locations, trigger the error handler to show fallback
        mapImage.src = 'invalid-url-to-trigger-fallback';
      }
      
      mapImage.alt = location === "world" ? "Global map" : `Map of ${location}`;
    };
    
    // Load map immediately
    loadMap();
    
    return () => {
      if (mapContainerRef.current) {
        mapContainerRef.current.innerHTML = '';
      }
    };
  }, [location]);

  return (
    <div 
      ref={mapContainerRef}
      className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center relative min-h-[300px]"
    >
      <div className="text-gray-500">Loading map...</div>
    </div>
  );
}
