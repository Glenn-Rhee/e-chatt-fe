"use client";
import React, { useRef, useState } from "react";

interface InputsBirthdayProps {
  value: Date | undefined;
  onChange: (date?: Date) => void;
  error?: string;
}

export default function InputsBirthday(props: InputsBirthdayProps) {
  const { onChange, value, error } = props;
  const inpuutsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [local, setLocal] = useState({
    day: value ? String(value.getDate()).padStart(2, "0") : "",
    month: value ? String(value.getMonth() + 1).padStart(2, "0") : "",
    year: value ? String(value.getFullYear()) : "",
  });

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
        value={i === 0 ? local.day : i === 1 ? local.month : local.year}
        onChange={(e) => {
          const v = e.target.value.replace(/\D/g, "");

          const next = {
            day: i === 0 ? v : local.day,
            month: i === 1 ? v : local.month,
            year: i === 2 ? v : local.year,
          };

          if (i === 1 && Number(next.month) > 12) return;
          if (i === 1 && Number(next.year) > minYear) return;

          if (next.day && next.month) {
            const maxDay = getMaxDay(Number(next.month), Number(next.year));
            if (Number(next.day) > maxDay) return;
          }

          setLocal(next);

          if (
            next.day.length === 2 &&
            next.month.length === 2 &&
            next.year.length === 4
          ) {
            const date = new Date(
              Number(next.month),
              Number(next.month) - 1,
              Number(next.day)
            );

            onChange(date);
          }
          if (v.length === maxLengths[i]) {
            inpuutsRef.current[i + 1]?.focus();
          }
        }}
        onKeyDown={(e) => {
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

      {error && <p className="text-red-500 text-sm col-span-3 mt-1"></p>}
    </React.Fragment>
  ));
}
