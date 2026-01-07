import Image from "next/image";

export default function LoaderUI() {
  return (
    <div className="flex w-dvw h-dvh bg-white items-center justify-center">
      <Image
        src={"/logo.png"}
        alt="Logo E-Chatt"
        width={200}
        height={200}
        className="animate-pulse"
      />
    </div>
  );
}
