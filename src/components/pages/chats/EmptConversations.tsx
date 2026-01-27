"use client";
import NewChattSheet from "../friend/NewChattSheet";

export default function EmptConversations() {
  return (
    <div className="w-full flex items-center justify-center h-[80dvh] flex-col gap-y-2">
      <span className="text-neutral-700 font-medium text-lg">
        No conversations yet.
      </span>
      <NewChattSheet />
    </div>
  );
}
