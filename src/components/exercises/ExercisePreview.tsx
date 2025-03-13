import { CustomExerciseDetails } from "@/interfaces/workout/IWorkout";
import { ExerciseDetails } from "../exerciseDetails/ExerciseDetailsView";
import textWithDashTransform from "@/utils/textWithDashTransform";
import Link from "next/link";

export default function ExercisePreview({
  exercise,
  isCustom,
}: {
  exercise: ExerciseDetails | CustomExerciseDetails;
  isCustom: boolean;
}) {
  return (
    <Link
      href={`/dashboard/${isCustom ? "my-exercises" : "exercises"}/${exercise._id}`}
      key={exercise._id}
      className="group relative min-h-52 flex flex-col bg-slate-800/50 rounded-xl overflow-hidden hover:bg-slate-800/70 transition-all duration-300"
    >
      <div className="p-6 flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <span className="px-3 py-1 text-sm font-medium rounded-lg bg-blue-500/20 text-blue-400">
            {exercise?.category || "No category"}
          </span>

          {exercise.videoUrl && (
            <div
              className="flex items-center text-sm text-slate-400"
              title="Has video"
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          )}
        </div>

        <h2 className="text-xl font-semibold text-slate-200 mb-3 group-hover:text-blue-400 transition-colors">
          {exercise.name}
        </h2>

        {exercise.muscleGroup && exercise.muscleGroup.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {exercise.muscleGroup.map((muscle, index) => (
              <span
                key={index}
                className="px-2 py-0.5 text-xs font-medium bg-slate-700/50 text-slate-300 rounded-lg"
              >
                {textWithDashTransform(muscle)}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-center text-sm text-slate-400">
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          {exercise?.equipment || "No equipment added"}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500/0 via-blue-500/20 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
    </Link>
  );
}
