import { User } from "@/lib/models/user.model";
import { IMeasurement, MeasurementModel } from "@/lib/models/measurement.model";
import { IfullClientData } from "@/interfaces/clients/IClient";
import { verifyAuth } from "@/lib/lucia/auth";
interface trainersClients {
  _id: string;
  trainerDetails?: {
    clients?: string[] | undefined;
  };
}

export async function getClients() {
  try {
    const { user } = await verifyAuth();
    const trainerId = user?.id;
    const trainersClients: trainersClients | null = await User.findById(
      trainerId,
      "trainerDetails.clients"
    );

    if (!trainersClients) return [];
    const clients = User.find({
      _id: { $in: trainersClients.trainerDetails?.clients },
    });

    return clients;
  } catch {
    return [];
  }
}

export async function getClientById(clientId: string) {
  try {
    const client = await User.findById(
      clientId,
      "userName email  profileDetails"
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
}
