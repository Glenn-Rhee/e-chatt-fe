import ResponseError from "@/src/error/ResponseError";
import { ResponsePayload } from "@/src/types";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENTID!,
      clientSecret: process.env.GOOGLE_CLIENTSECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user }) {
      try {
        const res = await fetch(`${process.env.BACKEND_URL}/user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            username: user.name,
            imageUrl: user.image,
          }),
        });
        const dataRes = (await res.json()) as ResponsePayload<{
          token: string;
        }>;
        if (dataRes.status === "failed") {
          throw new ResponseError(dataRes.code, dataRes.message);
        }

        user.token = dataRes.data.token;
        return true;
      } catch (error) {
        console.log("Failed send data user!", error);
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user?.token) {
        token.token = user.token;
      }

      return token;
    },
    async session({ session, token }) {
      session.user.token = token.token as string;
      return session;
    },
  },
};
