import MeasurementsTable from "@/components/measurements/MeasurementsTable";
import { getClientById } from "@/utils/data/getClients";
import { TABLE_HEAD } from "@/utils/data/measurements";
export default async function ClientMeasurements({
  clientId,
}: {
  clientId: string;
}) {
  const clientData = await getClientById(clientId);
  const measurements = JSON.stringify(clientData?.measurements);
  const units = JSON.stringify(clientData?.units);
  return (
    <div className="p-6 bg-[#1E2532] rounded-lg">
      <h2 className="text-2xl font-semibold text-white mb-6">
        Body Measurements History
      </h2>

      <MeasurementsTable
        measurementsData={measurements}
        units={units}
        TABLE_HEAD={TABLE_HEAD}
        role={{ roleName: "trainer" }}
      />
    </div>
  );
}
