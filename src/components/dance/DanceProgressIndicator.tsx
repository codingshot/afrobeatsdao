
import React from "react";
import { useDanceProgress } from "@/hooks/use-dance-progress";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";

interface DanceProgressIndicatorProps {
  danceId: string;
  totalModules?: number;
}

export const DanceProgressIndicator = ({ danceId, totalModules = 5 }: DanceProgressIndicatorProps) => {
  const { getDanceProgress } = useDanceProgress();
  const progress = getDanceProgress(danceId);
  
  if (!progress.started) return null;
  
  const moduleCount = progress.moduleProgress?.length || 0;
  const percentComplete = totalModules > 0 ? Math.min(100, Math.round((moduleCount / totalModules) * 100)) : 0;
  
  return (
    <div className="space-y-1">
      {progress.completed ? (
        <Badge variant="outline" className="bg-[#008751]/20 text-[#008751] border-[#008751]/30 font-medium">
          Completed
        </Badge>
      ) : progress.started ? (
        <Badge variant="outline" className="bg-[#FFD600]/20 text-[#FFD600] border-[#FFD600]/30 font-medium">
          In Progress
        </Badge>
      ) : null}
      
      {progress.started && !progress.completed && totalModules > 0 && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="w-full mt-1">
                <Progress value={percentComplete} className="h-1.5 bg-gray-700" />
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="bg-black text-white border-gray-700">
              <p className="text-xs">{moduleCount} of {totalModules} modules completed</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};
