"use client";
import { AnimatePresence } from "framer-motion";
import ChatConvo from "../../ChattConvo";
import UserInformation from "./UserInformation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useChatStore } from "@/src/store/useChattActive";
import { ResponsePayload } from "@/src/types";
import ResponseError from "@/src/error/ResponseError";
import Image from "next/image";
import toast from "react-hot-toast";
const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function ChattItem() {
  const { setIdChatt, idChatt, isInformationActive } = useChatStore();
  const { data: session } = useSession();
  const [chatts, setChatts] = useState([]);

  useEffect(() => {
    if (!baseUrl || !session?.user.token) return;
    const fetchConv = async () => {
      try {
        const res = await fetch(`${baseUrl}/chatts`, {
          headers: {
            Authorization: session?.user.token || "",
          },
        });

        const data = (await res.json()) as ResponsePayload<[]>;
        if (data.status === "failed") {
          throw new ResponseError(data.code, data.message);
        }

        setChatts([]);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch conversations.");
      }
    };

    fetchConv();
  }, [session]);
  return (
    <>
      <button
        onClick={() => setIdChatt("123")}
        className="flex items-center justify-between active:bg-neutral-100/40 rounded-lg p-2"
      >
        <div className="flex items-center gap-x-2">
          <Image
            src={"/prof.jpg"}
            alt="Profile User"
            width={40}
            height={40}
            className="aspect-square rounded-full"
          />
          <div className="flex flex-col">
            <h6 className="text-neutral-900 font-bold text-sm text-start">
              David Wayne
            </h6>
            <span className="text-xs block font-semibold text-neutral-300">
              Thank you so much!
            </span>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-medium text-neutral-500">10:25</span>
          <span className="text-lightblue-500 text-sm font-semibold rounded-md flex items-center justify-center">
            5
          </span>
        </div>
      </button>
      <AnimatePresence initial={false}>
        {idChatt && <ChatConvo />}
      </AnimatePresence>
      <AnimatePresence initial={false}>
        {isInformationActive && <UserInformation />}
      </AnimatePresence>
    </>
  );
}
