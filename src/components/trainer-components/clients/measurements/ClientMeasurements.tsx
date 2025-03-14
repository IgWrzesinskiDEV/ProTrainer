import { getClientById } from "@/utils/data/getClients";

import MeasurementWrapper from "./MeasurmentWrapper";
import { verifyAuth } from "@/lib/lucia/auth";
export default async function ClientMeasurements({
  clientId,
}: {
  clientId: string;
}) {
  const { user } = await verifyAuth();
  const trainerUnits = JSON.stringify(user?.units);
  const clientData = await getClientById(clientId);
  const measurements = JSON.stringify(clientData?.measurements);
  const clientUnits = JSON.stringify(clientData?.units);
  const profileInfo = JSON.stringify(clientData?.profileInformation);

  return (
    <MeasurementWrapper
      measurements={measurements}
      units={trainerUnits}
      clientUnits={clientUnits}
      profileInfo={profileInfo}
    />
  );
}
