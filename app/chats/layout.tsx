import HeaderMedia from "@/src/components/pages/chats/HeaderMedia";
import NavbarTabMedia from "@/src/components/pages/chats/NavbarTabMedia";

export default function LayoutChat({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-dvh bg-white px-4 pt-5">
      <HeaderMedia />
      <NavbarTabMedia />
      {children}
    </main>
  );
}
