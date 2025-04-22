
import { useParams, useNavigate } from "react-router-dom";
import { danceCurriculum } from "@/data/dance-curriculum";
import { DanceDetails as DanceDetailsComponent } from "@/components/dance/DanceDetails";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const DanceDetails = () => {
  const { genre, id } = useParams();
  const navigate = useNavigate();
  
  // Find dance in curriculum with improved handling
  let dance;
  
  // Handle direct routes where both genre and id are present in the URL
  if (genre && id) {
    if (danceCurriculum[genre as keyof typeof danceCurriculum]) {
      dance = danceCurriculum[genre as keyof typeof danceCurriculum].find(d => d.id === id);
    }
  }
  
  // Handle hardcoded routes without params
  if (!dance && genre && !id) {
    // Extract id from the URL path
    const pathSegments = window.location.pathname.split('/');
    const potentialId = pathSegments[pathSegments.length - 1];
    
    // Search in all genres
    for (const genreKey in danceCurriculum) {
      const foundDance = danceCurriculum[genreKey as keyof typeof danceCurriculum].find(
        d => d.id === potentialId
      );
      if (foundDance) {
        dance = foundDance;
        break;
      }
    }
  }

  // Last resort - try to find by scanning all dances
  if (!dance) {
    const allDances = [
      ...danceCurriculum.afrobeats, 
      ...danceCurriculum.amapiano
    ];
    
    // Try to extract ID from the last part of the URL if not provided in params
    const urlPathSegments = window.location.pathname.split('/');
    const lastSegment = urlPathSegments[urlPathSegments.length - 1];
    
    dance = allDances.find(d => d.id === (id || lastSegment));
  }
  
  if (!dance) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-8 px-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Dance not found</h1>
          <Button 
            onClick={() => navigate("/dance")}
            variant="outline"
            className="text-white border-white/20 hover:bg-white/10"
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
