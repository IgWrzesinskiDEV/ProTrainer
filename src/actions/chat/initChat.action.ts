"use server";

import { Chat } from "@/lib/models/chat.model";
import connectMongoDb from "@/lib/mongodb/mogodb";
import { generateIdFromEntropySize } from "lucia";

export default async function initChat(user1Id: string, user2Id: string) {
  await connectMongoDb();

  const chat = await Chat.findOne({
    participants: { $all: [user1Id, user2Id] },
  });

  if (chat) return chat;

  const newChat = await Chat.create({
    _id: generateIdFromEntropySize(24),
    participants: [user1Id, user2Id],
  });
  return newChat;
}
