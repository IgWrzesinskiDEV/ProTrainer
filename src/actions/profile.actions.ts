"use server";

import { IUser, User } from "@/lib/models/user.model";

import { revalidatePath } from "next/cache";
import { verifyAuth } from "@/lib/lucia/auth";
export async function saveProfileData(
  prevState: unknown,
  formData: FormData,
  id: string
) {
  const fullName = formData.get("fullName") as string;
  const bio = formData.get("bio") as string;
  const avatar = formData.get("avatar") as File;

  //const user = await User.findByIdAndUpdate(id, { fullName, bio });
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

  await User.findByIdAndUpdate(id, {
    units: { weight, height, bodyMeasurement },
  });
  revalidatePath("/profile");
  return { succes: "Units saved" };
}
