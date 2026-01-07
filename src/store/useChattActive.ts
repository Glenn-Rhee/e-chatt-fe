import { create, StateCreator } from "zustand";
import { createJSONStorage, persist, PersistOptions } from "zustand/middleware";

interface UseChatStore {
  idChatt: string | null;
  setIdChatt: (id: string | null) => void;
  hydrated: boolean;
  isInformationActive: boolean;
  setIsInformationActive: (v: boolean) => void;
  setHydrated: (v: boolean) => void;
}

type ChatPersist = (
  config: StateCreator<UseChatStore>,
  option: PersistOptions<UseChatStore>
) => StateCreator<UseChatStore>;

export const useChatStore = create<UseChatStore>(
  (persist as ChatPersist)(
    (set) => ({
      idChatt: null,
      isInformationActive: false,
      hydrated: false,
      setIsInformationActive: (v) => set({ isInformationActive: v }),
      setIdChatt: (id) => set({ idChatt: id }),
      setHydrated: (v) => set({ hydrated: v }),
    }),
    {
      name: "chatt",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);
