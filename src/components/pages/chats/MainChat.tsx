"use client";
import { useChatStore } from "@/src/store/useChattActive";
import IncomingBubble from "./IncomingBubble";
import OutgoingBubble from "./OutgoingBubble";
import { useSession } from "next-auth/react";
import { getFormatTime } from "@/src/helper/getFormatDate";
import { useEffect, useRef } from "react";
import groupMessageByDate from "@/src/helper/groupMessageByDate";

export default function MainChat() {
  const { message, informationsUser } = useChatStore();
  const { data: session } = useSession();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "auto" });
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message?.length]);

  const groupedMessages = groupMessageByDate(message);

  console.log(groupedMessages);
  return (
    <main className="bg-transparent h-full mt-28 space-y-1 py-2 px-3 relative">
      {message && informationsUser && session?.user.userId && (
        <>
          <div className="w-full my-2 flex justify-center sticky top">
            <span className="text-white font-medium text-sm px-2 py-1 rounded-md bg-lightblue-500">
              Today
            </span>
          </div>
          {message.map((msg) =>
            msg.senderId === session.user.userId ? (
              <OutgoingBubble
                idMsg={msg.id}
                isRead={msg.isRead}
                key={msg.id}
                text={msg.content}
                time={getFormatTime(new Date(msg.createdAt))}
              />
            ) : (
              <IncomingBubble
                idMsg={msg.id}
                key={msg.id}
                text={msg.content}
                time={getFormatTime(new Date(msg.createdAt))}
              />
            ),
          )}
        </>
      )}
      <div ref={bottomRef} />
    </main>
  );
}
