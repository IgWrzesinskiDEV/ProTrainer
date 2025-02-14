"use server";

import { verifyAuth } from "@/lib/lucia/auth";
import { User } from "@/lib/models/user.model";
import { TrainerAdditionalDataHeadingType } from "@/interfaces/trainers/ITrainer";
import { revalidatePath } from "next/cache";
import {
  TrainerAdditionalDataSchema,
  TrainerSocialMediaSchema,
} from "@/schemas/zSchemas";
import convertSocialMediaDatatoDB from "@/utils/convertSocialMediaDatatoDB";

export async function addTrainer(trainerId: string) {
  console.log(trainerId);
  const { user } = await verifyAuth();
  const userId = user?.id;
  await User.findByIdAndUpdate(userId, { currentTrainer: trainerId });

  await User.findByIdAndUpdate(trainerId, {
    $push: { "trainerDetails.clients": userId },
  });
}

export async function addAdditionalTrainerData(
  prevState: unknown,
  formData: FormData,
  heading: TrainerAdditionalDataHeadingType
) {
  const validateData = TrainerAdditionalDataSchema.safeParse({
    trainerDetails: formData.getAll("trainerDetails"),
  });

  if (!validateData.success) {
    const errors = validateData.error.errors.map((error) => error.message);
    return { errors: errors };
  }

  const { user } = await verifyAuth();
  const userId = user?.id;

  try {
    const trainer = await User.findById(userId);
    if (!trainer) {
      return { errors: ["Trainer not found"] };
    }
    if (!trainer.trainerDetails) {
      trainer.trainerDetails = {};
    }

    trainer.trainerDetails[heading] = validateData.data.trainerDetails;
    await trainer.save();

    revalidatePath("/dashboard/trainer-profile");
    return { success: "Data saved" };
  } catch (e) {
    console.log(e);
    return { errors: ["Data not saved"] };
  }
}

export async function removeAdditionalTrainerData(
  heading: TrainerAdditionalDataHeadingType,
  dataIndex: number
) {
  const { user } = await verifyAuth();
  const userId = user?.id;

  try {
    const trainer = await User.findById(userId);
    if (!trainer) {
      return { error: "Trainer not found" };
    }
    trainer.trainerDetails[heading].splice(dataIndex, 1);
    await trainer.save();

    revalidatePath("/dashboard/trainer-profile");
    return { success: "Data removed" };
  } catch {
    return { error: "Data not removed" };
  }
}

export async function addSocialMediaTrainerData(
  prevState: unknown,
  formData: FormData
) {
  const validateData = TrainerSocialMediaSchema.safeParse({
    instagram: formData.get("instagram"),
    facebook: formData.get("facebook"),
    whatsapp: formData.get("whatsapp"),
    experience: formData.get("experience"),
    specialization: formData.get("specialization"),
    onSite: formData.get("onSite") === "on" ? true : false,
    online: formData.get("online") === "on" ? true : false,
  });
  if (!validateData.success) {
    const errors = validateData.error.errors.map((error) => error.message);
    console.log(errors);
    return { errors: errors };
  }
  console.log(validateData.data);
  try {
    const { user } = await verifyAuth();
    const userId = user?.id;

    const trainer = await User.findById(userId);
    if (!trainer) {
      return { errors: ["Trainer not found"] };
    }
    if (!trainer.trainerDetails) {
      trainer.trainerDetails = {};
    }

    trainer.trainerDetails.socialAndExpiriance = convertSocialMediaDatatoDB(
      validateData.data
    );

    await trainer.save();

    revalidatePath("/dashboard/trainer-profile");
    return { success: "Data saved" };
  } catch {
    return { errors: ["Data not removed"] };
  }

  // try {
  //   const { user } = await verifyAuth();
  //   const userId = user?.id;
  //   const trainer = await User.findById(userId);
  //   if (!trainer) {
  //     return { error: "Trainer not found" };
  //   }

  //   trainer.trainerDetails.socialMedia = formData.get("socialMedia");
  //   await trainer.save();

  //   revalidatePath("/dashboard/trainer-profile");
  //   return { success: "Data saved" };
  // } catch {
  //   return { error: "Data not saved" };
  // }
}
