"use client";
import { Trash2 } from "lucide-react";
import Dialog from "./ui/Dialog";
import { useState } from "react";

export default function DeleteConv() {
  const [isOpen, setIsOpen] = useState(false);

  const handleDeleteChatt = () => {};
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
