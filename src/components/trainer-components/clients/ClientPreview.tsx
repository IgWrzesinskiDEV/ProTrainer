import Link from "next/link";
import { LuUser, LuChevronRight, LuCheck, LuX } from "react-icons/lu";
import type { IClientPreview } from "@/interfaces/clients/IClient";
import { Avatar } from "@mui/material";
import { useTransition } from "react";
import { toastify } from "@/components/UI/Toastify";
import CustomToastContent from "@/components/UI/toastify/CustomToast";
import { RiUserAddLine } from "react-icons/ri";
import { TbFaceIdError } from "react-icons/tb";
import useTransitionWithError from "@/hooks/useTrainsitionWithError";
export default function ClientPreview({
  client,
  isInvite = false,
  onAccept,
  onDecline,
}: {
  client: IClientPreview;
  isInvite?: boolean;
  onAccept?: (clientId: string) => Promise<void>;
  onDecline?: (clientId: string) => Promise<void>;
}) {
  //const [isPending, startTransition] = useTransition();
  const { isPending: isAcceptPending, onClickHandler: onAcceptClick } =
    useTransitionWithError(
      <CustomToastContent
        message="Client added!"
        CustomIcon={<RiUserAddLine className="text-2xl text-green-500" />}
      />,
      () => (onAccept ? onAccept(client._id) : Promise.resolve())
    );
  const { isPending: isDeclinePending, onClickHandler: onDeclineClick } =
    useTransitionWithError(
      <CustomToastContent
        message="Client declined!"
        CustomIcon={<LuX className="text-2xl text-red-500" />}
      />,
      () => (onDecline ? onDecline(client._id) : Promise.resolve())
    );
  const content = (
    <div className="p-6 flex flex-col h-full">
      <div className="flex items-start space-x-4">
        <div className="relative group">
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
          <div className="absolute inset-0 rounded-full bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-semibold text-white truncate group-hover:text-blue-400 transition-colors duration-300">
            {client?.profileDetails?.fullName || client.userName}
          </h2>
          <p className="text-gray-400 text-sm mt-1 truncate">{client?.email}</p>
          {!isInvite && (
            <div className="mt-4 inline-flex items-center text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors duration-300">
              <span>View Profile</span>
              <LuChevronRight className="ml-1 w-4 h-4" />
            </div>
          )}
        </div>
      </div>

      {isInvite && (
        <div className="mt-6 pt-4 border-t border-gray-700/50">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center justify-between text-sm text-gray-400">
              <span>Client Invitation</span>
              <div className="h-2 w-2 bg-blue-400 rounded-full animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={onAcceptClick}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 
                  bg-blue-500 hover:bg-blue-600 active:bg-blue-700
                  text-white font-medium rounded-lg
                  transform transition-all duration-200 
                  hover:shadow-lg hover:shadow-blue-500/25
                  active:scale-95"
              >
                <LuCheck className="w-4 h-4" />
                <span>Accept</span>
              </button>
              <button
                onClick={onDeclineClick}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5
                  bg-gray-700 hover:bg-gray-600 active:bg-gray-800
                  text-gray-300 font-medium rounded-lg
                  transform transition-all duration-200
                  hover:shadow-lg hover:shadow-gray-800/25
                  active:scale-95
                  border border-gray-600"
              >
                <LuX className="w-4 h-4" />
                <span>Decline</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const containerClasses = `
    bg-gray-800/95 backdrop-blur-sm
    rounded-lg overflow-hidden
    shadow-lg hover:shadow-xl
    hover:shadow-blue-500/10
    border border-gray-700/50
    hover:border-blue-500/20
    transition-all duration-300
    w-full sm:w-[48%] lg:w-[32%] xl:w-[24%]
    transform hover:-translate-y-1
  `;

  return !isInvite ? (
    <Link
      href={`/dashboard/clients/${client._id}/info`}
      key={client._id}
      className={containerClasses}
    >
      {content}
    </Link>
  ) : (
    <div key={client._id} className={containerClasses}>
      {content}
    </div>
  );
}

// () =>
//   startTransition(async () => {
//     try {
//       await onAccept?.(client._id);
//       toastify(
//         <CustomToastContent
//           message="Client added!"
//           CustomIcon={
//             <RiUserAddLine className="text-2xl text-green-500" />
//           }
//         />,
//         3000
//       );
//     } catch (e) {
//       toastify(
//         <CustomToastContent
//           message={e instanceof Error ? e.message : String(e)}
//           CustomIcon={
//             <TbFaceIdError className="text-2xl text-red-500" />
//           }
//         />,
//         3000
//       );
//     }
//   })
