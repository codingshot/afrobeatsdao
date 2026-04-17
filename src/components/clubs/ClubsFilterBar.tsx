
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ClubFilters, ClubViewMode, SortOption } from '@/types/club';
import { Map, List, Search, Filter } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useIsMobile } from '@/hooks/use-mobile';

interface ClubsFilterBarProps {
  viewMode: ClubViewMode;
  onViewModeChange: (mode: ClubViewMode) => void;
  filters: ClubFilters;
  onFiltersChange: (filters: ClubFilters) => void;
  /** When set, "Clear filters" also resets sort and URL search (matches empty-state reset). */
  onResetAll?: () => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  cities: string[];
  musicTypes: string[];
  clubTypes: string[];
  resultCount: number;
  totalCount: number;
}

const ClubsFilterBar: React.FC<ClubsFilterBarProps> = ({
  viewMode,
  onViewModeChange,
  filters,
  onFiltersChange,
  sortBy,
  onSortChange,
  cities,
  musicTypes,
  clubTypes,
  resultCount,
  totalCount,
}) => {
  const isMobile = useIsMobile();
  const [showFiltersOnMobile, setShowFiltersOnMobile] = useState(false);

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
    if (onResetAll) onResetAll();
    else onFiltersChange({});
  };

  const toggleFilters = () => {
    setShowFiltersOnMobile(!showFiltersOnMobile);
  };

  const toggleFilters = () => {
    setShowFiltersOnMobile(!showFiltersOnMobile);
  };

  return (
    <Card className="mb-6 border-[#008751]/20 shadow-sm bg-card/80 backdrop-blur-sm">
      <CardContent className="p-4 md:p-5">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-center sm:text-left">
            <div>
              <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground">Explore venues</h2>
              <p className="text-muted-foreground text-sm mt-0.5">
                Filter by city, style, or keyword — then map or list view.
              </p>
            </div>
            <div className="inline-flex items-center justify-center gap-2 rounded-full border border-[#008751]/25 bg-[#008751]/5 px-3 py-1.5 text-sm self-center sm:self-auto">
              <span className="font-semibold tabular-nums text-[#008751]">{resultCount}</span>
              <span className="text-muted-foreground">/</span>
              <span className="tabular-nums text-muted-foreground">{totalCount}</span>
              <span className="text-muted-foreground hidden sm:inline">venues</span>
            </div>
          </div>

          {/* Search Row with Filter Toggle and View Toggle */}
          <div className="flex gap-2 items-center">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="clubs-directory-search"
                placeholder="Search clubs..."
                className="pl-8"
                value={filters.search || ''}
                onChange={handleSearchChange}
                autoComplete="off"
              />
            </div>

            {/* Filter Toggle Button (Mobile Only) */}
            {isMobile && (
              <Button
                variant="outline"
                size="sm"
                onClick={toggleFilters}
                className={`${showFiltersOnMobile ? 'bg-[#008751] text-white' : 'text-black border-[#008751]'}`}
              >
                <Filter className="h-4 w-4" />
              </Button>
            )}

            {/* View Toggle */}
            <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && onViewModeChange(value as ClubViewMode)}>
              <ToggleGroupItem value="map" aria-label="Map View">
                <Map className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="card" aria-label="Card View">
                <List className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          {/* Filters - Hidden on mobile unless toggled */}
          {(!isMobile || showFiltersOnMobile) && (
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
              <Select value={filters.city || "all"} onValueChange={handleCityChange}>
                <SelectTrigger className="bg-background border-[#008751]/20">
                  <SelectValue placeholder="City" />
                </SelectTrigger>
                <SelectContent className="z-[100]">
                  <SelectItem value="all">All cities</SelectItem>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filters.type || "all"} onValueChange={handleTypeChange}>
                <SelectTrigger className="bg-background border-[#008751]/20">
                  <SelectValue placeholder="Venue type" />
                </SelectTrigger>
                <SelectContent className="z-[100]">
                  <SelectItem value="all">All types</SelectItem>
                  {clubTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filters.music || "all"} onValueChange={handleMusicChange}>
                <SelectTrigger className="bg-background border-[#008751]/20">
                  <SelectValue placeholder="Music" />
                </SelectTrigger>
                <SelectContent className="z-[100]">
                  <SelectItem value="all">All music tags</SelectItem>
                  {musicTypes.map((music) => (
                    <SelectItem key={music} value={music}>
                      {music}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={(value) => onSortChange(value as SortOption)}>
                <SelectTrigger className="bg-background border-[#008751]/20">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent className="z-[100]">
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="city">City</SelectItem>
                  <SelectItem value="year_founded">Era</SelectItem>
                  <SelectItem value="capacity">Capacity</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Clear Filters */}
          {(filters.city || filters.type || filters.music || filters.search) && (
            <div className="flex justify-end">
              <Button type="button" variant="ghost" size="sm" onClick={handleClearFilters} className="text-muted-foreground hover:text-foreground">
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
