"use client";
import { useChatStore } from "@/src/store/useChattActive";
import {
  ArrowLeft,
  Ban,
  ChevronRight,
  CircleAlert,
  ImageIcon,
  Phone,
  User2,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import toast from "react-hot-toast";
import Separator from "../../ui/Separator";
import Link from "next/link";

export default function UserInformation() {
  const { setIsInformationActive, informationsUser } = useChatStore();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const handlePointerDown = () => {
    timerRef.current = setTimeout(async () => {
      await navigator.clipboard.writeText("davidwayne@gmail.com");
      toast.dismissAll();
      toast.success("Success copied!");
    }, 500);
  };

  const handlePointerUp = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="h-dvh fixed top-0 right-0 left-0 bottom-0 z-999 bg-white px-4 pt-5"
    >
      <header className="flex items-center justify-between">
        <button onClick={() => setIsInformationActive(false)}>
          <ArrowLeft className="text-neutral-900" />
        </button>
        <button className="text-neutral-900 rounded-full active:bg-neutral-50 p-2 transition-colors duration-200">
          <Phone />
        </button>
      </header>
      <div className="w-full flex flex-col items-center mt-4">
        {informationsUser && informationsUser.image_url ? (
          <Image
            src={informationsUser.image_url}
            alt="Profile user"
            width={150}
            height={150}
            className="rounded-full aspect-square object-cover"
          />
        ) : (
          <div className="flex items-center w-38 h-38 justify-center px-1 py-1 rounded-full bg-lightblue-200 aspect-square">
            <User2 className="text-white" size={120} />
          </div>
        )}
        <h5 className="text-[22px] text-neutral-900 font-semibold mt-2">
          {informationsUser ? informationsUser.username : "-"}
        </h5>
        <span
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onPointerDown={handlePointerDown}
          className="text-lg text-neutral-900 select-none"
        >
          {informationsUser ? informationsUser.email : "-"}
        </span>
      </div>
      <Separator className="my-4" />
      <div className="h-full w-full overflow-y-auto text-neutral-900 flex flex-col gap-y-2">
        <Link
          href={"/chats/media"}
          className="w-full flex items-center justify-between px-2 py-1.5 active:bg-neutral-50/50 rounded-lg transition-colors duration-200"
        >
          <div className="gap-x-2 flex items-center">
            <ImageIcon />
            <span className="text-[16px] font-semibold">
              Media, Links, & Documents
            </span>
          </div>
          <div className="flex items-center gap-x-4">
            <span className="text-[16px] font-semibold">152</span>
            <ChevronRight />
          </div>
        </Link>
        <button className="w-full flex items-center justify-between px-2 py-1.5 active:bg-red-50/50 rounded-lg transition-colors duration-200">
          <div className="gap-x-2 flex items-center text-red-500">
            <CircleAlert />
            <span className="text-[16px] font-semibold">Report</span>
          </div>
        </button>
        <button className="w-full flex items-center justify-between px-2 py-1.5 active:bg-red-50/50 rounded-lg transition-colors duration-200">
          <div className="gap-x-2 flex items-center text-red-500">
            <Ban />
            <span className="text-[16px] font-semibold">Block</span>
          </div>
        </button>
      </div>
    </motion.div>
  );
}
