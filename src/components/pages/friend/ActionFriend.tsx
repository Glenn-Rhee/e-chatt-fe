"use client";
import { DataFindFriend, FriendStatus, ResponsePayload } from "@/src/types";
import { Clock, Loader2, UserMinus, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { baseUrl } from "../profile/EditProfile";
import { useSession } from "next-auth/react";
import ResponseError from "@/src/error/ResponseError";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { connectSocket } from "@/src/lib/socket";

interface ActionFriendProps {
  data: DataFindFriend;
}

export default function ActionFriend(props: ActionFriendProps) {
  const { data } = props;
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [dataFinded, setDataFinded] = useState<DataFindFriend>(data);
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
      if (dataFinded.isFriend) {
        setDataFinded((prev) => ({
          ...prev,
          isPending: false,
          isFriend: false,
        }));
      } else {
        setDataFinded((prev) => ({
          ...prev,
          isPending: true,
          isFriend: false,
        }));
      }
      toast.success(dataRes.message);
      router.refresh();
    } catch (error) {
      if (error instanceof ResponseError) {
        toast.error(error.message);
      } else {
        toast.error("Error cuy");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!session?.user.token) return;

    const socket = connectSocket(session.user.token);
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("friend:request:resolved", (payload) => {
      const updatedStatus = payload.data.status as FriendStatus;
      if (updatedStatus === "ACCEPTED") {
        setDataFinded((prev) => ({
          ...prev,
          isFriend: true,
          isPending: false,
        }));
      } else {
        setDataFinded((prev) => ({
          ...prev,
          isFriend: false,
          isPending: false,
        }));
      }
    });
  }, [session?.user.token]);

  return (
    <button disabled={loading} onClick={handleActionFriend}>
      {loading ? (
        <Loader2 className="animate-spin text-lightblue-500" size={19} />
      ) : dataFinded.isFriend ? (
        <UserMinus className="text-red-500" />
      ) : dataFinded.isPending ? (
        <Clock className="text-yellow-500" />
      ) : (
        <UserPlus className="text-lightblue-500" />
      )}
    </button>
  );
}
