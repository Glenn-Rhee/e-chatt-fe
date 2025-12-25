import Image from "next/image";

export default function LoadingDone() {
  return (
    <main className="h-dvh w-dvw flex flex-col justify-between items-center py-8">
      <div className="flex items-center justify-center w-full gap-x-3">
        <Image src={"/logo.png"} alt="Logo E-Chatt" width={60} height={100} />
        <h1 className="text-blue-700 font-bold italic text-4xl">E-Chatt</h1>
      </div>
      <div className="relative w-full h-64">
        <Image
          src={"/chatt-round.png"}
          alt="Chatt Round"
          fill
          className="absolute top-0 right-0 left-0 bottom-0 m-auto w-[20rem] h-80 object-contain"
        />
        <div className="absolute top-0 right-0 left-0 bottom-0 m-auto text-blue-500 font-semibold text-xl flex flex-col gap-y-2  items-center justify-center">
          <span>Stay Connected</span>
          <span>Stay Chatting</span>
        </div>
      </div>
      <span className="text-sm text-blue-500 font-medium">Version 1.0</span>
    </main>
  );
}
