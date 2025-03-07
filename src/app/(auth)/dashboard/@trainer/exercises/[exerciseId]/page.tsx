import ExerciseDetailsView from "@/components/exerciseDetails/ExerciseDetailsView";
import { ExerciseDetails as IExerciseDetails } from "@/interfaces/workout/IWorkout";
import { getExerciseDetailsById } from "@/utils/data/getExerciseById";

export default async function ExerciseDetailsPage({
  params,
}: {
  params: Promise<{ exerciseId: string }>;
}) {
  const exerciseId = (await params).exerciseId;

  const exerciseDetails: IExerciseDetails =
    await getExerciseDetailsById(exerciseId);
  return (
    <ExerciseDetailsView exerciseDetailJSON={JSON.stringify(exerciseDetails)} />
  );
}
