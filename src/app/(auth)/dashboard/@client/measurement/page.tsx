import MeasurementWrapper from "@/components/trainer-components/clients/measurements/MeasurmentWrapper";
import { verifyAuth } from "@/lib/lucia/auth";
import { MeasurementModel } from "@/lib/models/measurement.model";
import { getProfileInfoById } from "@/utils/data/measurments/getProfileInfo";
export default async function MeasurementPage() {
  const { user } = await verifyAuth();

  const measurementsData = await MeasurementModel.findOne({
    userId: user?.id,
  });
  const measurements = measurementsData?.measurements || [];
  const profileInfo = await getProfileInfoById(user?.id);

  return (
    <div className="px-4 md:px-6 lg:px-8 w-full">
      <MeasurementWrapper
        measurements={JSON.stringify(measurements)}
        units={JSON.stringify(user?.units)}
        profileInfo={JSON.stringify(profileInfo)}
        isClientSide
      />
    </div>
  );
}
