
import { Club } from "@/types/club";

export const CLUBS: Club[] = [
  {
    name: "LA Lounge",
    city: "London",
    address: "Bell Lane, Docklands, London E16 2AB, United Kingdom",
    google_maps: "https://maps.google.com/?q=Bell+Lane,+Docklands,+London+E16+2AB,+United+Kingdom",
    website: "https://lalounge.co.uk/",
    year_founded: "2010s",
    type: "Afrobeats nightclub",
    music: "100% Afrobeats (Fridays), African music",
    hours: "Fridays 9:00pm–3:00am (Afrobeats Night)",
    entry_fee: "Yes, varies by event",
    drinks_policy: "Bar, drinks not included",
    dress_code: "Smart casual/ethnic chic",
    in_house_dj: "Yes, resident DJs",
    capacity: "300–500",
    general_rating: "Vibrant, authentic, popular with London's African diaspora",
    coordinates: [-0.0307, 51.5074]
  },
  {
    name: "Pier One",
    city: "London",
    address: "1 Broadway, Stratford, London E15 4BQ, United Kingdom",
    google_maps: "https://maps.google.com/?q=1+Broadway,+Stratford,+London+E15+4BQ,+United+Kingdom",
    website: "https://pieroneclub.com/",
    year_founded: "2010s",
    type: "Afrobeats nightclub",
    music: "Afrobeats, African dance music",
    hours: "Fridays & Saturdays 10:00pm–4:00am",
    entry_fee: "Yes, varies by night",
    drinks_policy: "Bar, drinks not included",
    dress_code: "Trendy/clubwear",
    in_house_dj: "Yes, resident DJs",
    capacity: "200–400",
    general_rating: "One of London's first and best for Afrobeats",
    coordinates: [-0.0011, 51.5407]
  },
  {
    name: "Cococure",
    city: "London",
    address: "5 Minories, London EC3N 1BJ, United Kingdom",
    google_maps: "https://maps.google.com/?q=5+Minories,+London+EC3N+1BJ,+United+Kingdom",
    website: "https://cococure.co.uk/",
    year_founded: "2010s",
    type: "Afrobeats nightclub",
    music: "Afrobeats, African street food, live DJs",
    hours: "Fridays & Saturdays 9:00pm–3:00am",
    entry_fee: "Yes, varies by event",
    drinks_policy: "Bar, drinks not included",
    dress_code: "Smart casual/urban",
    in_house_dj: "Yes, resident DJs",
    capacity: "200–300",
    general_rating: "Trendy, lively, and authentic Afrobeats experience",
    coordinates: [-0.0753, 51.5105]
  },
  {
    name: "Wakanda Club Afrobeats",
    city: "Bangkok",
    address: "Khao San Road, Bangkok, Thailand",
    google_maps: "https://maps.google.com/?q=Khao+San+Road,+Bangkok,+Thailand",
    website: "",
    year_founded: "2020s",
    type: "Afrobeats nightclub",
    music: "Primarily Afrobeats, some global dance",
    hours: "8:30pm–late (daily)",
    entry_fee: "Yes, varies by night",
    drinks_policy: "Bar, drinks not included",
    dress_code: "Trendy/clubwear",
    in_house_dj: "Yes, resident DJs",
    capacity: "200–300",
    general_rating: "Premier Afrobeats destination in SE Asia",
    coordinates: [100.4981, 13.7596]
  },
  {
    name: "Afro Room at Club 22",
    city: "Dublin",
    address: "22 Anne Street South, Dublin, D02 CH94, Ireland",
    google_maps: "https://maps.google.com/?q=22+Anne+Street+South,+Dublin,+D02+CH94,+Ireland",
    website: "https://www.eventbrite.com/e/afro-room-afrobeats-and-amapiano-party-at-club-22-saturday-3rd-may-2025-tickets-1126383616719",
    year_founded: "2020s",
    type: "Afrobeats & Amapiano event",
    music: "Afrobeats, Amapiano",
    hours: "Event-based, e.g. 11:00pm–2:30am",
    entry_fee: "Yes, €15–€20",
    drinks_policy: "Bar, drinks not included",
    dress_code: "Trendy/clubwear",
    in_house_dj: "Yes, guest and resident DJs",
    capacity: "200–300",
    general_rating: "Top Afrobeats/Amapiano party in Dublin",
    coordinates: [-6.2607, 53.3398]
  },
  {
    name: "LA Lounge Amsterdam",
    city: "Amsterdam",
    address: "Amstelstraat 12, 1017 DA Amsterdam, Netherlands",
    google_maps: "https://maps.google.com/?q=Amstelstraat+12,+1017+DA+Amsterdam,+Netherlands",
    website: "",
    year_founded: "2020s",
    type: "Afrobeats nightclub",
    music: "Afrobeats, Amapiano",
    hours: "Fridays & Saturdays 10:00pm–4:00am",
    entry_fee: "Yes, varies by event",
    drinks_policy: "Bar, drinks not included",
    dress_code: "Trendy/clubwear",
    in_house_dj: "Yes, resident DJs",
    capacity: "200–400",
    general_rating: "Popular for Afrobeats in Amsterdam",
    coordinates: [4.8951, 52.3676]
  }
];

// Get unique cities for filtering
export const getCities = (): string[] => {
  return Array.from(new Set(CLUBS.map(club => club.city))).sort();
};

// Get unique music types for filtering
export const getMusicTypes = (): string[] => {
  const allTypes = CLUBS.flatMap(club => 
    club.music.split(',').map(type => type.trim())
  );
  return Array.from(new Set(allTypes)).sort();
};

// Get unique club types for filtering
export const getClubTypes = (): string[] => {
  return Array.from(new Set(CLUBS.map(club => club.type))).sort();
};
