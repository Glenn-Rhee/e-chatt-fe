"use client";
import clsx from "clsx";
import { ArrowLeft, Heart, Plus, User2, UsersRound } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Dialog from "./ui/Dialog";
import Link from "next/link";
import ShellHeader from "./ShellHeader";
import SearchBar from "./ui/SearchBar";
import NewChattSheet from "./pages/friend/NewChattSheet";
import { useChatStore } from "../store/useChattActive";
import DeleteConv from "./DeleteConv";

export default function Header() {
  const [openSearch, setOpenSearch] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const { isFocusChattItem, setIsFocusChattItem } = useChatStore();
  const pathname = usePathname();
  if (pathname === "/") return null;
  if (pathname === "/auth") return null;
  if (pathname === "/friend") return null;
  if (pathname === "/create-group") return null;
  if (pathname.includes("/chats/")) return null;
  if (pathname === "/notifications") return null;

  return (
    <ShellHeader>
      {isFocusChattItem ? (
        <>
          <div className="flex gap-x-3 items-center">
            <button onClick={() => setIsFocusChattItem(null)}>
              <ArrowLeft className="text-white" />
            </button>

            <span className="text-white font-semibold text-xl">
              {isFocusChattItem.length}
            </span>
          </div>
          <DeleteConv />
        </>
      ) : (
        <>
          <div className="flex items-center gap-x-2">
            <Image
              src={"/logo.png"}
              alt="Logo E-Chatt"
              width={25}
              height={25}
            />
            <span className="text-white italic font-bold text-xl">E-Chat</span>
          </div>
          <div className="flex items-center gap-x-2 relative">
            <SearchBar openSearch={openSearch} setOpenSearch={setOpenSearch} />
            <button
              className={clsx(
                "transition-all duration-300 ease-in-out",
                openSearch || openMenu ? "rotate-45" : "rotate-0",
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
            <Link href={"/notifications"}>
              <Heart className="text-white" />
            </Link>
            <Dialog
              isOpen={openMenu}
              onClose={() => setOpenMenu(false)}
              className="top-18 right-5 w-60 p-4"
            >
              <div className="flex flex-col gap-y-4">
                <NewChattSheet className="flex items-center gap-x-3 active:bg-neutral-100/40 p-2 rounded-md transition-colors duration-200 ease-in-out">
                  <Plus className="text-neutral-300" />
                  <span className="text-neutral-900 font-medium text-sm pointer-events-none">
                    Add chatt
                  </span>
                </NewChattSheet>
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
        </>
      )}
    </ShellHeader>
  );
}
