import ClientPlans from "@/components/trainer-components/clients/plans/ClientPlans";
import { ExerciseDetailsShort } from "@/interfaces/workout/IWorkout";
import { getAvaliableExercisesNames } from "@/utils/data/getAvailableExercises";
import { getClientPlans } from "@/utils/data/getClientPlans";
export default async function ClientPlansPage({
  params,
}: {
  params: Promise<{ clientSlug: string }>;
}) {
  const clientId = (await params).clientSlug;
  const plans = await getClientPlans(clientId);
  const avaliableExercises: ExerciseDetailsShort[] =
    await getAvaliableExercisesNames();

  return (
    <ClientPlans
      clientId={clientId}
      clientPlans={JSON.stringify(plans)}
      availableExercises={JSON.stringify(avaliableExercises)}
    />
  );
}
