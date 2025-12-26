"use client";
import Image from "next/image";
import Button from "./Button";
import { useState } from "react";
import clsx from "clsx";
import { introuduceData } from "../utils/introduce";
import { useRouter } from "next/navigation";

export default function Introduce() {
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();
  return (
    <main className="h-dvh w-dvw bg-lightblue-100">
      <div className="w-full space-y-12 py-20 bg-white h-120 rounded-br-[4rem] rounded-bl-[4rem]">
        <Image
          src={introuduceData[activeIndex].src}
          alt={"Introduct Image " + (activeIndex + 1)}
          width={290}
          height={140}
          className="mx-auto"
        />
        <div className="text-center mx-auto text-blue-500">
          <h2 className="font-bold text-xl">
            {introuduceData[activeIndex].title}
          </h2>
          <span className="block max-w-xs mx-auto mt-1">
            {introuduceData[activeIndex].desc}
          </span>
        </div>
      </div>
      <Button
        onClick={() => router.push("/auth")}
        type="button"
        disabled={activeIndex < 3}
        className="w-[20rem] mx-auto block mt-12 py-3"
      >
        Get Started
      </Button>
      <div className="mx-auto px-4 mt-12 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setActiveIndex(3)}
          className="text-lightblue-500 text-sm font-medium"
        >
          Skip
        </button>
        <div className="flex items-center justify-center gap-x-2">
          <div
            className={clsx(
              "rounded-full",
              activeIndex === 0
                ? "w-2 h-2 bg-lightblue-500 border-lightblue-300 border-2"
                : "w-1.5 h-1.5 bg-lightblue-200"
            )}
          />
          <div
            className={clsx(
              "rounded-full",
              activeIndex === 1
                ? "w-2 h-2 bg-lightblue-500 border-lightblue-300 border-2"
                : "w-1.5 h-1.5 bg-lightblue-200"
            )}
          />
          <div
            className={clsx(
              "rounded-full",
              activeIndex === 2
                ? "w-2 h-2 bg-lightblue-500 border-lightblue-300 border-2"
                : "w-1.5 h-1.5 bg-lightblue-200"
            )}
          />
          <div
            className={clsx(
              "rounded-full",
              activeIndex === 3
                ? "w-2 h-2 bg-lightblue-500 border-lightblue-300 border-2"
                : "w-1.5 h-1.5 bg-lightblue-200"
            )}
          />
        </div>
        <button
          disabled={activeIndex === 3}
          type="button"
          onClick={() => {
            if (activeIndex < 3) {
              setActiveIndex((prev) => prev + 1);
            }
          }}
          className={clsx(
            "px-2 py-2 font-semibold text-lightblue-900 bg-lightblue-200 rounded-full",
            activeIndex === 3 && "opacity-50"
          )}
        >
          Next
        </button>
      </div>
    </main>
  );
}
