"use client";
import ChatConvo from "@/src/components/ChattConvo";
import ChattItem from "@/src/components/pages/chats/ChattItem";
import EmptConversations from "@/src/components/pages/chats/EmptConversations";
import UserInformation from "@/src/components/pages/chats/UserInformation";
import useGetConversations from "@/src/hooks/useGetConversations";
import { connectSocket } from "@/src/lib/socket";
import { useChatStore } from "@/src/store/useChattActive";
import { PayloadLastSeen } from "@/src/types";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { Socket } from "socket.io-client";
export default function ChatsPage() {
  const { informationsUser, isInformationActive } = useChatStore();
  const { isLoading, dataConv, setDataConv } = useGetConversations();
  const { data: session } = useSession();
  let socket: Socket<DefaultEventsMap, DefaultEventsMap> | null = null;
  if (session?.user.token) {
    socket = connectSocket(session?.user.token);
  }
  useEffect(() => {
    if (!socket || !session?.user) return;

    socket.on("chatts:incoming", (payload) => {
      setDataConv(payload);
    });
    socket.on("chatts:outgoing", (payload) => {
      setDataConv(payload);
    });

    socket.emit("user:online", session.user.userId);

    const interval = setInterval(() => {
      socket.emit("user:ping");
    }, 5000);

    return () => {
      clearInterval(interval);
      socket.disconnect();
    };
  }, [session?.user, setDataConv, socket]);

  useEffect(() => {
    if (!socket || !dataConv) return;

    const handler = (payload: PayloadLastSeen) => {
      setDataConv((prev) => {
        if (!prev) return prev;

        return prev.map((d) =>
          d.userFrom.id === payload.userId
            ? {
                ...d,
                userFrom: {
                  ...d.userFrom,
                  isOnline: payload.isOnline,
                  lastSeen: payload.lastSeen ?? d.userFrom.lastSeen,
                },
              }
            : d,
        );
      });
    };

    socket.on("user:status", handler);

    return () => {
      socket.off("user:status", handler);
    };
  }, [socket, dataConv, setDataConv]);
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
