// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      token?: string;
      userId?: string;
    } & DefaultSession["user"];
  }

  interface User {
    userId?: string;
    token?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    token?: string;
    userId?: string;
  }
}
