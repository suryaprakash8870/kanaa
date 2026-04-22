import { create } from "zustand";

interface State {
  ready: boolean;
  isReady: () => void;
  activeFlavor: number;
  setFlavor: (i: number) => void;
}

export const useStore = create<State>((set) => ({
  ready: false,
  isReady: () => set({ ready: true }),
  activeFlavor: 0,
  setFlavor: (i) => set({ activeFlavor: i }),
}));
