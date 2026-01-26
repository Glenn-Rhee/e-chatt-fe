"use client";
import { Search } from "lucide-react";
import BottomSheet from "../../ui/BottomSheet";
import FriendItem from "../chats/FriendItem";
import { useChatStore } from "@/src/store/useChattActive";
import Button from "../../Button";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FriendshipUser, ResponsePayload } from "@/src/types";
import { baseUrl } from "../profile/EditProfile";
import ResponseError from "@/src/error/ResponseError";
import toast from "react-hot-toast";

interface NewChattSheetProps {
  children?: React.ReactNode;
  className?: string;
}

export default function NewChattSheet(props: NewChattSheetProps) {
  const { children, className } = props;
  const { openSheetFriend, setOpenSheetFriend } = useChatStore();
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

      setOpenSheetFriend(true);
    } catch (error) {
      if (error instanceof ResponseError) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong.");
      }
    }
  }

  return (
    <>
      {children ? (
        <button type="button" className={className} onClick={handleButtonStart}>
          {children}
        </button>
      ) : (
        <Button onClick={handleButtonStart}>Start conversations</Button>
      )}
      <BottomSheet
        isOpen={openSheetFriend}
        onClose={() => setOpenSheetFriend(false)}
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
                setOpenSheet={() => setOpenSheetFriend(false)}
                friend={friend}
                key={friend.friendshipId}
              />
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </BottomSheet>
    </>
  );
}
