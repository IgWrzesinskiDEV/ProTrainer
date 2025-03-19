"use client";

import { LuUsers } from "react-icons/lu";
import ClientPreview from "./ClientPreview";
import type { IClientPreview } from "@/interfaces/clients/IClient";
import ListWrapper from "@/components/UI/list/ListWrapper";

export default function ClientsList({ clients }: { clients: string }) {
  const clientsList: IClientPreview[] = JSON.parse(clients);

  return (
    <ListWrapper
      items={clientsList}
      renderItem={(client) => (
        <ClientPreview client={client} key={client._id} />
      )}
      itemsPerPage={12}
      placeholder="Search clients by name..."
      title="Your Clients"
      text="Manage and track your clients progress all in one place"
      Icon={<LuUsers className="text-blue-400" />}
      fallBackText="clients"
    />
  );
}
