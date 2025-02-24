import { VscDebugBreakpointFunction } from "react-icons/vsc";
import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import { removeAdditionalTrainerData } from "@/actions/trainers.actions";
import { TrainerAdditionalDataHeadingType } from "@/interfaces/trainers/ITrainer";
export default function TrainerListItem({
  heading,
  item,
  index,
  handleRemoveItem,
}: {
  heading: TrainerAdditionalDataHeadingType;
  item: string;
  index: number;
  handleRemoveItem: (index: number) => void;
}) {
  const [popupState, setPopupState] = useState(false);
  function arrowClickHandler() {
    setPopupState((prevState) => !prevState);
  }
  function clickAwayHandler() {
    setPopupState(false);
  }
  function removeLiAndRerenderModal() {
    handleRemoveItem(index);
    removeAdditionalTrainerData(heading, index);
  }
  return (
    <li
      key={`${item}-${index}`}
      className="flex items-center  gap-1  pb-2 relative"
    >
      <ClickAwayListener onClickAway={clickAwayHandler}>
        <VscDebugBreakpointFunction
          className={` text-blue-500 text-xl cursor-pointer transition-all duration-150 w-8 ${
            popupState ? "rotate-180" : "rotate-90"
          }`}
          onClick={arrowClickHandler}
        />
      </ClickAwayListener>
      {popupState && (
        <button
          className="absolute left-0 -bottom-3   rounded-lg w-6"
          type="button"
          onClick={removeLiAndRerenderModal}
        >
          <MdDeleteOutline className="text-red-500   text-center text-3xl" />
        </button>
      )}
      <input
        name="trainerDetails"
        className="px-4 py-2 rounded-lg w-full text-lg font-medium focus:outline-none text-background "
        type="text"
        defaultValue={item}
      />
    </li>
  );
}
