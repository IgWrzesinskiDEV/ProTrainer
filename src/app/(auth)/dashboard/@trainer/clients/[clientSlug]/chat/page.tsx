import initChat from "@/actions/chat/initChat.action";
import Chat from "@/components/chat/Chat";

import { verifyAuth } from "@/lib/lucia/auth";
import getChatMessages from "@/utils/chat/getChatMessages";
import { getUserNamesById } from "@/utils/data/user";

export default async function ClientInfoPage({
  params,
}: {
  params: Promise<{ clientSlug: string }>;
}) {
  const clientId = (await params).clientSlug;
  const { user, session } = await verifyAuth();
  if (!user?.id) return <div>Unauthorized</div>;
  const chat = await initChat(user.id, clientId);
  if (!chat) return <div>Chat not found</div>;

  const messages = await getChatMessages(chat._id.toString());

  const trainerName = user?.profileDetails?.fullName || user.userName;
  const clientDetails = await getUserNamesById(clientId);
  const clientName =
    clientDetails?.profileDetails?.fullName || clientDetails.userName;

  return (
    <Chat
      chatId={chat._id}
      userId={user.id}
      sessionId={session.id}
      messagesData={JSON.stringify(messages)}
      trainerName={trainerName}
      clientName={clientName}
      otherPersonAvatarFileName={clientDetails?.profileDetails?.avatarFileName}
      isTrainer={true}
    />
  );
}
