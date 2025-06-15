
import { GlobalMapView } from "@/components/map/GlobalMapView";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useMapData } from '@/hooks/use-map-data';
import { useState } from 'react';
import { MapFilters } from '@/types/map';

export function MiniGlobalMap() {
  const navigate = useNavigate();
  const { data: mapItems, isLoading } = useMapData();
  
  // Simple filters for the mini map - just show all types, no filtering
  const [filters] = useState<MapFilters>({
    types: ['all'],
    countries: [],
    searchQuery: '',
    dateRange: undefined
  });

  const filteredItems = mapItems || [];

  return (
    <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-heading font-bold mb-4 text-slate-950">
            Global Afrobeats Movement
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Discover clubs, artists, events, and communities around the world spreading Afrobeats culture.
          </p>
        </div>
        
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <div className="h-[500px]">
            {isLoading ? (
              <div className="flex items-center justify-center h-full bg-gray-200 rounded-2xl">
                <div className="text-gray-500">Loading map...</div>
              </div>
            ) : (
              <GlobalMapView items={filteredItems} filters={filters} onFiltersChange={() => {}} />
            )}
          </div>
          
          {/* Overlaid buttons */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col sm:flex-row gap-3 z-[1000]">
            <Button 
              size="lg" 
              className="bg-afro-yellow text-black hover:bg-afro-yellow/90 font-heading text-lg rounded-full px-6 py-3 h-auto shadow-lg"
              onClick={() => navigate('/chapters')}
            >
              Start A Chapter
            </Button>
            
            <Button 
              size="lg" 
              variant="white"
              className="font-heading text-lg rounded-full px-6 py-3 h-auto shadow-lg"
              onClick={() => navigate('/map')}
            >
              Explore Full Map
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
