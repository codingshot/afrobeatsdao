import React, { useState, useMemo, useEffect } from "react";
import { Footer } from "@/components/Footer";
import ClubsMapView from "@/components/clubs/ClubsMapView";
import ClubsCardView from "@/components/clubs/ClubsCardView";
import ClubsFilterBar from "@/components/clubs/ClubsFilterBar";
import { Club, ClubFilters, ClubViewMode, SortOption } from "@/types/club";
import { CLUBS, getCities, getMusicTypes, getClubTypes } from "@/data/clubs";
import { useIsMobile } from "@/hooks/use-mobile";
import { Helmet } from "react-helmet";

const Clubs = () => {
  const isMobile = useIsMobile();

  // State for view mode (map or card)
  const [viewMode, setViewMode] = useState<ClubViewMode>(
    isMobile ? "card" : "map"
  );

  // State for filters
  const [filters, setFilters] = useState<ClubFilters>({});

  // State for sorting
  const [sortBy, setSortBy] = useState<SortOption>("name");

  // State for the currently selected club
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);

  // Update view mode when screen size changes
  useEffect(() => {
    if (isMobile !== undefined) {
      setViewMode(isMobile ? "card" : "map");
    }
  }, [isMobile]);

  // Filter and sort clubs
  const filteredClubs = useMemo(() => {
    let result = [...CLUBS];

    // Apply filters
    if (filters.city) {
      result = result.filter((club) => club.city === filters.city);
    }

    if (filters.type) {
      result = result.filter((club) => club.type.includes(filters.type));
    }

    if (filters.music) {
      result = result.filter((club) => club.music.includes(filters.music));
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (club) =>
          club.name.toLowerCase().includes(searchLower) ||
          club.city.toLowerCase().includes(searchLower) ||
          club.address.toLowerCase().includes(searchLower) ||
          club.music.toLowerCase().includes(searchLower) ||
          club.type.toLowerCase().includes(searchLower)
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "city") {
        return a.city.localeCompare(b.city);
      } else if (sortBy === "year_founded") {
        // Simple sorting by decade (2010s, 2020s)
        return a.year_founded.localeCompare(b.year_founded);
      } else if (sortBy === "capacity") {
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
  }, [CLUBS, filters, sortBy]);

  // Get unique values for filter dropdowns
  const cities = useMemo(() => getCities(), []);
  const musicTypes = useMemo(() => getMusicTypes(), []);
  const clubTypes = useMemo(() => getClubTypes(), []);

  // Handler for selecting a club on the map
  const handleSelectClub = (club: Club) => {
    setSelectedClub(club);
  };

  return (
    <div className="min-h-screen pb-[150px] md:pb-[93px] flex flex-col bg-background">
      <Helmet>
        <title>
          Afrobeats Clubs Directory | Find African Music Venues Worldwide
        </title>
        <meta
          name="description"
          content={`Discover ${CLUBS.length}+ Afrobeats and African music clubs and venues worldwide. Filter by city, music type, and more to find your next night out.`}
        />
        <meta property="og:title" content="Afrobeats Clubs Directory" />
        <meta
          property="og:description"
          content="Find African music venues around the world"
        />
        <meta property="og:type" content="website" />
        <meta
          name="keywords"
          content={`afrobeats clubs, african music venues, ${cities.join(
            ", "
          )}, nightlife, dance clubs`}
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: CLUBS.slice(0, 10).map((club, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "NightClub",
                name: club.name,
                address: {
                  "@type": "PostalAddress",
                  addressLocality: club.city,
                  streetAddress: club.address,
                },
              },
            })),
          })}
        </script>
      </Helmet>

      <main className="flex-1 container mx-auto px-4 py-4">
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
        />

        <div className="">
          {viewMode === "map" ? (
            <ClubsMapView
              clubs={filteredClubs}
              filters={filters}
              onSelectClub={handleSelectClub}
            />
          ) : (
            <ClubsCardView clubs={filteredClubs} />
          )}

          {filteredClubs.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold">No clubs found</h3>
              <p className="text-muted-foreground mt-2">
                Try adjusting your filters
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Clubs;
