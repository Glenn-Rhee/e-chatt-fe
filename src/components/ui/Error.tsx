"use client";

import { useRouter } from "next/navigation";

export default function Error({
  message,
  code,
}: {
  message: string;
  code: number;
}) {
  const router = useRouter();
  return (
    <div className="h-[80dvh] overflow-hidden w-dvw flex items-center justify-center flex-col gap-y-2">
      <h2 className="text-neutral-900 font-bold text-5xl">{message}</h2>
      <span className="text-red-500 font-semibold text-3xl">{code}</span>
      <button
        onClick={() => router.refresh()}
        className="px-2 py-1 bg-lightblue-500 rounded-md text-white font-medium active:scale-95 transition-all duration-100"
      >
        Try again
      </button>
    </div>
  );
}
