import ClientNav from "@/components/trainer-components/clients/ClientNav";
import RemoveClient from "@/components/trainer-components/clients/RemoveClient";
import ProfileAvatar from "@/components/UI/ProfileAvatar";
import checkTrainerClient from "@/utils/data/checkTrainerClient";
import { getClientById } from "@/utils/data/getClients";
import Link from "next/link";
import type { ReactNode } from "react";
import { MdOutlineChevronLeft } from "react-icons/md";

export default async function ClientLayout({
  params,
  children,
}: {
  params: Promise<{ clientSlug: string }>;
  children: ReactNode;
  modal: ReactNode;
}) {
  const clientId = (await params).clientSlug;
  await checkTrainerClient(clientId);
  const clientInfo = await getClientById(clientId);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl shadow-xl overflow-hidden">
        {/* Header Section */}
        <div className="relative px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Back Button */}
          <Link
            href="/dashboard/clients"
            className="group absolute left-0 top-1/2 -translate-y-1/2 h-12 w-12 sm:h-14 sm:w-14 
                     flex items-center justify-center
                     bg-blue-500/20 hover:bg-blue-500/30
                     transition-all duration-300"
          >
            <MdOutlineChevronLeft
              className="text-2xl sm:text-3xl text-blue-400 group-hover:text-blue-300 
                                           transition-all duration-300 transform group-hover:-translate-x-1"
            />
          </Link>

          {/* Client Info Header */}
          <div className="ml-16 sm:ml-20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-8 mb-8">
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="relative">
                  <ProfileAvatar
                    fileName={clientInfo?.profileDetails?.avatarFileName}
                    className="w-16 h-16 sm:w-20 sm:h-20"
                  />
                  <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-green-500 border-2 border-gray-800"></div>
                </div>

                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white">
                    {clientInfo?.profileDetails?.fullName ||
                      clientInfo?.userName}
                  </h1>
                  <p className="text-gray-400 text-sm sm:text-base">
                    {clientInfo?.email}
                  </p>
                </div>
              </div>

              <RemoveClient clientId={clientId} />
            </div>

            <ClientNav clientId={clientId} />
          </div>
        </div>

        {/* Content Section */}
        <div className="px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
          <div className="bg-gray-700/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 min-h-[300px]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
