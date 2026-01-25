"use client";
import ChattItem from "@/src/components/pages/chats/ChattItem";
import EmptConversations from "@/src/components/pages/chats/EmptConversations";

export default function ChatsPage() {
  const dataChats = [0];

  return (
    <div className="relative h-dvh">
      <main className="px-4 pt-3 mb-8 flex flex-col gap-y-3 overflow-y-scroll h-full">
        {dataChats.length === 0 ? (
          <EmptConversations />
        ) : (
          Array.from({ length: 10 }).map((_, index) => (
            <ChattItem key={index} />
          ))
        )}
      </main>
    </div>
  );
}
