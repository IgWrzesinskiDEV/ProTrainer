import ClientNav from "@/components/trainer-components/clients/ClientNav";
import { ReactNode } from "react";

export default async function clientLayout({
  params,
  children,
}: {
  params: Promise<{ clientSlug: string }>;
  children: ReactNode;
}) {
  const clientId = (await params).clientSlug;

  return (
    <div className=" mx-auto p-6 min-h-[60vh] bg-gray-800 rounded-xl rounded-tl-none shadow-lg text-white">
      <div className="flex items-center mb-8">
        <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
          {/* {clientData.username.charAt(0)} */}J
        </div>
        <div className="ml-6">
          <h1 className="text-3xl font-bold text-white">
            {/* {clientData.username} */}
            John doe
          </h1>
          <p className="text-gray-300">
            {/* {clientData.email} */}
            john@doe.pl
          </p>
        </div>
      </div>

      <ClientNav clientId={clientId} />

      <div className="bg-gray-700 p-6 rounded-lg min-h-[300px]">{children}</div>
    </div>
  );
}
