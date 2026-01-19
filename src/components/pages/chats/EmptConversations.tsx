"use client";
import { useState } from "react";
import Button from "../../Button";
import BottomSheet from "../../ui/BottomSheet";
import { Search } from "lucide-react";
import Image from "next/image";

export default function EmptConversations() {
  const [openSheet, setOpenSheet] = useState(false);
  return (
    <div className="w-ful flex items-center justify-center h-[80dvh] flex-col gap-y-2">
      <span className="text-neutral-700 font-medium text-lg">
        No conversations yet.
      </span>
      <Button onClick={() => setOpenSheet(true)}>Start conversations</Button>
      <BottomSheet
        isOpen={openSheet}
        onClose={() => setOpenSheet(false)}
        className="pb-2"
      >
        <h2 className="text-center text-neutral-800 font-medium mb-4 text-lg">
          Start chatt with your friends
        </h2>
        <div className="flex items-center gap-x-2 border rounded-md p-2 border-neutral-300">
          <Search className="text-neutral-300" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent border-none focus:outline-none placeholder:text-sm text-sm text-neutral-400 placeholder:text-neutral-300"
          />
        </div>
        <div className="flex flex-col gap-y-4 w-full mt-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <button
              key={i}
              className="flex items-center gap-x-2 text-start px-2 py-1.5 active:bg-neutral-50 rounded-md transition-colors duration-100 focus:outline-none"
            >
              <Image
                src={"/prof.jpg"}
                alt="Profile User"
                width={40}
                height={40}
                className="aspect-square rounded-full"
              />
              <div className="flex flex-col">
                <h6 className="text-neutral-900 font-bold text-sm">
                  Glenna Reichert
                </h6>
                <span className="text-xs font-semibold text-neutral-300">
                  glennviktor5@gmail.com
                </span>
              </div>
            </button>
          ))}
        </div>
      </BottomSheet>
    </div>
  );
}
