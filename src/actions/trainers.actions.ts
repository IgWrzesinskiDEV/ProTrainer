"use server";

import { verifyAuth } from "@/lib/lucia/auth";
import { User } from "@/lib/models/user.model";
import { TrainerAdditionalDataHeadingType } from "@/interfaces/trainers/ITrainer";
export async function addTrainer(trainerId: string) {
  console.log(trainerId);
  const { user } = await verifyAuth();
  const userId = user?.id;
  await User.findByIdAndUpdate(userId, { currentTrainer: trainerId });
  console.log("trainer added");
  await User.findByIdAndUpdate(trainerId, {
    $push: { "trainerDetails.clients": userId },
  });
  console.log("client added");
}

export async function addAdditionalTrainerData(
  prevState: unknown,
  formData: FormData,
  heading: TrainerAdditionalDataHeadingType
) {
  const formDataArray = formData.getAll("trainerDetails");

  const { user } = await verifyAuth();
  const userId = user?.id;
  console.log(heading);
  console.log(formDataArray);
  await User.findByIdAndUpdate(userId, {
    trainerDetails: { [heading]: formDataArray },
  });
  return { success: "Data saved" };
}
