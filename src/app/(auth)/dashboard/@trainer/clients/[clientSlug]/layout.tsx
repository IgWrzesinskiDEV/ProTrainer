import ClientNav from "@/components/trainer-components/clients/ClientNav";
import RemoveClient from "@/components/trainer-components/clients/RemoveClient";
import ProfileAvatar from "@/components/UI/ProfileAvatar";
import checkTrainerClient from "@/utils/data/checkTrainerClient";
import { getClientById } from "@/utils/data/getClients";
import { ReactNode } from "react";

export default async function clientLayout({
  params,
  children,
}: {
  params: Promise<{ clientSlug: string }>;
  children: ReactNode;
}) {
  const clientId = (await params).clientSlug;
  await checkTrainerClient(clientId);
  const clientInfo = await getClientById(clientId);
  console.log(clientInfo);

  return (
    <div className="mx-auto p-6 min-h-[60vh] bg-gray-800 rounded-xl rounded-tl-none shadow-lg text-white">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
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

      <div className="bg-gray-700 p-6 rounded-lg min-h-[300px]">{children}</div>
    </div>
  );
}
