"use client";
import FooterChat from "@/src/components/pages/chats/FooterChat";
import HeaderChat from "@/src/components/pages/chats/HeaderChat";
import MainChat from "@/src/components/pages/chats/MainChat";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { connectSocket } from "../lib/socket";
import { useChatStore } from "../store/useChattActive";

export default function ChatConvo() {
  const { data: session } = useSession();
  const { setMessage, message } = useChatStore();
  useEffect(() => {
    if (!session?.user.token) return;

    const socket = connectSocket(session.user.token);

    socket.on("message:incoming", (payload) => {
      setMessage(payload.messages);
    });

    socket.on("message:outgoing", (payload) => {
      setMessage(payload.messages);
    });
  }, [session?.user.token, message, setMessage]);
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="h-dvh fixed top-0 right-0 left-0 bottom-0 z-30"
    >
      <HeaderChat />
      <FooterChat />
      <div className="h-[95dvh] overflow-auto">
        <MainChat />
      </div>
    </motion.div>
  );
}
