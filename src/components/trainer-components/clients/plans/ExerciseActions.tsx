import { LuTrash } from "react-icons/lu";
import ButtonWithTooltip from "@/components/UI/Buttons/ButtonWithTooltip";

export default function ExerciseActions({
  deleteExercise,
  exercise,
}: {
  deleteExercise: (number: number) => void;
  exercise: { number: number };
}) {
  return (
    <div className="flex items-center justify-center">
      <ButtonWithTooltip
        onClick={() => deleteExercise(exercise.number)}
        tooltipText="Remove Exercise"
        className="p-1.5 rounded-md hover:bg-blue-500/20 transition-colors"
      >
        <LuTrash className="w-5 h-5 text-red-400 hover:text-red-300 transition-colors" />
      </ButtonWithTooltip>
    </div>
  );
}
