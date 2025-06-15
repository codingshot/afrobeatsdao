
export type MapItemType = 
  | 'artist' 
  | 'club' 
  | 'event' 
  | 'dancer' 
  | 'influencer' 
  | 'agency' 
  | 'group' 
  | 'community'
  | 'user';

export interface MapItem {
  id: string;
  name: string;
  type: MapItemType;
  coordinates: [number, number]; // [longitude, latitude]
  country: string;
  city?: string;
  description?: string;
  image?: string;
  website?: string;
  socialLinks?: {
    instagram?: string;
    twitter?: string;
    youtube?: string;
    spotify?: string;
  };
  // Event specific fields
  eventDate?: string;
  eventEndDate?: string;
  venue?: string;
  // Artist specific fields
  genre?: string;
  // Club specific fields
  openingHours?: string;
  musicStyle?: string;
  // User specific fields
  verified?: boolean;
  followerCount?: number;
}

export interface MapFilters {
  types: (MapItemType | 'all')[];
  countries: string[];
  searchQuery: string;
  dateRange?: {
    from: Date;
    to: Date;
  };
}
