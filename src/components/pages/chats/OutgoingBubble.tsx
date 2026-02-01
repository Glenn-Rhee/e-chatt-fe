import { Check, CheckCheck } from "lucide-react";
import BubbleShell from "./BubbleShell";

interface OutgoingBubbleProps {
  text: string;
  time: string;
  isRead: boolean;
}

export default function OutgoingBubble(props: OutgoingBubbleProps) {
  const { text, time, isRead } = props;
  return (
    <BubbleShell bubbleFor="outgoing">
      <div className="bg-blue-500 py-2 ms-auto px-3 rounded-tl-2xl flex flex-col rounded-tr-2xl rounded-bl-2xl max-w-80 w-fit gap-y-2">
        <span className="text-white">{text}</span>
        <span className="text-xs justify-end font-medium text-neutral-50 flex items-center gap-x-2">
          {time} {isRead ? <CheckCheck size={13} /> : <Check size={13} />}
        </span>
      </div>
    </BubbleShell>
  );
}
