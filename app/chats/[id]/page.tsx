"use client";
import Dialog from "@/src/components/ui/Dialog";
import { ArrowLeft, Ellipsis } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ChatConv() {
  const [openMenu, setOpenMenu] = useState(false);
  const router = useRouter();
  return (
    <>
      <header className="flex  items-center justify-between bg-white px-4 pb-3 pt-5 relative">
        <button onClick={() => router.back()} type="button">
          <ArrowLeft className="text-neutral-900" />
        </button>
        <h2 className="text-neutral-900 font-semibold text-lg">Message</h2>
        <button onClick={() => setOpenMenu(true)} className="text-neutral-900">
          <Ellipsis />
        </button>
        <Dialog
          isOpen={openMenu}
          onClose={() => setOpenMenu(false)}
          className="top-18 right-5 w-60 p-4 bg-linear-to-br text-white from-blue-500 via-blue-400 to-blue-200"
        >
          cihuy
        </Dialog>
      </header>
      <main></main>
    </>
  );
}
