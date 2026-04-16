
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useToast } from "@/hooks/use-toast";

interface DanceProgress {
  [key: string]: {
    started: boolean;
    completed: boolean;
    moduleProgress: number[];
  };
}

export type DanceProgressApi = {
  startDance: (danceId: string) => void;
  markModuleComplete: (danceId: string, moduleIndex: number) => void;
  markDanceComplete: (danceId: string) => void;
  getDanceProgress: (danceId: string) => {
    started: boolean;
    completed: boolean;
    moduleProgress: number[];
  };
  getTotalProgress: () => { total: number; started: number; completed: number };
  resetProgress: (danceId?: string) => void;
};

const DanceProgressContext = createContext<DanceProgressApi | null>(null);

export function DanceProgressProvider({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();
  const [progress, setProgress] = useState<DanceProgress>(() => {
    try {
      const saved = localStorage.getItem("danceProgress");
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      console.error("Error loading dance progress:", error);
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("danceProgress", JSON.stringify(progress));
    } catch (error) {
      console.error("Error saving dance progress:", error);
      toast({
        title: "Error",
        description: "Could not save your progress. Please check your browser settings.",
        variant: "destructive",
      });
    }
  }, [progress, toast]);

  const startDance = useCallback((danceId: string) => {
    if (!danceId) return;

    setProgress((prev) => ({
      ...prev,
      [danceId]: {
        ...prev[danceId],
        started: true,
        moduleProgress: prev[danceId]?.moduleProgress || [],
      },
    }));
  }, []);

  const markModuleComplete = useCallback((danceId: string, moduleIndex: number) => {
    if (!danceId) return;

    setProgress((prev) => {
      const currentModules = prev[danceId]?.moduleProgress || [];

      if (!currentModules.includes(moduleIndex)) {
        return {
          ...prev,
          [danceId]: {
            ...prev[danceId],
            started: true,
            moduleProgress: [...currentModules, moduleIndex],
          },
        };
      }
      return prev;
    });
  }, []);

  const markDanceComplete = useCallback((danceId: string) => {
    if (!danceId) return;

    setProgress((prev) => ({
      ...prev,
      [danceId]: {
        ...prev[danceId],
        started: true,
        completed: true,
      },
    }));
  }, []);

  const getDanceProgress = useCallback(
    (danceId: string) => {
      if (!danceId) return { started: false, completed: false, moduleProgress: [] };
      return progress[danceId] || { started: false, completed: false, moduleProgress: [] };
    },
    [progress]
  );

  const getTotalProgress = useCallback(() => {
    const totalDances = Object.keys(progress).length;
    const startedDances = Object.values(progress).filter((p) => p.started).length;
    const completedDances = Object.values(progress).filter((p) => p.completed).length;
    return { total: totalDances, started: startedDances, completed: completedDances };
  }, [progress]);

  const resetProgress = useCallback((danceId?: string) => {
    if (danceId) {
      setProgress((prev) => {
        const newProgress = { ...prev };
        delete newProgress[danceId];
        return newProgress;
      });
    } else {
      setProgress({});
    }
  }, []);

  const value = useMemo(
    () => ({
      startDance,
      markModuleComplete,
      markDanceComplete,
      getDanceProgress,
      getTotalProgress,
      resetProgress,
    }),
    [
      startDance,
      markModuleComplete,
      markDanceComplete,
      getDanceProgress,
      getTotalProgress,
      resetProgress,
    ]
  );

  return <DanceProgressContext.Provider value={value}>{children}</DanceProgressContext.Provider>;
}

export const useDanceProgress = () => {
  const ctx = useContext(DanceProgressContext);
  if (!ctx) {
    throw new Error("useDanceProgress must be used within DanceProgressProvider");
  }
  return ctx;
};
