import { Pencil } from "lucide-react";
import Image from "next/image";

export default function ProfilePage() {
  return (
    <div className="px-4 pt-3">
      <div className="flex flex-col items-center w-full gap-y-4">
        <div className="relative rounded-full">
          <Image
            src={"/prof.jpg"}
            alt="Profile Image"
            width={130}
            height={130}
            className="rounded-full aspect-square object-cover"
          />
          <button className="flex items-center justify-center p-1 bg-lightblue-500 text-white rounded-full absolute top-1 right-1">
            <Pencil size={18} />
          </button>
        </div>
        <h5 className="text-neutral-900 font-semibold text-xl">John Lennon</h5>
      </div>
      <div className="flex flex-col gap-y-1 mt-4">
        <label className="text-neutral-500 text-lg font-medium">
          Gender: <span className="text-lg text-neutral-900">Male</span>
        </label>
        <label className="text-neutral-500 text-lg font-medium">
          Birthday: <span className="text-lg text-neutral-900">12/01/1989</span>
        </label>
        <label className="text-neutral-500 text-lg font-medium">
          Email:{" "}
          <span className="text-lg text-neutral-900">
            john.lennon@gmail.com
          </span>
        </label>
      </div>
    </div>
  );
}
