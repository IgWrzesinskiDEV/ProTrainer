import RemoveClient from "@/components/trainer-components/clients/RemoveClient";
import ProfileAvatar from "@/components/UI/ProfileAvatar";
import checkTrainerClient from "@/utils/data/checkTrainerClient";
import { getClientById } from "@/utils/data/getClients";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  MdOutlineChevronLeft,
  MdInfo,
  MdStraighten,
  MdFitnessCenter,
} from "react-icons/md";

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
    <div className="max-w-[100rem] mx-auto px-4 py-6 sm:px-6 sm:py-8">
      <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header Section with Fixed Layout */}
        <div className="px-4 py-6 sm:px-8 sm:py-8 lg:px-10">
          <div className="flex items-start">
            {/* Back Button Column */}
            <div className="flex-shrink-0 mr-4">
              <Link
                href="/dashboard/clients"
                className="group flex items-center justify-center h-10 w-10 rounded-full bg-blue-600/20 hover:bg-blue-600/30 transition-all duration-300 backdrop-blur-sm"
                aria-label="Back to clients"
              >
                <MdOutlineChevronLeft className="text-2xl text-blue-400 group-hover:text-blue-300 transition-all duration-300 transform group-hover:-translate-x-0.5" />
              </Link>
            </div>

            {/* Client Info Column */}
            <div className="flex-grow flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="relative">
                  <ProfileAvatar
                    fileName={clientInfo?.profileDetails?.avatarFileName}
                    className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 shadow-lg"
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 rounded-full bg-green-500 border-2 border-slate-900"></div>
                </div>

                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                    {clientInfo?.profileDetails?.fullName ||
                      clientInfo?.userName}
                  </h1>
                  <p className="text-blue-300/80 text-sm sm:text-base">
                    {clientInfo?.email}
                  </p>
                </div>
              </div>

              <div className="mt-4 md:mt-0">
                <RemoveClient clientId={clientId} />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-4 sm:px-8 lg:px-10">
          <div className="flex overflow-x-auto scrollbar-hide space-x-2 sm:space-x-4 pb-2">
            <TabLink
              href={`/dashboard/clients/${clientId}/info`}
              icon={<MdInfo className="text-xl" />}
              label="Basic Info"
            />
            <TabLink
              href={`/dashboard/clients/${clientId}/measurements`}
              icon={<MdStraighten className="text-xl" />}
              label="Measurements"
            />
            <TabLink
              href={`/dashboard/clients/${clientId}/plans`}
              icon={<MdFitnessCenter className="text-xl" />}
              label="Workout Plans"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="px-4 sm:px-8 lg:px-10 pb-8 pt-4">
          <div className="bg-slate-800/50  rounded-xl p-5 sm:p-6 lg:p-8 min-h-[300px] border border-slate-700/50 shadow-inner">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function TabLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: ReactNode;
  label: string;
}) {
  return (
    <Link href={href} className="group flex-shrink-0 relative">
      <div className="flex items-center gap-2 px-4 py-3 rounded-t-lg bg-gradient-to-b from-blue-600/20 to-blue-700/20 hover:from-blue-600/30 hover:to-blue-700/30 border-t border-l border-r border-blue-500/20 transition-all duration-300">
        <span className="text-blue-300 group-hover:text-blue-200 transition-colors duration-300">
          {icon}
        </span>
        <span className="text-sm sm:text-base font-medium text-blue-100 group-hover:text-white transition-colors duration-300">
          {label}
        </span>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
    </Link>
  );
}
