import RemoveClient from "@/components/trainer-components/clients/RemoveClient";
import ProfileAvatar from "@/components/UI/ProfileAvatar";
import checkTrainerClient from "@/utils/data/checkTrainerClient";
import { getClientById } from "@/utils/data/getClients";
import Link from "next/link";
import { notFound } from "next/navigation";
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
}) {
  const clientId = (await params).clientSlug;
  await checkTrainerClient(clientId);
  const clientInfo = await getClientById(clientId);
  if (!clientInfo) {
    notFound();
  }

  return (
    <div className="w-full max-w-[100rem] mx-auto px-3 py-4 sm:px-4 md:px-6 md:py-6 lg:px-8 xl:px-12 lg:py-8">
      <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg sm:shadow-xl md:shadow-2xl overflow-hidden">
        {/* Header Section with Responsive Layout */}
        <div className="px-3 py-4 sm:px-6 sm:py-6 md:px-8 md:py-7 lg:px-10 xl:px-16 lg:py-8 xl:py-10">
          <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-0">
            {/* Back Button - Positioned differently on mobile vs desktop */}
            <div className="flex-shrink-0 sm:mr-4 lg:mr-6 self-start">
              <Link
                href="/dashboard/clients"
                className="group flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 lg:h-12 lg:w-12 rounded-full bg-blue-600/20 hover:bg-blue-600/30 transition-all duration-300 backdrop-blur-sm"
                aria-label="Back to clients"
              >
                <MdOutlineChevronLeft className="text-xl sm:text-2xl lg:text-3xl text-blue-400 group-hover:text-blue-300 transition-all duration-300 transform group-hover:-translate-x-0.5" />
              </Link>
            </div>

            {/* Client Info - Stacked on mobile, side by side on larger screens */}
            <div className="flex-grow flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
              <div className="flex items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8">
                <div className="relative">
                  <ProfileAvatar
                    fileName={clientInfo?.profileDetails?.avatarFileName}
                    className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 shadow-lg"
                  />
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 rounded-full bg-green-500 border-2 border-slate-900"></div>
                </div>

                <div>
                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white tracking-tight">
                    {clientInfo?.profileDetails?.fullName ||
                      clientInfo?.userName}
                  </h1>
                  <p className="text-blue-300/80 text-xs sm:text-sm md:text-base lg:text-lg">
                    {clientInfo?.email}
                  </p>
                </div>
              </div>

              <div className="sm:mt-0">
                <RemoveClient clientId={clientId} />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs - Static, no horizontal scrolling, responsive for all screen sizes */}
        <div className="px-3 sm:px-6 md:px-8 lg:px-10 xl:px-16">
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2 md:gap-4 lg:gap-6 pb-2">
            <TabLink
              href={`/dashboard/clients/${clientId}/info`}
              icon={<MdInfo className="text-lg sm:text-xl lg:text-2xl" />}
              label="Info"
              fullLabel="Basic Info"
            />
            <TabLink
              href={`/dashboard/clients/${clientId}/measurements`}
              icon={<MdStraighten className="text-lg sm:text-xl lg:text-2xl" />}
              label="Measures"
              fullLabel="Measurements"
            />
            <TabLink
              href={`/dashboard/clients/${clientId}/plans`}
              icon={
                <MdFitnessCenter className="text-lg sm:text-xl lg:text-2xl" />
              }
              label="Plans"
              fullLabel="Workout Plans"
            />
          </div>
        </div>

        {/* Content Section - Responsive padding */}
        <div className="px-3 sm:px-6 md:px-8 lg:px-10 xl:px-16 pb-6 sm:pb-8 lg:pb-12 pt-3 sm:pt-4 lg:pt-6">
          <div className="bg-slate-800/50 rounded-lg sm:rounded-xl p-3 sm:p-5 md:p-6 lg:p-8 xl:p-10 min-h-[250px] sm:min-h-[300px] lg:min-h-[400px] border border-slate-700/50 shadow-inner">
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
  fullLabel,
}: {
  href: string;
  icon: ReactNode;
  label: string;
  fullLabel: string;
}) {
  return (
    <Link href={href} className="group relative">
      <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-0.5 sm:gap-1.5 lg:gap-3 px-1  sm:px-3 md:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 rounded-t-lg bg-gradient-to-b from-blue-600/20 to-blue-700/20 hover:from-blue-600/30 hover:to-blue-700/30 border-t border-l border-r border-blue-500/20 transition-all duration-300 text-center sm:text-left">
        <span className="text-blue-300 group-hover:text-blue-200 transition-colors duration-300">
          {icon}
        </span>
        <span className="text-xs sm:hidden font-medium text-blue-100 group-hover:text-white transition-colors duration-300">
          {label}
        </span>
        <span className="hidden sm:inline sm:text-sm md:text-base lg:text-lg font-medium text-blue-100 group-hover:text-white transition-colors duration-300">
          {fullLabel}
        </span>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
    </Link>
  );
}
