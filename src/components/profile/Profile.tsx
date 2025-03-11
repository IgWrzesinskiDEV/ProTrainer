import ProfileDescriptionForm from "./ProfileDescriptionForm";
import ProfileUnitsForm from "./ProfileUnitsForm";

//import ProfileStats from "./ProfileStats";
import { verifyAuth } from "@/lib/lucia/auth";
import { getUserUnitsById } from "@/utils/data/user";

export default async function Profile() {
  const { user } = await verifyAuth();
  if (!user) {
    return null;
  }
  const units = await getUserUnitsById(user.id);
  const plainUnits = JSON.parse(JSON.stringify(units.units));
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-[100rem] mx-auto">
      <ProfileDescriptionForm />
      <div className="lg:col-span-2">
        <ProfileUnitsForm key={Date.now()} units={plainUnits} />

        {/* <ProfileStats /> */}
      </div>
    </div>
  );
}
