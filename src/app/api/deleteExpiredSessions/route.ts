import { NextRequest, NextResponse } from "next/server";
import { luciaAuth } from "@/lib/lucia/lucia";
export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }
  await luciaAuth.deleteExpiredSessions();
  return NextResponse.json({ message: "Expired sessions deleted" });
}
