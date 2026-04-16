
import React, { useState, useMemo, useEffect } from 'react';
import { Footer } from '@/components/Footer';
import ClubsMapView from '@/components/clubs/ClubsMapView';
import ClubsCardView from '@/components/clubs/ClubsCardView';
import ClubsFilterBar from '@/components/clubs/ClubsFilterBar';
import { ClubFilters, ClubViewMode, SortOption } from '@/types/club';
import { CLUBS, getCities, getMusicTypes, getClubTypes } from '@/data/clubs';
import { useIsMobile } from '@/hooks/use-mobile';
import { Helmet } from "react-helmet";

const Clubs = () => {
  const isMobile = useIsMobile();
  
  // State for view mode (map or card)
  const [viewMode, setViewMode] = useState<ClubViewMode>(isMobile ? 'card' : 'map');
  
  // State for filters
  const [filters, setFilters] = useState<ClubFilters>({});
  
  // State for sorting
  const [sortBy, setSortBy] = useState<SortOption>('name');

  // Update view mode when screen size changes
  useEffect(() => {
    if (isMobile !== undefined) {
      setViewMode(isMobile ? 'card' : 'map');
    }
  }, [isMobile]);

  // Filter and sort clubs
  const filteredClubs = useMemo(() => {
    let result = [...CLUBS];

    // Apply filters
    if (filters.city) {
      result = result.filter(club => club.city === filters.city);
    }
    
    if (filters.type) {
      result = result.filter(club => club.type.includes(filters.type));
    }
    
    if (filters.music) {
      result = result.filter(club => club.music.includes(filters.music));
    }
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(club => 
        club.name.toLowerCase().includes(searchLower) ||
        club.city.toLowerCase().includes(searchLower) ||
        club.address.toLowerCase().includes(searchLower) ||
        club.music.toLowerCase().includes(searchLower) ||
        club.type.toLowerCase().includes(searchLower)
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'city') {
        return a.city.localeCompare(b.city);
      } else if (sortBy === 'year_founded') {
        // Simple sorting by decade (2010s, 2020s)
        return a.year_founded.localeCompare(b.year_founded);
      } else if (sortBy === 'capacity') {
        // Extract the first number from capacity range for sorting
        const getCapacityValue = (cap: string) => {
          const match = cap.match(/\d+/);
          return match ? parseInt(match[0]) : 0;
        };
        return getCapacityValue(a.capacity) - getCapacityValue(b.capacity);
      }
      return 0;
    });

    return result;
  }, [filters, sortBy]);
  
  // Get unique values for filter dropdowns
  const cities = useMemo(() => getCities(), []);
  const musicTypes = useMemo(() => getMusicTypes(), []);
  const clubTypes = useMemo(() => getClubTypes(), []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-[#008751]/[0.04] to-background">
      <Helmet>
        <title>Afrobeats Clubs Directory | Find African Music Venues Worldwide</title>
        <meta name="description" content={`Discover ${CLUBS.length}+ Afrobeats and African music clubs and venues worldwide. Filter by city, music type, and more to find your next night out.`} />
        <meta property="og:title" content="Afrobeats Clubs Directory" />
        <meta property="og:description" content="Find African music venues around the world" />
        <meta property="og:type" content="website" />
        <meta name="keywords" content={`afrobeats clubs, african music venues, ${cities.join(', ')}, nightlife, dance clubs`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": CLUBS.slice(0, 10).map((club, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "NightClub",
                "name": club.name,
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": club.city,
                  "streetAddress": club.address
                }
              }
            }))
          })}
        </script>
      </Helmet>

      <main className="flex-1 container mx-auto px-4 py-6 md:py-8 max-w-7xl">
        <header className="mb-6 text-center md:text-left">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#008751] mb-1">Directory</p>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
            Afrobeats &amp; Amapiano venues
          </h1>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto md:mx-0 text-sm md:text-base">
            Curated clubs and party rooms worldwide. Switch map or list, filter by city or vibe, then open Maps or the venue site.
          </p>
        </header>

        <ClubsFilterBar 
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          filters={filters}
          onFiltersChange={setFilters}
          sortBy={sortBy}
          onSortChange={setSortBy}
          cities={cities}
          musicTypes={musicTypes}
          clubTypes={clubTypes}
          resultCount={filteredClubs.length}
          totalCount={CLUBS.length}
        />
        
        <div className="flex flex-col min-h-[min(70vh,560px)]">
          {filteredClubs.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-[#008751]/30 bg-card/50 py-16 px-6 text-center">
              <h2 className="text-xl font-semibold font-heading">No venues match</h2>
              <p className="text-muted-foreground mt-2 max-w-sm text-sm">
                Try clearing filters or searching by another city or music tag.
              </p>
              <button
                type="button"
                className="mt-6 text-sm font-medium text-[#008751] underline-offset-4 hover:underline"
                onClick={() => {
                  setFilters({});
                  setSortBy("name");
                }}
              >
                Reset filters
              </button>
            </div>
          ) : viewMode === 'map' ? (
            <ClubsMapView clubs={filteredClubs} filters={filters} />
          ) : (
            <div className="flex-1 min-h-0 overflow-y-auto pb-4">
              <ClubsCardView clubs={filteredClubs} />
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Clubs;
