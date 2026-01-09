import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Get token from cookies
  const token = req.cookies.get("auth-cookie")?.value;
  console.log("Middleware :", token , req.cookies.get("auth-cookie")?.value);
  // 🚫 Not logged in → block protected routes
  if (!token ) {
    return NextResponse.redirect(
      new URL("/user-auth", req.url)
    );
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/verify/:path*",
  ],
};
