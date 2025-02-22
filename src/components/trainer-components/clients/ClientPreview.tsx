import Link from "next/link";
import { Avatar } from "@mui/material";
import { IClientPreview } from "@/interfaces/clients/IClient";
import { LuUser } from "react-icons/lu";
export default function ClientPreview({ client }: { client: IClientPreview }) {
  //   let shortclientBio = undefined;
  //   if (client?.clientDetails?.socialAndExpiriance?.experience) {
  //     shortclientBio =
  //       client?.clientDetails?.socialAndExpiriance?.experience
  //         ?.split(" ")
  //         .slice(0, 10)
  //         .join(" ") + "..." || "";
  //   }

  return (
    <Link
      href={`/dashboard/clients/${client._id}/info`}
      key={client._id}
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg w-[24%] hover:shadow-blue-500/20 transition-all duration-300 flex flex-col"
    >
      <div className="p-6 flex flex-col h-full">
        <div className="flex items-center mb-4">
          <div className="relative w-16 h-16 mr-4">
            {client?.profileDetails?.avatarFileName ? (
              <Avatar
                src={
                  client?.profileDetails?.avatarFileName
                    ? `https://pro-client-app.s3.eu-north-1.amazonaws.com/${client.profileDetails.avatarFileName}`
                    : undefined
                }
                alt="The image selected by the user."
                className="w-16 h-16 object-cover "
              />
            ) : (
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                <LuUser size={32} className="text-white" />
              </div>
            )}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">
              {client?.profileDetails?.fullName || client.userName}
            </h2>
            <p className="text-gray-400 font-thin   ">{client?.email}</p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-end">
          <span className="text-blue-400 text-sm">View Profile</span>
        </div>
      </div>
    </Link>
  );
}
