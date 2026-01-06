"use client";
import Dialog from "@/src/components/ui/Dialog";
import Separator from "@/src/components/ui/Separator";
import { useChatStore } from "@/src/store/useChattActive";
import { ArrowLeft, Ellipsis, Phone } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";
import { AnimatePresence } from "framer-motion";
import UserInformation from "./UserInformation";

export default function HeaderChat() {
  const [openMenu, setOpenMenu] = useState(false);
  const { setIdChatt, isInformationActive, setIsInformationActive } =
    useChatStore();

  return (
    <>
      <header
        className={clsx(
          "bg-white px-4 pb-3 pt-5 fixed top-0 right-0 left-0 space-y-1"
        )}
      >
        <div className="flex items-center justify-between">
          <button onClick={() => setIdChatt(null)} type="button">
            <ArrowLeft className="text-neutral-900" />
          </button>
          <h2 className="text-neutral-900 font-semibold text-lg">Message</h2>
          <button
            onClick={() => setOpenMenu(true)}
            className="text-neutral-900"
          >
            <Ellipsis />
          </button>
          <Dialog
            isOpen={openMenu}
            onClose={() => setOpenMenu(false)}
            className="top-18 right-5 w-60 p-2 bg-white"
          >
            <ul className="flex flex-col gap-y-2 text-neutral-900 font-medium">
              <li className="px-3 py-1 rounded-md active:bg-neutral-50 transition-colors duration-100">
                Search
              </li>
              <Separator />
              <li className="px-3 py-1 rounded-md active:bg-neutral-50 transition-colors duration-100">
                Block
              </li>
            </ul>
          </Dialog>
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-x-2 w-full pe-6">
            <Image
              src={"/prof.jpg"}
              alt="Profile User"
              width={40}
              height={40}
              className="rounded-full aspect-square object-cover"
            />
            <button
              onClick={() => setIsInformationActive(true)}
              className="flex flex-col w-full items-start rounded-sm px-2 py-0.5 active:bg-neutral-50 transition-colors duration-200"
            >
              <h6 className="text-neutral-900 font-semibold">David Wayne</h6>
              <span className="text-neutral-500 text-xs font-medium">
                davidwayne@gmail.com
              </span>
            </button>
          </div>
          <div className="flex items-center">
            <button className="text-neutral-900 rounded-full active:bg-neutral-50 p-2 transition-colors duration-200">
              <Phone />
            </button>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {isInformationActive && <UserInformation />}
      </AnimatePresence>
    </>
  );
}
