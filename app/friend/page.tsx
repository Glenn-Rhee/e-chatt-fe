"use client";
import CardSearch from "@/src/components/Icon/CardSearch";
import ActionFriend from "@/src/components/pages/friend/ActionFriend";
import { baseUrl } from "@/src/components/pages/profile/EditProfile";
import ShellHeader from "@/src/components/ShellHeader";
import ResponseError from "@/src/error/ResponseError";
import { DataFindFriend, ResponsePayload } from "@/src/types";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AddFriend() {
  const [username, setUsername] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const [dataFinded, setDataFinded] = useState<DataFindFriend[] | null>(null);

  const findUser = async () => {
    setLoading(true);
    try {
      const res = await fetch(baseUrl + "/friend?username=" + username, {
        headers: {
          Authorization: session?.user.token as string,
        },
      });
      const dataRes = (await res.json()) as ResponsePayload<DataFindFriend[]>;
      if (dataRes.status === "failed") {
        throw new ResponseError(dataRes.code, dataRes.message);
      }
      setDataFinded(dataRes.data);
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
    <>
      <ShellHeader className="relative flex justify-center">
        <button
          type="button"
          onClick={() => router.back()}
          className="absolute left-4 flex items-center justify-center rounded-full p-2 bg-white/10"
        >
          <ArrowLeft className="text-white" />
        </button>
        <h1 className="text-2xl text-white font-semibold">Add Friend</h1>
      </ShellHeader>
      <main className="px-4 mt-5 space-y-2">
        <input
          value={username}
          onKeyUp={(e) =>
            e.key === "Enter" && username.trim() !== "" && findUser()
          }
          onChange={(e) => {
            setDataFinded(null);
            setUsername(e.target.value);
          }}
          placeholder="Enter username"
          type="search"
          className="w-full p-2 text-sm placeholder:text-neutral-300 focus:outline-lightblue-500 text-neutral-400 border border-neutral-300 rounded-md"
        />
        {dataFinded ? (
          dataFinded.length === 0 ? (
            <>
              <CardSearch className="mx-auto mt-12" />
              {username !== "" && !loading && (
                <h2 className="text-center text-lightblue-500 font-semibold text-lg">
                  No users found with username {username}
                </h2>
              )}
            </>
          ) : loading ? (
            <div className="w-full flex items-center justify-center h-[80dvh]">
              <Loader2 className="text-lightblue-500 animate-spin" />
            </div>
          ) : (
            dataFinded.map((data) => (
              <div key={data.id} className="flex flex-col gap-y-3 mt-2">
                <div className="flex items-center justify-between active:bg-neutral-100/40 rounded-lg p-2">
                  <div className="flex items-center gap-x-2">
                    <Image
                      src={data.userDetail.image_url}
                      alt="Profile User"
                      width={40}
                      height={40}
                      className="aspect-square rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <h6 className="text-neutral-900 font-bold text-sm">
                        {data.username}
                      </h6>
                      <span className="text-xs font-semibold text-neutral-300">
                        {data.email}
                      </span>
                    </div>
                  </div>
                  <ActionFriend data={data} />
                </div>
              </div>
            ))
          )
        ) : (
          <>
            <CardSearch className="mx-auto mt-12" />
          </>
        )}
      </main>
    </>
  );
}
