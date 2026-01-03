"use client";
import Dialog from "@/src/components/ui/Dialog";
import Separator from "@/src/components/ui/Separator";
import { ArrowLeft, Ellipsis } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HeaderChat() {
  const [openMenu, setOpenMenu] = useState(false);
  const router = useRouter();

  return (
    <header className="flex items-center justify-between bg-white px-4 pb-3 pt-5 fixed top-0 right-0 left-0">
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
        className="top-18 right-5 w-60 p-2 bg-white"
      >
        <ul className="flex flex-col gap-y-2 text-neutral-900 font-medium">
          <li className="px-3 py-1 rounded-md active:bg-white/20 transition-colors duration-100">
            Search
          </li>
          <Separator />
          <li className="px-3 py-1 rounded-md active:bg-white/20 transition-colors duration-100">
            Block
          </li>
        </ul>
      </Dialog>
    </header>
  );
}
