
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { desiredChapters, DesiredChapter } from '@/data/chapters';
import { useIsMobile } from '@/hooks/use-mobile';
import { MessageCircle, Twitter, Users, MapPin, Star } from 'lucide-react';
import L from 'leaflet';

const getStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    target: '#008751',
    interest: '#F97316',
    forming: '#8B5CF6',
    'leader-wanted': '#E63946'
  };
  return colors[status] || '#6B7280';
};

const getPriorityIcon = (priority: string): string => {
  const icons: Record<string, string> = {
    high: '🌟',
    medium: '⭐',
    low: '✨'
  };
  return icons[priority] || '⭐';
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

const createChapterIcon = (chapter: DesiredChapter) => {
  const color = getStatusColor(chapter.status);
  
  return L.divIcon({
    html: `
      <div style="
        background-color: ${color};
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        cursor: pointer;
      ">
        ${getPriorityIcon(chapter.priority)}
      </div>
    `,
    className: 'chapter-marker',
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -10]
  });
};

export const ChaptersMap = () => {
  const isMobile = useIsMobile();
  const [filteredChapters, setFilteredChapters] = useState<DesiredChapter[]>(desiredChapters);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    });
  }, []);

  useEffect(() => {
    if (statusFilter === 'all') {
      setFilteredChapters(desiredChapters);
    } else {
      setFilteredChapters(desiredChapters.filter(chapter => chapter.status === statusFilter));
    }
  }, [statusFilter]);

  const defaultCenter = [20, 0] as [number, number];
  const defaultZoom = isMobile ? 1 : 2;

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-2 justify-center">
        <Badge
          variant={statusFilter === 'all' ? 'default' : 'outline'}
          className={`cursor-pointer ${statusFilter === 'all' ? 'bg-afro-teal' : 'border-afro-teal text-black hover:bg-afro-teal/10'}`}
          onClick={() => setStatusFilter('all')}
        >
          All ({desiredChapters.length})
        </Badge>
        {['target', 'interest', 'forming', 'leader-wanted'].map(status => {
          const count = desiredChapters.filter(c => c.status === status).length;
          return (
            <Badge
              key={status}
              variant={statusFilter === status ? 'default' : 'outline'}
              className={`cursor-pointer ${statusFilter === status ? 'bg-afro-teal' : 'border-afro-teal text-black hover:bg-afro-teal/10'}`}
              onClick={() => setStatusFilter(status)}
            >
              {getStatusLabel(status)} ({count})
            </Badge>
          );
        })}
      </div>

      {/* Map */}
      <div className="rounded-lg overflow-hidden border-2 border-afro-teal h-[60vh] w-full bg-white/10 relative">
        <MapContainer 
          center={defaultCenter as L.LatLngExpression}
          zoom={defaultZoom} 
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
          className="z-0"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {filteredChapters.map((chapter) => (
            <Marker 
              key={chapter.id}
              position={[chapter.coordinates[1], chapter.coordinates[0]] as L.LatLngExpression}
              icon={createChapterIcon(chapter)}
            >
              <Popup maxWidth={isMobile ? 280 : 350} className="custom-popup">
                <div className="p-0">
                  <Card className="border-0 shadow-lg max-w-full bg-white rounded-lg overflow-hidden">
                    <CardContent className="p-4">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-black leading-tight mb-1">
                            {chapter.university}
                          </h3>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {chapter.city}, {chapter.country}
                          </p>
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
                            <span className="text-xs capitalize">{chapter.priority} Priority</span>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-gray-600 mb-3">{chapter.description}</p>

                      {/* Details */}
                      {chapter.targetStudentPopulation && (
                        <div className="flex items-center gap-1 mb-2 p-1.5 bg-blue-50 rounded-md">
                          <Users className="h-3 w-3 text-blue-600" />
                          <span className="text-xs text-blue-900">
                            {chapter.targetStudentPopulation.toLocaleString()} students
                          </span>
                        </div>
                      )}

                      {chapter.existingAfrobeatsPresence && (
                        <div className="mb-3">
                          <p className="text-xs font-medium text-gray-700 mb-1">Afrobeats Presence:</p>
                          <p className="text-xs text-gray-600">{chapter.existingAfrobeatsPresence}</p>
                        </div>
                      )}

                      {chapter.keyFacilities && chapter.keyFacilities.length > 0 && (
                        <div className="mb-3">
                          <p className="text-xs font-medium text-gray-700 mb-1">Key Facilities:</p>
                          <div className="flex flex-wrap gap-1">
                            {chapter.keyFacilities.slice(0, 3).map((facility, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {facility}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Contact buttons */}
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-gray-700">Interested in starting this chapter?</p>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            className="flex-1 bg-[#008751] hover:bg-[#008751]/90 text-white text-xs h-7"
                            onClick={() => window.open(chapter.contactMethods.discord, '_blank')}
                          >
                            <MessageCircle className="mr-1 h-3 w-3" />
                            Discord
                          </Button>
                          {chapter.contactMethods.twitter && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 w-7 p-0 border-blue-200 hover:bg-blue-50"
                              onClick={() => window.open(chapter.contactMethods.twitter, '_blank')}
                            >
                              <Twitter className="h-3 w-3 text-blue-600" />
                            </Button>
                          )}
                          {chapter.contactMethods.telegram && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 w-7 p-0 border-blue-200 hover:bg-blue-50"
                              onClick={() => window.open(chapter.contactMethods.telegram, '_blank')}
                            >
                              <MessageCircle className="h-3 w-3 text-blue-600" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 z-[20]">
          <Card className="bg-white/90 backdrop-blur-sm border-afro-teal shadow-lg">
            <CardContent className="p-3">
              <h4 className="text-xs font-semibold text-black mb-2">Chapter Status</h4>
              <div className="space-y-1">
                {[
                  { status: 'target', label: 'Target', color: getStatusColor('target') },
                  { status: 'interest', label: 'Interest', color: getStatusColor('interest') },
                  { status: 'forming', label: 'Forming', color: getStatusColor('forming') },
                  { status: 'leader-wanted', label: 'Leader Wanted', color: getStatusColor('leader-wanted') }
                ].map(({ status, label, color }) => (
                  <div key={status} className="flex items-center gap-2 text-xs">
                    <div 
                      className="w-3 h-3 rounded-full border border-white shadow-sm" 
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-black">{label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
