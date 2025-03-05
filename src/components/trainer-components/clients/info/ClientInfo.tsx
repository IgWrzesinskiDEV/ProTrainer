import { getClientById } from "@/utils/data/getClients";
import ClientSectionWraper from "../ClientSectionWraper";
import { MdInfo } from "react-icons/md";

export default async function ClientInfo({ clientId }: { clientId: string }) {
  const clientInfo = await getClientById(clientId);

  return (
    <ClientSectionWraper
      title="Basic Info"
      Icon={<MdInfo className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />}
    >
      <div className="bg-gray-800/50 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 backdrop-blur-sm border border-gray-700/50">
        {clientInfo?.profileDetails?.bio ? (
          <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed">
            {clientInfo.profileDetails.bio}
          </p>
        ) : (
          <div className="text-center py-4 sm:py-6 md:py-8">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-gray-700/50 flex items-center justify-center">
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-gray-500"
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
            <p className="text-gray-400 text-xs sm:text-sm md:text-base">
              This client hasn&apos;t added any bio information yet.
            </p>
          </div>
        )}
      </div>
    </ClientSectionWraper>
  );
}
