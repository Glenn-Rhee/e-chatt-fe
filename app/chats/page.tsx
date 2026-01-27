"use client";
import ChatConvo from "@/src/components/ChattConvo";
import ChattItem from "@/src/components/pages/chats/ChattItem";
import EmptConversations from "@/src/components/pages/chats/EmptConversations";
import UserInformation from "@/src/components/pages/chats/UserInformation";
import useGetConversations from "@/src/hooks/useGetConversations";
import { useChatStore } from "@/src/store/useChattActive";
import { AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
export default function ChatsPage() {
  const { informationsUser, isInformationActive } = useChatStore();
  const { isLoading, dataConv } = useGetConversations();
  return (
    <div className="relative h-dvh">
      <main className="px-4 pt-3 mb-8 flex flex-col gap-y-3 overflow-y-scroll h-full">
        {isLoading ? (
          <div className="w-full flex items-center justify-center h-[80dvh] flex-col gap-y-2">
            <Loader2 className="text-lightblue-500 animate-spin" size={32} />
          </div>
        ) : dataConv && dataConv.length === 0 ? (
          <EmptConversations />
        ) : (
          dataConv &&
          dataConv.length > 0 &&
          dataConv.map((data, index) => (
            <ChattItem key={index} dataConv={data} />
          ))
        )}
      </main>
      <AnimatePresence initial={false}>
        {informationsUser && <ChatConvo />}
      </AnimatePresence>
      <AnimatePresence initial={false}>
        {isInformationActive && <UserInformation />}
      </AnimatePresence>
    </div>
  );
}
