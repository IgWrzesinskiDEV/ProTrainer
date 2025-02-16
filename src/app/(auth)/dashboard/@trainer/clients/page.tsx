import ClientsList from "@/components/trainer-components/clients/Clients";
import { getClients } from "@/utils/data/getClients";
export default async function ClientsPage() {
  const clients = JSON.stringify(await getClients());

  return <ClientsList clients={clients} />;
}
