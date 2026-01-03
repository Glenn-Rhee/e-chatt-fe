import IncomingBubble from "./IncomingBubble";
import OutgoingBubble from "./OutgoingBubble";

export default function MainChat() {
  return (
    <main className="bg-neutral-50 h-full mt-15 space-y-3 py-2 px-3">
      <div className="w-full my-2 flex justify-center">
        <span className="text-white font-medium text-sm px-2 py-1 rounded-md bg-lightblue-500">
          Today
        </span>
      </div>
      <IncomingBubble text="Cihuy apakabar" time="01.11" />
      <OutgoingBubble
        text="loremcojiu alskdhalksdhasd alkdjhalksdjhaklsjdha sldkajshd"
        time="01.11"
      />
    </main>
  );
}
