"use client";
import { DataFindFriend } from "@/src/types";
import { Clock, UserMinus, UserPlus } from "lucide-react";

interface ActionFriendProps {
  data: DataFindFriend;
}

export default function ActionFriend(props: ActionFriendProps) {
  const { data } = props;

  return (
    <button className="">
      {data.isFriend ? (
        <UserMinus className="text-red-500" />
      ) : data.isPending ? (
        <Clock className="text-yellow-500" />
      ) : (
        <UserPlus className="text-lightblue-500" />
      )}
    </button>
  );
}
