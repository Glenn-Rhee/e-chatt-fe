import { create } from "zustand";

interface UseChatStore {
  idChatt: string | null;
  setIdChatt: (id: string | null) => void;
  isInformationActive: boolean;
  setIsInformationActive: (v: boolean) => void;
}

export const useChatStore = create<UseChatStore>((set) => ({
  idChatt: null,
  isInformationActive: false,
  setIsInformationActive: (v) => set({ isInformationActive: v }),
  setIdChatt: (id) => set({ idChatt: id }),
}));
