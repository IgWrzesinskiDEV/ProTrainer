import ProfileWrapper from "../profile/ProfileWrapper";
import WrapperSplitter from "../UI/WrapperSplitter";
import TrainerProfileDescriptionForm from "./TrainerProfileDescriptionForm";
import TrainerProfileAdditionalForm from "./TrainerProfileAdditionalForm";
import { getTrainerAdditionalData } from "@/utils/data/getTrainers";
export default async function TrainerProfileView() {
  const trainerDetails = JSON.stringify(await getTrainerAdditionalData());

  return (
    <ProfileWrapper title="Trainer profile">
      <div className="flex w-full items-center justify-center gap-5">
        <WrapperSplitter
          leftContent={
            <TrainerProfileDescriptionForm trainerDetails={trainerDetails} />
          }
          rightContent={
            <TrainerProfileAdditionalForm trainerDetails={trainerDetails} />
          }
        />
      </div>
    </ProfileWrapper>
  );
}
