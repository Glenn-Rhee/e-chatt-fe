"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
type DialogProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  isCenter?: boolean;
};

export default function Dialog({
  isOpen,
  onClose,
  children,
  className = "",
  isCenter,
}: DialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.1 }}
      className={clsx(
        "fixed inset-0 z-50",
        isCenter ? "flex items-center justify-center" : "",
      )}
    >
      <motion.div
        ref={dialogRef}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: isOpen ? 1 : 0.9, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.1, ease: "easeOut" }}
        className={`absolute bg-white rounded-lg shadow-lg ${className}`}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
