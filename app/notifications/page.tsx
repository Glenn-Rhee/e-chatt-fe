"use client";
import ShellHeader from "@/src/components/ShellHeader";
import { ArrowLeft, Check, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NotificationsPage() {
  const router = useRouter();
  return (
    <div>
      <ShellHeader className="relative flex justify-center">
        <button
          type="button"
          onClick={() => router.back()}
          className="absolute left-4 flex items-center justify-center rounded-full p-2 bg-white/10"
        >
          <ArrowLeft className="text-white" />
        </button>
        <h1 className="text-2xl text-white font-semibold">Friends Request</h1>
      </ShellHeader>
      <div className="flex flex-col gap-y-3 mt-2 p-2">
        <div className="flex items-center justify-between active:bg-neutral-100/40 rounded-lg p-2">
          <div className="flex items-center gap-x-2">
            <Image
              src={"/prof.jpg"}
              alt="Profile User"
              width={40}
              height={40}
              className="aspect-square rounded-full object-cover"
            />
            <div className="flex flex-col">
              <h6 className="text-neutral-900 font-bold text-sm">username</h6>
              <span className="text-xs font-semibold text-neutral-300">
                email
              </span>
            </div>
          </div>
          <div className="flex items-center gap-x-2">
            <button className="bg-red-500 flex items-center justify-center p-0.5 rounded-full text-white">
              <X size={17} />
            </button>
            <button className="bg-lightblue-500 flex items-center justify-center p-0.5 rounded-full text-white">
              <Check size={17} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
