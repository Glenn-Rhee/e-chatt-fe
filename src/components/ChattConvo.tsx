"use client";
import FooterChat from "@/src/components/pages/chats/FooterChat";
import HeaderChat from "@/src/components/pages/chats/HeaderChat";
import MainChat from "@/src/components/pages/chats/MainChat";
import { motion } from "framer-motion";

export default function ChatConvo() {
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="h-dvh fixed top-0 right-0 left-0 bottom-0"
    >
      <HeaderChat />
      <FooterChat />
      <div className="h-full">
        <MainChat />
      </div>
    </motion.div>
  );
}
