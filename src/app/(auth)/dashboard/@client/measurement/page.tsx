import MeasurementWrapper from "@/components/trainer-components/clients/measurements/MeasurmentWrapper";
import { verifyAuth } from "@/lib/lucia/auth";
import { MeasurementModel } from "@/lib/models/measurement.model";
export default async function MeasurementPage() {
  const { user } = await verifyAuth();

  const measurementsData = await MeasurementModel.findOne({
    userId: user?.id,
  });
  const measurements = measurementsData?.measurements || [];

  return (
    <div className="px-4 md:px-6 lg:px-8 w-full">
      <MeasurementWrapper
        measurements={JSON.stringify(measurements)}
        units={JSON.stringify(user?.units)}
        isClientSide
      />
    </div>
  );
}
