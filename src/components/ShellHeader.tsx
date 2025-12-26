import clsx from "clsx";

export default function ShellHeader({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <header
      className={clsx(
        "w-full sticky top-0 right-0 left-0 px-6 pb-4 pt-8 bg-linear-to-br from-blue-500 via-blue-400 to-blue-200 flex items-center justify-between",
        className
      )}
    >
      {children}
    </header>
  );
}
