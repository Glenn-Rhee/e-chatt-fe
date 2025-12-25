import clsx from "clsx";

export default function Button({
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={clsx(
        "bg-linear-to-r from-lightblue-500 to-lightblue-600 text-white px-4 py-2 rounded-xl font-semibold active:bg-lightblue-700 transition-colors",
        props.className,
        props.disabled && "opacity-50 cursor-not-allowed"
      )}
    ></button>
  );
}
