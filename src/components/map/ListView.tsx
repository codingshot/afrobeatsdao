
import React from 'react';
import { MapItem, MapItemType } from '@/types/map';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, ExternalLink, Calendar, Globe, Instagram, Twitter, Youtube, Clock, Music } from 'lucide-react';

interface ListViewProps {
  items: MapItem[];
}

const getMarkerColor = (type: MapItemType): string => {
  const colors: Record<MapItemType, string> = {
    artist: '#F97316',
    club: '#008751',
    event: '#8B5CF6',
    dancer: '#EC4899',
    influencer: '#3B82F6',
    agency: '#6366F1',
    group: '#10B981',
    community: '#22D3EE',
    user: '#6B7280'
  };
  return colors[type];
};

const getTypeIcon = (type: MapItemType): string => {
  const icons: Record<MapItemType, string> = {
    artist: '🎤',
    club: '🎵',
    event: '🎪',
    dancer: '💃',
    influencer: '📱',
    agency: '🏢',
    group: '👥',
    community: '🌐',
    user: '👤'
  };
  return icons[type];
};

const getCountryFlag = (countryName: string): string => {
  const flagMap: Record<string, string> = {
    'Nigeria': '🇳🇬',
    'Ghana': '🇬🇭', 
    'South Africa': '🇿🇦',
    'United Kingdom': '🇬🇧',
    'United States': '🇺🇸',
    'Canada': '🇨🇦',
    'France': '🇫🇷',
    'Germany': '🇩🇪',
    'Netherlands': '🇳🇱',
    'Thailand': '🇹🇭',
    'Ireland': '🇮🇪',
    'Portugal': '🇵🇹',
    'Morocco': '🇲🇦',
    'Vietnam': '🇻🇳'
  };
  return flagMap[countryName] || '🏳️';
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const formatYouTubeUrl = (url: string): string => {
  if (!url) return '';
  
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  if (url.includes('youtube.com')) {
    return `https://${url}`;
  }
  
  if (url.startsWith('@') || url.startsWith('/')) {
    return `https://youtube.com${url.startsWith('@') ? '/' + url : url}`;
  }
  
  return `https://youtube.com/${url}`;
};

export const ListView: React.FC<ListViewProps> = ({ items }) => {
  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-600 mb-4">
        Showing {items.length} results
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Card key={item.id} className="border border-[#008751]/20 hover:border-[#008751]/40 transition-colors">
            <CardContent className="p-0">
              {/* Image header if available */}
              {item.image && (
                <div className="relative">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge 
                      className="text-xs shadow-md"
                      style={{ backgroundColor: getMarkerColor(item.type), color: 'white' }}
                    >
                      {getTypeIcon(item.type)} {item.type}
                    </Badge>
                  </div>
                </div>
              )}
              
              <div className="p-4">
                {/* Header with flag and name */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xl">{getCountryFlag(item.country)}</span>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-black leading-tight">{item.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {item.city && <span>{item.city}, </span>}
                      <span>{item.country}</span>
                    </div>
                  </div>
                </div>

                {/* Type badge if no image */}
                {!item.image && (
                  <div className="mb-3">
                    <Badge 
                      className="text-xs"
                      style={{ backgroundColor: getMarkerColor(item.type), color: 'white' }}
                    >
                      {getTypeIcon(item.type)} {item.type}
                    </Badge>
                  </div>
                )}

                {/* Description */}
                {item.description && (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-3">{item.description}</p>
                )}

                {/* Event specific info */}
                {item.type === 'event' && item.eventDate && (
                  <div className="flex items-center gap-2 mb-3 p-2 bg-purple-50 rounded-md">
                    <Calendar className="h-4 w-4 text-purple-600" />
                    <div className="text-sm">
                      <span className="font-medium text-purple-900">{formatDate(item.eventDate)}</span>
                      {item.eventEndDate && (
                        <span className="text-purple-700"> - {formatDate(item.eventEndDate)}</span>
                      )}
                    </div>
                  </div>
                )}

                {/* Club specific info */}
                {item.type === 'club' && (
                  <div className="space-y-2 mb-3">
                    {item.openingHours && (
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-green-600" />
                        <span className="text-gray-700">{item.openingHours}</span>
                      </div>
                    )}
                    {item.musicStyle && (
                      <div className="flex items-center gap-2 text-sm">
                        <Music className="h-4 w-4 text-green-600" />
                        <span className="text-gray-700">{item.musicStyle}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Artist specific info */}
                {item.type === 'artist' && item.genre && (
                  <div className="flex items-center gap-2 mb-3 text-sm">
                    <Music className="h-4 w-4 text-orange-600" />
                    <span className="text-gray-700">{item.genre}</span>
                  </div>
                )}

                {/* Social links */}
                {item.socialLinks && (
                  <div className="flex gap-2 mb-4 flex-wrap">
                    {item.socialLinks.instagram && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0 border-pink-200 hover:bg-pink-50 hover:border-pink-300"
                        onClick={() => window.open(`https://instagram.com/${item.socialLinks!.instagram}`, '_blank')}
                      >
                        <Instagram className="h-4 w-4 text-pink-600" />
                      </Button>
                    )}
                    {item.socialLinks.twitter && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0 border-blue-200 hover:bg-blue-50 hover:border-blue-300"
                        onClick={() => window.open(`https://twitter.com/${item.socialLinks!.twitter}`, '_blank')}
                      >
                        <Twitter className="h-4 w-4 text-blue-600" />
                      </Button>
                    )}
                    {item.socialLinks.youtube && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0 border-red-200 hover:bg-red-50 hover:border-red-300"
                        onClick={() => window.open(formatYouTubeUrl(item.socialLinks!.youtube), '_blank')}
                      >
                        <Youtube className="h-4 w-4 text-red-600" />
                      </Button>
                    )}
                  </div>
                )}

                {/* Website button */}
                {item.website && (
                  <Button 
                    className="w-full bg-[#008751] hover:bg-[#008751]/90 text-white shadow-md"
                    onClick={() => window.open(item.website, '_blank')}
                  >
                    <Globe className="mr-2 h-4 w-4" />
                    Visit Website
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
