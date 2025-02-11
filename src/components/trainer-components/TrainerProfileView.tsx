import ProfileWrapper from "../profile/ProfileWrapper";
import WrapperSplitter from "../UI/WrapperSplitter";
import TrainerProfileDescriptionForm from "./TrainerProfileDescriptionForm";
import TrainerProfileAdditionalForm from "./TrainerProfileAdditionalForm";
export default function TrainerProfileView() {
  return (
    <ProfileWrapper title="Trainer profile">
      <WrapperSplitter
        leftContent={<TrainerProfileDescriptionForm />}
        rightContent={<TrainerProfileAdditionalForm />}
      />
    </ProfileWrapper>
  );
}
