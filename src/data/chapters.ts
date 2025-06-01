
export interface DesiredChapter {
  id: string;
  university: string;
  city: string;
  country: string;
  region: string;
  coordinates: [number, number]; // [longitude, latitude]
  status: 'target' | 'interest' | 'forming' | 'leader-wanted';
  priority: 'high' | 'medium' | 'low';
  description: string;
  targetStudentPopulation?: number;
  existingAfrobeatsPresence?: string;
  keyFacilities?: string[];
  potentialPartners?: string[];
  contactMethods: {
    discord?: string;
    telegram?: string;
    twitter?: string;
    instagram?: string;
  };
  reasoning?: string;
}

export const desiredChapters: DesiredChapter[] = [
  // Nigeria
  {
    id: "unilag",
    university: "University of Lagos",
    city: "Lagos",
    country: "Nigeria",
    region: "West Africa",
    coordinates: [3.4014, 6.5186],
    status: "target",
    priority: "high",
    description: "Premier university in Lagos, the heart of Afrobeats culture",
    targetStudentPopulation: 50000,
    existingAfrobeatsPresence: "Strong - many students are aspiring artists",
    keyFacilities: ["Music studios", "Performance halls", "Recording facilities"],
    potentialPartners: ["Music Department", "Drama Society", "Cultural Center"],
    contactMethods: {
      discord: "https://discord.gg/TNrWwSA955",
      telegram: "https://t.me/afrobeats_party",
      twitter: "https://x.com/afrobeatsdao"
    },
    reasoning: "Located in the birthplace of Afrobeats with access to industry professionals"
  },
  {
    id: "unn",
    university: "University of Nigeria, Nsukka",
    city: "Nsukka",
    country: "Nigeria",
    region: "West Africa",
    coordinates: [7.3986, 6.8570],
    status: "target",
    priority: "high",
    description: "Historic university with strong cultural programs",
    targetStudentPopulation: 36000,
    existingAfrobeatsPresence: "Growing - active student music scene",
    keyFacilities: ["Theatre Arts Department", "Music studios", "Cultural center"],
    potentialPartners: ["Theatre Arts", "Music Department", "African Studies"],
    contactMethods: {
      discord: "https://discord.gg/TNrWwSA955",
      telegram: "https://t.me/afrobeats_party",
      twitter: "https://x.com/afrobeatsdao"
    },
    reasoning: "Strong academic tradition with growing interest in contemporary African music"
  },
  {
    id: "oau",
    university: "Obafemi Awolowo University",
    city: "Ile-Ife",
    country: "Nigeria",
    region: "West Africa",
    coordinates: [4.5200, 7.5248],
    status: "target",
    priority: "medium",
    description: "Renowned for arts and cultural studies",
    targetStudentPopulation: 35000,
    existingAfrobeatsPresence: "Moderate - strong arts community",
    keyFacilities: ["Fine Arts Department", "Music studios", "Amphitheatre"],
    potentialPartners: ["Fine Arts", "Music Department", "African Studies Center"],
    contactMethods: {
      discord: "https://discord.gg/TNrWwSA955",
      telegram: "https://t.me/afrobeats_party",
      twitter: "https://x.com/afrobeatsdao"
    },
    reasoning: "Strong reputation in arts with potential for cultural innovation"
  },

  // Ghana
  {
    id: "legon",
    university: "University of Ghana",
    city: "Accra",
    country: "Ghana",
    region: "West Africa",
    coordinates: [-0.1969, 5.6485],
    status: "target",
    priority: "high",
    description: "Leading university in Ghana's music capital",
    targetStudentPopulation: 40000,
    existingAfrobeatsPresence: "Very strong - many industry connections",
    keyFacilities: ["Music Department", "Performance spaces", "Recording studios"],
    potentialPartners: ["Music Department", "Dance Society", "Cultural Studies"],
    contactMethods: {
      discord: "https://discord.gg/TNrWwSA955",
      telegram: "https://t.me/afrobeats_party",
      twitter: "https://x.com/afrobeatsdao"
    },
    reasoning: "Ghana is a major hub for Afrobeats with strong industry presence"
  },

  // Kenya
  {
    id: "uon",
    university: "University of Nairobi",
    city: "Nairobi",
    country: "Kenya",
    region: "East Africa",
    coordinates: [36.8167, -1.2921],
    status: "target",
    priority: "medium",
    description: "Premier university in East Africa",
    targetStudentPopulation: 60000,
    existingAfrobeatsPresence: "Growing - increasing popularity",
    keyFacilities: ["Music conservatory", "Performance halls", "Student center"],
    potentialPartners: ["Music Conservatory", "Drama Society", "African Heritage"],
    contactMethods: {
      discord: "https://discord.gg/TNrWwSA955",
      telegram: "https://t.me/afrobeats_party",
      twitter: "https://x.com/afrobeatsdao"
    },
    reasoning: "Gateway to East African market with growing Afrobeats interest"
  },

  // South Africa
  {
    id: "wits",
    university: "University of the Witwatersrand",
    city: "Johannesburg",
    country: "South Africa",
    region: "Southern Africa",
    coordinates: [28.0436, -26.1929],
    status: "target",
    priority: "high",
    description: "Leading research university with strong arts programs",
    targetStudentPopulation: 40000,
    existingAfrobeatsPresence: "Strong - diverse student body",
    keyFacilities: ["Wits Theatre", "Music School", "Digital Arts"],
    potentialPartners: ["School of Arts", "Music Department", "Digital Arts"],
    contactMethods: {
      discord: "https://discord.gg/TNrWwSA955",
      telegram: "https://t.me/afrobeats_party",
      twitter: "https://x.com/afrobeatsdao"
    },
    reasoning: "Major cultural hub with international student connections"
  },

  // United States
  {
    id: "gsu",
    university: "Georgia State University",
    city: "Atlanta",
    country: "United States",
    region: "North America",
    coordinates: [-84.3851, 33.7537],
    status: "interest",
    priority: "high",
    description: "Urban university in major music city",
    targetStudentPopulation: 53000,
    existingAfrobeatsPresence: "Growing - strong African diaspora community",
    keyFacilities: ["Music studios", "Performance venues", "Student center"],
    potentialPartners: ["African Students Association", "Music Department", "International Student Services"],
    contactMethods: {
      discord: "https://discord.gg/TNrWwSA955",
      telegram: "https://t.me/afrobeats_party",
      twitter: "https://x.com/afrobeatsdao"
    },
    reasoning: "Atlanta is a major music hub with strong African diaspora presence"
  },
  {
    id: "morehouse",
    university: "Morehouse College",
    city: "Atlanta",
    country: "United States",
    region: "North America",
    coordinates: [-84.4131, 33.7490],
    status: "interest",
    priority: "high",
    description: "Historic HBCU with strong cultural traditions",
    targetStudentPopulation: 2200,
    existingAfrobeatsPresence: "Moderate - strong cultural awareness",
    keyFacilities: ["Martin Luther King Jr. Chapel", "Student center", "Performance spaces"],
    potentialPartners: ["Music Department", "Cultural organizations", "International programs"],
    contactMethods: {
      discord: "https://discord.gg/TNrWwSA955",
      telegram: "https://t.me/afrobeats_party",
      twitter: "https://x.com/afrobeatsdao"
    },
    reasoning: "HBCU with strong cultural heritage and African connections"
  },
  {
    id: "nyu",
    university: "New York University",
    city: "New York",
    country: "United States",
    region: "North America",
    coordinates: [-73.9965, 40.7295],
    status: "target",
    priority: "high",
    description: "Major urban university in global music capital",
    targetStudentPopulation: 51000,
    existingAfrobeatsPresence: "Strong - diverse international community",
    keyFacilities: ["Steinhardt Music", "Performance spaces", "Recording studios"],
    potentialPartners: ["Steinhardt School", "African Studies", "Music Business"],
    contactMethods: {
      discord: "https://discord.gg/TNrWwSA955",
      telegram: "https://t.me/afrobeats_party",
      twitter: "https://x.com/afrobeatsdao"
    },
    reasoning: "NYC is a global music hub with major industry presence"
  },
  {
    id: "howard",
    university: "Howard University",
    city: "Washington DC",
    country: "United States",
    region: "North America",
    coordinates: [-77.0209, 38.9229],
    status: "interest",
    priority: "high",
    description: "Premier HBCU with strong music programs",
    targetStudentPopulation: 10000,
    existingAfrobeatsPresence: "Strong - active African student community",
    keyFacilities: ["Music Department", "Cramton Auditorium", "Student center"],
    potentialPartners: ["Music Department", "African Students Association", "Cultural programs"],
    contactMethods: {
      discord: "https://discord.gg/TNrWwSA955",
      telegram: "https://t.me/afrobeats_party",
      twitter: "https://x.com/afrobeatsdao"
    },
    reasoning: "Historic HBCU with strong African heritage and music tradition"
  },

  // United Kingdom
  {
    id: "kings",
    university: "King's College London",
    city: "London",
    country: "United Kingdom",
    region: "Europe",
    coordinates: [-0.1166, 51.5112],
    status: "target",
    priority: "high",
    description: "Prestigious university in London's diverse music scene",
    targetStudentPopulation: 31000,
    existingAfrobeatsPresence: "Very strong - large African diaspora",
    keyFacilities: ["Music venues", "Student union", "Performance spaces"],
    potentialPartners: ["African Caribbean Society", "Music societies", "Cultural departments"],
    contactMethods: {
      discord: "https://discord.gg/TNrWwSA955",
      telegram: "https://t.me/afrobeats_party",
      twitter: "https://x.com/afrobeatsdao"
    },
    reasoning: "London has a massive Afrobeats scene with industry connections"
  },
  {
    id: "ucl",
    university: "University College London",
    city: "London",
    country: "United Kingdom",
    region: "Europe",
    coordinates: [-0.1340, 51.5246],
    status: "target",
    priority: "high",
    description: "Top research university with international student body",
    targetStudentPopulation: 42000,
    existingAfrobeatsPresence: "Strong - diverse international community",
    keyFacilities: ["Bloomsbury Theatre", "Student union", "Music facilities"],
    potentialPartners: ["African Society", "Music Department", "International student services"],
    contactMethods: {
      discord: "https://discord.gg/TNrWwSA955",
      telegram: "https://t.me/afrobeats_party",
      twitter: "https://x.com/afrobeatsdao"
    },
    reasoning: "Large international student body in a major Afrobeats market"
  },

  // Canada
  {
    id: "utoronto",
    university: "University of Toronto",
    city: "Toronto",
    country: "Canada",
    region: "North America",
    coordinates: [-79.3957, 43.6629],
    status: "target",
    priority: "medium",
    description: "Leading Canadian university with diverse student body",
    targetStudentPopulation: 70000,
    existingAfrobeatsPresence: "Growing - strong Caribbean and African communities",
    keyFacilities: ["Music facilities", "Hart House", "Performance venues"],
    potentialPartners: ["African Students Association", "Caribbean Students Association", "Music Department"],
    contactMethods: {
      discord: "https://discord.gg/TNrWwSA955",
      telegram: "https://t.me/afrobeats_party",
      twitter: "https://x.com/afrobeatsdao"
    },
    reasoning: "Toronto has a growing Afrobeats scene with strong diaspora presence"
  },

  // France
  {
    id: "sorbonne",
    university: "Sorbonne University",
    city: "Paris",
    country: "France",
    region: "Europe",
    coordinates: [2.3444, 48.8467],
    status: "leader-wanted",
    priority: "medium",
    description: "Historic university in culturally diverse Paris",
    targetStudentPopulation: 55000,
    existingAfrobeatsPresence: "Growing - large West African diaspora",
    keyFacilities: ["Cultural facilities", "Student centers", "Performance spaces"],
    potentialPartners: ["African student organizations", "Music departments", "Cultural studies"],
    contactMethods: {
      discord: "https://discord.gg/TNrWwSA955",
      telegram: "https://t.me/afrobeats_party",
      twitter: "https://x.com/afrobeatsdao"
    },
    reasoning: "Paris has a significant West African population and growing music scene"
  }
];

export const getChaptersByRegion = () => {
  const regions: Record<string, DesiredChapter[]> = {};
  desiredChapters.forEach(chapter => {
    if (!regions[chapter.region]) {
      regions[chapter.region] = [];
    }
    regions[chapter.region].push(chapter);
  });
  return regions;
};

export const getChaptersByStatus = () => {
  const statuses: Record<string, DesiredChapter[]> = {};
  desiredChapters.forEach(chapter => {
    if (!statuses[chapter.status]) {
      statuses[chapter.status] = [];
    }
    statuses[chapter.status].push(chapter);
  });
  return statuses;
};

export const getChaptersByPriority = () => {
  const priorities: Record<string, DesiredChapter[]> = {};
  desiredChapters.forEach(chapter => {
    if (!priorities[chapter.priority]) {
      priorities[chapter.priority] = [];
    }
    priorities[chapter.priority].push(chapter);
  });
  return priorities;
};
