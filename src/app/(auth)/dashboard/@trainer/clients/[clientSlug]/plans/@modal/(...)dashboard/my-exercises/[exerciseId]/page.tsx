import ExerciseDetailsModal from "@/components/trainer-components/clients/plans/ExerciseDetailsModal";
import { ExerciseDetails } from "@/interfaces/workout/IWorkout";
import { getExerciseDetailsById } from "@/utils/data/exercises/getExerciseById";
import { notFound } from "next/navigation";

export default async function CustomExerciseModalPage({
  params,
}: {
  params: Promise<{ exerciseId: string }>;
}) {
  const exerciseId = (await params).exerciseId;

  const exerciseDetails: ExerciseDetails = await getExerciseDetailsById(
    exerciseId,
    true
  );
  if (!exerciseDetails) {
    notFound();
  }
  return (
    <ExerciseDetailsModal
      exerciseDetailsJSON={JSON.stringify(exerciseDetails)}
      isCustom
    />
  );
}
