import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Get token from cookies
  const token = req.cookies.get("auth-cookie")?.value;
  
  const isAuthPage = req.nextUrl.pathname.startsWith("/user-auth");
  const isVerifyPage = req.nextUrl.pathname.startsWith("/verify");
  const isProtectedRoute = req.nextUrl.pathname.startsWith("/dashboard");
  console.log("Middleware executed for:", req.nextUrl.pathname);
  console.log("Middleware :", token , req.cookies.get("auth-cookie")?.value);
  // 🚫 Not logged in → block protected routes
  if (token && req.nextUrl.pathname === "/login") {
  return NextResponse.redirect(new URL("/dashboard", req.url));
}


  // 🔁 Logged in → prevent access to auth pages
  if (token && (isAuthPage || isVerifyPage)) {
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
    "/verify/:path*",
  ],
};
