import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Get token from cookies
  const token = req.cookies.get("auth_token")?.value;
  console.log("Middleware :", token );
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
  ],
};
