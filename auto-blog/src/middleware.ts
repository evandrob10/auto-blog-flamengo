import { NextRequest, NextResponse } from "next/server";
export function middleware(Request: NextRequest) {
  const path = Request.nextUrl.pathname;
  return NextResponse.redirect(new URL("/auth/login", Request.url));
}

export const config = {
  matcher: ["/painel/:path*"],
};
