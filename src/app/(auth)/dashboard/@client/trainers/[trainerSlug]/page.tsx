import SingleTrainer from "@/components/trainers/SingleTrainer";
export default async function TrainerPage({
  params,
}: {
  params: Promise<{ trainerSlug: string }>;
}) {
  return <SingleTrainer params={params} />;
}
