"use client";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  return (
    <button
      onClick={async () => {
        await signOut({ redirect: false });
        router.push("/auth");
      }}
      className="bg-red-50 flex items-center text-red-400 justify-center py-3 px-4 gap-x-2 rounded-xl"
    >
      <LogOut size={14} /> <span>Logout</span>
    </button>
  );
}
