import Exercises from "@/components/exercises/Exercises";
import { getAvaliableExercises } from "@/utils/data/exercises/getAvailableExercises";

export default async function CustomExerciseDetailsPage() {
  const customExercises = JSON.stringify(await getAvaliableExercises(true));
  return <Exercises exercises={customExercises} isCustom />;
}
