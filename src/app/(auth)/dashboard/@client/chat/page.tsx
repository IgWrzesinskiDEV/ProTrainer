import initChat from "@/actions/chat/initChat.action";
import Chat from "@/components/chat/Chat";
import { verifyAuth } from "@/lib/lucia/auth";
import getChatMessages from "@/utils/chat/getChatMessages";
import { getUserNamesById } from "@/utils/data/user";
import Link from "next/link";

export default async function ChatPage() {
  const { user, session } = await verifyAuth();
  if (!user?.id) return <div>Unauthorized</div>;

  if (!user?.currentTrainer) {
    return (
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <div className="h-6 w-6 text-blue-500 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
          Chat
        </h1>

        <div className="bg-[#1e1e1e] border border-[#333] rounded-lg shadow-lg p-8 text-center">
          <div className="w-20 h-20 bg-[#252525] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white mb-3">
            No Trainer Selected
          </h2>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            You need to select a trainer before you can start chatting. Visit
            the trainers page to find the perfect match for your fitness
            journey.
          </p>
          <Link
            href="/dashboard/trainers"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
            Find a Trainer
          </Link>
        </div>
      </div>
    );
  }
  const chat = await initChat(user.id, user.currentTrainer);
  if (!chat) return <div>Chat not found</div>;

  const messages = await getChatMessages(chat._id.toString());

  const clientName = user?.profileDetails?.fullName || user.userName;
  const trainerDetails = await getUserNamesById(user.currentTrainer);
  const trainerName =
    trainerDetails?.profileDetails?.fullName || trainerDetails.userName;

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <div className="h-6 w-6 text-blue-500 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </div>
        Chat with Your Trainer
      </h1>

      <div className="chat-container">
        <Chat
          chatId={chat._id}
          userId={user.id}
          sessionId={session.id}
          messagesData={JSON.stringify(messages)}
          trainerName={trainerName}
          clientName={clientName}
          otherPersonAvatarFileName={
            trainerDetails?.profileDetails?.avatarFileName
          }
          isTrainer={false}
        />
      </div>
    </div>
  );
}
