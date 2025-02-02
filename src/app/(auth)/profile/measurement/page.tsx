import Measurement from "@/components/UI/profile/Measurement";
import { verifyAuth } from "@/lib/lucia/auth";
import { MeasurementModel } from "@/lib/models/measurement.model";
export default async function MeasurementPage() {
  const { user } = await verifyAuth();
  //console.log(user);
  const measurementsData = await MeasurementModel.findOne({
    userId: user?.id,
  });
  const measurements = measurementsData?.measurements || [];

  return (
    <Measurement
      measurementsData={JSON.stringify(measurements)}
      units={JSON.stringify(user?.units)}
    />
  );
}
