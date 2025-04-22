
import { useState, useEffect } from 'react';

interface DanceProgress {
  [key: string]: {
    started: boolean;
    completed: boolean;
    moduleProgress: number[];
  };
}

export const useDanceProgress = () => {
  const [progress, setProgress] = useState<DanceProgress>(() => {
    const saved = localStorage.getItem('danceProgress');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('danceProgress', JSON.stringify(progress));
  }, [progress]);

  const startDance = (danceId: string) => {
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
    setProgress(prev => ({
      ...prev,
      [danceId]: {
        ...prev[danceId],
        moduleProgress: [
          ...(prev[danceId]?.moduleProgress || []),
          moduleIndex
        ]
      }
    }));
  };

  const getDanceProgress = (danceId: string) => {
    return progress[danceId] || { started: false, completed: false, moduleProgress: [] };
  };

  const getTotalProgress = () => {
    const totalDances = Object.keys(progress).length;
    const startedDances = Object.values(progress).filter(p => p.started).length;
    return { total: totalDances, started: startedDances };
  };

  return {
    startDance,
    markModuleComplete,
    getDanceProgress,
    getTotalProgress
  };
};
