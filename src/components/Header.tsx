"use client";

import clsx from "clsx";
import { Plus, User2, UsersRound } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Dialog from "./ui/Dialog";
import Link from "next/link";
import ShellHeader from "./ShellHeader";
import SearchBar from "./ui/SearchBar";

export default function Header() {
  const [openSearch, setOpenSearch] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const pathname = usePathname();

  if (pathname === "/") return null;
  if (pathname === "/auth") return null;
  if (pathname === "/friend") return null;
  if (pathname === "/create-group") return null;
  if (pathname.includes("/chats/")) return null;
  return (
    <ShellHeader>
      <div className="flex items-center gap-x-2">
        <Image src={"/logo.png"} alt="Logo E-Chatt" width={35} height={35} />
        <span className="text-white italic font-bold text-2xl">E-Chat</span>
      </div>
      <div className="flex items-center gap-x-2 relative">
        <SearchBar openSearch={openSearch} setOpenSearch={setOpenSearch} />
        <button
          className={clsx(
            "transition-all duration-300 ease-in-out",
            openSearch || openMenu ? "rotate-45" : "rotate-0"
          )}
          type="button"
          onClick={() => {
            if (openSearch || openMenu) {
              setOpenSearch(false);
              setOpenMenu(false);
            } else {
              setOpenMenu(true);
            }
          }}
        >
          <Plus className="text-white" />
        </button>
        <Dialog
          isOpen={openMenu}
          onClose={() => setOpenMenu(false)}
          className="top-18 right-5 w-60 p-4"
        >
          <div className="flex flex-col gap-y-4">
            <Link
              href={"/friend"}
              className="flex items-center gap-x-3 active:bg-neutral-100/40 p-2 rounded-md transition-colors duration-200 ease-in-out"
            >
              <User2 className="text-neutral-300" />
              <span className="text-neutral-900 font-medium text-sm pointer-events-none">
                Add Friend
              </span>
            </Link>
            <Link
              href={"/create-group"}
              className="flex items-center gap-x-3 active:bg-neutral-100/40 p-2 rounded-md transition-colors duration-200 ease-in-out"
            >
              <UsersRound className="text-neutral-300" />
              <span className="text-neutral-900 font-medium text-sm pointer-events-none">
                Create Group
              </span>
            </Link>
          </div>
        </Dialog>
      </div>
    </ShellHeader>
  );
}
