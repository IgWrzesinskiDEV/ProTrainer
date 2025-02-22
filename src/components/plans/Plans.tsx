import { getClientPlans } from "@/utils/data/getClientPlans";
import ProfileWrapper from "../profile/ProfileWrapper";

import { verifyAuth } from "@/lib/lucia/auth";

import SelectAndPlans from "./SelectAndPlans";

export default async function Plans() {
  const { user } = await verifyAuth();
  const { id } = user!;
  const plans = await getClientPlans(id);
  return (
    <ProfileWrapper title="Plans">
      <div className="flex items-center justify-center flex-col w-full gap-5 relative">
        <SelectAndPlans workoutPlans={JSON.stringify(plans)} />
        {/* <PlanSelecter workoutPlans={plans} />
        <WorkoutPlan /> */}
      </div>
    </ProfileWrapper>
  );
}
