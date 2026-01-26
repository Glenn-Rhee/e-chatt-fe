"use client";
import { useChatStore } from "@/src/store/useChattActive";
import { AnimatePresence } from "framer-motion";
import ChatConvo from "../../ChattConvo";
import UserInformation from "./UserInformation";
import NewChattSheet from "../friend/NewChattSheet";

export default function EmptConversations() {
  const { idChatt, isInformationActive } = useChatStore();

  return (
    <div className="w-full flex items-center justify-center h-[80dvh] flex-col gap-y-2">
      <span className="text-neutral-700 font-medium text-lg">
        No conversations yet.
      </span>
      <NewChattSheet />
      <AnimatePresence initial={false}>
        {idChatt && <ChatConvo />}
      </AnimatePresence>
      <AnimatePresence initial={false}>
        {isInformationActive && <UserInformation />}
      </AnimatePresence>
    </div>
  );
}
