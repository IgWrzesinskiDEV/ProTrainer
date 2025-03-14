import { User } from "@/lib/models/user.model";
import { IMeasurement, MeasurementModel } from "@/lib/models/measurement.model";
import { IfullClientData } from "@/interfaces/clients/IClient";
import { verifyAuth } from "@/lib/lucia/auth";
import { cache } from "react";
interface trainersClients {
  _id: string;
  trainerDetails?: {
    clients?: string[] | undefined;
    clientsInvites?: string[] | undefined;
  };
}

export async function getClients(invitedClients = false) {
  try {
    const { user } = await verifyAuth();
    const trainerId = user?.id;
    const query = invitedClients
      ? "trainerDetails.clientsInvites"
      : "trainerDetails.clients";
    const trainersClients: trainersClients | null = await User.findById(
      trainerId,
      query
    );

    if (!trainersClients) return [];
    if (invitedClients) {
      const clients = User.find({
        _id: { $in: trainersClients.trainerDetails?.clientsInvites },
      });

      return clients;
    }
    const clients = User.find({
      _id: { $in: trainersClients.trainerDetails?.clients },
    });

    return clients;
  } catch {
    return [];
  }
}

export const getClientById = cache(async function getClientById(
  clientId: string
) {
  try {
    const client = await User.findById(
      clientId,
      "userName email  profileDetails profileInformation units"
    );
    if (!client) return null;
    const clientMeasurements: IMeasurement | null =
      await MeasurementModel.findOne({
        userId: clientId,
      });

    const fullClientData: IfullClientData = {
      ...client._doc,
      measurements: clientMeasurements?.measurements,
    };

    return fullClientData;
  } catch {
    return null;
  }
});
