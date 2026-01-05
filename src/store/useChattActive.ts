import { create } from "zustand";

interface UseChattActive {
  idChatt: string | null;
  setIdChatt: (id: string | null) => void;
}
export const useChattActive = create<UseChattActive>((set) => ({
  idChatt: null,
  setIdChatt: (id) => set({ idChatt: id }),
}));
