import { MdAddCircleOutline } from "react-icons/md";
import { useEffect, useState } from "react";
import ButtonWithLoading from "@/components/UI/Buttons/ButtonWithLoading";
import TrainerListItem from "./TrainerListItem";
import { addAdditionalTrainerData } from "@/actions/trainers.actions";
import { useActionState } from "react";
import { TrainerAdditionalDataHeadingType } from "@/interfaces/trainers/ITrainer";

const initialState = {
  errors: [],
};
export default function TrainerProfileModal({
  heading,
  HeadingIcon,
  trainerData,
  closeModalHandler,
}: {
  heading: TrainerAdditionalDataHeadingType;
  HeadingIcon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  trainerData: string[];
  closeModalHandler: () => void;
}) {
  const [trainerDataState, setTrainerDataState] = useState(trainerData);
  const [formState, formAction, isPending] = useActionState(
    (prevState: unknown, formData: FormData) =>
      addAdditionalTrainerData(prevState, formData, heading),
    initialState
  );
  useEffect(() => {
    if (formState.success) {
      closeModalHandler();
    }
  }, [formState.success, closeModalHandler]);

  function handleAddItem() {
    setTrainerDataState([...trainerDataState, ""]);
  }
  function handleRemoveItem(index: number) {
    setTrainerDataState((prevState) => prevState.filter((_, i) => i !== index));
  }
  return (
    <form
      action={formAction}
      className=" p-10 rounded-lg w-2/5  bg-background flex flex-col gap-4 overflow-auto planScrollbar trainerDataSquareScrollbar shadow-xl"
    >
      <strong className="text-xl flex items-center justify-center gap-1 capitalize">
        <HeadingIcon className="text-2xl text-yellow-300" />
        {heading}
      </strong>
      <ol className="flex flex-col gap-2 text-base font-thin  ">
        {trainerDataState.length !== 0 ? (
          trainerDataState.map((item, index) => {
            return (
              <TrainerListItem
                heading={heading}
                handleRemoveItem={handleRemoveItem}
                item={item}
                index={index}
                key={`${item}-${index}`}
              />
            );
          })
        ) : (
          <li className="text-center">Add your {heading.toLowerCase()}</li>
        )}
      </ol>
      <button
        type="button"
        className="flex items-center justify-center w-full text-center mt-auto mb-1"
      >
        <MdAddCircleOutline
          className="text-3xl text-blue-500 "
          onClick={handleAddItem}
        />
      </button>
      <div className="flex items-center flex-col justify-around gap-4">
        {formState.errors &&
          formState.errors.map((err) => (
            <p key={err} className="text-red-500 font-thin">
              {err}
            </p>
          ))}
        <ButtonWithLoading isLoading={isPending} className="w-1/4 mt-0 mx-0">
          Save
        </ButtonWithLoading>
      </div>
    </form>
  );
}
