import clsx from "clsx";
import { Search } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

type SearchBarProps = {
  openSearch: boolean;
  setOpenSearch: Dispatch<SetStateAction<boolean>>;
  className?: string;
};

export default function SearchBar(props: SearchBarProps) {
  const { setOpenSearch, openSearch, className } = props;
  return (
    <>
      <input
        type="search"
        className={clsx(
          "bg-white rounded-xl px-4 py-2 text-sm absolute top-1/2 -translate-y-1/2 right-full transition-all duration-300 ease-in-out me-2",
          openSearch
            ? "w-40 translate-x-0"
            : "w-0 opacity-0 pointer-events-none"
        )}
      />
      <button
        type="button"
        onClick={() => {
          console.log("cihuy");
          setOpenSearch(true);
        }}
      >
        <Search className={clsx("text-white", className)} />
      </button>
    </>
  );
}
