
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ClubFilters, ClubViewMode, SortOption } from '@/types/club';
import { Map, List, Filter, Search } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useIsMobile } from '@/hooks/use-mobile';

const ClubsFilterBar: React.FC<ClubsFilterBarProps> = ({
  viewMode,
  onViewModeChange,
  filters,
  onFiltersChange,
  sortBy,
  onSortChange,
  cities,
  musicTypes,
  clubTypes
}) => {
  const isMobile = useIsMobile();
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({ ...filters, search: e.target.value });
  };

  const handleCityChange = (value: string) => {
    onFiltersChange({ ...filters, city: value === "all" ? undefined : value });
  };

  const handleTypeChange = (value: string) => {
    onFiltersChange({ ...filters, type: value === "all" ? undefined : value });
  };

  const handleMusicChange = (value: string) => {
    onFiltersChange({ ...filters, music: value === "all" ? undefined : value });
  };

  const handleClearFilters = () => {
    onFiltersChange({});
  };

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
            <div className="flex items-center">
              <h2 className="text-lg font-semibold mr-2">Afrobeats Clubs</h2>
              <div className="ml-auto md:ml-4">
                <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && onViewModeChange(value as ClubViewMode)}>
                  <ToggleGroupItem value="map" aria-label="Map View">
                    <Map className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="card" aria-label="Card View">
                    <List className="h-4 w-4" />
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>
            
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search clubs..."
                className="pl-8"
                value={filters.search || ''}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
            <Select value={filters.city || "all"} onValueChange={handleCityChange}>
              <SelectTrigger className="bg-white text-black">
                <SelectValue placeholder="City" />
              </SelectTrigger>
              <SelectContent className="bg-white text-black z-50">
                <SelectItem value="all" className="text-black hover:bg-gray-100 focus:bg-gray-100">All Cities</SelectItem>
                {cities.map(city => (
                  <SelectItem 
                    key={city} 
                    value={city} 
                    className="text-black hover:bg-gray-100 focus:bg-gray-100"
                  >
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={filters.type || "all"} onValueChange={handleTypeChange}>
              <SelectTrigger className="bg-white text-black">
                <SelectValue placeholder="Club Type" />
              </SelectTrigger>
              <SelectContent className="bg-white text-black z-50">
                <SelectItem value="all" className="text-black hover:bg-gray-100 focus:bg-gray-100">All Types</SelectItem>
                {clubTypes.map(type => (
                  <SelectItem 
                    key={type} 
                    value={type} 
                    className="text-black hover:bg-gray-100 focus:bg-gray-100"
                  >
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={filters.music || "all"} onValueChange={handleMusicChange}>
              <SelectTrigger className="bg-white text-black">
                <SelectValue placeholder="Music Style" />
              </SelectTrigger>
              <SelectContent className="bg-white text-black z-50">
                <SelectItem value="all" className="text-black hover:bg-gray-100 focus:bg-gray-100">All Music</SelectItem>
                {musicTypes.map(music => (
                  <SelectItem 
                    key={music} 
                    value={music} 
                    className="text-black hover:bg-gray-100 focus:bg-gray-100"
                  >
                    {music}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={(value) => onSortChange(value as SortOption)}>
              <SelectTrigger className="bg-white text-black">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent className="bg-white text-black z-50">
                <SelectItem value="name" className="text-black hover:bg-gray-100 focus:bg-gray-100">Name</SelectItem>
                <SelectItem value="city" className="text-black hover:bg-gray-100 focus:bg-gray-100">City</SelectItem>
                <SelectItem value="year_founded" className="text-black hover:bg-gray-100 focus:bg-gray-100">Year Founded</SelectItem>
                <SelectItem value="capacity" className="text-black hover:bg-gray-100 focus:bg-gray-100">Capacity</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {(filters.city || filters.type || filters.music || filters.search) && (
            <div className="flex justify-end">
              <Button variant="ghost" size="sm" onClick={handleClearFilters} className="text-muted-foreground hover:text-foreground">
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ClubsFilterBar;
