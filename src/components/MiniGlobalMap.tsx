
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ListView } from "./map/ListView";
import { GlobalMapView } from "./map/GlobalMapView";
import { useMapData } from "@/hooks/use-map-data";
import { useNavigate } from "react-router-dom";
import { MapFilters as MapFiltersType } from "@/types/map";

export function MiniGlobalMap() {
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [filters, setFilters] = useState<MapFiltersType>({
    types: ['all'],
    countries: [],
    searchQuery: '',
    dateRange: undefined
  });
  const navigate = useNavigate();
  
  const { data: mapItems = [], isLoading } = useMapData();

  // Filter the data based on current filters
  const filteredData = mapItems.filter(item => {
    // Type filter
    if (!filters.types.includes('all') && !filters.types.includes(item.type)) {
      return false;
    }

    // Country filter
    if (filters.countries.length > 0 && !filters.countries.includes(item.country)) {
      return false;
    }

    // Search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const searchText = `${item.name} ${item.city} ${item.country} ${item.description || ''}`.toLowerCase();
      if (!searchText.includes(query)) {
        return false;
      }
    }

    // Date range filter (only for events)
    if (filters.dateRange && item.type === 'event' && item.eventDate) {
      const eventDate = new Date(item.eventDate);
      if (eventDate < filters.dateRange.from || eventDate > filters.dateRange.to) {
        return false;
      }
    }

    return true;
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-xl text-gray-700">Loading map data...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white relative z-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-heading font-bold mb-4 text-black">
            Global Afrobeats Network
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Discover Afrobeats events, clubs, and communities worldwide
          </p>
        </div>

        {/* Map/List Content with fixed height */}
        <div className="bg-gray-50 rounded-lg p-4 h-96 mb-6 overflow-hidden relative z-10">
          {viewMode === 'map' ? (
            <GlobalMapView 
              items={filteredData} 
              filters={filters}
              onFiltersChange={setFilters}
              isHomePage={true}
            />
          ) : (
            <ListView items={filteredData} />
          )}
        </div>

        {/* Full Map CTA */}
        <div className="text-center relative z-20">
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
