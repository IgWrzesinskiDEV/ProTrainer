import { Exercise } from "@/lib/models/exercise.model";

export async function getExerciseDetailsById(exerciseId: string) {
  try {
    const exerciseDetails = await Exercise.findById(exerciseId);
    if (!exerciseDetails) return null;

    return exerciseDetails;
  } catch {
    return null;
  }
}
