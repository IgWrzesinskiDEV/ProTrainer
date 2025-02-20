"use server";

import { Plan } from "@/lib/models/plan.model";
import {
  WeekDays,
  WorkoutDay,
  Exercise,
  WorkoutPlan,
} from "@/interfaces/workout/IWorkout";
import { generateIdFromEntropySize } from "lucia";
export async function createEmptyPlan(planName: string) {
  const days: WorkoutDay[] = Object.values(WeekDays).map((day) => {
    return {
      weekDay: day,
      isRestDay: false,
      exercises: [] as Exercise[],
    };
  });

  const newPlan: WorkoutPlan = await Plan.create({
    _id: generateIdFromEntropySize(24),
    planName: planName,
    days: days,
    weekCount: 0,
  });

  return newPlan;
}
