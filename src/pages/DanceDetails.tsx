
import { useParams, useNavigate } from "react-router-dom";
import { danceCurriculum } from "@/data/dance-curriculum";
import { DanceDetails as DanceDetailsComponent } from "@/components/dance/DanceDetails";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

const DanceDetails = () => {
  const { genre, id } = useParams();
  const navigate = useNavigate();
  const [dance, setDance] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Move the dance finding logic to useEffect to avoid race conditions
  useEffect(() => {
    const findDance = () => {
      let foundDance = null;
      
      // Handle direct routes where both genre and id are present in the URL
      if (genre && id) {
        if (danceCurriculum[genre as keyof typeof danceCurriculum]) {
          foundDance = danceCurriculum[genre as keyof typeof danceCurriculum].find(d => d.id === id);
        }
      }
      
      // Handle hardcoded routes without params
      if (!foundDance && genre && !id) {
        // Extract id from the URL path
        const pathSegments = window.location.pathname.split('/');
        const potentialId = pathSegments[pathSegments.length - 1];
        
        // Search in all genres
        for (const genreKey in danceCurriculum) {
          const found = danceCurriculum[genreKey as keyof typeof danceCurriculum].find(
            d => d.id === potentialId
          );
          if (found) {
            foundDance = found;
            break;
          }
        }
      }

      // Last resort - try to find by scanning all dances
      if (!foundDance) {
        const allDances = Object.keys(danceCurriculum).reduce((acc: any[], genreKey) => {
          return [...acc, ...danceCurriculum[genreKey as keyof typeof danceCurriculum]];
        }, []);
        
        // Try to extract ID from the last part of the URL if not provided in params
        const urlPathSegments = window.location.pathname.split('/');
        const lastSegment = urlPathSegments[urlPathSegments.length - 1];
        
        foundDance = allDances.find(d => d.id === (id || lastSegment));
      }
      
      setDance(foundDance);
      setIsLoading(false);
    };
    
    findDance();
  }, [genre, id]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-8 px-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Loading dance details...</h1>
        </div>
      </div>
    );
  }

  if (!dance) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-8 px-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Dance not found</h1>
          <Button 
            onClick={() => navigate("/dance")}
            variant="white"
            className="text-black"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dances
          </Button>
        </div>
      </div>
    );
  }

  return <DanceDetailsComponent dance={dance} />;
};

export default DanceDetails;
