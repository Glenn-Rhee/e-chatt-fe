"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HeaderMedia() {
  const router = useRouter();
  return (
    <header className="flex items-center gap-x-4">
      <button onClick={() => router.back()}>
        <ArrowLeft className="text-neutral-900" />
      </button>
      <h5 className="text-neutral-900 font-semibold text-[22px]">
        David Wayne
      </h5>
    </header>
  );
}
