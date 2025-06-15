
import { useParams, useNavigate } from "react-router-dom";
import { danceCurriculum } from "@/data/dance-curriculum";
import { DanceDetails as DanceDetailsComponent } from "@/components/dance/DanceDetails";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet";

const DanceDetails = () => {
  const { genre, id } = useParams();
  const navigate = useNavigate();
  const [dance, setDance] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [notFound, setNotFound] = useState<boolean>(false);
  const previousIdRef = useRef<string | undefined>(id);
  
  useEffect(() => {
    if (previousIdRef.current !== id) {
      setIsLoading(true);
      setDance(null);
      setNotFound(false);
      previousIdRef.current = id;
    }
    
    const findDance = () => {
      let foundDance = null;
      
      // Get the dance ID from either the URL params or the last segment of the path
      const pathSegments = window.location.pathname.split('/').filter(Boolean);
      const lastSegment = pathSegments[pathSegments.length - 1];
      const potentialId = id || lastSegment;
      
      // If we have both genre and id, try to find the dance in that specific genre
      if (genre && id) {
        if (danceCurriculum[genre as keyof typeof danceCurriculum]) {
          foundDance = danceCurriculum[genre as keyof typeof danceCurriculum].find(d => d.id === id);
        }
      }
      
      // If not found or if we only have an id, search across all genres
      if (!foundDance) {
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
      
      if (foundDance) {
        setDance(foundDance);
        setNotFound(false);
      } else {
        setNotFound(true);
      }
      
      setIsLoading(false);
    };
    
    const timeoutId = setTimeout(() => {
      findDance();
    }, 100);
    
    return () => clearTimeout(timeoutId);
  }, [genre, id]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-white mb-4">Loading dance details...</h1>
          <div className="w-16 h-16 border-4 border-[#FFD600] border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-black py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <Alert variant="destructive" className="max-w-md mb-6 bg-red-500/10 border-red-500/20 text-white">
          <AlertTitle className="text-xl font-heading mb-2">Dance Not Found</AlertTitle>
          <AlertDescription className="text-gray-200">
            Sorry, we couldn't find the dance you're looking for. It might have been moved or doesn't exist.
          </AlertDescription>
        </Alert>
        
        <Button 
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

  // SEO meta information
  const danceTitle = dance?.name || 'Dance Details';
  const danceDescription = dance?.description || 'Learn about this dance style on Afrobeats.party';
  const danceThumbnail = dance?.thumbnail || '/AfrobeatsDAOMeta.png';

  return (
    <>
      <Helmet>
        <title>{`${danceTitle} | Afrobeats.party`}</title>
        <meta name="description" content={danceDescription} />
        <meta property="og:title" content={`${danceTitle} | Afrobeats.party`} />
        <meta property="og:description" content={danceDescription} />
        <meta property="og:image" content={danceThumbnail} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${danceTitle} | Afrobeats.party`} />
        <meta name="twitter:description" content={danceDescription} />
        <meta name="twitter:image" content={danceThumbnail} />
      </Helmet>
      <DanceDetailsComponent dance={dance} />
    </>
  );
};

export default DanceDetails;
