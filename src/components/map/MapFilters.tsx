
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapItemType, MapFilters as MapFiltersType } from '@/types/map';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Search, Filter, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface MapFiltersProps {
  filters: MapFiltersType;
  onFiltersChange: (filters: MapFiltersType) => void;
}

const MAP_TYPES: { value: MapItemType | 'all'; label: string; icon: string }[] = [
  { value: 'all', label: 'All', icon: '🌍' },
  { value: 'artist', label: 'Artists', icon: '🎤' },
  { value: 'club', label: 'Clubs', icon: '🎵' },
  { value: 'event', label: 'Events', icon: '🎪' },
  { value: 'dancer', label: 'Dancers', icon: '💃' },
  { value: 'influencer', label: 'Influencers', icon: '📱' },
  { value: 'agency', label: 'Agencies', icon: '🏢' },
  { value: 'group', label: 'Groups', icon: '👥' },
  { value: 'user', label: 'Users', icon: '👤' }
];

const COUNTRIES = [
  'Nigeria', 'Ghana', 'South Africa', 'United Kingdom', 'United States',
  'Canada', 'France', 'Germany', 'Netherlands', 'Thailand', 'Ireland', 'Portugal'
];

export const MapFilters: React.FC<MapFiltersProps> = ({ filters, onFiltersChange }) => {
  const toggleType = (type: MapItemType | 'all') => {
    if (type === 'all') {
      onFiltersChange({ ...filters, types: ['all'] });
    } else {
      const newTypes = filters.types.includes('all') 
        ? [type]
        : filters.types.includes(type)
        ? filters.types.filter(t => t !== type)
        : [...filters.types.filter(t => t !== 'all'), type];
      
      onFiltersChange({ 
        ...filters, 
        types: newTypes.length === 0 ? ['all'] : newTypes 
      });
    }
  };

  const toggleCountry = (country: string) => {
    const newCountries = filters.countries.includes(country)
      ? filters.countries.filter(c => c !== country)
      : [...filters.countries, country];
    
    onFiltersChange({ ...filters, countries: newCountries });
  };

  const clearFilters = () => {
    onFiltersChange({
      types: ['all'],
      countries: [],
      searchQuery: '',
      dateRange: undefined
    });
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-[#008751]" />
              <h3 className="text-lg font-semibold text-black">Filters</h3>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearFilters}
              className="text-black border-[#008751]"
            >
              <X className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name, city, or country..."
              value={filters.searchQuery}
              onChange={(e) => onFiltersChange({ ...filters, searchQuery: e.target.value })}
              className="pl-10"
            />
          </div>

          {/* Types */}
          <div>
            <h4 className="text-sm font-medium text-black mb-3">Content Types</h4>
            <div className="flex flex-wrap gap-2">
              {MAP_TYPES.map((type) => (
                <Badge
                  key={type.value}
                  variant={filters.types.includes(type.value) ? "default" : "outline"}
                  className={cn(
                    "cursor-pointer transition-colors",
                    filters.types.includes(type.value)
                      ? "bg-[#008751] text-white hover:bg-[#008751]/90"
                      : "text-black border-[#008751] hover:bg-[#008751]/10"
                  )}
                  onClick={() => toggleType(type.value)}
                >
                  <span className="mr-1">{type.icon}</span>
                  {type.label}
                </Badge>
              ))}
            </div>
          </div>

          {/* Countries */}
          <div>
            <h4 className="text-sm font-medium text-black mb-3">Countries</h4>
            <div className="flex flex-wrap gap-2">
              {COUNTRIES.map((country) => (
                <Badge
                  key={country}
                  variant={filters.countries.includes(country) ? "default" : "outline"}
                  className={cn(
                    "cursor-pointer transition-colors",
                    filters.countries.includes(country)
                      ? "bg-[#F97316] text-white hover:bg-[#F97316]/90"
                      : "text-black border-[#F97316] hover:bg-[#F97316]/10"
                  )}
                  onClick={() => toggleCountry(country)}
                >
                  {country}
                </Badge>
              ))}
            </div>
          </div>

          {/* Date Range for Events */}
          <div>
            <h4 className="text-sm font-medium text-black mb-3">Event Date Range</h4>
            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal",
                      !filters.dateRange?.from && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filters.dateRange?.from ? (
                      filters.dateRange.to ? (
                        <>
                          {format(filters.dateRange.from, "LLL dd, y")} -{" "}
                          {format(filters.dateRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(filters.dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={filters.dateRange?.from}
                    selected={filters.dateRange}
                    onSelect={(range) => onFiltersChange({ ...filters, dateRange: range })}
                    numberOfMonths={2}
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              
              {filters.dateRange && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onFiltersChange({ ...filters, dateRange: undefined })}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
