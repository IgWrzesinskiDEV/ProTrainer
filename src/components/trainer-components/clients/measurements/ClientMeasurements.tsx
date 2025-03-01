import { getClientById } from "@/utils/data/getClients";

import MeasurementWrapper from "./MeasurmentWrapper";
export default async function ClientMeasurements({
  clientId,
}: {
  clientId: string;
}) {
  const clientData = await getClientById(clientId);
  const measurements = JSON.stringify(clientData?.measurements);
  const units = JSON.stringify(clientData?.units);
  return <MeasurementWrapper measurements={measurements} units={units} />;
}
