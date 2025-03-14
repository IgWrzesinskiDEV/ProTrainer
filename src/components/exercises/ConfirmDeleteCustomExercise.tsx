import { deleteCustomExercise } from "@/actions/customExercise.actions";
import DeleteModalConent from "../UI/DeleteModalContent";

export default function ConfirmDeleteCustomExercise({
  closeModal,
  exerciseId,
  exerciseName,
}: {
  closeModal?: () => void;
  exerciseId: string;
  exerciseName: string;
}) {
  return (
    <DeleteModalConent
      closeModal={closeModal}
      deleteHandler={async () => {
        const errors = await deleteCustomExercise(exerciseId);
        console.log(errors);
      }}
      buttonText="Remove Exercise"
    >
      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
        <h3 className="text-lg font-medium text-white" id="modal-headline">
          Remove your exercise
        </h3>
        <div className="mt-2">
          <p className="text-sm text-gray-300">
            Are you sure you want to remove this exercise? This action cannot be
            undone.
          </p>
        </div>
        <div className="mt-2">
          <p className="text-sm text-gray-400">
            Exercise to be removed:{" "}
            <span className="font-semibold text-white">{exerciseName}</span>
          </p>
        </div>
      </div>
    </DeleteModalConent>
  );
}
