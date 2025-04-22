
export interface Club {
  name: string;
  city: string;
  address: string;
  google_maps: string;
  website: string;
  year_founded: string;
  type: string;
  music: string;
  hours: string;
  entry_fee: string;
  drinks_policy: string;
  dress_code: string;
  in_house_dj: string;
  capacity: string;
  general_rating: string;
  coordinates?: [number, number]; // [longitude, latitude]
}

export type ClubViewMode = "map" | "card";

export type SortOption = 
  | "name" 
  | "city"
  | "year_founded"
  | "capacity";

export interface ClubFilters {
  city?: string;
  type?: string;
  music?: string;
  search?: string;
}
