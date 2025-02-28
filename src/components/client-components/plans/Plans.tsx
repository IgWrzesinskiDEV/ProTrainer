import { getClientPlans } from "@/utils/data/getClientPlans";

import { verifyAuth } from "@/lib/lucia/auth";

import SelectAndPlans from "./SelectAndPlans";

export default async function Plans() {
  const { user } = await verifyAuth();
  const { id } = user!;
  const plans = await getClientPlans(id);
  return (
    <div className="flex flex-col w-full  px-4 md:px-6 lg:px-8 gap-6">
      <SelectAndPlans workoutPlans={JSON.stringify(plans)} />
    </div>
  );
}
