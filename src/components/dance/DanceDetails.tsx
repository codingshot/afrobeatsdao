
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

  // Ultra-safe string conversion that handles ALL edge cases including Symbols
  const safeString = (value: any): string => {
    try {
      // Handle null/undefined first
      if (value === null || value === undefined) {
        return '';
      }
      
      // Handle primitives
      if (typeof value === 'string') {
        return value;
      }
      
      if (typeof value === 'number' && !isNaN(value) && isFinite(value)) {
        return String(value);
      }
      
      if (typeof value === 'boolean') {
        return String(value);
      }
      
      // Explicitly reject Symbols and other problematic types
      if (typeof value === 'symbol' || typeof value === 'function' || typeof value === 'bigint') {
        console.warn('DanceDetails safeString: Rejecting non-serializable type:', typeof value);
        return '';
      }
      
      // Handle objects and arrays (convert to empty string to avoid issues)
      if (typeof value === 'object') {
        console.warn('DanceDetails safeString: Rejecting object type:', value);
        return '';
      }
      
      // Final fallback - should never reach here
      console.warn('DanceDetails safeString: Unknown type encountered:', typeof value, value);
      return '';
    } catch (error) {
      console.error('Error in DanceDetails safeString conversion:', error, value);
      return '';
    }
  };

  // Safely extract and validate all dance properties
  const safeDanceName = safeString(dance?.name) || 'Dance';
  const safeDanceOrigin = safeString(dance?.origin) || '';
  const safeDanceDescription = safeString(dance?.description) || 'Learn this amazing dance';
  const safeDanceDifficulty = safeString(dance?.difficulty) || 'Beginner';
  const safeDanceId = safeString(dance?.id) || 'dance';
  const safeDanceImage = safeString(dance?.image) || '';

  // Build meta values with completely safe strings
  const buildSafeMetaValue = (template: string, ...values: any[]): string => {
    try {
      const safeValues = values.map(v => safeString(v)).filter(v => v.length > 0);
      let result = template;
      safeValues.forEach((value, index) => {
        result = result.replace(`{${index}}`, value);
      });
      // Clean up any remaining placeholders
      result = result.replace(/\{[0-9]+\}/g, '');
      const finalResult = safeString(result);
      return finalResult || 'Afrobeats.party - Learn African Dance';
    } catch (error) {
      console.error('Error building safe meta value:', error);
      return 'Afrobeats.party - Learn African Dance';
    }
  };

  const metaTitle = buildSafeMetaValue(
    '{0} Dance{1} - Learn {2} Level | Afrobeats.party',
    safeDanceName,
    safeDanceOrigin ? ` from ${safeDanceOrigin}` : '',
    safeDanceDifficulty
  );

  const metaDescription = buildSafeMetaValue(
    'Learn the {0} dance{1}! {2} {3} difficulty level. Master African dance moves with our step-by-step tutorials.',
    safeDanceName,
    safeDanceOrigin ? ` from ${safeDanceOrigin}` : '',
    safeDanceDescription,
    safeDanceDifficulty
  );

  const canonicalUrl = `https://afrobeats.party/dance/${safeDanceId}`;
  const ogImage = safeDanceImage ? `https://afrobeats.party${safeDanceImage}` : "https://afrobeats.party/AfrobeatsDAOMeta.png";
  const ogImageAlt = buildSafeMetaValue(
    '{0} Dance{1} - {2} Level Tutorial',
    safeDanceName,
    safeDanceOrigin ? ` from ${safeDanceOrigin}` : '',
    safeDanceDifficulty
  );
  
  // Enhanced keywords for better SEO - safely extract key moves
  const keyMovesKeywords = dance?.keyMoves?.map(move => safeString(move?.name)).filter(name => name.length > 0) || [];
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
    ...keyMovesKeywords.map(k => safeString(k).toLowerCase())
  ].filter(keyword => keyword.length > 0).join(', ');

  // Final validation for Helmet - ensure no Symbols can pass through
  const validateForHelmet = (value: any, fallback: string = 'Afrobeats.party'): string => {
    const safe = safeString(value);
    if (typeof safe !== 'string' || safe.length === 0) {
      console.warn('DanceDetails validateForHelmet: Invalid value, using fallback:', value);
      return fallback;
    }
    return safe;
  };

  return (
    <>
      <Helmet>
        <title>{validateForHelmet(metaTitle, 'Dance Tutorial - Afrobeats.party')}</title>
        <meta name="description" content={validateForHelmet(metaDescription, 'Learn African dance moves with our step-by-step tutorials')} />
        
        <meta property="og:type" content="article" />
        <meta property="og:title" content={validateForHelmet(metaTitle, 'Dance Tutorial - Afrobeats.party')} />
        <meta property="og:description" content={validateForHelmet(metaDescription, 'Learn African dance moves with our step-by-step tutorials')} />
        <meta property="og:image" content={validateForHelmet(ogImage, 'https://afrobeats.party/AfrobeatsDAOMeta.png')} />
        <meta property="og:image:alt" content={validateForHelmet(ogImageAlt, 'Dance Tutorial')} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content={validateForHelmet(canonicalUrl, 'https://afrobeats.party/dance')} />
        <meta property="og:site_name" content="Afrobeats.party" />
        <meta property="og:locale" content="en_US" />
        <meta property="article:section" content="Dance" />
        <meta property="article:tag" content="African Dance" />
        <meta property="article:tag" content="Afrobeats" />
        {safeDanceOrigin && <meta property="article:tag" content={validateForHelmet(safeDanceOrigin, 'Africa')} />}
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@afrobeatsdao" />
        <meta name="twitter:creator" content="@afrobeatsdao" />
        <meta name="twitter:title" content={validateForHelmet(metaTitle, 'Dance Tutorial - Afrobeats.party')} />
        <meta name="twitter:description" content={validateForHelmet(metaDescription, 'Learn African dance moves with our step-by-step tutorials')} />
        <meta name="twitter:image" content={validateForHelmet(ogImage, 'https://afrobeats.party/AfrobeatsDAOMeta.png')} />
        <meta name="twitter:image:alt" content={validateForHelmet(ogImageAlt, 'Dance Tutorial')} />
        
        <link rel="canonical" href={validateForHelmet(canonicalUrl, 'https://afrobeats.party/dance')} />
        <meta name="keywords" content={validateForHelmet(seoKeywords, 'african dance, afrobeats, dance tutorial')} />
        <meta name="author" content="Afrobeats.party" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="theme-color" content="#FFD600" />
        
        {safeDanceOrigin && (
          <>
            <meta name="geo.region" content={validateForHelmet(safeDanceOrigin, 'Africa')} />
            <meta name="geo.placename" content={validateForHelmet(safeDanceOrigin, 'Africa')} />
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
