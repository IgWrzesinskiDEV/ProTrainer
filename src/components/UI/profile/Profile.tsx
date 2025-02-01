import ProfileWrapper from "./ProfileWrapper";
import ProfileDescriptionForm from "./ProfileDescriptionForm";
import ProfileUnitsForm from "./ProfileUnitsForm";

export default function Profile() {
  return (
    <ProfileWrapper title="Profile">
      <div className="w-1/3">
        <ProfileDescriptionForm />
      </div>
      <div className="w-[1px] opacity-20 h-80 self-center bg-stone-300" />
      <div className="w-1/3 ">
        <h3 className="text-xl font-semibold text-white mb-12 text-center">
          Units
        </h3>
        <ProfileUnitsForm />
      </div>
    </ProfileWrapper>
  );
}
