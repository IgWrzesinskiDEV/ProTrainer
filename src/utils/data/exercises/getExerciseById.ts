import { CustomExercise } from "@/lib/models/customExercise.model";
import { Exercise } from "@/lib/models/exercise.model";

export async function getExerciseDetailsById(
  exerciseId: string,
  isCustom?: boolean
) {
  try {
    if (isCustom) {
      const exerciseDetails = await CustomExercise.findById(exerciseId);
      if (!exerciseDetails) return null;
      return exerciseDetails;
    }

    const exerciseDetails = await Exercise.findById(exerciseId);
    if (!exerciseDetails) return null;

    return exerciseDetails;
  } catch {
    return null;
  }
}
