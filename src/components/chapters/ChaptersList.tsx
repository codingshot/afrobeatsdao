
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { desiredChapters, DesiredChapter, getChaptersByRegion } from '@/data/chapters';
import { MapPin, Users, Star, MessageCircle, Twitter, Search } from 'lucide-react';

const getStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    target: '#008751',
    interest: '#F97316',
    forming: '#8B5CF6',
    'leader-wanted': '#E63946'
  };
  return colors[status] || '#6B7280';
};

const getStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    target: 'Target University',
    interest: 'Interest Expressed',
    forming: 'Chapter Forming',
    'leader-wanted': 'Leader Wanted'
  };
  return labels[status] || status;
};

export const ChaptersList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const filteredChapters = desiredChapters.filter(chapter => {
    const matchesSearch = chapter.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         chapter.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         chapter.country.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRegion = regionFilter === 'all' || chapter.region === regionFilter;
    const matchesStatus = statusFilter === 'all' || chapter.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || chapter.priority === priorityFilter;

    return matchesSearch && matchesRegion && matchesStatus && matchesPriority;
  });

  const regionsByGroup = getChaptersByRegion();
  const regions = Object.keys(regionsByGroup);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-white rounded-lg border-2 border-afro-teal">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search universities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={regionFilter} onValueChange={setRegionFilter}>
          <SelectTrigger>
            <SelectValue placeholder="All Regions" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Regions</SelectItem>
            {regions.map(region => (
              <SelectItem key={region} value={region}>{region}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger>
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="target">Target University</SelectItem>
            <SelectItem value="interest">Interest Expressed</SelectItem>
            <SelectItem value="forming">Chapter Forming</SelectItem>
            <SelectItem value="leader-wanted">Leader Wanted</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger>
            <SelectValue placeholder="All Priorities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="high">High Priority</SelectItem>
            <SelectItem value="medium">Medium Priority</SelectItem>
            <SelectItem value="low">Low Priority</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results count */}
      <div className="text-center">
        <p className="text-lg text-black">
          Showing {filteredChapters.length} of {desiredChapters.length} universities
        </p>
      </div>

      {/* Chapters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChapters.map((chapter) => (
          <Card key={chapter.id} className="border-2 border-afro-teal hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{chapter.university}</CardTitle>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4" />
                    {chapter.city}, {chapter.country}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Badge 
                    className="text-xs"
                    style={{ backgroundColor: getStatusColor(chapter.status), color: 'white' }}
                  >
                    {getStatusLabel(chapter.status)}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-500" />
                    <span className="text-xs capitalize">{chapter.priority}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">{chapter.description}</p>
              
              {chapter.targetStudentPopulation && (
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span>{chapter.targetStudentPopulation.toLocaleString()} students</span>
                </div>
              )}
              
              {chapter.existingAfrobeatsPresence && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Afrobeats Presence:</p>
                  <p className="text-sm text-gray-600">{chapter.existingAfrobeatsPresence}</p>
                </div>
              )}
              
              {chapter.keyFacilities && chapter.keyFacilities.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Key Facilities:</p>
                  <div className="flex flex-wrap gap-1">
                    {chapter.keyFacilities.slice(0, 3).map((facility, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {facility}
                      </Badge>
                    ))}
                    {chapter.keyFacilities.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{chapter.keyFacilities.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}
              
              {chapter.reasoning && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Why this university:</p>
                  <p className="text-sm text-gray-600 italic">{chapter.reasoning}</p>
                </div>
              )}
              
              <div className="pt-2 border-t">
                <p className="text-sm font-medium text-gray-700 mb-2">Interested in starting this chapter?</p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="flex-1 bg-[#008751] hover:bg-[#008751]/90 text-white"
                    onClick={() => window.open(chapter.contactMethods.discord, '_blank')}
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Discord
                  </Button>
                  {chapter.contactMethods.twitter && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-blue-200 hover:bg-blue-50"
                      onClick={() => window.open(chapter.contactMethods.twitter, '_blank')}
                    >
                      <Twitter className="h-4 w-4 text-blue-600" />
                    </Button>
                  )}
                  {chapter.contactMethods.telegram && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-blue-200 hover:bg-blue-50"
                      onClick={() => window.open(chapter.contactMethods.telegram, '_blank')}
                    >
                      <MessageCircle className="h-4 w-4 text-blue-600" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredChapters.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600 mb-4">No universities match your filters</p>
          <Button
            onClick={() => {
              setSearchTerm('');
              setRegionFilter('all');
              setStatusFilter('all');
              setPriorityFilter('all');
            }}
            variant="outline"
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};
