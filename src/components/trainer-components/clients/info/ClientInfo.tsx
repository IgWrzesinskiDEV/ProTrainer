import { getClientById } from "@/utils/data/getClients";
import { motion } from "motion/react";

export default async function ClientInfo({ clientId }: { clientId: string }) {
  const clientInfo = await getClientById(clientId);

  return (
    <div
      // initial={{ opacity: 0, y: 20 }}
      // animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
          <span className="h-8 w-1 bg-blue-500 rounded-full"></span>
          About Me
        </h2>
      </div>

      <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm border border-gray-700/50">
        {clientInfo?.profileDetails?.bio ? (
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            {clientInfo.profileDetails.bio}
          </p>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-700/50 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <p className="text-gray-400 text-sm sm:text-base">
              This client hasn&apos;t added any bio information yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
