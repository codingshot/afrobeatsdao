
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDanceProgress } from "@/hooks/use-dance-progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { useCountryFlags } from "@/hooks/use-country-flags";
import { danceCurriculum } from "@/data/dance-curriculum";
import { DanceProgressIndicator } from "./DanceProgressIndicator";

export const ResumableDances = () => {
  const { getTotalProgress } = useDanceProgress();
  const navigate = useNavigate();
  const { getFlag } = useCountryFlags();
  const allProgress = getTotalProgress();
  
  // If no dances have been started, don't show this section
  if (allProgress.started === 0) return null;
  
  // Find all the dances that have been started but not completed
  const inProgressDances: any[] = [];
  
  Object.keys(danceCurriculum).forEach(genre => {
    danceCurriculum[genre as keyof typeof danceCurriculum].forEach(dance => {
      const { getDanceProgress } = useDanceProgress();
      const progress = getDanceProgress(dance.id);
      
      if (progress.started && !progress.completed) {
        inProgressDances.push({
          ...dance,
          genre
        });
      }
    });
  });
  
  return (
    <Card className="bg-black/70 border-[#FFD600]/50 mb-8 shadow-lg">
      <CardHeader className="bg-[#FFD600] text-black p-4">
        <CardTitle className="text-xl md:text-2xl font-heading">Continue Learning</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {inProgressDances.length === 0 ? (
          <p className="text-gray-400 text-sm">No dances in progress. Start learning a dance to see it here!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {inProgressDances.slice(0, 3).map((dance) => (
              <Card 
                key={dance.id}
                className="bg-gray-900 border-white/10 hover:border-[#FFD600]/50 transition-colors cursor-pointer text-white overflow-hidden"
                onClick={() => navigate(`/dance/${dance.genre}/${dance.id}`)}
              >
                <div className="bg-[#FFD600] text-black p-3 flex items-center justify-between">
                  <h3 className="font-medium">{dance.name}</h3>
                  {dance.origin && getFlag(dance.origin) && (
                    <img 
                      src={getFlag(dance.origin)} 
                      alt={dance.origin} 
                      className="w-5 h-4"
                      title={dance.origin}
                    />
                  )}
                </div>
                <div className="p-3">
                  <DanceProgressIndicator danceId={dance.id} totalModules={dance.keyMoves?.length || 5} />
                  <Button 
                    variant="default" 
                    size="sm"
                    className="w-full mt-3 bg-[#008751] hover:bg-[#008751]/80 justify-between"
                  >
                    Resume Learning <Play className="ml-2 h-3 w-3" />
                  </Button>
                </div>
              </Card>
            ))}
            
            {inProgressDances.length > 3 && (
              <Button 
                variant="outline" 
                className="text-[#FFD600] border-[#FFD600]/50 hover:bg-[#FFD600]/10"
                onClick={() => {
                  // You could implement a dedicated 'My Progress' page here
                  // For now, just scroll to the dances section
                  const dancesSection = document.querySelector('.dance-grid');
                  dancesSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                View All In-Progress ({inProgressDances.length}) <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
