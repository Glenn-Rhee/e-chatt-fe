"use client";
import Dialog from "@/src/components/ui/Dialog";
import Separator from "@/src/components/ui/Separator";
import { useChatStore } from "@/src/store/useChattActive";
import { ArrowLeft, Ellipsis, Phone, User2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";
import { useZustandHydrated } from "@/src/hooks/useZustandHydrated";
import getFormatLastSeen from "@/src/helper/getFormatLastSeen";

export default function HeaderChat() {
  const [openMenu, setOpenMenu] = useState(false);
  const isClient = useZustandHydrated();
  const {
    setInformationUser,
    setIdChatt,
    setIsInformationActive,
    informationsUser,
  } = useChatStore();

  if (!isClient) return null;
  return (
    <>
      <header
        className={clsx(
          "bg-white px-4 pb-3 pt-5 fixed top-0 right-0 left-0 space-y-1 z-10",
        )}
      >
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              setInformationUser(null);
              setIdChatt(null);
            }}
            type="button"
          >
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
            {informationsUser && informationsUser.image_url ? (
              <Image
                src={informationsUser.image_url}
                alt="Profile User"
                width={40}
                height={40}
                className="rounded-full aspect-square object-cover"
              />
            ) : (
              <div className="flex items-center w-10 h-10 justify-center px-1 py-1 rounded-full bg-lightblue-200 aspect-square">
                <User2 className="text-white" size={25} />
              </div>
            )}
            {informationsUser && (
              <button
                onClick={() => setIsInformationActive(true)}
                className="flex flex-col w-full items-start rounded-sm px-2 py-0.5 active:bg-neutral-50 transition-colors duration-200"
              >
                <h6 className="text-neutral-900 font-semibold">
                  {informationsUser.username}
                </h6>
                <span className="text-neutral-500 text-xs font-medium">
                  {informationsUser.isOnline
                    ? informationsUser.isOnline
                      ? "online"
                      : getFormatLastSeen(informationsUser.lastSeen)
                    : informationsUser.email}
                </span>
              </button>
            )}
          </div>
          <div className="flex items-center">
            <button className="text-neutral-900 rounded-full active:bg-neutral-50 p-2 transition-colors duration-200">
              <Phone />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
