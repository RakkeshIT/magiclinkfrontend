import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  const { accessToken } = await req.json();

  if (!accessToken) {
    return NextResponse.json({ success: false, message: "Token missing" }, { status: 400 });
  }
  const res = NextResponse.json({ success: true, accessToken });

  res.cookies.set("auth_token", accessToken, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // ✅ true only in prod
  sameSite: "none",
  path: "/",
  maxAge: 60 * 60, // 1 hour
  });

  return res
}
