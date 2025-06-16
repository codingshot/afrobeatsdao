
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { DanceContent } from "./DanceContent";
import { useCountryFlags } from "@/hooks/use-country-flags";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Helmet } from "react-helmet";

export interface Dance {
  id: string;
  name: string;
  origin: string;
  description: string;
  difficulty: string;
  image: string;
  modules?: string[];
  keyMoves?: {
    name: string;
    steps: string[];
  }[];
  notableDancers?: string[];
  songs?: {
    title: string;
    artist: string;
    youtube: string;
    spotify?: string;
    appleMusic?: string;
  }[];
  tutorials?: {
    title: string;
    platform: string;
    creator?: string;
    link: string;
  }[];
  culturalContext?: string;
  historicalBackground?: string;
  modernVariations?: string[];
  progressionLevels?: {
    level: string;
    weeks: string;
    focus: string;
    practice: string;
    assessment: string;
  }[];
  traditionalVsModern?: {
    traditional: string;
    modern: string;
  };
}

interface DanceDetailsProps {
  dance: Dance;
}

export const DanceDetails = ({ dance }: DanceDetailsProps) => {
  const navigate = useNavigate();
  const { getFlag } = useCountryFlags();

  // Safe string conversion - only allow actual strings
  const safeString = (value: any): string => {
    if (typeof value === 'string') {
      return value;
    }
    if (typeof value === 'number') {
      return String(value);
    }
    return '';
  };

  // Create safe meta values
  const safeDanceName = safeString(dance?.name || 'Dance');
  const safeDanceOrigin = safeString(dance?.origin || '');
  const safeDanceDescription = safeString(dance?.description || 'Learn this amazing dance');
  const safeDanceDifficulty = safeString(dance?.difficulty || 'Beginner');
  const safeDanceId = safeString(dance?.id || 'dance');

  // Build meta values safely
  const metaTitle = `${safeDanceName} Dance${safeDanceOrigin ? ` from ${safeDanceOrigin}` : ''} - Learn ${safeDanceDifficulty} Level | Afrobeats.party`;
  const metaDescription = `Learn the ${safeDanceName} dance${safeDanceOrigin ? ` from ${safeDanceOrigin}` : ''}! ${safeDanceDescription} ${safeDanceDifficulty} difficulty level. Master African dance moves with our step-by-step tutorials.`;
  const canonicalUrl = `https://afrobeats.party/dance/${safeDanceId}`;
  
  // Use dance image for Open Graph, fallback to default
  const ogImage = dance?.image ? `https://afrobeats.party${safeString(dance.image)}` : "https://afrobeats.party/AfrobeatsDAOMeta.png";
  const ogImageAlt = `${safeDanceName} Dance${safeDanceOrigin ? ` from ${safeDanceOrigin}` : ''} - ${safeDanceDifficulty} Level Tutorial`;
  
  // Enhanced keywords for better SEO
  const keyMovesKeywords = dance?.keyMoves?.map(move => safeString(move?.name || '')).filter(Boolean) || [];
  const seoKeywords = [
    safeDanceName.toLowerCase(),
    'african dance',
    'afrobeats dance',
    safeDanceOrigin.toLowerCase(),
    safeDanceDifficulty.toLowerCase(),
    'dance tutorial',
    'dance lessons',
    'afrobeats party',
    'african culture',
    'dance moves',
    'learn to dance',
    ...keyMovesKeywords.map(k => k.toLowerCase())
  ].filter(Boolean).join(', ');

  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        
        <meta property="og:type" content="article" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content={ogImageAlt} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="Afrobeats.party" />
        <meta property="og:locale" content="en_US" />
        <meta property="article:section" content="Dance" />
        <meta property="article:tag" content="African Dance" />
        <meta property="article:tag" content="Afrobeats" />
        {safeDanceOrigin && <meta property="article:tag" content={safeDanceOrigin} />}
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@afrobeatsdao" />
        <meta name="twitter:creator" content="@afrobeatsdao" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content={ogImageAlt} />
        
        <link rel="canonical" href={canonicalUrl} />
        <meta name="keywords" content={seoKeywords} />
        <meta name="author" content="Afrobeats.party" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="theme-color" content="#FFD600" />
        
        {safeDanceOrigin && (
          <>
            <meta name="geo.region" content={safeDanceOrigin} />
            <meta name="geo.placename" content={safeDanceOrigin} />
          </>
        )}
      </Helmet>
      
      <div className="min-h-screen bg-black py-4 sm:py-8 px-3 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Button 
            onClick={() => navigate("/dance")}
            variant="default"
            className="mb-4 sm:mb-6 bg-[#FFD600] hover:bg-[#FFD600]/80 text-black font-medium"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dances
          </Button>
          
          {dance.image && (
            <div className="w-full mb-4 sm:mb-6">
              <AspectRatio ratio={21/9} className="bg-muted rounded-lg overflow-hidden">
                <img
                  src={dance.image}
                  alt={dance.name}
                  className="w-full h-full object-cover"
                />
              </AspectRatio>
            </div>
          )}
          
          <div className="mb-4 sm:mb-6 bg-[#FFD600] rounded-lg p-3 sm:p-6 shadow-lg">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h1 className="text-xl sm:text-4xl font-bold font-heading text-black" style={{ color: 'black !important' }}>
                {dance.name}
              </h1>
              {dance.origin && getFlag(dance.origin) && (
                <img 
                  src={getFlag(dance.origin)} 
                  alt={dance.origin} 
                  className="w-6 h-4 sm:w-10 sm:h-7"
                  title={dance.origin}
                />
              )}
            </div>
            <p className="text-black text-base sm:text-lg mt-2">{dance.description}</p>
            <div className="flex items-center mt-3 sm:mt-4 flex-wrap gap-2">
              <span className="text-xs sm:text-sm bg-black text-[#FFD600] px-2 py-0.5 rounded-full font-medium">
                {dance.difficulty}
              </span>
              {dance.origin && (
                <span className="text-xs sm:text-sm text-black">
                  Origin: {dance.origin}
                </span>
              )}
            </div>
          </div>
          
          <DanceContent dance={dance} />
        </div>
      </div>
    </>
  );
};
