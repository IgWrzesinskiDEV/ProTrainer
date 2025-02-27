import ClientNav from "@/components/trainer-components/clients/ClientNav";
import RemoveClient from "@/components/trainer-components/clients/RemoveClient";
import ProfileAvatar from "@/components/UI/ProfileAvatar";
import checkTrainerClient from "@/utils/data/checkTrainerClient";
import { getClientById } from "@/utils/data/getClients";
import Link from "next/link";
import { ReactNode } from "react";
import { MdOutlineChevronLeft } from "react-icons/md";

export default async function clientLayout({
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
    <div className="mx-auto   min-h-[60vh] pb-6 bg-gray-800 rounded-xl rounded-tl-none shadow-lg text-white">
      <div className="p-6 relative">
        <Link
          href="/dashboard/clients"
          className="group absolute left-0 top-1/5 h-1/3 w-10 flex items-center justify-center bg-blue-500/30 hover:bg-blue-500/50 transition-all duration-300 "
        >
          <MdOutlineChevronLeft className="text-4xl text-white/70 group-hover:text-white transition-all duration-300 transform group-hover:-translate-x-1" />
        </Link>
        {/* <div className="ml-10"> */}
        <div className="flex items-center ml-10  justify-between mb-8">
          <div className="flex items-center ">
            <ProfileAvatar
              fileName={clientInfo?.profileDetails?.avatarFileName}
              className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold"
            />

            <div className="ml-6">
              <h1 className="text-3xl font-bold text-white">
                {clientInfo?.profileDetails?.fullName || clientInfo?.userName}
              </h1>
              <p className="text-gray-400 font-thin">{clientInfo?.email}</p>
            </div>
          </div>

          <RemoveClient clientId={clientId} />
        </div>

        <ClientNav clientId={clientId} />
        {/* </div> */}
      </div>
      <div className="bg-gray-700 p-6 mx-6 mb-3 rounded-lg min-h-[300px]">
        {children}
      </div>
    </div>
  );
}
