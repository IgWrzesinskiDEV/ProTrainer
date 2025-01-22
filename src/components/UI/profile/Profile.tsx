import Avatar from "@mui/material/Avatar";
import ProfileWrapper from "./ProfileWrapper";
import ProfileDescriptionForm from "./ProfileDescriptionForm";
import ProfileUnitsForm from "./ProfileUnitsForm";
export default function Profile() {
  return (
    <ProfileWrapper title="Profile">
      <div className="w-1/3">
        <div className="flex items-center justify-center flex-col gap-3 mb-3">
          <Avatar sx={{ width: "60px", height: "60px" }} alt="igor wrzesinki" />
          <button className="text-center underline text-blue-500">
            Change avatar
          </button>
          <input type="file" className="hidden" />
        </div>
        <ProfileDescriptionForm />
      </div>
      <div className="w-[1px] opacity-20 h-80 bg-stone-300" />
      <div className="w-1/3">
        <h3 className="text-xl font-semibold text-white mb-4 text-center">
          Units
        </h3>
        <ProfileUnitsForm />
      </div>
    </ProfileWrapper>
  );
}
