
import { useParams, useNavigate } from "react-router-dom";
import { danceCurriculum } from "@/data/dance-curriculum";
import { DanceDetails as DanceDetailsComponent, type Dance } from "@/components/dance/DanceDetails";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

const DanceDetails = () => {
  const { genre, id } = useParams();
  const navigate = useNavigate();
  const [dance, setDance] = useState<Dance | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [notFound, setNotFound] = useState<boolean>(false);
  
  useEffect(() => {
    console.log("Dance Details - URL params:", { genre, id });
    console.log("Dance Details - Current path:", window.location.pathname);
    
    const findDance = () => {
      let foundDance = null;
      
      // Get the dance ID from either the URL params or the last segment of the path
      const pathSegments = window.location.pathname.split('/').filter(Boolean);
      const lastSegment = pathSegments[pathSegments.length - 1];
      const potentialId = id || lastSegment;
      
      console.log("Searching for dance with ID:", potentialId);
      
      // If we have both genre and id, try to find the dance in that specific genre
      if (genre && id) {
        console.log("Searching in genre:", genre);
        if (danceCurriculum[genre as keyof typeof danceCurriculum]) {
          foundDance = danceCurriculum[genre as keyof typeof danceCurriculum].find(d => d.id === id);
          console.log("Found in specific genre:", foundDance);
        }
      }
      
      // If not found or if we only have an id, search across all genres
      if (!foundDance) {
        console.log("Searching across all genres for ID:", potentialId);
        for (const genreKey in danceCurriculum) {
          const found = danceCurriculum[genreKey as keyof typeof danceCurriculum].find(
            d => d.id === potentialId
          );
          if (found) {
            foundDance = found;
            console.log("Found dance in genre", genreKey, ":", foundDance);
            break;
          }
        }
      }
      
      if (foundDance) {
        console.log("Setting dance:", foundDance);
        setDance(foundDance);
        setNotFound(false);
      } else {
        console.log("Dance not found");
        setNotFound(true);
      }
      
      setIsLoading(false);
    };
    
    // Add a small delay to ensure routing is complete
    const timeoutId = setTimeout(() => {
      findDance();
    }, 100);
    
    return () => clearTimeout(timeoutId);
  }, [genre, id]);
  
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black px-4 pt-20 pb-8 sm:px-6 md:pt-24 lg:px-8">
        <div className="text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-white mb-4">Loading dance details...</h1>
          <div className="w-16 h-16 border-4 border-[#FFD600] border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-black px-4 pt-20 pb-8 sm:px-6 md:pt-24 lg:px-8">
        <Alert variant="destructive" className="max-w-md mb-6 bg-red-500/10 border-red-500/20 text-white">
          <AlertTitle className="text-xl font-heading mb-2">Dance Not Found</AlertTitle>
          <AlertDescription className="text-gray-200">
            Sorry, we couldn't find the dance you're looking for. It might have been moved or doesn't exist.
          </AlertDescription>
        </Alert>
        
        <Button
          type="button"
          onClick={() => navigate("/dance")}
          variant="default"
          className="bg-[#FFD600] hover:bg-[#FFD600]/80 text-black font-medium flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dance Library
        </Button>
      </div>
    );
  }

  if (!dance) return null;

  return <DanceDetailsComponent dance={dance} />;
};

export default DanceDetails;
