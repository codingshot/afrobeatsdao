
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapItemType, MapFilters as MapFiltersType } from '@/types/map';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { CalendarIcon, Search, Filter, X, ChevronDown, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';

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
  { value: 'group', label: 'Groups', icon: '👥' }
];

const ADVANCED_TYPES: { value: MapItemType; label: string; icon: string }[] = [
  { value: 'user', label: 'Users', icon: '👤' }
];

export const MapFilters: React.FC<MapFiltersProps> = ({ filters, onFiltersChange }) => {
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
      <CardContent className="p-3 md:p-6">
        <div className="space-y-4 md:space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 md:h-5 md:w-5 text-[#008751]" />
              <h3 className="text-base md:text-lg font-semibold text-black">Filters</h3>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearFilters}
              className="text-black border-[#008751] text-xs md:text-sm"
            >
              <X className="h-3 w-3 md:h-4 md:w-4 mr-1" />
              Clear
            </Button>
          </div>

          {/* Search, Advanced Settings, and Event Date Range in one row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search..."
                value={filters.searchQuery}
                onChange={(e) => onFiltersChange({ ...filters, searchQuery: e.target.value })}
                className="pl-10 text-sm"
              />
            </div>

            {/* Advanced Settings */}
            <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="w-full justify-between text-xs md:text-sm">
                  <div className="flex items-center gap-2">
                    <Settings className="h-3 w-3 md:h-4 md:w-4" />
                    Advanced
                  </div>
                  <ChevronDown className={cn("h-3 w-3 md:h-4 md:w-4 transition-transform", showAdvanced && "rotate-180")} />
                </Button>
              </CollapsibleTrigger>
            </Collapsible>

            {/* Event Date Range - Only show if events are selected */}
            {eventsSelected && (
              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-start text-left font-normal text-xs md:text-sm w-full",
                        !filters.dateRange?.from && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                      {filters.dateRange?.from ? (
                        filters.dateRange.to ? (
                          <span className="hidden sm:inline">
                            {format(filters.dateRange.from, "LLL dd, y")} -{" "}
                            {format(filters.dateRange.to, "LLL dd, y")}
                          </span>
                        ) : (
                          format(filters.dateRange.from, "LLL dd, y")
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
                    className="h-8 w-8 md:h-10 md:w-10 flex-shrink-0"
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
            <h4 className="text-xs md:text-sm font-medium text-black mb-2 md:mb-3">Content Types</h4>
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
