
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { desiredChapters, getChaptersByRegion, getChaptersByStatus } from '@/data/chapters';
import { MessageCircle, Twitter, Users, MapPin, Search, Filter } from 'lucide-react';

const getCountryFlag = (country: string) => {
  const flagMap: Record<string, string> = {
    'Nigeria': '🇳🇬',
    'Ghana': '🇬🇭',
    'Kenya': '🇰🇪',
    'South Africa': '🇿🇦',
    'United States': '🇺🇸',
    'United Kingdom': '🇬🇧',
    'Canada': '🇨🇦',
    'France': '🇫🇷'
  };
  return flagMap[country] || '🌍';
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'target': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'interest': return 'bg-green-100 text-green-800 border-green-200';
    case 'forming': return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'leader-wanted': return 'bg-purple-100 text-purple-800 border-purple-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'bg-red-100 text-red-800 border-red-200';
    case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'low': return 'bg-gray-100 text-gray-800 border-gray-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export const ChaptersList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [regionFilter, setRegionFilter] = useState<string>('all');
  
  const chaptersByRegion = getChaptersByRegion();
  const chaptersByStatus = getChaptersByStatus();
  
  const regions = Object.keys(chaptersByRegion);
  const statuses = Object.keys(chaptersByStatus);

  const filteredChapters = desiredChapters.filter(chapter => {
    const matchesSearch = chapter.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         chapter.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         chapter.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || chapter.status === statusFilter;
    const matchesRegion = regionFilter === 'all' || chapter.region === regionFilter;
    
    return matchesSearch && matchesStatus && matchesRegion;
  });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search universities, cities, or countries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-auto bg-white">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-200 shadow-lg">
            <SelectItem value="all">All Statuses</SelectItem>
            {statuses.map(status => (
              <SelectItem key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={regionFilter} onValueChange={setRegionFilter}>
          <SelectTrigger className="w-full md:w-auto bg-white">
            <SelectValue placeholder="Filter by region" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-200 shadow-lg">
            <SelectItem value="all">All Regions</SelectItem>
            {regions.map(region => (
              <SelectItem key={region} value={region}>
                {region}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Results Summary */}
      <div className="text-sm text-gray-600 mb-4">
        Showing {filteredChapters.length} of {desiredChapters.length} target universities
      </div>

      {/* Chapters Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChapters.map((chapter) => (
          <Card key={chapter.id} className="border-2 border-gray-200 hover:border-afro-teal transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg leading-tight">
                  {chapter.university}
                </CardTitle>
                <div className="flex flex-col gap-1">
                  <Badge className={getPriorityColor(chapter.priority)}>
                    {chapter.priority}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Location with Flag */}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span className="flex items-center gap-1">
                  {getCountryFlag(chapter.country)}
                  {chapter.city}, {chapter.country}
                </span>
              </div>

              {/* Status */}
              <div className="flex items-center gap-2">
                <Badge className={getStatusColor(chapter.status)}>
                  {chapter.status.replace('-', ' ')}
                </Badge>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-600">{chapter.region}</span>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed">
                {chapter.description}
              </p>

              {/* Key Details */}
              {chapter.targetStudentPopulation && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="h-4 w-4" />
                  <span>{chapter.targetStudentPopulation.toLocaleString()} students</span>
                </div>
              )}

              {/* Afrobeats Presence */}
              {chapter.existingAfrobeatsPresence && (
                <div className="text-sm">
                  <span className="font-medium text-gray-700">Afrobeats Presence:</span>
                  <span className="text-gray-600 ml-1">{chapter.existingAfrobeatsPresence}</span>
                </div>
              )}

              {/* Reasoning */}
              {chapter.reasoning && (
                <div className="text-sm">
                  <span className="font-medium text-gray-700">Why this university:</span>
                  <p className="text-gray-600 mt-1">{chapter.reasoning}</p>
                </div>
              )}

              {/* Contact Methods */}
              <div className="flex gap-2 pt-2 border-t border-gray-100">
                {chapter.contactMethods.discord && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(chapter.contactMethods.discord, '_blank')}
                  >
                    <MessageCircle className="mr-1 h-3 w-3" />
                    Discord
                  </Button>
                )}
                {chapter.contactMethods.telegram && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(chapter.contactMethods.telegram, '_blank')}
                  >
                    <MessageCircle className="mr-1 h-3 w-3" />
                    Telegram
                  </Button>
                )}
                {chapter.contactMethods.twitter && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(chapter.contactMethods.twitter, '_blank')}
                  >
                    <Twitter className="mr-1 h-3 w-3" />
                    Twitter
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredChapters.length === 0 && (
        <div className="text-center py-12">
          <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No universities found</h3>
          <p className="text-gray-500">
            Try adjusting your search terms or filters to find target universities.
          </p>
        </div>
      )}
    </div>
  );
};
