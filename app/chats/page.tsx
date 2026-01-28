"use client";
import ChatConvo from "@/src/components/ChattConvo";
import ChattItem from "@/src/components/pages/chats/ChattItem";
import EmptConversations from "@/src/components/pages/chats/EmptConversations";
import UserInformation from "@/src/components/pages/chats/UserInformation";
import useGetConversations from "@/src/hooks/useGetConversations";
import { connectSocket } from "@/src/lib/socket";
import { useChatStore } from "@/src/store/useChattActive";
import { AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
export default function ChatsPage() {
  const { informationsUser, isInformationActive } = useChatStore();
  const { isLoading, dataConv, setDataConv } = useGetConversations();
  const { data: session } = useSession();
  useEffect(() => {
    if (!session?.user.token) return;

    const socket = connectSocket(session.user.token);

    socket.on("chatts:incoming", (payload) => {
      setDataConv(payload);
    });
    socket.on("chatts:outgoing", (payload) => {
      setDataConv(payload);
    });
  }, [session?.user.token, setDataConv]);
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
