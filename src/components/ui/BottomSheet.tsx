"use client";
import clsx from "clsx";
import { useRef, useState } from "react";

type BottomSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  maxHeight?: string;
  className?: string;
};

export default function BottomSheet({
  isOpen,
  onClose,
  children,
  maxHeight = "80dvh",
  className,
}: BottomSheetProps) {
  const startY = useRef(0);
  const [translateY, setTranslateY] = useState(0);
  const sheetRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const diff = e.touches[0].clientY - startY.current;
    if (diff > 0) {
      setTranslateY(diff);
    }
  };

  const handleTouchEnd = () => {
    if (translateY > 120) {
      setTranslateY(0);
      onClose();
    } else {
      setTranslateY(0);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={clsx("fixed inset-0 z-50")}>
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => {
          setTranslateY(0);
          onClose();
        }}
      />

      {/* sheet */}
      <div
        ref={sheetRef}
        style={{
          transform: `translateY(${translateY}px)`,
          maxHeight,
          touchAction: "none",
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={clsx(
          "absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl flex flex-col transition-transform duration-100 ease-out",
          className
        )}
      >
        {/* handle */}
        <div className="py-3 flex justify-center">
          <div className="w-14 h-1.5 bg-neutral-300 rounded-full" />
        </div>

        {/* content */}
        <div className="overflow-y-auto px-4 pb-4">{children}</div>
      </div>
    </div>
  );
}
