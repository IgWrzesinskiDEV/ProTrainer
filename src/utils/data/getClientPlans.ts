"use server";

import { User } from "@/lib/models/user.model";
import { Plan } from "@/lib/models/plan.model";
import { WeekDays, WorkoutDay } from "@/interfaces/workout/IWorkout";

interface IClientPlans {
  _id: string;
  plansIds: string[];
}

export async function getClientPlans(clientId: string) {
  try {
    const clientPlansIds: IClientPlans | null = await User.findById(
      clientId,
      "plansIds"
    );

    if (!clientPlansIds?.plansIds) return [];

    const clientPlans = await Plan.find({
      _id: { $in: clientPlansIds.plansIds },
    });
    return clientPlans;
  } catch {
    return [];
  }
}

export async function getSinglePlanDay(planId: string, day: WeekDays) {
  try {
    const plan = await Plan.findById(planId, "days weekCount");
    if (!plan) return null;
    const singleDay = plan.days.find(
      (dayData: WorkoutDay) => dayData.weekDay === day
    );
    if (!singleDay || singleDay.isRestDay)
      return { isRestDay: singleDay.isRestDay };

    return {
      singleDay,
      weekCount: plan.weekCount,
      isRestDay: singleDay.isRestDay,
    };
  } catch {
    return null;
  }
}
