"use server";

import { destroySession, verifyAuth } from "@/lib/lucia/auth";
import { DeleteAccount } from "@/schemas/zSchemas";
import { User } from "@/lib/models/user.model";
import { redirect } from "next/navigation";
import { MeasurementModel } from "@/lib/models/measurement.model";
import { Plan } from "@/lib/models/plan.model";

export async function deleteAccount(prevState: unknown, formData: FormData) {
  const validateData = DeleteAccount.safeParse({
    deleteConfirm: formData.get("deleteConfirm") as string,
  });
  if (!validateData.success) {
    const errors = validateData.error.errors.map((error) => error.message);
    return { errors: errors };
  }

  const id = (await verifyAuth()).user?.id;

  const existingUser = await User.findById(id);
  console.log(existingUser);
  if (!existingUser || !id) {
    return { errors: ["User not found"] };
  }
  const plansIds = existingUser?.plansIds;
  if (plansIds) {
    await Plan.deleteMany({ _id: { $in: plansIds } });
  }
  const currentTrainer = existingUser.currentTrainer;
  if (currentTrainer) {
    await User.updateOne(
      { _id: currentTrainer },
      { $pull: { "trainerDetails.clients": id } }
    );
  }
  await MeasurementModel.deleteOne({ userId: id });

  await User.deleteOne({ _id: id });
  await destroySession();
  redirect("/auth/login");
}
