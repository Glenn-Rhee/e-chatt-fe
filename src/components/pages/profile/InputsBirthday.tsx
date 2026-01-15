"use client";
import React, { useRef } from "react";

export default function InputsBirthday() {
  const inpuutsRef = useRef<(HTMLInputElement | null)[]>([]);
  const maxLengths = [2, 2, 4];
  return [0, 1, 2].map((i) => (
    <React.Fragment key={i}>
      <input
        type="text"
        ref={(ell) => {
          inpuutsRef.current[i] = ell;
        }}
        onChange={(e) => {
          const value = e.target.value;

          if (value.length === maxLengths[i]) {
            inpuutsRef.current[i + 1]?.focus();
          }
        }}
        onKeyUp={(e) => {
          if (
            e.key === "Backspace" &&
            (e.target as HTMLInputElement).value.length === 0
          ) {
            inpuutsRef.current[i - 1]?.focus();
          }
        }}
        inputMode="numeric"
        placeholder={i === 0 ? "DD" : i === 1 ? "MM" : "YYYY"}
        maxLength={maxLengths[i]}
        className="border-neutral-100 border rounded-md focus:outline-neutral-300 px-2 py-1.5 text-center"
      />
    </React.Fragment>
  ));
}
