import ClientMeasurements from "@/components/trainer-components/clients/measurements/ClientMeasurements";

export default async function ClientMeasurementsPage({
  params,
}: {
  params: Promise<{ clientSlug: string }>;
}) {
  const clientId = (await params).clientSlug;
  return <ClientMeasurements clientId={clientId} />;
}
