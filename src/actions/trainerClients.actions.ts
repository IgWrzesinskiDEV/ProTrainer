"use server";

import { AddExercisesSchema, NewEmptyPlanSchema } from "@/schemas/zSchemas";
import { createEmptyPlan } from "@/utils/data/createEmptyPlan";
import { revalidatePath } from "next/cache";
import { User } from "@/lib/models/user.model";
import { WeekDays, WorkoutDay } from "@/interfaces/workout/IWorkout";
import { Plan } from "@/lib/models/plan.model";
export async function addEmptyWorkoutPlan(
  prevState: unknown,
  formData: FormData,
  clientId: string
) {
  const validateData = NewEmptyPlanSchema.safeParse({
    planName: formData.get("planName"),
  });
  if (!validateData.success) {
    return { errors: [validateData.error.errors[0].message] };
  }

  try {
    const newPlan = await createEmptyPlan(validateData.data.planName);

    if (!newPlan) {
      return { errors: ["Plan not created"] };
    }
    const client = await User.findById(clientId);
    if (!client) {
      return { errors: ["Client not found"] };
    }
    if (client.plansIds) {
      client.plansIds.push(newPlan._id);
    } else {
      client.plansIds = [newPlan._id];
    }
    await client.save();

    revalidatePath(`/dashboard/clients/${clientId}/plans`);
    return { success: "Plan created" };
  } catch {
    return { errors: ["Plan not created"] };
  }
}

export async function saveSingleDayExercises(
  singleDay: WorkoutDay,
  planId: string
) {
  const validateData = AddExercisesSchema.safeParse({
    exercises: singleDay.exercises.map((exercise) => ({
      exerciseName: exercise.name,
      tempo: exercise.tempo,
    })),
  });
  if (!validateData.success) {
    const errors = [
      ...new Set(validateData.error.errors.map((error) => error.message)),
    ];

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
  } catch {
    return { errors: ["Exercises not saved"] };
  }
}

export async function saveSingleDayRestDay(weekDay: WeekDays, planId: string) {
  try {
    const plan = await Plan.findById(planId);
    if (!plan) {
      console.error("Plan not found");
    }
    plan.days = plan.days.map((day: WorkoutDay) => {
      if (day.weekDay === weekDay) {
        day.isRestDay = !day.isRestDay;
        return day;
      }
      return day;
    });
    await plan.save();
    revalidatePath(`/dashboard/clients`);
  } catch {}
}
