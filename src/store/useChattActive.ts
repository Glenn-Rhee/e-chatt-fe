import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UseChatStore {
  idChatt: string | null;

  isInformationActive: boolean;
  isShowMedia: boolean;
  hydrated: boolean;
  informationsUser: {
    username: string;
    email: string;
    image_url: string | null;
  } | null;

  setIdChatt: (id: string | null) => void;
  setIsInformationActive: (v: boolean) => void;
  setaIsShowMedia: (v: boolean) => void;
  setHydrated: (v: boolean) => void;
  setInformationUser: (v: UseChatStore["informationsUser"]) => void;
}

export const useChatStore = create<UseChatStore>()(
  persist(
    (set) => ({
      // Persisted
      idChatt: null,
      informationsUser: null,

      // Runtime-only
      isInformationActive: false,
      isShowMedia: false,
      hydrated: false,

      // Actions
      setInformationUser: (v) => set({ informationsUser: v }),
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
        informationsUser: state.informationsUser,
      }),

      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);
