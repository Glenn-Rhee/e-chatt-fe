"use client";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  if (pathname === "/") return null;
  if (pathname === "/auth") return null;
  if (pathname === "/friend") return null;
  if (pathname === "/create-group") return null;
  if (pathname.includes("/chats/")) return null;
  return (
    <nav className="w-full px-3 py-2 flex items-center justify-evenly fixed bottom-0 left-0 right-0 bg-white rounded-tr-2xl rounded-tl-2xl shadow-xl">
      <Link
        href={"/chats"}
        className={clsx(
          "flex flex-col items-center gap-y-1 rounded-xl px-4 py-2",
          pathname === "/chats"
            ? "bg-linear-to-r from-lightblue-500 to-lightblue-600"
            : ""
        )}
      >
        <Image
          src={
            pathname === "/chats" ? "/chat-active.svg" : "/chat-inactive.svg"
          }
          alt="Chat Icon"
          width={20}
          height={20}
          className="object aspect-square"
        />
        <span
          className={clsx(
            "font-medium text-sm",
            pathname === "/chats" ? "text-white" : "text-neutral-300"
          )}
        >
          Chats
        </span>
      </Link>
      <Link
        href={"/groups"}
        className={clsx(
          "flex flex-col items-center gap-y-1 rounded-xl px-4 py-2",
          pathname === "/groups"
            ? "bg-linear-to-r from-lightblue-500 to-lightblue-600"
            : ""
        )}
      >
        <Image
          src={
            pathname === "/groups"
              ? "/groups-active.svg"
              : "/groups-inactive.svg"
          }
          alt="Group Icon"
          width={20}
          height={20}
          className="aspect-square"
        />
        <span
          className={clsx(
            "font-medium text-sm",
            pathname === "/groups" ? "text-white" : "text-neutral-300"
          )}
        >
          Groups
        </span>
      </Link>
      <Link
        href={"/profile"}
        className={clsx(
          "flex flex-col items-center gap-y-1 rounded-xl px-4 py-2",
          pathname === "/profile"
            ? "bg-linear-to-r from-lightblue-500 to-lightblue-600"
            : ""
        )}
      >
        <Image
          src={
            pathname === "/profile"
              ? "/profile-active.svg"
              : "/profile-inactive.svg"
          }
          alt="Profile Icon"
          width={20}
          height={20}
          className="aspect-square"
        />
        <span
          className={clsx(
            "font-medium text-sm",
            pathname === "/profile" ? "text-white" : "text-neutral-300"
          )}
        >
          Profile
        </span>
      </Link>
      <Link
        href={"/settings"}
        className={clsx(
          "flex flex-col items-center gap-y-1 rounded-xl px-4 py-2",
          pathname === "/settings"
            ? "bg-linear-to-r from-lightblue-500 to-lightblue-600"
            : ""
        )}
      >
        <Image
          src={
            pathname === "/settings"
              ? "/settings-active.svg"
              : "/settings-inactive.svg"
          }
          alt="Settings Icon"
          width={20}
          height={20}
          className="aspect-square"
        />
        <span
          className={clsx(
            "font-medium text-sm",
            pathname === "/settings" ? "text-white" : "text-neutral-300"
          )}
        >
          Settings
        </span>
      </Link>
    </nav>
  );
}
