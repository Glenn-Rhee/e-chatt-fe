"use client";
import { Trash2 } from "lucide-react";
import Dialog from "./ui/Dialog";
import { useState } from "react";
import ResponseError from "../error/ResponseError";
import toast from "react-hot-toast";
import { baseUrl } from "./pages/profile/EditProfile";
import { useChatStore } from "../store/useChattActive";
import { useSession } from "next-auth/react";
import { ResponsePayload } from "../types";

export default function DeleteConv() {
  const [isOpen, setIsOpen] = useState(false);
  const { isFocusChattItem, setIsFocusChattItem } = useChatStore();
  const { data: session } = useSession();
  const controller = new AbortController();
  const timeout = setTimeout(() => {
    controller.abort();
  }, 8000);
  const handleDeleteChatt = async () => {
    try {
      if (!isFocusChattItem || isFocusChattItem.length === 0) {
        throw new ResponseError(403, "Select one chatt firs!");
      }
      const res = await fetch(baseUrl + "/chatts", {
        method: "DELETE",
        body: JSON.stringify({ idConvs: isFocusChattItem }),
        headers: {
          Authorization: session?.user.token || "",
          "Content-Type": "application/json",
        },
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!res.ok) {
        throw new ResponseError(
          res.status,
          "Failed delete chatt! Please try again later!",
        );
      }

      const dataRes = (await res.json()) as ResponsePayload;
      if (dataRes.status === "failed") {
        throw new ResponseError(dataRes.code, dataRes.message);
      }

      toast.success(dataRes.message);
      setIsOpen(false);
      setIsFocusChattItem(null);
    } catch (error) {
      if (error instanceof ResponseError) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong! Please try again later!");
      }
    }
  };
  return (
    <>
      <button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <Trash2 className="text-white text-2xl" />
      </button>
      <Dialog
        isOpen={isOpen}
        isCenter
        onClose={() => setIsOpen(false)}
        className="w-85 mx-auto my-auto shadow-md px-4 py-3 space-y-4"
      >
        <h4 className="text-xl font-semibold text-neutral-900">
          Delete this chat?
        </h4>
        <div className="w-full flex items-center justify-evenly font-semibold text-blue-500">
          <button onClick={() => setIsOpen(false)}>Cancel</button>
          <button onClick={handleDeleteChatt}>Delete Chatt</button>
        </div>
      </Dialog>
    </>
  );
}
