"use client";

import Link from "next/link";
import { LuUser, LuChevronRight, LuCheck, LuX, LuClock } from "react-icons/lu";
import type { IClientPreview } from "@/interfaces/clients/IClient";
import { Avatar } from "@mui/material";
import useTransitionWithError from "@/hooks/useTrainsitionWithError";
import CustomToastContent from "@/components/UI/toastify/CustomToast";
import { RiUserAddLine } from "react-icons/ri";

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
  console.log(client);
  const content = (
    <div className="p-6 flex flex-col h-full relative group">
      {/* Hover Effect Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-blue-500/5 via-transparent to-transparent 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />

      <div className="relative flex items-start space-x-4">
        <div className="relative flex-shrink-0">
          {client?.profileDetails?.avatarFileName ? (
            <div
              className="w-16 h-16 rounded-2xl overflow-hidden 
                           transition-all duration-300"
            >
              <Avatar
                src={`${process.env.NEXT_PUBLIC_AWS_BASE_URL}/${client.profileDetails.avatarFileName}`}
                alt={client?.profileDetails?.fullName || client.userName}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div
              className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 
                          rounded-2xl flex items-center justify-center ring-2 
                          ring-gray-700/50 group-hover:ring-blue-500/50 
                          transition-all duration-300"
            >
              <LuUser className="w-8 h-8 text-white" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h2
            className="text-xl font-semibold text-white truncate 
                       group-hover:text-blue-400 transition-colors duration-300"
          >
            {client?.profileDetails?.fullName || client.userName}
          </h2>
          <p className="text-gray-400 text-sm mt-1 truncate">{client?.email}</p>
          {!isInvite && (
            <div
              className="mt-4 inline-flex items-center text-blue-400 text-sm 
                          font-medium group-hover:text-blue-300 transition-colors duration-300"
            >
              <span>View Profile</span>
              <LuChevronRight
                className="ml-1 w-4 h-4 transform group-hover:translate-x-0.5 
                                     transition-transform duration-300"
              />
            </div>
          )}
        </div>
      </div>

      {isInvite && (
        <div className="mt-6 pt-4 border-t border-gray-700/50">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-blue-400">
                <LuClock className="w-4 h-4" />
                <span>Pending Invitation</span>
              </div>
              <div className="h-2 w-2 bg-blue-400 rounded-full animate-pulse" />
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onAcceptClick}
                disabled={isAcceptPending || isDeclinePending}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 
                         bg-gradient-to-r from-blue-500 to-blue-600
                         hover:from-blue-600 hover:to-blue-700
                         text-white font-medium rounded-xl
                         transform transition-all duration-200 
                         hover:shadow-lg hover:shadow-blue-500/25
                         active:scale-95 disabled:opacity-50
                         disabled:cursor-not-allowed disabled:hover:shadow-none
                         disabled:hover:scale-100"
              >
                <LuCheck className="w-4 h-4" />
                <span>Accept</span>
              </button>

              <button
                onClick={onDeclineClick}
                disabled={isDeclinePending || isAcceptPending}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5
                         bg-gray-800 hover:bg-gray-700
                         text-gray-300 font-medium rounded-xl
                         transform transition-all duration-200
                         hover:shadow-lg hover:shadow-gray-900/25
                         active:scale-95 disabled:opacity-50
                         disabled:cursor-not-allowed disabled:hover:shadow-none
                         disabled:hover:scale-100
                         border border-gray-700 hover:border-gray-600"
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
    relative overflow-hidden
    bg-gray-800/95 backdrop-blur-sm
    rounded-xl
    shadow-lg hover:shadow-xl
    hover:shadow-blue-500/10
    border border-gray-700/50
    hover:border-blue-500/20
    transition-all duration-300
    transform hover:-translate-y-1
  `;

  return !isInvite ? (
    <Link
      href={`/dashboard/clients/${client._id}/info`}
      key={client._id}
      className={containerClasses + " block"}
    >
      {content}
    </Link>
  ) : (
    <div key={client._id} className={containerClasses}>
      {content}
    </div>
  );
}
