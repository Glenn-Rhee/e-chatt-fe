"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavbarTabMedia() {
  const pathname = usePathname();
  return (
    <nav className="w-full grid grid-cols-3 gap-x-3 mt-3">
      <Link
        href={"/chats/media"}
        className={clsx(
          "text-sm font-semibold text-neutral-900 w-full flex justify-center relative active:bg-neutral-50 rounded-sm after:block after:content-[''] after:h-0.5 after:bg-neutral-900 after:absolute after:-bottom-1 after:left-1/2 after:right-1/2 after:-translate-x-1/2 after:rounded-md after:transition-all after:duration-200",
          pathname === "/chats/media" ? "after:w-[90%] " : "after:w-0"
        )}
      >
        Media
      </Link>
      <Link
        href={"/chats/links"}
        className={clsx(
          "text-sm font-semibold text-neutral-900 w-full flex justify-center relative active:bg-neutral-50 rounded-sm after:block after:content-[''] after:h-0.5 after:bg-neutral-900 after:absolute after:-bottom-1 after:left-1/2 after:right-1/2 after:-translate-x-1/2 after:rounded-md after:transition-all after:duration-200",
          pathname === "/chats/links" ? "after:w-[90%] " : "after:w-0"
        )}
      >
        Links
      </Link>
      <Link
        href={"/chats/documents"}
        className={clsx(
          "text-sm font-semibold text-neutral-900 w-full flex justify-center relative active:bg-neutral-50 rounded-sm after:block after:content-[''] after:h-0.5 after:bg-neutral-900 after:absolute after:-bottom-1 after:left-1/2 after:right-1/2 after:-translate-x-1/2 after:rounded-md after:transition-all after:duration-200",
          pathname === "/chats/documents" ? "after:w-[90%] " : "after:w-0"
        )}
      >
        Documents
      </Link>
    </nav>
  );
}
