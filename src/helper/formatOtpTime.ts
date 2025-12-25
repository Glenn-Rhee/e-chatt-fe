export const formatOtpTime = (second: number) => {
  const minute = Math.floor(second / 60);
  const sec = second % 60;

  return `${String(minute).padStart(2, "0")} : ${String(sec).padStart(2, "0")}`;
};
