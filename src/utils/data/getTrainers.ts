import { User } from "@/lib/models/user.model";
import { verifyAuth } from "@/lib/lucia/auth";
import { ITrainer } from "@/interfaces/trainers/ITrainer";
export async function getAvaliableTrainers() {
  const trainers = await User.find(
    { role: "TRAINER" },
    "userName profileDetails trainerDetails"
  );
  return trainers;
}

export async function getTrainerById(trainerId: string) {
  try {
    const trainer = await User.findById(
      trainerId,
      "userName email trainerDetails profileDetails"
    );
    return trainer as ITrainer;
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
