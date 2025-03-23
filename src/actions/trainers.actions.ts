"use server";

import { verifyAuth } from "@/lib/lucia/auth";
import { User } from "@/lib/models/user.model";
import { TrainerAdditionalDataHeadingType } from "@/interfaces/trainers/ITrainer";
import { revalidatePath } from "next/cache";
import {
  TrainerAdditionalDataSchema,
  TrainerSocialMediaSchema,
} from "@/schemas/zSchemas";
import convertSocialMediaDatatoDB from "@/utils/convertSocialMediaDatatoDB";
import { redirect } from "next/navigation";
import { sentNotification } from "./notification.action";
import { NotificationType } from "@/lib/models/notification.model";

export async function sendInviteToTrainer(trainerId: string) {
  try {
    const { user } = await verifyAuth();
    const userId = user?.id;
    if (!userId) {
      throw new Error("User not found");
    }
    if (user.currentTrainer) {
      throw new Error("Already have a trainer");
    }
    const trainer = await User.findById(trainerId, "trainerDetails");

    if (!trainer) {
      throw new Error("Trainer not found");
    }
    if (!trainer.trainerDetails) {
      trainer.trainerDetails = {};
    }
    if (!trainer?.trainerDetails?.clientsInvites) {
      trainer.trainerDetails.clientsInvites = [];
    }
    if (trainer.trainerDetails.clientsInvites.includes(userId)) {
      throw new Error("Invitation has already been sent");
    }

    trainer.trainerDetails.clientsInvites.push(userId);
    await trainer.save();
    await sentNotification(
      trainerId,
      user.userName,
      NotificationType.INVITATION_SENT
    );
    revalidatePath(`/dashboard/trainers/${trainerId}`);
  } catch (e) {
    return { error: e instanceof Error ? e.message : String(e) };
    //throw new Error(e instanceof Error ? e.message : String(e));
  }
}

export async function removeTrainer(userId: string, trainerSide: boolean) {
  try {
    const { user } = await verifyAuth();
    let trainerId, clientId;
    if (trainerSide) {
      trainerId = user?.id;
      clientId = userId;
    } else {
      trainerId = userId;
      clientId = user?.id;
    }
    if (!clientId || !trainerId) {
      throw new Error("Users not found");
    }
    const trainer = await User.findById(trainerId, "trainerDetails");
    const client = await User.findById(clientId);
    if (!trainer) {
      throw new Error("Trainer not found");
    }
    if (!client || !trainer.trainerDetails.clients.includes(clientId)) {
      throw new Error("Client not found");
    }
    const index = trainer.trainerDetails.clients.indexOf(clientId);
    trainer.trainerDetails.clients.splice(index, 1);
    client.currentTrainer = null;
    await client.save();
    await trainer.save();
    const pathToRevalidate = trainerSide
      ? `/dashboard/clients`
      : `/dashboard/trainers/${trainerId}`;
    revalidatePath(pathToRevalidate);
  } catch (e) {
    throw new Error(e instanceof Error ? e.message : String(e));
  }
  if (trainerSide) {
    redirect("/dashboard/clients");
  }
}

export async function acceptInvite(clientId: string) {
  try {
    const { user } = await verifyAuth();
    const trainerId = user?.id;

    const trainer = await User.findById(trainerId, "userName trainerDetails");
    const client = await User.findById(clientId);

    if (!trainer) {
      throw new Error("Trainer not found");
    }
    if (!client) {
      throw new Error("Client not found");
    }
    if (client.currentTrainer) {
      throw new Error("Client already has a trainer");
    }
    if (!trainer.trainerDetails.clients) {
      trainer.trainerDetails.clients = [];
    }
    if (trainer.trainerDetails.clients.includes(clientId)) {
      throw new Error("Client already added");
    }
    trainer.trainerDetails.clients.push(clientId);
    const index = trainer.trainerDetails.clientsInvites.indexOf(clientId);
    trainer.trainerDetails.clientsInvites.splice(index, 1);

    client.currentTrainer = trainerId;

    await trainer.save();
    await client.save();
    await sentNotification(
      clientId,
      trainer?.profileDetails?.fullName || trainer.userName,
      NotificationType.INVITATION_ACCEPTED
    );

    revalidatePath("/dashboard/invites");
  } catch (e) {
    throw new Error(e instanceof Error ? e.message : String(e));
  }
}

export async function declineInvite(clientId: string) {
  try {
    const { user } = await verifyAuth();
    const trainerId = user?.id;

    const trainer = await User.findById(trainerId, "userName trainerDetails");
    if (!trainer) {
      throw new Error("Trainer not found");
    }
    if (!trainer.trainerDetails.clientsInvites) {
      throw new Error("Invite not found");
    }
    const index = trainer.trainerDetails.clientsInvites.indexOf(clientId);
    if (index === -1) {
      throw new Error("Invite not found");
    }
    trainer.trainerDetails.clientsInvites.splice(index, 1);

    await trainer.save();
    await sentNotification(
      clientId,
      trainer?.profileDetails?.fullName || trainer.userName,
      NotificationType.INVITATION_REJECTED
    );
    revalidatePath("/dashboard/invites");
  } catch (e) {
    throw new Error(e instanceof Error ? e.message : String(e));
  }
}

export async function addAdditionalTrainerData(
  prevState: unknown,
  formData: FormData,
  heading: TrainerAdditionalDataHeadingType
) {
  const validateData = TrainerAdditionalDataSchema.safeParse({
    trainerDetails: formData.getAll("trainerDetails"),
  });

  if (!validateData.success) {
    const errors = validateData.error.errors.map((error) => error.message);
    return { errors: errors };
  }

  const { user } = await verifyAuth();
  const userId = user?.id;

  try {
    const trainer = await User.findById(userId);
    if (!trainer) {
      return { errors: ["Trainer not found"] };
    }
    if (!trainer.trainerDetails) {
      trainer.trainerDetails = {};
    }

    trainer.trainerDetails[heading] = validateData.data.trainerDetails;
    await trainer.save();

    revalidatePath("/dashboard/trainer-profile");
    return { success: "Data saved" };
  } catch (e) {
    console.log(e);
    return { errors: ["Data not saved"] };
  }
}

export async function removeAdditionalTrainerData(
  heading: TrainerAdditionalDataHeadingType,
  dataIndex: number
) {
  const { user } = await verifyAuth();
  const userId = user?.id;

  try {
    const trainer = await User.findById(userId);
    if (!trainer) {
      return { error: "Trainer not found" };
    }
    trainer.trainerDetails[heading].splice(dataIndex, 1);
    await trainer.save();

    revalidatePath("/dashboard/trainer-profile");
    return { success: "Data removed" };
  } catch {
    return { error: "Data not removed" };
  }
}

export async function addSocialMediaTrainerData(
  prevState: unknown,
  formData: FormData
) {
  const validateData = TrainerSocialMediaSchema.safeParse({
    instagram: formData.get("instagram"),
    facebook: formData.get("facebook"),
    whatsapp: formData.get("whatsapp"),
    experience: formData.get("experience"),
    specialization: formData.get("specialization"),
    onSite: formData.get("onSite") === "on" ? true : false,
    online: formData.get("online") === "on" ? true : false,
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
