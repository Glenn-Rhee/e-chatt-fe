import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Message } from "../types";

interface UseChatStore {
  idChatt: string | null;
  message: Message[] | null;

  isInformationActive: boolean;
  isShowMedia: boolean;
  hydrated: boolean;
  informationsUser: {
    id: string;
    username: string;
    email: string;
    image_url: string | null;
    isOnline: boolean;
    lastSeen: string;
  } | null;
  openSheetFriend: boolean;

  setMessage: (v: Message[] | null) => void;
  setOpenSheetFriend: (v: boolean) => void;
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
      message: null,

      // Runtime-only
      isInformationActive: false,
      isShowMedia: false,
      hydrated: false,
      openSheetFriend: false,

      // Actions
      setMessage: (v) => set({ message: v }),
      setOpenSheetFriend: (v) => set({ openSheetFriend: v }),
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
        message: state.message,
      }),

      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);
