"use client";
import ChatConvo from "@/src/components/ChattConvo";
import UserInformation from "@/src/components/pages/chats/UserInformation";
import { useZustandHydrated } from "@/src/hooks/useZustandHydrated";
import { useChatStore } from "@/src/store/useChattActive";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function ChatsPage() {
  const { setIdChatt, idChatt, isInformationActive } = useChatStore();
  const isClient = useZustandHydrated();
  if (!isClient) return null;

  return (
    <div className="relative h-dvh">
      <main className="px-4 pt-3 mb-8 flex flex-col gap-y-3 overflow-y-scroll h-full">
        {Array.from({ length: 10 }).map((_, index) => (
          <button
            onClick={() => setIdChatt("123")}
            key={index}
            className="flex items-center justify-between active:bg-neutral-100/40 rounded-lg p-2"
          >
            <div className="flex items-center gap-x-2">
              <Image
                src={"/prof.jpg"}
                alt="Profile User"
                width={40}
                height={40}
                className="aspect-square rounded-full"
              />
              <div className="flex flex-col">
                <h6 className="text-neutral-900 font-bold text-sm text-start">
                  David Wayne
                </h6>
                <span className="text-xs block font-semibold text-neutral-300">
                  Thank you so much!
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-neutral-500">
                10:25
              </span>
              <span className="text-lightblue-500 text-sm font-semibold rounded-md flex items-center justify-center">
                5
              </span>
            </div>
          </button>
        ))}
      </main>
      <AnimatePresence initial={false}>
        {idChatt && isClient && <ChatConvo />}
      </AnimatePresence>
      <AnimatePresence initial={false}>
        {isInformationActive && isClient && <UserInformation />}
      </AnimatePresence>
    </div>
  );
}
