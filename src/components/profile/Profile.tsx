import ProfileDescriptionForm from "./ProfileDescriptionForm";
import ProfileUnitsForm from "./ProfileUnitsForm";

import ProfileStats from "./ProfileStats";
export default function Profile() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-[100rem] mx-auto">
      <ProfileDescriptionForm />
      <div className="lg:col-span-2">
        <ProfileUnitsForm />
        <ProfileStats />
      </div>
    </div>
  );
}
