import LogoutButton from "@/src/components/pages/profile/LogoutButton";
import { Pencil } from "lucide-react";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { authOptions } from "../api/auth/[...nextauth]/auth-options";
import { DataUser, ResponsePayload } from "@/src/types";
import ResponseError from "@/src/error/ResponseError";
import Error from "@/src/components/ui/Error";
import EditProfile from "@/src/components/pages/profile/EditProfile";

export const metadata: Metadata = {
  title: "Your profile",
};

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL!;

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  let data: DataUser | null = null;
  let errorMsg: { code: number; message: string } | null = null;
  try {
    const res = await fetch(baseUrl + "/user", {
      headers: {
        Authorization: session?.user.token as string,
      },
    });

    const dataRes = (await res.json()) as ResponsePayload<DataUser>;

    if (dataRes.status === "failed") {
      throw new ResponseError(dataRes.code, dataRes.message);
    }

    data = dataRes.data;
    errorMsg = null;
  } catch (error) {
    if (error instanceof ResponseError) {
      errorMsg = {
        code: error.status,
        message: error.message,
      };
    } else {
      errorMsg = {
        code: 500,
        message: "An error occured! Please try again later!",
      };
    }

    data = null;
  }

  if (data && !errorMsg) {
    return (
      <div className="px-4 pt-3">
        <div className="flex flex-col items-center w-full gap-y-4">
          <div className="relative rounded-full">
            <Image
              src={data.userDetail.image_url}
              alt="Profile Image"
              width={130}
              height={130}
              className="rounded-full aspect-square object-cover"
            />
            <button className="flex items-center justify-center p-1 bg-lightblue-500 text-white rounded-full absolute top-1 right-1">
              <Pencil size={18} />
            </button>
          </div>
          <h5 className="text-neutral-900 font-semibold text-xl">
            {data.username}
          </h5>
        </div>
        <div className="flex flex-col gap-y-1 mt-4">
          <label className="text-neutral-500 text-lg font-medium">
            Gender:{" "}
            <span className="text-lg text-neutral-900">
              {data.userDetail.gender}
            </span>
          </label>
          <label className="text-neutral-500 text-lg font-medium">
            Birthday:{" "}
            <span className="text-lg text-neutral-900">
              {data.userDetail.birthday ? "" : "-"}
            </span>
          </label>
          <label className="text-neutral-500 text-lg font-medium">
            Email:{" "}
            <span className="text-lg text-neutral-900">{data.email}</span>
          </label>
        </div>
        <div className="mt-2 flex flex-col gap-y-2">
          <EditProfile dataUser={data} />
          <LogoutButton />
        </div>
      </div>
    );
  } else {
    return (
      errorMsg && <Error code={errorMsg.code} message={errorMsg.message} />
    );
  }
}
