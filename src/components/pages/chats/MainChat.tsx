"use client";
import { useChatStore } from "@/src/store/useChattActive";
import IncomingBubble from "./IncomingBubble";
import OutgoingBubble from "./OutgoingBubble";
import { useSession } from "next-auth/react";
import { getFormatTime } from "@/src/helper/getFormatDate";

export default function MainChat() {
  const { message, informationsUser } = useChatStore();
  const { data: session } = useSession();

  return (
    <main className="bg-neutral-50 h-full mt-28 space-y-3 py-2 px-3">
      {message && informationsUser && session?.user.userId && (
        <>
          <div className="w-full my-2 flex justify-center">
            <span className="text-white font-medium text-sm px-2 py-1 rounded-md bg-lightblue-500">
              Today
            </span>
          </div>
          {message.map((msg) =>
            msg.senderId === session.user.userId ? (
              <OutgoingBubble
                key={msg.id}
                text={msg.content}
                time={getFormatTime(new Date(msg.createdAt))}
              />
            ) : (
              <IncomingBubble
                key={msg.id}
                text={msg.content}
                time={getFormatTime(new Date(msg.createdAt))}
              />
            ),
          )}
        </>
      )}
    </main>
  );
}
