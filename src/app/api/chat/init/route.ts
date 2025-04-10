import { Chat } from "@/lib/models/chat.model";
import connectMongoDb from "@/lib/mongodb/mogodb";

interface ChatRequestBody {
  user1Id: string;
  user2Id: string;
}

export const POST = async (req: Request): Promise<Response> => {
  await connectMongoDb();
  const { user1Id, user2Id }: ChatRequestBody = await req.json();

  const chat = await Chat.findOne({
    participants: { $all: [user1Id, user2Id] },
  });

  if (chat) return Response.json(chat);

  const newChat = await Chat.create({ participants: [user1Id, user2Id] });
  return Response.json(newChat);
};
