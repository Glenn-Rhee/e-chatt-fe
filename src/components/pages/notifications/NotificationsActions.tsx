"use client";
import clsx from "clsx";
import { Check, X } from "lucide-react";
import { useState } from "react";
import { baseUrl } from "../profile/EditProfile";
import { useSession } from "next-auth/react";
import { ResponsePayload } from "@/src/types";
import ResponseError from "@/src/error/ResponseError";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface NotificationsActionsProps {
  requesterId: string;
}

export default function NotificationsActions(props: NotificationsActionsProps) {
  const { requesterId } = props;
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleAction = async (accept: boolean) => {
    setLoading(true);
    try {
      const res = await fetch(baseUrl + "/friend/actions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: session?.user.token || "",
        },

        body: JSON.stringify({
          userIdTarget: requesterId,
          accept,
        }),
      });

      const dataRes = (await res.json()) as ResponsePayload;
      if (dataRes.status === "failed") {
        throw new ResponseError(dataRes.code, dataRes.message);
      }
      router.refresh();
    } catch (error) {
      if (error instanceof ResponseError) {
        toast.error(error.message);
      } else {
        toast.error("An error occured! Please try again later!");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center gap-x-2">
      <button
        onClick={() => handleAction(false)}
        disabled={loading}
        className={clsx(
          "bg-red-500 flex items-center justify-center p-0.5 rounded-full text-white active:scale-95 transition-all duration-200",
          loading && "opacity-50",
        )}
      >
        <X size={17} />
      </button>
      <button
        onClick={() => handleAction(true)}
        disabled={loading}
        className={clsx(
          "bg-lightblue-500 flex items-center justify-center p-0.5 rounded-full text-white active:scale-95 transition-all duration-200",
          loading && "opacity-50",
        )}
      >
        <Check size={17} />
      </button>
    </div>
  );
}
