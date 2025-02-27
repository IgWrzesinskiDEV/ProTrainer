"use server";

import { Exercise } from "@/lib/models/exercise.model";

export async function getAvaliableExercisesNames() {
  const avaliableExercises = await Exercise.find({}, "name ");
  return avaliableExercises;
}
