import { create } from 'zustand';

interface SupportFlowState {
  situation: string | null;
  goal: string | null;
  commMethods: string[];
  setSituation: (val: string | null) => void;
  setGoal: (val: string | null) => void;
  setCommMethods: (val: string[]) => void;
  resetFlow: () => void;
}

export const useSupportStore = create<SupportFlowState>((set) => ({
  situation: null,
  goal: null,
  commMethods: [],
  setSituation: (val) => set({ situation: val }),
  setGoal: (val) => set({ goal: val }),
  setCommMethods: (val) => set({ commMethods: val }),
  resetFlow: () => set({ situation: null, goal: null, commMethods: [] }),
}));
