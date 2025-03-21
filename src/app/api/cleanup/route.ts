import { removeInvalidNotificationIds } from "@/utils/removeInvalidNotifications";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }
  await removeInvalidNotificationIds();
  return NextResponse.json({ message: "Old notifications cleaned up" });
}
