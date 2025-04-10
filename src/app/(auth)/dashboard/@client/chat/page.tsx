import initChat from "@/actions/chat/initChat.action";
import Chat from "@/components/chat/Chat";
import { verifyAuth } from "@/lib/lucia/auth";
import getChatMessages from "@/utils/chat/getChatMessages";

export default async function ChatPage() {
  const { user, session } = await verifyAuth();
  if (!user?.id || !user.currentTrainer) return <div>Unauthorized</div>;
  const chat = await initChat(user.id, user.currentTrainer);
  if (!chat) return <div>Chat not found</div>;
  console.log(chat);
  const messages = await getChatMessages(chat._id.toString());
  console.log(messages, "messages");

  return (
    <Chat
      chatId={chat._id}
      userId={user.id}
      sessionId={session.id}
      messagesData={JSON.stringify(messages)}
    />
  );
}
