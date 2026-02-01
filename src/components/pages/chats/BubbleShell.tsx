"use client";
import { useChatStore } from "@/src/store/useChattActive";
import clsx from "clsx";
import React, { useRef } from "react";

interface BubbleShellProps {
  bubbleFor: "incoming" | "outgoing";
  children: React.ReactNode;
  idMsg: string;
}

export default function BubbleShell(props: BubbleShellProps) {
  const { bubbleFor, children, idMsg } = props;
  const { isFocusChattItem, setIsFocusChattItem } = useChatStore();
  const isLongPress = useRef(false);
  const holdRef = useRef<NodeJS.Timeout | null>(null);
  const handleStart = () => {
    isLongPress.current = false;
    holdRef.current = setTimeout(() => {
      isLongPress.current = true;
      if (isFocusChattItem) {
        const finded = isFocusChattItem.find((fi) => fi === idMsg);
        if (!finded) {
          setIsFocusChattItem([...isFocusChattItem, idMsg]);
        }
      } else {
        setIsFocusChattItem([idMsg]);
      }
    }, 200);
  };

  const handleEnd = () => {
    if (holdRef.current) {
      clearTimeout(holdRef.current);
      holdRef.current = null;
    }
  };

  const handleBubbleClick = (e: React.MouseEvent) => {
    if (isLongPress.current) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    if (isFocusChattItem) {
      e.preventDefault();
      e.stopPropagation();
      if (isFocusChattItem.length > 1) {
        const filtered = isFocusChattItem.filter((fi) => fi !== idMsg);
        setIsFocusChattItem(filtered);
      } else {
        const finded = isFocusChattItem.find((fi) => fi === idMsg);
        if (finded) {
          setIsFocusChattItem(null);
        } else {
          setIsFocusChattItem([...isFocusChattItem, idMsg]);
        }
      }
      return;
    }
  };

  return (
    <div
      onPointerDown={handleStart}
      onPointerUp={handleEnd}
      onPointerLeave={handleEnd}
      onClick={handleBubbleClick}
      className={clsx(
        "w-full px-2 py-1.5 flex items-center rounded-md",
        bubbleFor === "incoming" ? "justify-start" : "justify-end",
        {
          "bg-neutral-100":
            isFocusChattItem && isFocusChattItem.includes(idMsg),
        },
      )}
    >
      {children}
    </div>
  );
}
