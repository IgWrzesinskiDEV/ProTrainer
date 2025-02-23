"use server";

import { WorkoutDay } from "@/interfaces/workout/IWorkout";
import { Plan } from "@/lib/models/plan.model";
import { revalidatePath } from "next/cache";
import { AddWeekDataClientSchema } from "@/schemas/zSchemas";

export async function saveSingleDayExercisesClientData(
  singleDay: WorkoutDay,
  planId: string
) {
  const validateWeekData = AddWeekDataClientSchema.safeParse({
    weekData: singleDay.exercises.flatMap((exercise) =>
      exercise.weekData.map((weekData) => ({
        weekNumber: weekData.weekNumber,
        trainerData: weekData.trainerData,
        clientData: weekData.clientData,
      }))
    ),
  });

  if (!validateWeekData.success) {
    console.log(validateWeekData.error.errors);
    const errors = [
      ...new Set(validateWeekData.error.errors.map((error) => error.message)),
    ];
    console.log(errors);
    return { errors: errors };
  }

  try {
    const plan = await Plan.findById(planId);
    if (!plan) {
      return { errors: ["Plan not found"] };
    }
    plan.days = plan.days.map((day: WorkoutDay) => {
      if (day.weekDay === singleDay.weekDay) {
        return singleDay;
      }
      return day;
    });
    await plan.save();
    revalidatePath(`/dashboard/clients`);
    return { success: "Exercises saved" };
  } catch (e) {
    console.log(e);
    return { errors: ["Exercises not saved"] };
  }
}
