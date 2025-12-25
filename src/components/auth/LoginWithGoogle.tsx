import Image from "next/image";

export default function LoginWithGoogle() {
  return (
    <>
      <span className="text-white text-2xl font-semibold mt-10 block">
        Use authentication to access your account
      </span>
      <button className="px-3 flex items-center justify-center gap-x-2 py-4 border border-gray-300/60 w-full mt-60 rounded-md">
        <Image
          src={"/google-icon.png"}
          alt="Google Icon"
          width={30}
          height={30}
        />
        <span className="text-blue-900 font-medium">Continue With Google</span>
      </button>
    </>
  );
}
