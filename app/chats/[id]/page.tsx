"use client";
import FooterChat from "@/src/components/pages/chats/FooterChat";
import HeaderChat from "@/src/components/pages/chats/HeaderChat";
import MainChat from "@/src/components/pages/chats/MainChat";

export default function ChatConv() {
  return (
    <div className="h-dvh bg-red-900">
      <HeaderChat />
      <MainChat />
      <FooterChat />
    </div>
  );
}
