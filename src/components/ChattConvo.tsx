"use client";
import FooterChat from "@/src/components/pages/chats/FooterChat";
import HeaderChat from "@/src/components/pages/chats/HeaderChat";
import MainChat from "@/src/components/pages/chats/MainChat";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useChatStore } from "../store/useChattActive";
import useSocket from "../hooks/useSocket";

export default function ChatConvo() {
  const { data: session } = useSession();
  const { setMessage, message, idChatt } = useChatStore();
  const socketRef = useSocket();

  useEffect(() => {
    if (!socketRef.current) return;
    socketRef.current.on("message:incoming", (payload) => {
      setMessage(payload.messages);
    });

    socketRef.current.on("message:outgoing", (payload) => {
      setMessage(payload.messages);
    });
  }, [session?.user.token, message, setMessage, socketRef]);

  useEffect(() => {
    if (!socketRef.current) return;

    if (idChatt) {
      socketRef.current.emit("conversation:join", idChatt);
    }

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      socketRef.current?.emit("conversation:leave", idChatt);
    };
  }, [idChatt, socketRef]);

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="fixed top-0 right-0 left-0 bottom-0 z-30 bg-neutral-50"
    >
      <HeaderChat />
      <FooterChat />
      <div className="h-[93dvh] overflow-y-auto ">
        <MainChat />
      </div>
    </motion.div>
  );
}
