import { getToken } from "next-auth/jwt";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError, UTApi } from "uploadthing/server";
import z from "zod";

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
        };
      }

      const fileKey = input.image.split("/").pop();

      const utApi = new UTApi();
      await utApi.deleteFiles(fileKey!);

      return { email: token.email };
    })
    .onUploadComplete(async ({ file, metadata }) => {
      const url = file.ufsUrl;

      return {
        email: metadata.email,
        url,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
