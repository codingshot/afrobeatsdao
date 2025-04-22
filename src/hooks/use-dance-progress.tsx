
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

interface DanceProgress {
  [key: string]: {
    started: boolean;
    completed: boolean;
    moduleProgress: number[];
  };
}

export const useDanceProgress = () => {
  const { toast } = useToast();
  const [progress, setProgress] = useState<DanceProgress>(() => {
    try {
      const saved = localStorage.getItem('danceProgress');
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      console.error("Error loading dance progress:", error);
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('danceProgress', JSON.stringify(progress));
    } catch (error) {
      console.error("Error saving dance progress:", error);
      toast({
        title: "Error",
        description: "Could not save your progress. Please check your browser settings.",
        variant: "destructive",
      });
    }
  }, [progress, toast]);

  const startDance = (danceId: string) => {
    if (!danceId) return;
    
    setProgress(prev => ({
      ...prev,
      [danceId]: {
        ...prev[danceId],
        started: true,
        moduleProgress: prev[danceId]?.moduleProgress || []
      }
    }));
  };

  const markModuleComplete = (danceId: string, moduleIndex: number) => {
    if (!danceId) return;
    
    setProgress(prev => {
      // Get current module progress
      const currentModules = prev[danceId]?.moduleProgress || [];
      
      // Only add the module if it's not already in the array
      if (!currentModules.includes(moduleIndex)) {
        return {
          ...prev,
          [danceId]: {
            ...prev[danceId],
            started: true,
            moduleProgress: [...currentModules, moduleIndex]
          }
        };
      }
      return prev;
    });
  };

  const markDanceComplete = (danceId: string) => {
    if (!danceId) return;
    
    setProgress(prev => ({
      ...prev,
      [danceId]: {
        ...prev[danceId],
        started: true,
        completed: true
      }
    }));
  };

  const getDanceProgress = (danceId: string) => {
    if (!danceId) return { started: false, completed: false, moduleProgress: [] };
    return progress[danceId] || { started: false, completed: false, moduleProgress: [] };
  };

  const getTotalProgress = () => {
    const totalDances = Object.keys(progress).length;
    const startedDances = Object.values(progress).filter(p => p.started).length;
    const completedDances = Object.values(progress).filter(p => p.completed).length;
    return { total: totalDances, started: startedDances, completed: completedDances };
  };

  const resetProgress = (danceId?: string) => {
    if (danceId) {
      setProgress(prev => {
        const newProgress = { ...prev };
        delete newProgress[danceId];
        return newProgress;
      });
    } else {
      setProgress({});
    }
  };

  return {
    startDance,
    markModuleComplete,
    markDanceComplete,
    getDanceProgress,
    getTotalProgress,
    resetProgress
  };
};
