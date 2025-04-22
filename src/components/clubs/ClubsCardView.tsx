
import React from 'react';
import { Club } from '@/types/club';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { MapPin, ExternalLink, Info, Clock, Music, Users } from 'lucide-react';
import { useCountryFlags } from '@/hooks/use-country-flags';
import { Badge } from '@/components/ui/badge';

interface ClubsCardViewProps {
  clubs: Club[];
}

const ClubsCardView: React.FC<ClubsCardViewProps> = ({ clubs }) => {
  const { getFlag } = useCountryFlags();

  // Helper function to get country based on city
  const getCountryFromCity = (city: string) => {
    if (city === "London") return "United Kingdom";
    if (city === "Bangkok") return "Thailand";
    if (city === "Dublin") return "Ireland";
    if (city === "Amsterdam") return "Netherlands";
    return "";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {clubs.map((club, index) => (
        <Card key={`${club.name}-${index}`} className="overflow-hidden transition-all hover:shadow-md border-[#008751]/20">
          <CardHeader className="p-4 pb-2">
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-2">
                <img 
                  src={getFlag(getCountryFromCity(club.city))} 
                  alt={`${club.city} flag`}
                  className="w-6 h-4 object-cover rounded-sm mt-1"
                />
                <div>
                  <CardTitle className="text-xl">{club.name}</CardTitle>
                  <CardDescription>{club.city}</CardDescription>
                </div>
              </div>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                    <Info className="h-4 w-4" />
                    <span className="sr-only">Club details</span>
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80 z-50" align="end">
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">Club Details</h4>
                    {club.year_founded && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Year Founded:</span>
                        <span>{club.year_founded}</span>
                      </div>
                    )}
                    {club.type && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Type:</span>
                        <span>{club.type}</span>
                      </div>
                    )}
                    {club.capacity && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Capacity:</span>
                        <span>{club.capacity}</span>
                      </div>
                    )}
                    {club.dress_code && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Dress Code:</span>
                        <span>{club.dress_code}</span>
                      </div>
                    )}
                    {club.entry_fee && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Entry Fee:</span>
                        <span>{club.entry_fee}</span>
                      </div>
                    )}
                    {club.drinks_policy && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Drinks:</span>
                        <span>{club.drinks_policy}</span>
                      </div>
                    )}
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            {club.address && (
              <p className="text-sm mb-2">
                <MapPin className="inline-block h-3.5 w-3.5 mr-1 text-muted-foreground" />
                {club.address}
              </p>
            )}
            
            {club.music && (
              <div className="flex items-start mb-2">
                <Music className="h-3.5 w-3.5 mr-1 text-muted-foreground mt-0.5" />
                <div className="flex flex-wrap gap-1">
                  {club.music.split(',').map((genre, i) => (
                    <Badge key={i} variant="outline" className="text-xs bg-[#F97316]/10">
                      {genre.trim()}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {club.hours && (
              <p className="text-sm mb-2 flex items-center">
                <Clock className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                {club.hours}
              </p>
            )}
            
            {club.capacity && (
              <p className="text-sm mb-2 flex items-center">
                <Users className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                {club.capacity}
              </p>
            )}
            
            {club.general_rating && (
              <p className="text-sm italic text-muted-foreground">{club.general_rating}</p>
            )}
          </CardContent>
          <CardFooter className="p-4 pt-0 flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={() => window.open(club.google_maps, '_blank')}
            >
              <MapPin className="mr-1 h-4 w-4" />
              Maps
            </Button>
            {club.website && (
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
                onClick={() => window.open(club.website, '_blank')}
              >
                <ExternalLink className="mr-1 h-4 w-4" />
                Website
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ClubsCardView;
