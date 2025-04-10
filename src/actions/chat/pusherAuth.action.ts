"use server";
import connectMongoDb from "@/lib/mongodb/mogodb";

import Pusher from "pusher";

import { verifyAuth } from "@/lib/lucia/auth";
import { Chat } from "@/lib/models/chat.model";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER!,
  useTLS: true,
});

export async function pusherAuthAction(
  socket_id: string,
  channel_name: string
) {
  const { user, session } = await verifyAuth();

  if (!user || !session) return { status: 403, body: "Invalid session" };

  const chatId = channel_name.replace("private-chat-", "");

  const allowed = await verifyUserInChat(user.id, chatId);
  if (!allowed) return { status: 403, body: "Forbidden" };

  const authResponse = pusher.authorizeChannel(socket_id, channel_name);
  return { status: 200, body: authResponse };
}

async function verifyUserInChat(userId: string, chatId: string) {
  await connectMongoDb();

  const chat = await Chat.findById(chatId);
  return chat?.participants.includes(userId);
}
