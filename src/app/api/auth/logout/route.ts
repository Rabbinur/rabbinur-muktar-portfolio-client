import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const runtime = "nodejs";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  return NextResponse.json({
    success: true,
    statusCode: 200,
    message: "Logout successful",
  });
}
