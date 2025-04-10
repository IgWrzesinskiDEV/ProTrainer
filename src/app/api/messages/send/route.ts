import connectMongoDb from "@/lib/mongodb/mogodb";
import { Message } from "@/lib/models/message.model";
import Pusher from "pusher";
import { generateIdFromEntropySize } from "lucia";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER!,
  useTLS: true,
});
interface MessageRequestBody {
  chatId: string;
  senderId: string;
  text: string;
}

export const POST = async (req: Request) => {
  try {
    await connectMongoDb();
    const { chatId, senderId, text }: MessageRequestBody = await req.json();

    const message = await Message.create({
      _id: generateIdFromEntropySize(24),
      chatId: chatId,
      sender: senderId,
      text,
    });

    await pusher.trigger(`private-chat-${chatId}`, "new-message", {
      senderId,
      text,
      createdAt: message.createdAt,
    });
  } catch (e) {
    console.log(e);
  }

  return Response.json({ status: "sent" });
};
