
import { User } from "@/lib/models/user.model";
import { verifyAuth } from "@/lib/lucia/auth";
export default async function getCurrentTrainer() {
    const { user } = await verifyAuth();
    const currentTrainerId = await User.findById(user?.id, "currentTrainer")
    const currentTrainer = await User.findById(currentTrainerId?.currentTrainer, "userName profileDetails");
    return currentTrainer;

}