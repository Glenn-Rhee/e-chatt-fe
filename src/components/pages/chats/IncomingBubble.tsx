interface IncomingBubbleProps {
  text: string;
  time: string;
}
export default function IncomingBubble(props: IncomingBubbleProps) {
  const { text, time } = props;
  return (
    <div className="bg-white py-2 px-3 rounded-tl-2xl flex flex-col rounded-tr-2xl rounded-br-2xl max-w-80 w-fit gap-y-2">
      <span className="text-neutral-900">{text}</span>
      <span className="text-xs font-medium text-neutral-200">{time}</span>
    </div>
  );
}
