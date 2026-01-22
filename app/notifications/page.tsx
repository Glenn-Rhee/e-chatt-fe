"use client";
import NotificationsActions from "@/src/components/pages/notifications/NotificationsActions";
import ShellHeader from "@/src/components/ShellHeader";
import useGetNotifications from "@/src/hooks/useGetNotifications";
import { connectSocket } from "@/src/lib/socket";
import { DataNotifications } from "@/src/types";
import { ArrowLeft, Loader2, User } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NotificationsPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { loading, dataNotif, isError } = useGetNotifications();
  const [dataNotifUsers, setDataNotifUsers] = useState<DataNotifications[]>(
    dataNotif || [],
  );
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDataNotifUsers(dataNotif || []);
    if (!session?.user.token) return;

    const socket = connectSocket(session.user.token);

    socket.on("friend:request", (payload) => {
      setDataNotifUsers(payload.data);
    });

    socket.on("connect_error", (err) => {
      console.error("Socket connect error:", err.message);
    });

    return () => {
      socket.disconnect();
    };
  }, [session, dataNotif]);

  return (
    <div>
      <ShellHeader className="relative flex justify-center">
        <button
          type="button"
          onClick={() => router.back()}
          className="absolute left-4 flex items-center justify-center rounded-full p-2 bg-white/10"
        >
          <ArrowLeft className="text-white" />
        </button>
        <h1 className="text-2xl text-white font-semibold">Friends Request</h1>
      </ShellHeader>

      {loading ? (
        <div className="flex items-center justify-center h-[80dvh] w-full">
          <Loader2 size={25} className="text-lightblue-500 animate-spin" />
        </div>
      ) : dataNotifUsers ? (
        dataNotifUsers.length === 0 ? (
          <div className="flex items-center justify-center h-[80dvh] w-full">
            <span className="text-lightblue-500 font-medium text-xl">
              No request found
            </span>
          </div>
        ) : (
          <div className="flex flex-col gap-y-3 mt-2 p-2">
            {dataNotifUsers.map((notif) => (
              <div
                key={notif.id}
                className="flex items-center justify-between rounded-lg p-2"
              >
                <div className="flex items-center gap-x-2">
                  {notif.requester.userDetail &&
                  notif.requester.userDetail.image_url ? (
                    <Image
                      src={notif.requester.userDetail.image_url}
                      alt="Profile User"
                      width={40}
                      height={40}
                      className="aspect-square rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-11 h-11 bg-lightblue-50 text-lightblue-500 rounded-full flex items-center justify-center">
                      <User />
                    </div>
                  )}
                  <div className="flex flex-col">
                    <h6 className="text-neutral-900 font-bold text-sm">
                      {notif.requester.username}
                    </h6>
                    <span className="text-xs font-semibold text-neutral-300">
                      {notif.requester.email}
                    </span>
                  </div>
                </div>
                <NotificationsActions requesterId={notif.requester.id} />
              </div>
            ))}
          </div>
        )
      ) : (
        isError && (
          <div className="flex items-center justify-center h-[80dvh] w-full">
            <span className="text-red-500 font-medium text-xl">
              An error occurred
            </span>
          </div>
        )
      )}
    </div>
  );
}
