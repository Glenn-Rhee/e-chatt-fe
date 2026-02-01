import clsx from "clsx";
import React from "react";

interface BubbleShellProps {
  bubbleFor: "incoming" | "outgoing";
  children: React.ReactNode;
}

export default function BubbleShell(props: BubbleShellProps) {
  const { bubbleFor, children } = props;
  return (
    <div
      className={clsx(
        "w-full px-2 py-1.5 flex items-center bg-neutral-100 rounded-md",
        bubbleFor === "incoming" ? "justify-start" : "justify-end",
      )}
    >
      {children}
    </div>
  );
}
