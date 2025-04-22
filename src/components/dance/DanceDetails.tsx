
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { DanceContent } from "./DanceContent";
import { useCountryFlags } from "@/hooks/use-country-flags";

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Button 
          onClick={() => navigate("/dance")}
          variant="white"
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dances
        </Button>
        
        <div className="mb-6 bg-[#FFD600] rounded-lg p-4 sm:p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl sm:text-4xl font-bold text-black font-heading">
              {dance.name}
            </h1>
            {dance.origin && getFlag(dance.origin) && (
              <img 
                src={getFlag(dance.origin)} 
                alt={dance.origin} 
                className="w-8 h-6 sm:w-10 sm:h-7"
                title={dance.origin}
              />
            )}
          </div>
          <p className="text-black text-lg mt-2">{dance.description}</p>
          <div className="flex items-center mt-4">
            <span className="text-xs bg-black text-[#FFD600] px-2 py-0.5 rounded-full font-medium">
              {dance.difficulty}
            </span>
            {dance.origin && (
              <span className="text-xs text-black ml-2">
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
