
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ListView } from "./map/ListView";
import { GlobalMapView } from "./map/GlobalMapView";
import { useMapData } from "@/hooks/use-map-data";
import { Map as MapIcon, List } from "lucide-react";
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

  // Calculate total counts for each type
  const totalCounts = mapItems.reduce((acc, item) => {
    acc[item.type] = (acc[item.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

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

        {/* Simple View Toggle - No filters on home page */}
        <div className="mb-6 flex justify-center">
          <div className="flex rounded-lg border border-[#008751]/30 p-1 bg-white">
            <Button
              variant={viewMode === 'map' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('map')}
              className={viewMode === 'map' ? 'bg-[#008751] text-white' : 'text-black hover:bg-[#008751]/10'}
            >
              <MapIcon className="h-4 w-4 mr-1" />
              Map
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'bg-[#008751] text-white' : 'text-black hover:bg-[#008751]/10'}
            >
              <List className="h-4 w-4 mr-1" />
              List
            </Button>
          </div>
        </div>

        {/* Map/List Content with fixed height to prevent overlapping */}
        <div className="bg-gray-50 rounded-lg p-4 h-96 mb-6 overflow-hidden">
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
