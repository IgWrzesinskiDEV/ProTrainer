import ExerciseDetailsView from "@/components/exerciseDetails/ExerciseDetailsView";
import ExerciseWrapper from "@/components/UI/exercises/exerciseWrapper";
import { CustomExerciseDetails as ICustomExerciseDetails } from "@/interfaces/workout/IWorkout";
import { getExerciseDetailsById } from "@/utils/data/exercises/getExerciseById";
import { notFound } from "next/navigation";

export default async function ExerciseDetailsPage({
  params,
}: {
  params: Promise<{ exerciseId: string }>;
}) {
  const exerciseId = (await params).exerciseId;

  const exerciseDetails: ICustomExerciseDetails = await getExerciseDetailsById(
    exerciseId,
    true
  );
  if (!exerciseDetails) {
    notFound();
  }
  return (
    <ExerciseWrapper>
      <ExerciseDetailsView
        exerciseDetailJSON={JSON.stringify(exerciseDetails)}
        isCustom
      />
    </ExerciseWrapper>
  );
}
