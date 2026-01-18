import { ResponsePayload } from "@/src/types";
import { getToken } from "next-auth/jwt";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError, UTApi } from "uploadthing/server";
import z from "zod";
const utApi = new UTApi();

const f = createUploadthing();
export const ourFileRouter = {
  imageUpload: f({
    image: {
      maxFileSize: "1MB",
      maxFileCount: 1,
    },
  })
    .input(
      z.object({
        image: z.url({ error: "Please fill youuur image url" }).nullable(),
      }),
    )
    .middleware(async ({ req, input }) => {
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      });

      if (!token) {
        throw new UploadThingError("User not autheticated!");
      }

      if (!input.image) {
        return {
          email: token.email,
          token: token.token,
        };
      }

      const fileKey = input.image.split("/").pop();

      await utApi.deleteFiles(fileKey!);

      return { email: token.email, token: token.token };
    })
    .onUploadComplete(async ({ file, metadata }) => {
      const url = file.ufsUrl;
      const res = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/user/image",
        {
          method: "PATCH",
          body: JSON.stringify({ imageUrl: url }),
          headers: {
            "Content-Type": "application/json",
            Authorization: metadata.token!,
          },
        },
      );

      const dataRes = (await res.json()) as ResponsePayload;
      if (dataRes.status === "failed") {
        const fileKey = url.split("/").pop();

        await utApi.deleteFiles(fileKey!);
        throw new UploadThingError(dataRes.message);
      }

      return {
        email: metadata.email,
        url,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
