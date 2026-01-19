"use client";
import { useEffect, useState } from "react";
import { DataNotifications, ResponsePayload } from "../types";
import { useSession } from "next-auth/react";
import { baseUrl } from "../components/pages/profile/EditProfile";
import ResponseError from "../error/ResponseError";
import toast from "react-hot-toast";

export default function useGetNotifications() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [dataNotif, setDataNotif] = useState<DataNotifications[] | null>(null);

  useEffect(() => {
    const token = session?.user.token;
    if (token) {
      const fetchDataNotif = async () => {
        setLoading(true);
        try {
          const res = await fetch(baseUrl + "/friend/actions", {
            headers: {
              Authorization: token,
            },
          });

          const dataRes = (await res.json()) as ResponsePayload<
            DataNotifications[]
          >;
          if (dataRes.status === "failed") {
            throw new ResponseError(dataRes.code, dataRes.message);
          }

          setDataNotif(dataRes.data);
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
      fetchDataNotif();
    }
  }, [session]);

  return { loading, dataNotif };
}
