"use client";
import { ArrowLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function HeaderMedia() {
  const router = useRouter();
  const pathname = usePathname();

  if (!pathname.includes("/chats/")) return null;
  return (
    <header className="flex items-center gap-x-4 px-4 pt-5">
      <button onClick={() => router.push("/chats")}>
        <ArrowLeft className="text-neutral-900" />
      </button>
      <h5 className="text-neutral-900 font-semibold text-[22px]">
        David Wayne
      </h5>
    </header>
  );
}
