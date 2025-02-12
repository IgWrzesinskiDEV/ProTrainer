import { User } from "@/lib/models/user.model";
import { verifyAuth } from "@/lib/lucia/auth";

export async function getAvaliableTrainers() {
  const trainers = await User.find(
    { role: "TRAINER" },
    "userName profileDetails"
  );
  return trainers;
}

export async function getTrainerById(trainerId: string) {
  try {
    const trainer = await User.findById(
      trainerId,
      "userName email trainerDetails profileDetails"
    );
    return trainer;
  } catch {
    return null;
  }
}

export async function getTrainerAdditionalData() {
  try {
    const { user } = await verifyAuth();
    const trainerDetails = await User.findById(user?.id, "trainerDetails");
    return trainerDetails;
  } catch {
    return null;
  }
}
