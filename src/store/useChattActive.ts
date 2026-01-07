import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UseChatStore {
  idChatt: string | null;

  isInformationActive: boolean;
  isShowMedia: boolean;
  hydrated: boolean;

  setIdChatt: (id: string | null) => void;
  setIsInformationActive: (v: boolean) => void;
  setaIsShowMedia: (v: boolean) => void;
  setHydrated: (v: boolean) => void;
}

export const useChatStore = create<UseChatStore>()(
  persist(
    (set) => ({
      // Persisted
      idChatt: null,

      // Runtime-only
      isInformationActive: false,
      isShowMedia: false,
      hydrated: false,

      // Actions
      setIdChatt: (id) => set({ idChatt: id }),
      setIsInformationActive: (v) => set({ isInformationActive: v }),
      setaIsShowMedia: (v) => set({ isShowMedia: v }),
      setHydrated: (v) => set({ hydrated: v }),
    }),
    {
      name: "chatt",
      storage: createJSONStorage(() => localStorage),

      partialize: (state) => ({
        idChatt: state.idChatt,
      }),

      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);
