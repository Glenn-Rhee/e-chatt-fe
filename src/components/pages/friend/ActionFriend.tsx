"use client";
import { DataFindFriend, ResponsePayload } from "@/src/types";
import { Clock, Loader2, UserMinus, UserPlus } from "lucide-react";
import { useState } from "react";
import { baseUrl } from "../profile/EditProfile";
import { useSession } from "next-auth/react";
import ResponseError from "@/src/error/ResponseError";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface ActionFriendProps {
  data: DataFindFriend;
}

export default function ActionFriend(props: ActionFriendProps) {
  const { data } = props;
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleActionFriend = async () => {
    setLoading(true);
    toast.removeAll();
    try {
      const res = await fetch(baseUrl + "/friend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: session?.user.token as string,
        },
        body: JSON.stringify({ receiverId: data.id }),
      });

      const dataRes = (await res.json()) as ResponsePayload<null>;
      if (dataRes.status === "failed") {
        throw new ResponseError(dataRes.code, dataRes.message);
      }

      toast.success(dataRes.message);
      router.refresh();
    } catch (error) {
      console.log(error, "cuy");
      if (error instanceof ResponseError) {
        toast.error(error.message);
      } else {
        toast.error("Error cuy");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button disabled={loading} onClick={handleActionFriend}>
      {loading ? (
        <Loader2 className="animate-spin text-lightblue-500" size={19} />
      ) : data.isFriend ? (
        <UserMinus className="text-red-500" />
      ) : data.isPending ? (
        <Clock className="text-yellow-500" />
      ) : (
        <UserPlus className="text-lightblue-500" />
      )}
    </button>
  );
}
