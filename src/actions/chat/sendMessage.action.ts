"use server";

import connectMongoDb from "@/lib/mongodb/mogodb";
import { Message } from "@/lib/models/message.model";
import Pusher from "pusher";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER!,
  useTLS: true,
});

export default async function sendChatMessage(
  chatId: string,
  senderId: string,
  text: string
) {
  await connectMongoDb();

  //add validations here
  const message = await Message.create({
    chat: chatId,
    sender: senderId,
    text,
  });

  await pusher.trigger(`private-chat-${chatId}`, "new-message", {
    senderId,
    text,
    createdAt: message.createdAt,
  });
}
