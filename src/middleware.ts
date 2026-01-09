import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// @ts-ignore

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth-cookie")?.value;
  console.log("Middleware Token:", token);
  const isAuthPage = req.nextUrl.pathname.startsWith("/user-auth");
  const isProtectedRoute = req.nextUrl.pathname.startsWith("/dashboard");

  // 🚫 Not logged in → block protected routes
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(
      new URL("/user-auth", req.url)
    );
  }

  // 🔁 Logged in → prevent access to auth pages
  if (token && isAuthPage) {
    return NextResponse.redirect(
      new URL("/dashboard", req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/user-auth",
  ],
};
