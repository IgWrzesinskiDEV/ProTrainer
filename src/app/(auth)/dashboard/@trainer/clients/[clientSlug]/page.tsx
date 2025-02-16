import SingleClient from "@/components/trainer-components/clients/SingleClient";
export default async function ClientPage({
  params,
}: {
  params: Promise<{ clientSlug: string }>;
}) {
  return <SingleClient params={params} />;
}
