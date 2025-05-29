
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GlobalMapView } from '@/components/map/GlobalMapView';
import { useMapData } from '@/hooks/use-map-data';

export const MapPreview = () => {
  const navigate = useNavigate();
  const { data: mapItems, isLoading } = useMapData();

  // Get a subset of items for preview (limit to reduce load time)
  const previewItems = mapItems?.slice(0, 50) || [];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-2 text-black">
            <MapPin className="h-8 w-8 text-[#008751]" />
            <span>Global Afrobeats Map</span>
            <span className="text-3xl">🌍</span>
          </h2>
          <p className="text-lg text-black/80 max-w-2xl mx-auto">
            Discover artists, clubs, events, and the worldwide Afrobeats community
          </p>
        </div>

        <Card className="overflow-hidden border-[#008751] border-2">
          <CardContent className="p-0">
            <div className="h-[400px] md:h-[500px] relative">
              {isLoading ? (
                <div className="flex items-center justify-center h-full bg-[#FEF7CD]/50">
                  <div className="text-black">Loading map...</div>
                </div>
              ) : (
                <GlobalMapView items={previewItems} />
              )}
              
              {/* Overlay with action button */}
              <div className="absolute top-4 right-4 z-[1000]">
                <Button
                  onClick={() => navigate('/map')}
                  className="bg-[#008751] hover:bg-[#008751]/90 text-white shadow-lg"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Explore Full Map
                </Button>
              </div>
            </div>

            {/* Quick stats */}
            <div className="p-4 bg-[#FEF7CD]/30 border-t border-[#008751]/20">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-xl font-bold text-[#008751]">
                    {mapItems?.filter(item => item.type === 'artist').length || 0}
                  </div>
                  <div className="text-sm text-black/70">Artists</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-[#008751]">
                    {mapItems?.filter(item => item.type === 'club').length || 0}
                  </div>
                  <div className="text-sm text-black/70">Clubs</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-[#008751]">
                    {mapItems?.filter(item => item.type === 'event').length || 0}
                  </div>
                  <div className="text-sm text-black/70">Events</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-[#008751]">
                    {new Set(mapItems?.map(item => item.country)).size || 0}
                  </div>
                  <div className="text-sm text-black/70">Countries</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
