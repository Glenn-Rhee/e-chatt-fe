"use client";
import React, { useRef } from "react";

export default function InputsBirthday() {
  const inpuutsRef = useRef<(HTMLInputElement | null)[]>([]);
  const maxLengths = [2, 2, 4];

  const today = new Date();
  const minYear = today.getFullYear() - 12;

  const isLeapYear = (year: number) =>
    (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

  const getMaxDay = (month: number, year?: number) => {
    if (month === 2) {
      return year && isLeapYear(year) ? 29 : 28;
    }

    if ([4, 6, 9, 11].includes(month)) return 30;

    return 31;
  };

  return [0, 1, 2].map((i) => (
    <React.Fragment key={i}>
      <input
        type="text"
        ref={(ell) => {
          inpuutsRef.current[i] = ell;
        }}
        onChange={(e) => {
          e.target.value = e.target.value.replace(/\D/g, "");
          const day = Number(inpuutsRef.current[0]?.value);
          const month = Number(inpuutsRef.current[1]?.value);
          const year = Number(inpuutsRef.current[2]?.value);

          if (i === 1 && month > 12) {
            e.target.value = "";
          }

          if (i === 2 && year > minYear) {
            e.target.value = "";
          }

          if (i === 0 && day > 31) {
            e.target.value = "";
          }

          if (i === 0 && month) {
            const maxDay = getMaxDay(month, year);
            if (day > maxDay) {
              e.target.value = "";
            }
          }
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
