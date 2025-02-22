import { getClientById } from "@/utils/data/getClients";

export default async function ClientInfo({ clientId }: { clientId: string }) {
  const clientInfo = await getClientById(clientId);
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-white">About Me</h2>
      <p className="text-gray-300">
        {clientInfo?.profileDetails?.bio ||
          "This client has not added an about me yet."}
      </p>
    </div>
  );
}
