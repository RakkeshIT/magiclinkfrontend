import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth-cookie")?.value;
  const isAuthPage = req.nextUrl.pathname.startsWith("/user-auth");
  const isProtectedRoute = req.nextUrl.pathname.startsWith("/dashboard");

  try {
    if (token) jwt.verify(token, process.env.JWT_SECRET!);
  } catch {
    if (isProtectedRoute) return NextResponse.redirect(new URL("/user-auth", req.url));
  }

  if (token && isAuthPage) return NextResponse.redirect(new URL("/dashboard", req.url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/dashboard", "/user-auth"],
};
