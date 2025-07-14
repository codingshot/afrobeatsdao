import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { DanceContent } from "./DanceContent";
import { useCountryFlags } from "@/hooks/use-country-flags";
import { AspectRatio } from "@/components/ui/aspect-ratio";

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

  if (!dance) {
    return (
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
          <div className="text-white text-center">Loading...</div>
        </div>
      </div>
    );
  }

  return (
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
                alt={dance.name || 'Dance'}
                className="w-full h-full object-cover"
              />
            </AspectRatio>
          </div>
        )}
        
        <div className="mb-4 sm:mb-6 bg-[#FFD600] rounded-lg p-3 sm:p-6 shadow-lg">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h1 className="text-xl sm:text-4xl font-bold font-heading !text-black" style={{ color: '#000000 !important' }}>
              {dance.name || 'Dance'}
            </h1>
            {dance.origin && getFlag(dance.origin) && (
              <img 
                src={getFlag(dance.origin)} 
                alt={dance.origin || 'Country'} 
                className="w-6 h-4 sm:w-10 sm:h-7"
                title={dance.origin || 'Country'}
              />
            )}
          </div>
          <p className="text-black text-base sm:text-lg mt-2">{dance.description || ''}</p>
          <div className="flex items-center mt-3 sm:mt-4 flex-wrap gap-2">
            <span className="text-xs sm:text-sm bg-black text-[#FFD600] px-2 py-0.5 rounded-full font-medium">
              {dance.difficulty || 'Beginner'}
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
  );
};
