import SingleTrainer from "@/components/client-components/SingleTrainer";
export default async function TrainerPage({
  params,
}: {
  params: Promise<{ trainerSlug: string }>;
}) {
  return <SingleTrainer params={params} />;
}
