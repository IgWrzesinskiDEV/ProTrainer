"use server";

import {
  AddExercisesSchema,
  AddWeekDataSchema,
  NewEmptyPlanSchema,
} from "@/schemas/zSchemas";
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
  const validateExerciseData = AddExercisesSchema.safeParse({
    exercises: singleDay.exercises.map((exercise) => ({
      exerciseName: exercise.name,
      tempo: exercise.tempo,
    })),
  });
  if (!validateExerciseData.success) {
    const errors = [
      ...new Set(
        validateExerciseData.error.errors.map((error) => error.message)
      ),
    ];

    return { errors: errors };
  }
  const validateWeekData = AddWeekDataSchema.safeParse({
    weekData: singleDay.exercises.flatMap((exercise) =>
      exercise.weekData.map((weekData) => ({
        weekNumber: weekData.weekNumber,
        trainerData: weekData.trainerData,
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

  const hasEmptyTrainerData = singleDay.exercises.some((exercise) =>
    exercise.weekData.some((weekData) => !weekData.trainerData)
  );

  if (hasEmptyTrainerData) {
    return { errors: ["Trainer data required"] };
  }
  // const validateWeekData = AddWeekDataSchema.safeParse({
  //   weekData: singleDay.exercises[0].weekData.map((weekData) => ({
  //     weekNumber: weekData.weekNumber,
  //     trainerData: weekData.trainerData,
  //     userData: weekData.userData,
  //   })),
  // });

  // if (!validateWeekData.success) {
  //   const errors = [
  //     ...new Set(validateWeekData.error.errors.map((error) => error.message)),
  //   ];

  //   return { errors: errors };
  // }
  console.log(singleDay.exercises[0]);
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

export async function deletePlan(planId: string, clientId: string) {
  try {
    const client = await User.findById(clientId);
    if (!client) {
      throw new Error("Client not found");
    }
    client.plansIds = client.plansIds.filter((id: string) => id !== planId);
    await client.save();
    await Plan.findByIdAndDelete(planId);
    revalidatePath(`/dashboard/clients/${clientId}/plans`);
    return { success: "Plan deleted" };
  } catch {
    throw new Error("Plan not deleted");
  }
}

export async function addEmptyWeek(planId: string, clientId: string) {
  try {
    const plan = await Plan.findById(planId);
    if (!plan) {
      throw new Error("Plan not found");
    }
    plan.weekCount += 1;
    plan.days.forEach((day: WorkoutDay) => {
      day.exercises.forEach((exercise) => {
        exercise.weekData.push({ weekNumber: plan.weekCount });
      });
    });
    await plan.save();
    revalidatePath(`/dashboard/clients/${clientId}/plans`);
  } catch {
    throw new Error("Week not added");
  }
}

export async function deleteLatestWeek(planId: string, clientId: string) {
  try {
    const plan = await Plan.findById(planId);
    if (!plan) {
      throw new Error("Plan not found");
    }
    plan.weekCount -= 1;
    plan.days.forEach((day: WorkoutDay) => {
      day.exercises.forEach((exercise) => {
        exercise.weekData.pop();
      });
    });
    await plan.save();
    revalidatePath(`/dashboard/clients/${clientId}/plans`);
  } catch {
    throw new Error("Week not deleted");
  }
}
