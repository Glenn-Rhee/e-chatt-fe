"use client";
import { useChatStore } from "@/src/store/useChattActive";
import { ArrowLeft, Phone } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import toast from "react-hot-toast";

export default function UserInformation() {
  const { setIsInformationActive } = useChatStore();
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
        <Image
          src={"/prof.jpg"}
          alt="Profile user"
          width={150}
          height={150}
          className="rounded-full aspect-square object-cover"
        />
        <h5 className="text-[22px] text-neutral-900 font-semibold mt-2">
          David Wayne
        </h5>
        <span
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onPointerDown={handlePointerDown}
          className="text-lg text-neutral-900 select-none"
        >
          davidwayne@gmail.com
        </span>
      </div>
    </motion.div>
  );
}
