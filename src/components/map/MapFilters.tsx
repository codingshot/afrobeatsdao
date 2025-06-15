import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapItemType, MapFilters as MapFiltersType } from '@/types/map';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { CalendarIcon, Search, X, ChevronDown, Settings, Map as MapIcon, List } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';

interface MapFiltersProps {
  filters: MapFiltersType;
  onFiltersChange: (filters: MapFiltersType) => void;
  viewMode?: 'map' | 'list';
  onViewModeChange?: (mode: 'map' | 'list') => void;
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
  { value: 'community', label: 'Communities', icon: '🌐' }
];

const ADVANCED_TYPES: { value: MapItemType; label: string; icon: string }[] = [
  { value: 'user', label: 'Users', icon: '👤' }
];

export const MapFilters: React.FC<MapFiltersProps> = ({ 
  filters, 
  onFiltersChange, 
  viewMode = 'map', 
  onViewModeChange 
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  
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

  const clearFilters = () => {
    onFiltersChange({
      types: ['all'],
      countries: [],
      searchQuery: '',
      dateRange: undefined
    });
  };

  const handleDateRangeChange = (range: DateRange | undefined) => {
    if (range && range.from && range.to) {
      onFiltersChange({ 
        ...filters, 
        dateRange: { from: range.from, to: range.to }
      });
    } else {
      onFiltersChange({ ...filters, dateRange: undefined });
    }
  };

  // Check if events are selected
  const eventsSelected = filters.types.includes('event') || filters.types.includes('all');

  return (
    <Card className="w-full">
      <CardContent className="p-3 md:p-4">
        <div className="space-y-3 md:space-y-4">
          {/* Search, View Toggle, Clear, Advanced Settings, and Event Date Range in one row */}
          <div className="flex gap-2 flex-wrap md:flex-nowrap">
            {/* Search - dynamic width based on event selection and screen size */}
            <div className={`relative ${eventsSelected ? 'flex-1 w-full md:w-auto' : 'flex-[2] w-full md:w-auto'} ${eventsSelected ? 'order-1' : 'order-1'}`}>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search locations, artists, clubs..."
                value={filters.searchQuery}
                onChange={(e) => onFiltersChange({ ...filters, searchQuery: e.target.value })}
                className="pl-10 text-sm"
              />
            </div>

            {/* View Toggle */}
            {onViewModeChange && (
              <div className="flex rounded-lg border border-[#008751]/30 p-1 bg-white order-2">
                <Button
                  variant={viewMode === 'map' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => onViewModeChange('map')}
                  className={viewMode === 'map' ? 'bg-[#008751] text-white' : 'text-black hover:bg-[#008751]/10'}
                >
                  <MapIcon className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Map</span>
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => onViewModeChange('list')}
                  className={viewMode === 'list' ? 'bg-[#008751] text-white' : 'text-black hover:bg-[#008751]/10'}
                >
                  <List className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">List</span>
                </Button>
              </div>
            )}

            {/* Clear Filter Button */}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearFilters}
              className="text-black border-[#008751] text-xs md:text-sm h-10 px-3 order-3"
            >
              <X className="h-3 w-3 md:h-4 md:w-4 mr-1" />
              <span className="hidden sm:inline">Clear</span>
            </Button>

            {/* Advanced Settings */}
            <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="justify-between text-xs md:text-sm h-10 px-3 order-4">
                  <div className="flex items-center gap-2">
                    <Settings className="h-3 w-3 md:h-4 md:w-4" />
                    <span className="hidden sm:inline">Advanced</span>
                  </div>
                  <ChevronDown className={cn("h-3 w-3 md:h-4 md:w-4 transition-transform", showAdvanced && "rotate-180")} />
                </Button>
              </CollapsibleTrigger>
            </Collapsible>

            {/* Event Date Range - only show if events are selected and responsive */}
            {eventsSelected && (
              <div className="flex gap-2 order-5 w-full md:w-auto">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-start text-left font-normal text-xs md:text-sm h-10 px-3 flex-1 md:flex-initial",
                        !filters.dateRange?.from && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                      {filters.dateRange?.from ? (
                        filters.dateRange.to ? (
                          <span className="hidden sm:inline">
                            {format(filters.dateRange.from, "MMM dd")} - {format(filters.dateRange.to, "MMM dd")}
                          </span>
                        ) : (
                          <span>{format(filters.dateRange.from, "MMM dd")}</span>
                        )
                      ) : (
                        <span>Event dates</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={filters.dateRange?.from}
                      selected={filters.dateRange}
                      onSelect={handleDateRangeChange}
                      numberOfMonths={1}
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                
                {filters.dateRange && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onFiltersChange({ ...filters, dateRange: undefined })}
                    className="h-10 w-10 flex-shrink-0"
                  >
                    <X className="h-3 w-3 md:h-4 md:w-4" />
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Advanced Settings Content */}
          <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
            <CollapsibleContent className="space-y-3">
              <div>
                <h5 className="text-xs font-medium text-black mb-2">Additional Types</h5>
                <div className="flex flex-wrap gap-1 md:gap-2">
                  {ADVANCED_TYPES.map((type) => (
                    <Badge
                      key={type.value}
                      variant={filters.types.includes(type.value) ? "default" : "outline"}
                      className={cn(
                        "cursor-pointer transition-colors text-xs",
                        filters.types.includes(type.value)
                          ? "bg-[#008751] text-white hover:bg-[#008751]/90"
                          : "text-black border-[#008751] hover:bg-[#008751]/10"
                      )}
                      onClick={() => toggleType(type.value)}
                    >
                      <span className="mr-1">{type.icon}</span>
                      <span className="hidden sm:inline">{type.label}</span>
                    </Badge>
                  ))}
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Types */}
          <div>
            <div className="flex flex-wrap gap-1 md:gap-2">
              {MAP_TYPES.map((type) => (
                <Badge
                  key={type.value}
                  variant={filters.types.includes(type.value) ? "default" : "outline"}
                  className={cn(
                    "cursor-pointer transition-colors text-xs",
                    filters.types.includes(type.value)
                      ? "bg-[#008751] text-white hover:bg-[#008751]/90"
                      : "text-black border-[#008751] hover:bg-[#008751]/10"
                  )}
                  onClick={() => toggleType(type.value)}
                >
                  <span className="mr-1">{type.icon}</span>
                  <span className="hidden sm:inline">{type.label}</span>
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
