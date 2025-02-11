import ProfileWrapper from "./ProfileWrapper";
import ProfileDescriptionForm from "./ProfileDescriptionForm";
import ProfileUnitsForm from "./ProfileUnitsForm";
import WrapperSplitter from "../UI/WrapperSplitter";
export default function Profile() {
  return (
    <ProfileWrapper title="Profile">
      <WrapperSplitter
        leftContent={<ProfileDescriptionForm />}
        rightContent={
          <>
            <h3 className="text-xl font-semibold text-white mb-12 text-center">
              Units
            </h3>
            <ProfileUnitsForm />
          </>
        }
      />
    </ProfileWrapper>
  );
}
