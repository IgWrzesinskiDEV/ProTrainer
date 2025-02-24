"use client";

import { useState } from "react";
import { LuSearch } from "react-icons/lu";
import ProfileWrapper from "../../profile/ProfileWrapper";
import ClientPreview from "../clients/ClientPreview";
import { IClientPreview } from "@/interfaces/clients/IClient";
import { acceptInvite, declineInvite } from "@/actions/trainers.actions";
export default function InviteList({
  clientsInvitations,
}: {
  clientsInvitations: string;
}) {
  const [searchValue, setSearchValue] = useState("");
  const clientsInvitationsList: IClientPreview[] =
    JSON.parse(clientsInvitations);
  const searchedClients = clientsInvitationsList.filter((client) =>
    client.userName.toLocaleLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <ProfileWrapper title="Invites" className="rounded-tr-none relative z-10">
      <div className="flex flex-col items-center gap-10 w-full">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            className="w-full px-4 py-2 pl-10 text-sm text-white  bg-gray-800 border border-gray-700 rounded-full focus:outline-none outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300"
            value={searchValue}
            onChange={(e) => setSearchValue(e.currentTarget.value)}
            placeholder="Search invites..."
          />
          <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        </div>
        <div className="flex flex-wrap gap-5 flex-1 justify-center w-full">
          {searchedClients.map((client) => (
            <ClientPreview
              client={client}
              key={client._id}
              isInvite={true}
              onAccept={acceptInvite}
              onDecline={declineInvite}
            />
          ))}
        </div>
      </div>
    </ProfileWrapper>
  );
}
