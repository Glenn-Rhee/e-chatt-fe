"use client";
import { AnimatePresence } from "framer-motion";
import ChatConvo from "../../ChattConvo";
import UserInformation from "./UserInformation";
import { useChatStore } from "@/src/store/useChattActive";
import Image from "next/image";
import { DataConversation } from "@/src/types";
import { User2 } from "lucide-react";
import { getFormatTime } from "@/src/helper/getFormatDate";

interface ChattItemProps {
  dataConv: DataConversation;
}

export default function ChattItem(props: ChattItemProps) {
  const { dataConv } = props;
  const { setIdChatt, idChatt, isInformationActive } = useChatStore();
  const lastMessageTime = getFormatTime(new Date(dataConv.message.createdAt));
  return (
    <>
      <button
        onClick={() => setIdChatt("123")}
        className="flex items-center justify-between active:bg-neutral-100/40 rounded-lg p-2"
      >
        <div className="flex items-center gap-x-2">
          {dataConv.userFrom.userDetail?.image_url ? (
            <Image
              src={dataConv.userFrom.userDetail.image_url}
              alt={"Profile User " + dataConv.userFrom.username}
              width={40}
              height={40}
              className="aspect-square rounded-full object-cover"
            />
          ) : (
            <div className="flex items-center w-10 h-10 justify-center px-1 py-1 rounded-full bg-lightblue-200">
              <User2 className="text-white" size={25} />
            </div>
          )}
          <div className="flex flex-col">
            <h6 className="text-neutral-900 font-bold text-sm text-start">
              {dataConv.userFrom.username}
            </h6>
            <span className="text-xs block font-semibold text-neutral-300 text-start">
              {dataConv.message.content}
            </span>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-medium text-neutral-500">
            {lastMessageTime}
          </span>
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
