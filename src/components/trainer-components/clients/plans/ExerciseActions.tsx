import { LuTrash } from "react-icons/lu";
//import { FaRegCalendarXmark } from "react-icons/fa6";
import ButtonWithTooltip from "@/components/UI/Buttons/ButtonWithTooltip";

export default function ExerciseActions({
  deleteExercise,
  exercise,
}: {
  deleteExercise: (number: number) => void;
  exercise: { number: number };
}) {
  return (
    <div className="flex items-center justify-center space-x-2">
      <ButtonWithTooltip
        onClick={() => deleteExercise(exercise.number)}
        tooltipText="Remove Exercise"
      >
        <LuTrash className="text-xl text-red-500 w-5 h-5" />
      </ButtonWithTooltip>

      {/* <ButtonWithTooltip onClick={() => {}} tooltipText="Remove latest week">
        <FaRegCalendarXmark className="w-5 h-5" />
      </ButtonWithTooltip> */}
    </div>
  );
}
