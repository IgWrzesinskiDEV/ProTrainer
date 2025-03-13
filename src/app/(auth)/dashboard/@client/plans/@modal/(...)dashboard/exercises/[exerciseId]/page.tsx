import ExerciseDetailsModal from "@/components/trainer-components/clients/plans/ExerciseDetailsModal";
import { ExerciseDetails } from "@/interfaces/workout/IWorkout";
import { getExerciseDetailsById } from "@/utils/data/exercises/getExerciseById";

export default async function ExerciseModalPage({
  params,
}: {
  params: Promise<{ exerciseId: string }>;
}) {
  const exerciseId = (await params).exerciseId;

  const exerciseDetails: ExerciseDetails = await getExerciseDetailsById(
    exerciseId,
    false
  );

  return (
    <ExerciseDetailsModal
      exerciseDetailsJSON={JSON.stringify(exerciseDetails)}
      isCustom={false}
    />
  );
}
