"use client";
import { DataConversation, ResponsePayload } from "@/src/types";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ResponseError from "../error/ResponseError";
import toast from "react-hot-toast";
import { baseUrl } from "../components/pages/profile/EditProfile";

export default function useGetConversations() {
  const [dataConv, setDataConv] = useState<DataConversation[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { data: session } = useSession();
  useEffect(() => {
    if (!session?.user.token) return;

    const getConv = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${baseUrl}/chatts`, {
          headers: {
            Authorization: session?.user.token || "",
          },
        });

        const data = (await res.json()) as ResponsePayload<DataConversation[]>;
        if (data.status === "failed") {
          throw new ResponseError(data.code, data.message);
        }
        setDataConv(data.data);
      } catch (error) {
        if (error instanceof ResponseError) {
          toast.error(error.message);
        } else {
          toast.error("Failed to fetch conversations.");
        }
        setDataConv(null);
      } finally {
        setIsLoading(false);
      }
    };

    getConv();
  }, [session?.user.token]);
  return {
    dataConv,
    isLoading,
  };
}
