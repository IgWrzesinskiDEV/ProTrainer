import { LuX } from "react-icons/lu";
import ExerciseDetailsWrapper from "../exerciseDetails/ExerciseDetailsWrapper";

export default function CustomExerciseLoader({
  closeHandler,
}: {
  closeHandler: () => void;
}) {
  return (
    <ExerciseDetailsWrapper>
      <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-700">
        <div className="h-5 w-24 bg-gray-700/50 rounded animate-pulse"></div>
        {/* <div className="h-6 w-32 bg-gray-700/50 rounded animate-pulse"></div> */}
        <button
          onClick={closeHandler}
          className="text-gray-400 hover:text-white transition-colors p-1"
          aria-label="Close modal"
        >
          <LuX size={20} />
        </button>
      </div>
      <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-700">
        <div className="h-8 w-48 bg-blue-500/20 rounded animate-pulse"></div>
      </div>
      <div className="p-3 sm:p-4 min-h-[50vh] md:min-h-[60vh]">
        <div className="flex items-center justify-center space-x-2 mb-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-10 w-24 bg-gray-700/50 rounded animate-pulse"
            ></div>
          ))}
        </div>
        <div className="bg-[#121218] rounded-lg p-3 sm:p-4 flex flex-col items-center justify-center space-y-4">
          <div className="w-full h-64 bg-gray-700/30 rounded-lg animate-pulse flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
          <div className="w-3/4 h-4 bg-gray-700/50 rounded animate-pulse"></div>
          <div className="w-2/3 h-4 bg-gray-700/50 rounded animate-pulse"></div>
        </div>
      </div>
    </ExerciseDetailsWrapper>
  );
}
