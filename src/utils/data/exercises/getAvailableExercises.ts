"use server";

import { Exercise } from "@/lib/models/exercise.model";
import { CustomExercise } from "@/lib/models/customExercise.model";
export async function getAvaliableExercisesNames(isCustom?: boolean) {
  if (isCustom) {
    const avaliableExercises = await CustomExercise.find({}, "name trainerId");
    return avaliableExercises;
  }
  const avaliableExercises = await Exercise.find({}, "name");
  return avaliableExercises;
}

export async function getAvaliableExercises(isCustom?: boolean) {
  if (isCustom) {
    const avaliableExercises = await CustomExercise.find({});
    return avaliableExercises;
  }
  const avaliableExercises = await Exercise.find({});
  return avaliableExercises;
}
