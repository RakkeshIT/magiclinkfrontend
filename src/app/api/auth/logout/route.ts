import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const res = NextResponse.json({ success: true });
  res.cookies.delete("auth_token");
  return res;
}
