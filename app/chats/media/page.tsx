"use client";

import Image from "next/image";

export default function ChatMediaPage() {
  return (
    <div className="flex flex-col gap-y-5 px-5 mt-4">
      <div className="flex flex-col gap-y-1">
        <h6 className="text-neutral-500 text-sm font-semibold">Today</h6>
        <div className="grid grid-cols-4 gap-2">
          <Image
            src={"/prof.jpg"}
            alt="Image media"
            width={70}
            height={70}
            className="rounded-md aspect-square object-cover active:rounded-none transition-all duration-100"
          />
          <Image
            src={"/prof.jpg"}
            alt="Image media"
            width={70}
            height={70}
            className="rounded-md aspect-square object-cover active:rounded-none transition-all duration-100"
          />
          <Image
            src={"/prof.jpg"}
            alt="Image media"
            width={70}
            height={70}
            className="rounded-md aspect-square object-cover active:rounded-none transition-all duration-100"
          />
          <Image
            src={"/prof.jpg"}
            alt="Image media"
            width={70}
            height={70}
            className="rounded-md aspect-square object-cover active:rounded-none transition-all duration-100"
          />
        </div>
      </div>
      <div className="flex flex-col gap-y-1">
        <h6 className="text-neutral-500 text-sm font-semibold">Yesterday</h6>
        <div className="grid grid-cols-4 gap-2">
          <Image
            src={"/prof.jpg"}
            alt="Image media"
            width={70}
            height={70}
            className="rounded-md aspect-square object-cover active:rounded-none transition-all duration-100"
          />
          <Image
            src={"/prof.jpg"}
            alt="Image media"
            width={70}
            height={70}
            className="rounded-md aspect-square object-cover active:rounded-none transition-all duration-100"
          />
          <Image
            src={"/prof.jpg"}
            alt="Image media"
            width={70}
            height={70}
            className="rounded-md aspect-square object-cover active:rounded-none transition-all duration-100"
          />
          <Image
            src={"/prof.jpg"}
            alt="Image media"
            width={70}
            height={70}
            className="rounded-md aspect-square object-cover active:rounded-none transition-all duration-100"
          />
          <Image
            src={"/prof.jpg"}
            alt="Image media"
            width={70}
            height={70}
            className="rounded-md aspect-square object-cover active:rounded-none transition-all duration-100"
          />
        </div>
      </div>
    </div>
  );
}
