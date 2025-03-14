"use server";

import { revalidatePath } from "next/cache";
import { verifyAuth } from "@/lib/lucia/auth";

import { Muscle } from "react-body-highlighter";
import { AddCustomExerciseSchema } from "@/schemas/zSchemas";
import { CustomExercise } from "@/lib/models/customExercise.model";
import { generateIdFromEntropySize } from "lucia";
import { redirect } from "next/navigation";

export async function addCustomExercise(
  prevState: unknown,
  formData: FormData,
  muscles: Muscle[]
) {
  const { user } = await verifyAuth();
  const trainerId = user?.id;
  if (!trainerId) {
    return { errors: ["User not found"] };
  }

  const validateData = AddCustomExerciseSchema.safeParse({
    exerciseName: formData.get("exerciseName") as string,
    category: formData.get("category") as string,
    equipment: formData.get("equipment") as string,
    muscleGroup: muscles,
    instructions: formData.get("instructions") as string,
    videoUrl: formData.get("videoUrl") as string,
  });
  if (!validateData.success) {
    const errors = validateData.error.errors.map((error) => error.message);

    return { errors: errors };
  }

  const {
    exerciseName,
    category,
    equipment,
    muscleGroup,
    instructions,
    videoUrl,
  } = validateData.data;

  try {
    const videoId = videoUrl ? new URL(videoUrl).searchParams.get("v") : null;

    await CustomExercise.create({
      _id: generateIdFromEntropySize(24),
      trainerId,
      name: exerciseName,
      category: category || null,
      equipment: equipment || null,
      muscleGroup: muscleGroup || [],
      instructions: instructions || null,
      videoUrl: videoId || null,
    });
    revalidatePath("/dashboard/my-exercises");
    return { success: "Exercise added" };
  } catch {
    return { errors: ["Error saving profile"] };
  }
}

export async function deleteCustomExercise(exerciseId: string) {
  try {
    console.log(exerciseId);
    await CustomExercise.deleteOne({
      _id: exerciseId,
    });
  } catch (e) {
    console.log(e);
    return { errors: ["Error deleting exercise"] };
  } finally {
    revalidatePath("/dashboard/my-exercises");
    redirect("/dashboard/my-exercises");
  }
}
