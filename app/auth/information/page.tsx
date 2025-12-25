"use client";
import clsx from "clsx";
import { ArrowRight, Pencil, User2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function AuthInformation() {
  const [isFocus, setIsFocuse] = useState(false);
  const [value, setValue] = useState("");
  const isProfile = true;
  return (
    <main className="h-dvh w-full px-6 py-4">
      <div className="bg-lightblue-500 -z-10 w-400 h-400 aspect-square fixed -top-320 right-[50%] translate-x-1/2 rounded-full"></div>
      <div className="w-full flex justify-end">
        <button className="text-white text-xl font-bold">Skip</button>
      </div>
      <div className="relative mx-auto w-fit rounded-full mt-15">
        {isProfile ? (
          <Image
            src={"/prof.jpg"}
            alt="Profile User"
            width={200}
            height={200}
            className="object-cover rounded-full"
          />
        ) : (
          <div className="flex items-center w-50 h-50 justify-center px-1 py-1 rounded-full bg-lightblue-200">
            <User2 className="text-white" size={120} />
          </div>
        )}
        <button className="bg-blue-500 absolute top-6 right-2 flex items-center text-white justify-center rounded-full w-8 h-8">
          <Pencil size={15} />
        </button>
      </div>

      <form>
        <div
          className={clsx(
            "flex mt-20 w-full border-b-3 pb-1 items-center gap-x-2",
            isFocus ? "border-lightblue-500" : "border-neutral-900"
          )}
        >
          <User2 size={30} />
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            onFocus={() => setIsFocuse(true)}
            onBlur={() => setIsFocuse(false)}
            placeholder="Your name"
            className="w-full text-sm placeholder:text-sm px-1 focus:border-none focus:outline-none bg-transparent"
          />
        </div>
        <div className="flex justify-end mt-4">
          <button
            disabled={value === ""}
            type="submit"
            className={clsx(
              "rounded-full text-white flex items-center justify-center px-1 py-1 w-12 h-12 bg-lightblue-500",
              value === "" && "opacity-50"
            )}
          >
            <ArrowRight size={28} />
          </button>
        </div>
      </form>
    </main>
  );
}
