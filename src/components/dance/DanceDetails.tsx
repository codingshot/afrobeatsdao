
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
  }[];
  tutorials?: {
    title: string;
    platform: string;
    creator?: string;
    link: string;
  }[];
  culturalContext?: string;
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
          variant="outline"
          className="mb-6 text-white border-white/20 hover:bg-white/10"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dances
        </Button>
        
        <DanceContent dance={dance} />
      </div>
    </div>
  );
};
