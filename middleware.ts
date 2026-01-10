import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const url = req.nextUrl.pathname;
  if (url.includes("/api")) {
    if (url.includes("/auth") && token) {
      return NextResponse.json({
        status: "failed",
      });
    }
  } else {
    if (
      (url === "/chats" ||
        url === "/groups" ||
        url === "/profile" ||
        url === "/settings") &&
      !token
    ) {
      return NextResponse.redirect(new URL("/auth", req.url));
    }

    if ((url.includes("/auth") || url === "/") && token) {
      return NextResponse.redirect(new URL("/chats", req.url));
    }
  }

  return NextResponse.next();
}

export const matcher = ["/chats"];
