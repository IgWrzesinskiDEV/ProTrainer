import ClientInfo from "@/components/trainer-components/clients/info/ClientInfo";

export default async function ClientInfoPage({
  params,
}: {
  params: Promise<{ clientSlug: string }>;
}) {
  const clientId = (await params).clientSlug;
  return <ClientInfo clientId={clientId} />;
}
