import ButtonWithLoading from "../UI/Buttons/ButtonWithLoading";
import Input from "../UI/Input";
import TextArea from "../UI/TextArea";
export default function TrainerProfileDescriptionForm({
  trainerDetails,
}: {
  trainerDetails: string;
}) {
  return (
    <form className="flex items-center justify-center flex-col gap-6">
      <Input label="Specialization" name="specialization" type="text" />
      <TextArea label="Experience" name="experience" />
      <ButtonWithLoading type="submit" className="w-1/5" isLoading={false}>
        Save
      </ButtonWithLoading>
    </form>
  );
}
