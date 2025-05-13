
export interface Responsibility {
  title: string;
  items: string[];
}

export interface BrandLink {
  name: string;
  url: string;
}

export interface JobListing {
  id: string;
  title: string;
  slug: string;
  type: string;
  location: string;
  summary: string;
  compensation?: string;
  about: string;
  description: string;
  responsibilities: Responsibility[];
  requirements: string[];
  kpis: string[];
  compensationDetails: string;
  howToApply: string[];
  applyLink: string;
  brand: BrandLink[];
  postedDate: string;
}
