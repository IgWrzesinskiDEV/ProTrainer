import { MdAddCircleOutline } from "react-icons/md";
import { useState } from "react";
import ButtonWithLoading from "../UI/Buttons/ButtonWithLoading";
import TrainerListItem from "./TrainerListItem";

export default function TrainerProfileModal({
  heading,
  HeadingIcon,
  trainerData,
}: {
  heading: string;
  HeadingIcon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  trainerData: string[];
}) {
  const [trainerDataState, setTrainerDataState] = useState(trainerData);
  console.log(trainerDataState);
  function handleAddItem() {
    setTrainerDataState([...trainerDataState, ""]);
  }
  return (
    <form className=" p-10 rounded-lg w-2/5  bg-background flex flex-col gap-4 overflow-auto planScrollbar trainerDataSquareScrollbar shadow-xl">
      <strong className="text-xl flex items-center justify-center gap-1">
        <HeadingIcon className="text-2xl text-yellow-300" />
        {heading}
      </strong>
      <ol className="flex flex-col gap-2 text-base font-thin  ">
        {trainerDataState.length !== 0 ? (
          trainerDataState.map((item, index) => {
            return (
              <TrainerListItem
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
      <div className="flex items-center justify-around gap-4">
        <ButtonWithLoading isLoading={false} className="w-1/4 mt-0 mx-0">
          Save
        </ButtonWithLoading>
      </div>
    </form>
  );
}
