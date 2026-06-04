import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("payload-token")?.value;
  const { pathname } = req.nextUrl;
  const isLoginPage = pathname === "/dashboard/login";

  if (!token && !isLoginPage) {
    return NextResponse.redirect(new URL("/dashboard/login", req.url));
  }
  if (token && isLoginPage) {
    return NextResponse.redirect(new URL("/dashboard/overview", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
