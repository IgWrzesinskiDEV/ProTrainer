import ExerciseDetailsModal from "@/components/trainer-components/clients/plans/ExerciseDetailsModal";
import { ExerciseDetails } from "@/interfaces/workout/IWorkout";
import { getExerciseDetailsById } from "@/utils/data/getExerciseById";

export default async function ExerciseModalPage({
  params,
}: {
  params: Promise<{ exerciseId: string }>;
}) {
  const exerciseId = (await params).exerciseId;

  const exerciseDetails: ExerciseDetails = await getExerciseDetailsById(
    exerciseId
  );
  console.log("in moidal");
  return (
    <ExerciseDetailsModal
      exerciseDetailsJSON={JSON.stringify(exerciseDetails)}
    />
  );
}
