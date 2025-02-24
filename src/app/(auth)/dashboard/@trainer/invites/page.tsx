import InviteList from "@/components/trainer-components/Invites/InvitesList";
import { getClients } from "@/utils/data/getClients";

export default async function InvitesPage() {
  const clients = JSON.stringify(await getClients(true));

  return <InviteList clientsInvitations={clients} />;
}
