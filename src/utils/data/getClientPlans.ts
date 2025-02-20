"use server";

import { User } from "@/lib/models/user.model";
import { Plan } from "@/lib/models/plan.model";

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
