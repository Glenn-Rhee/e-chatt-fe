"use client";
import Button from "@/src/components/Button";
import ShellHeader from "@/src/components/ShellHeader";
import BottomSheet from "@/src/components/ui/BottomSheet";
import { dataDummy } from "@/src/utils/dataDummy";
import { ArrowLeft, Plus, Search, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateGroupPage() {
  const router = useRouter();
  const [openSheet, setOpenSheet] = useState(false);
  const [dataAdded, setDataAdded] = useState<
    {
      username: string;
      email: string;
    }[]
  >([]);
  const [usernames, setUsernames] = useState<string[]>([]);
  return (
    <>
      <ShellHeader className="relative flex justify-center">
        <button
          onClick={() => router.back()}
          type="button"
          className="absolute left-4 flex items-center justify-center rounded-full p-2 bg-white/10"
        >
          <ArrowLeft className="text-white" />
        </button>
        <h1 className="text-2xl text-white font-semibold">Create Group</h1>
      </ShellHeader>
      <main className="px-4 mt-5 space-y-2">
        <div className="flex flex-col gap-y-1">
          <label htmlFor="group-name" className="text-neutral-500 text-sm">
            Name Group
          </label>
          <input
            type="text"
            id="group-name"
            placeholder="Enter Name Group"
            className="bg-transparent border border-neutral-300/60 rounded-md p-2 focus:outline-lightblue-500 placeholder:text-neutral-300 text-sm placeholder:text-sm text-neutral-400"
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <span className="text-neutral-500 text-sm">Members</span>
          <button
            onClick={() => setOpenSheet(true)}
            className="w-full rounded-md px-2 py-3 bg-linear-to-br gap-x-3 text-lightblue-500 from-lightblue-100/90 to-lightblue-100/60 flex items-center justify-center"
          >
            <Plus />
            <span className="font-semibold">Add members to group</span>
          </button>
        </div>
        {dataAdded.length > 0 &&
          dataAdded.map((da) => (
            <div key={da.email} className="flex flex-col gap-y-3 mt-2">
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
                      {da.username}
                    </h6>
                    <span className="text-xs font-semibold text-neutral-300">
                      {da.email}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setDataAdded((prev) =>
                      prev.filter(
                        (p) =>
                          p.username.toLowerCase() !== da.username.toLowerCase()
                      )
                    );
                    setUsernames((prev) =>
                      prev.filter(
                        (p) => p.toLowerCase() !== da.username.toLowerCase()
                      )
                    );
                  }}
                >
                  <X className="text-red-500" />
                </button>
              </div>
            </div>
          ))}
      </main>
      <div className="fixed bottom-4 right-0 left-0 w-full px-4">
        <Button className="w-full rounded-full! text-lg py-3">
          Create Group
        </Button>
      </div>

      <BottomSheet
        isOpen={openSheet}
        onClose={() => setOpenSheet(false)}
        className="pb-12"
      >
        <h2 className="text-neutral-800 font-medium mb-4 text-center text-lg">
          Add members to group
        </h2>
        <div className="flex items-center gap-x-2 border rounded-md p-2 border-neutral-300">
          <Search className="text-neutral-300" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent border-none focus:outline-none placeholder:text-sm text-sm text-neutral-400 placeholder:text-neutral-300"
          />
        </div>
        {dataDummy.map((data) => (
          <label
            htmlFor={data.email}
            key={data.email}
            className="flex flex-col gap-y-3 mt-2"
          >
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
              <input
                id={data.email}
                type="checkbox"
                checked={usernames.some(
                  (username) =>
                    username.toLowerCase() === data.username.toLowerCase()
                )}
                onChange={(e) => {
                  if (e.target.checked) {
                    setUsernames((prev) => [...prev, data.username]);
                  } else {
                    setUsernames((prev) =>
                      prev.filter(
                        (p) => p.toLowerCase() !== data.username.toLowerCase()
                      )
                    );
                  }
                }}
                className="accent-lightblue-500"
              />
            </div>
          </label>
        ))}
        <div className="flex items-center gap-x-3 absolute bottom-4 right-0 left-0 px-4">
          <button
            onClick={() => {
              setUsernames([]);
              setOpenSheet(false);
            }}
            className="bg-lightblue-50 p-2 rounded-md! w-full text-lightblue-600 font-medium text-sm"
          >
            Cancel
          </button>
          <Button
            onClick={() => {
              const dataFiltered = dataDummy.filter((dm) =>
                usernames.some(
                  (username) =>
                    username.toLowerCase() === dm.username.toLowerCase()
                )
              );

              setDataAdded(dataFiltered);
              setOpenSheet(false);
            }}
            className="bg-lightblue-50 p-2 rounded-md! w-full text-white font-medium text-sm"
          >
            Add
          </Button>
        </div>
      </BottomSheet>
    </>
  );
}
