"use client";
import { useChatStore } from "@/src/store/useChattActive";
import Image from "next/image";
import { Conversation, DataConversation, ResponsePayload } from "@/src/types";
import { Check, CheckCheck, User2 } from "lucide-react";
import { getFormatTime } from "@/src/helper/getFormatDate";
import { baseUrl } from "../profile/EditProfile";
import ResponseError from "@/src/error/ResponseError";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import EmptConversations from "./EmptConversations";

interface ChattItemProps {
  dataConv: DataConversation;
}

export async function getMessageUser(
  token: string | null,
  userIdTarget: string,
  query?: string,
) {
  const res = await fetch(
    baseUrl + "/message?userIdTarget=" + userIdTarget + `&${query}`,
    {
      headers: {
        Authorization: token || "",
      },
    },
  );

  const dataRes = (await res.json()) as ResponsePayload<Conversation>;
  return dataRes;
}

export default function ChattItem(props: ChattItemProps) {
  const { dataConv } = props;
  const { setInformationUser, setMessage } = useChatStore();
  const { data: session } = useSession();

  const handleOpenConv = async () => {
    try {
      const res = await getMessageUser(
        session?.user.token || null,
        dataConv.userFrom.id,
        "updateRead=true",
      );
      if (res.status === "failed") {
        throw new ResponseError(res.code, res.message);
      }
      setMessage(res.data.messages);
    } catch (error) {
      if (error instanceof ResponseError) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      setInformationUser({
        id: dataConv.userFrom.id,
        email: dataConv.userFrom.email,
        image_url: dataConv.userFrom.userDetail?.image_url || null,
        username: dataConv.userFrom.username,
      });
    }
  };

  return (
    <>
      {dataConv.message ? (
        <button
          onClick={handleOpenConv}
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
              <span className="text-xs font-semibold text-neutral-300 text-start flex items-center gap-x-1">
                {dataConv.message.senderId === session?.user.userId &&
                  (dataConv.message.isRead ? (
                    <CheckCheck size={13} />
                  ) : (
                    <Check size={13} />
                  ))}
                {dataConv.message.content}
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-neutral-500">
              {getFormatTime(new Date(dataConv.message.createdAt))}
            </span>
            {dataConv.message.senderId !== session?.user.userId && (
              <span className="text-lightblue-500 text-sm font-semibold rounded-md flex items-center justify-center">
                {dataConv.totalUnread > 0 ? dataConv.totalUnread : ""}
              </span>
            )}
          </div>
        </button>
      ) : (
        <EmptConversations />
      )}
    </>
  );
}
