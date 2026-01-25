"use client";
import ResponseError from "@/src/error/ResponseError";
import { useChatStore } from "@/src/store/useChattActive";
import { FriendshipUser, ResponsePayload } from "@/src/types";
import { User2 } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import { baseUrl } from "../profile/EditProfile";
import { useSession } from "next-auth/react";

interface FriendItemProps {
  friend: FriendshipUser;
  setOpenSheet: () => void;
}
export default function FriendItem(props: FriendItemProps) {
  const { friend, setOpenSheet } = props;
  const { setIdChatt, setInformationUser } = useChatStore();
  const { data: session } = useSession();
  const handleConversation = async () => {
    try {
      const res = await fetch(baseUrl + "/conversation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: session?.user.token || "",
        },
        body: JSON.stringify({
          idUserTarget: friend.friend.id,
        }),
      });

      const dataRes = (await res.json()) as ResponsePayload;
      if (dataRes.status === "failed") {
        throw new ResponseError(dataRes.code, dataRes.message);
      }

      setOpenSheet();
      setIdChatt(friend.friendshipId);
      setInformationUser({
        username: friend.friend.username,
        email: friend.friend.email,
        image_url: friend.friend.userDetail?.image_url || null,
        id: friend.friend.id,
      });
    } catch (error) {
      if (error instanceof ResponseError) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong.");
      }
    }
  };

  return (
    <button
      key={friend.friendshipId}
      onClick={handleConversation}
      className="flex items-center gap-x-2 text-start px-2 py-1.5 active:bg-neutral-50 rounded-md transition-colors duration-100 focus:outline-none"
    >
      {friend.friend.userDetail?.image_url ? (
        <Image
          src={friend.friend.userDetail.image_url}
          alt="Profile User"
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
        <h6 className="text-neutral-900 font-bold text-sm">
          {friend.friend.username}
        </h6>
        <span className="text-xs font-semibold text-neutral-300">
          {friend.friend.email}
        </span>
      </div>
    </button>
  );
}
