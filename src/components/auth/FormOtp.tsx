"use client";
import { formatOtpTime } from "@/src/helper/formatOtpTime";
import clsx from "clsx";
import { Clock8 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function FormOtp() {
  const [seconds, setSeconds] = useState(60);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const isInvalid = false;

  useEffect(() => {
    if (seconds <= 0) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  return (
    <>
      <span className="text-white text-2xl font-semibold mt-10 block">
        Enter OTP Code
      </span>
      <span className="text-white text-lg font-medium">
        Sent to: user@example.com
      </span>
      <div className="mx-auto justify-center flex items-center gap-x-3 mt-40">
        <div className="flex items-center gap-x-1">
          <Clock8 size={19} />
          <span className="text-blue-900 text-sm font-medium">
            {formatOtpTime(seconds)}
          </span>
        </div>
        <button
          type="button"
          onClick={() => setSeconds(60)}
          className="text-lightblue-900/40 font-bold text-sm underline"
        >
          Resend Code
        </button>
      </div>
      <form className="w-full grid grid-cols-4 gap-x-4 mt-12">
        {[0, 1, 2, 3].map((i) => (
          <input
            key={i}
            ref={(el) => {
              inputsRef.current[i] = el;
            }}
            onKeyUp={(e) => {
              if (e.key === "Backspace") {
                inputsRef.current[i - 1]?.focus();
              } else {
                inputsRef.current[i + 1]?.focus();
              }
            }}
            type="text"
            maxLength={1}
            inputMode="numeric"
            className={clsx(
              "border-b-3 text-center text-4xl focus:border-lightblue-500 focus:outline-none bg-transparent",
              isInvalid ? "border-red-500" : "border-neutral-900"
            )}
          />
        ))}
        {isInvalid && (
          <span className="text-red-500 col-span-4 text-center mt-3">
            Code Invalid
          </span>
        )}
      </form>
    </>
  );
}
