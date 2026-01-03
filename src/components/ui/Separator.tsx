import clsx from "clsx";

export default function Separator(
  props: React.HtmlHTMLAttributes<HTMLDivElement>
) {
  return (
    <div
      {...props}
      className={clsx(
        "w-full h-px rounded-md bg-neutral-100/50",
        props.className
      )}
    />
  );
}
