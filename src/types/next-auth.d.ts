// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      token?: string;
    } & DefaultSession["user"];
  }

  interface User {
    token?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    token?: string;
  }
}
