"use client";
import { useState } from "react";
import Button from "../../Button";
import BottomSheet from "../../ui/BottomSheet";
import { Search } from "lucide-react";
import ResponseError from "@/src/error/ResponseError";
import toast from "react-hot-toast";
import { baseUrl } from "../profile/EditProfile";
import { useSession } from "next-auth/react";
import { FriendshipUser, ResponsePayload } from "@/src/types";
import { useChatStore } from "@/src/store/useChattActive";
import { AnimatePresence } from "framer-motion";
import ChatConvo from "../../ChattConvo";
import UserInformation from "./UserInformation";
import FriendItem from "./FriendItem";

export default function EmptConversations() {
  const [openSheet, setOpenSheet] = useState(false);
  const { idChatt, isInformationActive } = useChatStore();
  const { data: session } = useSession();
  const [friends, setFriends] = useState<FriendshipUser[] | null>(null);

  async function handleButtonStart() {
    try {
      const res = await fetch(baseUrl + "/friendship", {
        headers: {
          Authorization: session?.user.token || "",
        },
      });

      const dataRes = (await res.json()) as ResponsePayload<FriendshipUser[]>;
      if (dataRes.status === "failed") {
        throw new ResponseError(dataRes.code, dataRes.message);
      }

      setFriends(dataRes.data);

      setOpenSheet(true);
    } catch (error) {
      if (error instanceof ResponseError) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong.");
      }
    }
  }

  return (
    <div className="w-ful flex items-center justify-center h-[80dvh] flex-col gap-y-2">
      <span className="text-neutral-700 font-medium text-lg">
        No conversations yet.
      </span>
      <Button onClick={handleButtonStart}>Start conversations</Button>
      <BottomSheet
        isOpen={openSheet}
        onClose={() => setOpenSheet(false)}
        className="pb-2"
      >
        <h2 className="text-center text-neutral-800 font-medium mb-4 text-lg">
          Start chatt with your friends
        </h2>
        <div className="flex items-center gap-x-2 border rounded-md p-2 border-neutral-300">
          <Search className="text-neutral-300" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent border-none focus:outline-none placeholder:text-sm text-sm text-neutral-400 placeholder:text-neutral-300"
          />
        </div>
        <div className="flex flex-col gap-y-4 w-full mt-5">
          {friends ? (
            friends.map((friend) => (
              <FriendItem
                setOpenSheet={() => setOpenSheet(false)}
                friend={friend}
                key={friend.friendshipId}
              />
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </BottomSheet>
      <AnimatePresence initial={false}>
        {idChatt && <ChatConvo />}
      </AnimatePresence>
      <AnimatePresence initial={false}>
        {isInformationActive && <UserInformation />}
      </AnimatePresence>
    </div>
  );
}
