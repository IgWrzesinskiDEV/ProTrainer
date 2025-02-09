import { User } from "@/lib/models/user.model";


export async function getAvaliableTrainers() {
    const trainers = await User.find({ role: "TRAINER" }, "userName profileDetails");
    return trainers;
}