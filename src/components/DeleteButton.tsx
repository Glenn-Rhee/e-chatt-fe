"use client";
import Dialog from "./ui/Dialog";
import { Dispatch, SetStateAction } from "react";

interface DeleteButtonProps {
  children: React.ReactNode;
  onDelete: () => void;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function DeleteButton(props: DeleteButtonProps) {
  const { children, onDelete, isOpen, setIsOpen } = props;

  return (
    <>
      <button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        {children}
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
          <button onClick={onDelete}>Delete Chatt</button>
        </div>
      </Dialog>
    </>
  );
}
