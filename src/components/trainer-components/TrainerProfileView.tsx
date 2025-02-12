import ProfileWrapper from "../profile/ProfileWrapper";
import WrapperSplitter from "../UI/WrapperSplitter";
import TrainerProfileDescriptionForm from "./TrainerProfileDescriptionForm";
import TrainerProfileAdditionalForm from "./TrainerProfileAdditionalForm";
export default function TrainerProfileView() {
  return (
    <ProfileWrapper title="Trainer profile">
      <div className="flex w-full items-center justify-center gap-5">
        <WrapperSplitter
          leftContent={<TrainerProfileDescriptionForm />}
          rightContent={<TrainerProfileAdditionalForm />}
        />
      </div>
    </ProfileWrapper>
  );
}
