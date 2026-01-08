import Link from "next/link";

export default function NavbarTabMedia() {
  return (
    <nav className="w-full flex items-center justify-evenly gap-x-3 mt-3">
      <Link href={"/media"}>Media</Link>
    </nav>
  );
}
