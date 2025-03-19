"use client";

import ClientPreview from "../clients/ClientPreview";
import type { IClientPreview } from "@/interfaces/clients/IClient";
import { acceptInvite, declineInvite } from "@/actions/trainers.actions";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import ListWrapper from "@/components/UI/list/ListWrapper";

export default function InviteList({
  clientsInvitations,
}: {
  clientsInvitations: string;
}) {
  const clientsInvitationsList: IClientPreview[] =
    JSON.parse(clientsInvitations);

  return (
    <ListWrapper
      items={clientsInvitationsList}
      renderItem={(client) => (
        <ClientPreview
          client={client}
          isInvite
          onAccept={acceptInvite}
          onDecline={declineInvite}
        />
      )}
      itemsPerPage={12}
      placeholder="Search invites..."
      title="Client Invitations"
      text="Manage your pending client invitations"
      Icon={<AiOutlineUsergroupAdd className="text-blue-400" />}
      fallBackText="invites"
    />
  );
}
