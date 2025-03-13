import { LuX } from "react-icons/lu";
import ExerciseDetailsWrapper from "../exerciseDetails/ExerciseDetailsWrapper";

export default function CustomExerciseError({
  closeHandler,
  resetHandler,
}: {
  closeHandler: () => void;
  resetHandler: () => void;
}) {
  return (
    <ExerciseDetailsWrapper>
      <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-700">
        <div className="h-5 w-5"></div>
        <h2 className="text-base sm:text-lg font-thin text-white">
          Exercise Details
        </h2>
        <button
          onClick={closeHandler}
          className="text-gray-400 hover:text-white transition-colors p-1"
          aria-label="Close modal"
        >
          <LuX size={20} />
        </button>
      </div>
      <div className="p-8 sm:p-12 min-h-[50vh] flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 sm:h-10 sm:w-10 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
          Failed to Load Exercise
        </h3>
        <p className="text-gray-400 mb-6 max-w-md">
          We couldn&apos;t load the exercise details. This might be due to a
          network issue or the exercise may no longer be available.
        </p>
        <button
          onClick={resetHandler}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Try Again
        </button>
      </div>
    </ExerciseDetailsWrapper>
  );
}
