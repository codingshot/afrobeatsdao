
import { useParams, useNavigate } from "react-router-dom";
import { danceCurriculum } from "@/data/dance-curriculum";
import { DanceDetails as DanceDetailsComponent } from "@/components/dance/DanceDetails";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const DanceDetails = () => {
  const { genre, id } = useParams();
  const navigate = useNavigate();
  
  // Find dance in curriculum
  let dance;
  if (genre === 'afrobeats' || genre === 'amapiano') {
    dance = danceCurriculum[genre].find(d => d.id === id);
  } else {
    // If no genre specified, search all genres
    const allDances = [...danceCurriculum.afrobeats, ...danceCurriculum.amapiano];
    dance = allDances.find(d => d.id === id);
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
