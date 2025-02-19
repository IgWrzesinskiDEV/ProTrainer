import { NewEmptyPlanSchema } from "@/schemas/zSchemas";
import { Plan } from "@/lib/models/plan.model";
export async function addEmptyWorkoutPlan(
  prevState: unknown,
  formData: FormData
) {
  const validateData = NewEmptyPlanSchema.safeParse({
    planName: formData.get("planName"),
  });
  if (!validateData.success) {
    return { errors: validateData.error.errors };
  }

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
}
