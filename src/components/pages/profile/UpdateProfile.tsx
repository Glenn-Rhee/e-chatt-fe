"use client";
import { Pencil } from "lucide-react";
import UploadImage from "../../UploadImage";
import { useUploadThing } from "@/src/lib/uploadthing";
import toast from "react-hot-toast";

export default function UpdateProfile() {
  const { startUpload, isUploading } = useUploadThing("imageUpload", {
    onUploadError() {
      toast.error("An error while upload image!");
    },
    onClientUploadComplete: () => {
      toast.success("Successfully update profile image!");
    },
  });

  return (
    <div className="flex items-center justify-center p-1 bg-lightblue-500 text-white rounded-full absolute top-1 right-1">
      <UploadImage startUpload={startUpload} isUploading={isUploading}>
        <Pencil size={18} />
      </UploadImage>
    </div>
  );
}
