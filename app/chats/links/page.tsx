import Image from "next/image";
import Link from "next/link";

export default function MediaLinkPage() {
  return (
    <div className="flex flex-col gap-y-5 px-5 mt-4">
      <div className="flex flex-col gap-y-2">
        <h6 className="text-neutral-500 text-sm font-semibold">Today</h6>
        <div className="flex flex-col gap-y-1">
          <Link
            href={
              "https://www.figma.com/design/d4PyAgsf5OtWr04XJn51Kd/Chatting-App-UI-Kit-Design-%7C-E-Chat-%7C-Figma--Community-?node-id=21-122&p=f&t=DYbB02NyVvd2Unjq-0"
            }
            className="w-full p-2 rounded-md bg-neutral-50 flex items-center gap-x-4 overflow-hidden"
          >
            <Image
              src={"/prof.jpg"}
              alt="Link 1"
              width={70}
              height={70}
              className="rounded-md aspect-square object-cover"
            />
            <div className="flex flex-col gap-y-1">
              <span className="text-neutral-900 font-semibold text-sm">
                160+ FREE Tab Bar Component Types
              </span>
              <span className="text-neutral-300 text-xs line-clamp-2 break-all">
                https://www.figma.com/design/d4PyAgsf5OtWr04XJn51Kd/Chatting-App-UI-Kit-Design-%7C-E-Chat-%7C-Figma--Community-?node-id=21-122&p=f&t=DYbB02NyVvd2Unjq-0
              </span>
            </div>
          </Link>
          <Link
            href={
              "https://www.figma.com/design/d4PyAgsf5OtWr04XJn51Kd/Chatting-App-UI-Kit-Design-%7C-E-Chat-%7C-Figma--Community-?node-id=21-122&p=f&t=DYbB02NyVvd2Unjq-0"
            }
            className="w-full p-2 rounded-md bg-neutral-50 flex items-center gap-x-4 overflow-hidden"
          >
            <Image
              src={"/prof.jpg"}
              alt="Link 1"
              width={70}
              height={70}
              className="rounded-md aspect-square object-cover"
            />
            <div className="flex flex-col gap-y-1">
              <span className="text-neutral-900 font-semibold text-sm">
                160+ FREE Tab Bar Component Types
              </span>
              <span className="text-neutral-300 text-xs line-clamp-2 break-all">
                https://www.figma.com/design/d4PyAgsf5OtWr04XJn51Kd/Chatting-App-UI-Kit-Design-%7C-E-Chat-%7C-Figma--Community-?node-id=21-122&p=f&t=DYbB02NyVvd2Unjq-0
              </span>
            </div>
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-y-2">
        <h6 className="text-neutral-500 text-sm font-semibold">Yesterday</h6>
        <div className="flex flex-col gap-y-1">
          <Link
            href={
              "https://www.figma.com/design/d4PyAgsf5OtWr04XJn51Kd/Chatting-App-UI-Kit-Design-%7C-E-Chat-%7C-Figma--Community-?node-id=21-122&p=f&t=DYbB02NyVvd2Unjq-0"
            }
            className="w-full p-2 rounded-md bg-neutral-50 flex items-center gap-x-4 overflow-hidden"
          >
            <Image
              src={"/prof.jpg"}
              alt="Link 1"
              width={70}
              height={70}
              className="rounded-md aspect-square object-cover"
            />
            <div className="flex flex-col gap-y-1">
              <span className="text-neutral-900 font-semibold text-sm">
                160+ FREE Tab Bar Component Types
              </span>
              <span className="text-neutral-300 text-xs line-clamp-2 break-all">
                https://www.figma.com/design/d4PyAgsf5OtWr04XJn51Kd/Chatting-App-UI-Kit-Design-%7C-E-Chat-%7C-Figma--Community-?node-id=21-122&p=f&t=DYbB02NyVvd2Unjq-0
              </span>
            </div>
          </Link>
          <Link
            href={
              "https://www.figma.com/design/d4PyAgsf5OtWr04XJn51Kd/Chatting-App-UI-Kit-Design-%7C-E-Chat-%7C-Figma--Community-?node-id=21-122&p=f&t=DYbB02NyVvd2Unjq-0"
            }
            className="w-full p-2 rounded-md bg-neutral-50 flex items-center gap-x-4 overflow-hidden"
          >
            <Image
              src={"/prof.jpg"}
              alt="Link 1"
              width={70}
              height={70}
              className="rounded-md aspect-square object-cover"
            />
            <div className="flex flex-col gap-y-1">
              <span className="text-neutral-900 font-semibold text-sm">
                160+ FREE Tab Bar Component Types
              </span>
              <span className="text-neutral-300 text-xs line-clamp-2 break-all">
                https://www.figma.com/design/d4PyAgsf5OtWr04XJn51Kd/Chatting-App-UI-Kit-Design-%7C-E-Chat-%7C-Figma--Community-?node-id=21-122&p=f&t=DYbB02NyVvd2Unjq-0
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
