"use server";
import { verifyAuth } from "@/lib/lucia/auth";
import { User } from "@/lib/models/user.model";
import { notFound, redirect } from "next/navigation";

export default async function checkTrainerClient(clientId: string) {
  try {
    const { user } = await verifyAuth();

    const trainer = await User.findById(user?.id, "trainerDetails");
    const client = await User.findById(clientId, "currentTrainer");

    if (!trainer) {
      throw new Error("Trainer not found");
    }
    if (!client) {
      throw new Error("Client not found");
    }

    if (
      trainer.trainerDetails.clients.includes(clientId) ||
      client.currentTrainer === user?.id
    ) {
      return;
    }
  } catch {
    notFound();
  }
  redirect("/dashboard/clients");
}
