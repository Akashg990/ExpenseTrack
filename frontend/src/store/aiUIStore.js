import { create } from "zustand";

const useAIUIStore = create((set) => ({

  isOpen: false,

  openAI: () => set({ isOpen: true }),

  closeAI: () => set({ isOpen: false }),

  toggleAI: () =>
    set((state) => ({
      isOpen: !state.isOpen,
    })),

}));

export default useAIUIStore;