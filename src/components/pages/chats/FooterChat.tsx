"use client";
import clsx from "clsx";
import { Camera, File, Images, Plus, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Dialog from "../../ui/Dialog";
import { useChatStore } from "@/src/store/useChattActive";
import { useSession } from "next-auth/react";
import { ResponsePayload } from "@/src/types";
import ResponseError from "@/src/error/ResponseError";
import toast from "react-hot-toast";
import { baseUrl } from "../profile/EditProfile";

export default function FooterChat() {
  const [openMenu, setOpenMenu] = useState(false);
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const { isInformationActive, informationsUser } = useChatStore();
  const [value, setValue] = useState("");
  const { data: session } = useSession();
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

  const handleSendMessage = async () => {
    const msg = value.trim();
    if (msg === "") return;
    try {
      const res = await fetch(baseUrl + "/chatt", {
        method: "POST",
        headers: {
          Authorization: session?.user.token || "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          targetId: informationsUser?.id,
          message: msg,
        }),
      });

      const dataRes = (await res.json()) as ResponsePayload;
      if (dataRes.status === "failed") {
        throw new ResponseError(dataRes.code, dataRes.message);
      }
      console.log("Message sent successfully: ", dataRes);
      setValue("");
    } catch (error) {
      if (error instanceof ResponseError) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong.");
      }
    }
  };

  return (
    <footer
      ref={footerRef}
      className={clsx(
        "fixed bottom-0 right-0 left-0 flex items-center gap-x-5 px-6 py-5 bg-white",
        `translate-y-[${keyboardOffset}px]`,
        isInformationActive ? "-z-999" : "",
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
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onInput={handleInput}
        onKeyUp={(e) => {
          if (e.key === "Enter" && e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
          }
        }}
        onFocus={() =>
          window.visualViewport?.dispatchEvent(new Event("resize"))
        }
        className="w-full resize-none max-h-32 bg-transparent py-1 ps-2 text-sm focus:outline-none text-neutral-800"
        placeholder="Type a message..."
      />
      <button
        disabled={value.trim() === ""}
        onClick={handleSendMessage}
        type="button"
        className={clsx(
          "rounded-full bg-lightblue-500 flex items-center justify-center p-2 text-white",
          {
            "opacity-50 cursor-not-allowed": value.trim() === "",
          },
        )}
      >
        <Send size={19} />
      </button>
    </footer>
  );
}
