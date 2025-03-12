import { removeInvalidNotificationIds } from "@/utils/removeInvalidNotifications";
import { NextResponse } from "next/server";

export async function POST() {
  await removeInvalidNotificationIds();
  return NextResponse.json({ message: "Old notifications cleaned up" });
}
