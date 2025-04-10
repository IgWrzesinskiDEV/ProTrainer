import { Message } from "@/lib/models/message.model";
import connectMongoDb from "@/lib/mongodb/mogodb";

export default async function getChatMessages(chatId: string) {
  await connectMongoDb();
  const messages = await Message.find({ chatId: chatId }).sort({
    createdAt: 1,
  });
  return messages;
}
