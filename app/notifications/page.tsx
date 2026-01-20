"use client";
import NotificationsActions from "@/src/components/pages/notifications/NotificationsActions";
import ShellHeader from "@/src/components/ShellHeader";
import useGetNotifications from "@/src/hooks/useGetNotifications";
import { ArrowLeft, Loader2, User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NotificationsPage() {
  const { loading, dataNotif } = useGetNotifications();
  const router = useRouter();

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
      ) : dataNotif ? (
        dataNotif.length === 0 ? (
          <div className="flex items-center justify-center h-[80dvh] w-full">
            <span className="text-lightblue-500 font-medium text-xl">
              No request found
            </span>
          </div>
        ) : (
          <div className="flex flex-col gap-y-3 mt-2 p-2">
            {dataNotif.map((notif) => (
              <div
                key={notif.id}
                className="flex items-center justify-between active:bg-neutral-100/40 rounded-lg p-2"
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
        <div className="flex items-center justify-center h-[80dvh] w-full">
          <span className="text-red-500 font-medium text-xl">
            An error occurred
          </span>
        </div>
      )}
    </div>
  );
}
