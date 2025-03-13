import Exercises from "@/components/exercises/Exercises";
import { getAvaliableExercises } from "@/utils/data/exercises/getAvailableExercises";

export default async function ExerciseDetailsPage() {
  const exercises = JSON.stringify(await getAvaliableExercises());
  return <Exercises exercises={exercises} />;
}
