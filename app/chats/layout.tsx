import HeaderMedia from "@/src/components/pages/chats/HeaderMedia";
import NavbarTabMedia from "@/src/components/pages/chats/NavbarTabMedia";

export default function LayoutChat({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <HeaderMedia />
      <NavbarTabMedia />
      {children}
    </main>
  );
}
