
import { useState } from "react";
import { Button } from "@/components/ui/button";
import MapFilters from "./map/MapFilters";
import { ListView } from "./map/ListView";
import { GlobalMapView } from "./map/GlobalMapView";
import { useMapData } from "@/hooks/use-map-data";
import { Map as MapIcon, List } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function MiniGlobalMap() {
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [selectedFilters, setSelectedFilters] = useState<string[]>(['all']);
  const navigate = useNavigate();
  
  const { 
    filteredData, 
    totalCounts,
    selectedDateRange,
    setSelectedDateRange
  } = useMapData(selectedFilters);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-heading font-bold mb-4 text-black">
            Global Afrobeats Network
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Discover Afrobeats events, clubs, and communities worldwide
          </p>
        </div>

        {/* Filters with proper z-index to stay behind audio player */}
        <div className="mb-6 relative z-10">
          <MapFilters
            selectedFilters={selectedFilters}
            onFiltersChange={setSelectedFilters}
            totalCounts={totalCounts}
            selectedDateRange={selectedDateRange}
            onDateRangeChange={setSelectedDateRange}
          />
        </div>

        {/* View Toggle */}
        <div className="flex justify-center mb-6">
          <div className="bg-gray-100 p-1 rounded-lg">
            <Button
              variant={viewMode === 'map' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('map')}
              className="mr-1"
            >
              <MapIcon className="w-4 h-4 mr-2" />
              Map
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4 mr-2" />
              List
            </Button>
          </div>
        </div>

        {/* Map/List Content */}
        <div className="bg-gray-50 rounded-lg p-4 h-96 mb-6">
          {viewMode === 'map' ? (
            <GlobalMapView data={filteredData} />
          ) : (
            <ListView data={filteredData} />
          )}
        </div>

        {/* Full Map CTA */}
        <div className="text-center">
          <Button 
            onClick={() => navigate('/map')}
            size="lg"
            className="bg-afro-teal text-white hover:bg-afro-teal/90"
          >
            Explore Full Map
          </Button>
        </div>
      </div>
    </section>
  );
}
