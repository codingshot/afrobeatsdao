import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { GlobalMapView } from '@/components/map/GlobalMapView';
import { ListView } from '@/components/map/ListView';
import { MapFilters } from '@/components/map/MapFilters';
import { MapItemType, MapFilters as MapFiltersType } from '@/types/map';
import { useMapData } from '@/hooks/use-map-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Map as MapIcon, List } from 'lucide-react';

const Map = () => {
  const [filters, setFilters] = useState<MapFiltersType>({
    types: ['all'],
    countries: [],
    searchQuery: '',
    dateRange: undefined
  });
  
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');

  const { data: mapItems, isLoading } = useMapData();

  const filteredItems = useMemo(() => {
    if (!mapItems) return [];

    return mapItems.filter(item => {
      // Type filter
      if (!filters.types.includes('all') && !filters.types.includes(item.type)) {
        return false;
      }

      // Country filter
      if (filters.countries.length > 0 && !filters.countries.includes(item.country)) {
        return false;
      }

      // Search query filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        return item.name.toLowerCase().includes(query) || 
               item.city?.toLowerCase().includes(query) ||
               item.country.toLowerCase().includes(query);
      }

      // Date range filter for events
      if (filters.dateRange && item.type === 'event' && item.eventDate) {
        const eventDate = new Date(item.eventDate);
        const { from, to } = filters.dateRange;
        if (from && eventDate < from) return false;
        if (to && eventDate > to) return false;
      }

      return true;
    });
  }, [mapItems, filters]);

  return (
    <>
      <Helmet>
        <title>Global Afrobeats Map - Artists, Clubs, Events & More | Afrobeats DAO</title>
        <meta name="description" content="Explore the global Afrobeats community on our interactive map. Discover artists, clubs, events, dancers, influencers, and agencies worldwide." />
        <meta name="keywords" content="afrobeats map, global afrobeats, afrobeats artists map, afrobeats clubs worldwide, afrobeats events, african music map" />
        
        <meta property="og:title" content="Global Afrobeats Map - Discover the Worldwide Community" />
        <meta property="og:description" content="Interactive map showing Afrobeats artists, clubs, events, dancers, and influencers around the world." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://afrobeatsdao.com/map" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Global Afrobeats Map - Worldwide Community" />
        <meta name="twitter:description" content="Explore Afrobeats artists, clubs, events & more on our interactive global map." />
        
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>

      <div className="min-h-screen bg-[#FEF7CD] pt-16 md:pt-20">
        <div className="container mx-auto px-2 md:px-4">
          <div className="text-center mb-4 md:mb-8">
            <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold text-black mb-2 md:mb-4">
              Global Afrobeats Map
            </h1>
            <p className="text-sm md:text-lg text-black/80 max-w-2xl mx-auto px-2">
              Discover the worldwide Afrobeats community - from artists and clubs to events and influencers
            </p>
          </div>

          <div className="mb-4 md:mb-8">
            <MapFilters 
              filters={filters} 
              onFiltersChange={setFilters}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />
          </div>
          
          <div>
            {isLoading ? (
              <div className="flex items-center justify-center h-64 md:h-96">
                <div className="text-black text-sm md:text-base">Loading map data...</div>
              </div>
            ) : viewMode === 'map' ? (
              <GlobalMapView items={filteredItems} filters={filters} onFiltersChange={setFilters} />
            ) : (
              <ListView items={filteredItems} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Map;
