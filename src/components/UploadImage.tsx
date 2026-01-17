"use client";
import toast from "react-hot-toast";
import Dropzone, { FileRejection } from "react-dropzone";
import { LoaderCircle } from "lucide-react";
import { ClientUploadedFileData } from "uploadthing/types";

interface UploadImageProps {
  children: React.ReactNode;
  isUploading: boolean;
  startUpload: (
    files: File[],
    input?: unknown,
  ) => Promise<ClientUploadedFileData<unknown>[] | undefined>;
}

export default function UploadImage(props: UploadImageProps) {
  const { children, isUploading, startUpload } = props;
  const onDropAccepted = (accFiles: File[]) => {
    if (accFiles.length > 1) {
      toast.error("Maximum upload file is only 1!");
      return;
    }

    startUpload(accFiles, { image: null });
  };

  const onDropRejected = (rejectFiles: FileRejection[]) => {
    const [file] = rejectFiles;
    if (file.errors.some((err) => err.code.includes("type"))) {
      toast.error("Please choose a PNG, JPG, or JPEG image instead.");
    } else if (file.errors.some((err) => err.code.includes("large"))) {
      toast.error("Please choose a file less then 1MB");
    } else {
      toast.error("Something went wrong! Please try again later!");
    }
  };

  return (
    <Dropzone
      accept={{
        "image/png": [".png"],
        "image/jpeg": [".jpeg"],
        "image/jpg": [".jpg"],
      }}
      onDropAccepted={onDropAccepted}
      onDropRejected={onDropRejected}
      maxSize={1024 * 1024}
    >
      {({ getRootProps, getInputProps }) => (
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {isUploading ? (
            <div className="animate-spin">
              <LoaderCircle />
            </div>
          ) : (
            children
          )}
        </div>
      )}
    </Dropzone>
  );
}
