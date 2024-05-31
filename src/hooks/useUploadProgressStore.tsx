import { create } from "zustand";

interface UploadProgressState {
  progress: string[];
  setProgress: (newProgress: string[]) => void;
  clearProgress: () => void;
}

export const useUploadProgressStore = create<UploadProgressState>((set) => ({
  progress: [], 

  setProgress: (newProgress) => {
    set((state) => ({ progress: [...state.progress, ...newProgress] }));
  },

  clearProgress: () => {
    set({ progress: [] });
  },
}));
