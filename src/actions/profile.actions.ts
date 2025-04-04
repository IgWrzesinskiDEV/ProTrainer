"use server";

import { User } from "@/lib/models/user.model";
import saveAvatarImage from "@/lib/aws/saveAvatarImage";
import { revalidatePath } from "next/cache";
import { verifyAuth } from "@/lib/lucia/auth";
import {
  ProfileDetailsSchema,
  ProfileInformationSchema,
} from "@/schemas/zSchemas";

export async function saveProfileData(prevState: unknown, formData: FormData) {
  const { user } = await verifyAuth();
  const id = user?.id;
  if (!id) {
    return { errors: ["User not found"] };
  }
  const validateData = ProfileDetailsSchema.safeParse({
    fullName: formData.get("fullName") as string,
    bio: formData.get("bio") as string,
    avatar: formData.get("avatar") as File,
  });
  if (!validateData.success) {
    const errors = validateData.error.errors.map((error) => error.message);
    return { errors: errors };
  }

  const { fullName, bio, avatar } = validateData.data;

  if (avatar.size > 0) {
    const avatarFileName = await saveAvatarImage(avatar, id);

    await User.findByIdAndUpdate(id, {
      profileDetails: { fullName, bio, avatarFileName },
    });
    revalidatePath("/dashboard/profile");
    return { success: "Profile with avatar saved" };
  }

  const userDetails = await User.findById(id, { profileDetails: 1 });
  userDetails.profileDetails = { ...userDetails.profileDetails, fullName, bio };
  await userDetails.save();
  revalidatePath("/dashboard/profile");
  return { success: "Profile saved" };
}

export default async function saveProfileUnits(
  prevState: unknown,
  formData: FormData
) {
  const { user } = await verifyAuth();
  const id = user?.id;
  if (!id) {
    return { error: "User not found" };
  }

  const weight = formData.get("weight") as string;
  const height = formData.get("height") as string;
  const bodyMeasurement = formData.get("bodyMeasurement") as string;
  const distance = formData.get("distance") as string;

  await User.findByIdAndUpdate(id, {
    units: { weight, height, bodyMeasurement, distance },
  });
  revalidatePath("/dashboard/profile", "page");
  return { success: "Units saved" };
}

export async function saveProfileInfo(prevState: unknown, formData: FormData) {
  try {
    const { user } = await verifyAuth();
    const id = user?.id;
    if (!id) {
      return { errors: ["User not found"] };
    }
    const validateData = ProfileInformationSchema.safeParse({
      height: +(formData.get("height") ?? 0) as number,
      sex: formData.get("sex") as string,
      age: +(formData.get("age") ?? 0) as number,
    });

    if (!validateData.success) {
      const errors = validateData.error.errors.map((error) => error.message);
      return { errors: errors };
    }
    console.log("in save");
    const { height, sex, age } = validateData.data;

    await User.findByIdAndUpdate(id, {
      profileInformation: { height, sex, age },
    });

    revalidatePath("/dashboard/measurement", "page");
    console.log("Profile info saved");
    return { success: "Profile info saved" };
  } catch (e) {
    console.log(e);
    return { errors: ["Something went wrong"] };
  }
}
