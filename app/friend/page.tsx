"use client";
import CardSearch from "@/src/components/Icon/CardSearch";
import ShellHeader from "@/src/components/ShellHeader";
import { dataDummy } from "@/src/utils/dataDummy";
import { ArrowLeft, UserPlus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddFriend() {
  const [username, setUsername] = useState("");
  const router = useRouter();
  const [dataFinded, setDataFinded] = useState<
    {
      username: string;
      email: string;
    }[]
  >([]);

  const findUser = () => {
    if (username === "") {
      setDataFinded([]);
      return;
    }
    const userData = dataDummy.filter((d) =>
      d.username.toLowerCase().includes(username.trim().toLowerCase())
    );

    setDataFinded(userData);
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
          onKeyUp={(e) => e.key === "Enter" && findUser()}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
          className="w-full p-2 text-sm placeholder:text-neutral-300 focus:outline-lightblue-500 text-neutral-400 border border-neutral-300 rounded-md"
        />
        {dataFinded.length === 0 ? (
          <CardSearch className="mx-auto mt-12" />
        ) : (
          dataFinded.map((data) => (
            <div key={data.email} className="flex flex-col gap-y-3 mt-2">
              <div className="flex items-center justify-between active:bg-neutral-100/40 rounded-lg p-2">
                <div className="flex items-center gap-x-2">
                  <Image
                    src={"/prof.jpg"}
                    alt="Profile User"
                    width={40}
                    height={40}
                    className="aspect-square rounded-full"
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
                <button className="text-lightblue-500">
                  <UserPlus />
                </button>
              </div>
            </div>
          ))
        )}
      </main>
    </>
  );
}
