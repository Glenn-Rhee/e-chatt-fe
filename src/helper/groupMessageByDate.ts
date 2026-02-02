import { Message } from "../types";

export default function groupMessageByDate(messages: Message[] | null) {
  if (!messages) return {};

  const grouped: Record<string, Message[]> = {};
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  const todayStr = formatDate(today);
  const yesterdayStr = formatDate(yesterday);

  messages.forEach((msg) => {
    const msgDate = msg.createdAt.split("T")[0];
    let key = msgDate;

    if (msgDate === todayStr) key = "Today";
    else if (msgDate === yesterdayStr) key = "Yesterday";

    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(msg);
  });

  const sortedGrouped: Record<string, Message[]> = {};
  Object.keys(grouped)
    .sort((a, b) => {
      if (a === "Today") return -1;
      if (b === "Today") return 1;
      if (a === "Yesterday") return -1;
      if (b === "Yesterday") return 1;
      return new Date(b).getTime() - new Date(a).getTime();
    })
    .forEach((key) => {
      sortedGrouped[key] = grouped[key];
    });

  return sortedGrouped;
}
