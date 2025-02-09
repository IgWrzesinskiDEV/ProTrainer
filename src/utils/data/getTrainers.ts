import { User } from "@/lib/models/user.model";


export async function getAvaliableTrainers() {
    const trainers = await User.find({ role: "TRAINER" }, "userName profileDetails");
    return trainers;
}

export async function getTrainerById(trainerId: string) {
    try {

        const trainer = await User.findById(trainerId, "userName email trainerDetails profileDetails");
        return trainer;
    }
    catch {
        return null;
    }



}
