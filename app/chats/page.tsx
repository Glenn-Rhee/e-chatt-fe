import Image from "next/image";
import Link from "next/link";

export default function ChatsPage() {
  return (
    <main className="px-4 pt-3 mb-8 flex flex-col gap-y-3 overflow-y-scroll h-full">
      {Array.from({ length: 10 }).map((_, index) => (
        <Link
          key={index}
          href={"/chats/1"}
          className="flex items-center justify-between active:bg-neutral-100/40 rounded-lg p-2"
        >
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
                David Wayne
              </h6>
              <span className="text-xs font-semibold text-neutral-300">
                Thank you so much!
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-neutral-500">10:25</span>
            <span className="text-lightblue-500 text-sm font-semibold rounded-md flex items-center justify-center">
              5
            </span>
          </div>
        </Link>
      ))}
    </main>
  );
}
