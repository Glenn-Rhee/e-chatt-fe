import { getFormatDate, getFormatTime } from "./getFormatDate";

export default function getFormatLastSeen(date: string) {
  const dateLastSeen = new Date(date);
  const dateNow = new Date();
  const dateOfLastSeen = dateLastSeen.getDate();
  const dateOfNow = dateNow.getDate();
  let information: string;

  if (dateOfNow - dateOfLastSeen === 0) {
    information = "today";
  } else if (dateOfNow - dateOfLastSeen === 1) {
    information = "yesterday";
  } else {
    information = getFormatDate(dateLastSeen);
  }

  const formatTime = getFormatTime(dateLastSeen);

  return `last seen ${information} at ${formatTime}`;
}
