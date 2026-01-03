"use client";
import clsx from "clsx";
import { Camera, File, Images, Plus, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Dialog from "../../ui/Dialog";

export default function FooterChat() {
  const [openMenu, setOpenMenu] = useState(false);
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const handleInput = () => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
    window.visualViewport?.dispatchEvent(new Event("resize"));
  };

  useEffect(() => {
    const viewport = window.visualViewport;
    if (!viewport) return;

    const handleResize = () => {
      const offset = window.innerHeight - viewport.height;
      setKeyboardOffset(offset > 0 ? offset : 0);
    };

    viewport.addEventListener("resize", handleResize);

    return () => {
      viewport.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <footer
      ref={footerRef}
      className={clsx(
        "fixed bottom-0 right-0 left-0 flex items-center gap-x-5 px-6 py-5 bg-white z-50",
        `translate-y-[${keyboardOffset}px]`
      )}
    >
      <button onClick={() => setOpenMenu(true)} className="text-lightblue-500">
        <Plus />
      </button>
      <Dialog
        isOpen={openMenu}
        onClose={() => setOpenMenu(false)}
        className="bottom-20 left-5 p-4"
      >
        <div className="flex items-center gap-x-5">
          <button className="flex items-center justify-center p-2 rounded-full bg-lightblue-500 text-white">
            <Camera />
          </button>
          <button className="flex items-center justify-center p-2 rounded-full bg-lightblue-500 text-white">
            <Images />
          </button>
          <button className="flex items-center justify-center p-2 rounded-full bg-lightblue-500 text-white">
            <File />
          </button>
        </div>
      </Dialog>
      <textarea
        rows={1}
        ref={textareaRef}
        onInput={handleInput}
        onFocus={() =>
          window.visualViewport?.dispatchEvent(new Event("resize"))
        }
        className="w-full resize-none max-h-32 bg-transparent py-1 ps-2 text-sm focus:outline-none text-neutral-800"
        placeholder="Type a message..."
      />
      <button className="rounded-full bg-lightblue-500 flex items-center justify-center p-2 text-white">
        <Send />
      </button>
    </footer>
  );
}
