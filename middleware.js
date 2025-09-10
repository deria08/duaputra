import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.nextUrl;

  if (url.pathname.startsWith("/admin") && process.env.NODE_ENV === "production") {
    return NextResponse.rewrite(new URL("/404", req.url));
  }
}
