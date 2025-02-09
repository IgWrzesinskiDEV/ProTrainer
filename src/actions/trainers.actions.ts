"use server"

import { verifyAuth } from "@/lib/lucia/auth";
import { User } from "@/lib/models/user.model";
export async function addTrainer(trainerId: string) {
    console.log(trainerId);
    const { user } = await verifyAuth();
    const userId = user?.id;
    await User.findByIdAndUpdate(userId, { currentTrainer: trainerId });
    console.log("trainer added");
    await User.findByIdAndUpdate(trainerId, { $push: { "trainerDetails.clients": userId } });
    console.log("client added");
}
