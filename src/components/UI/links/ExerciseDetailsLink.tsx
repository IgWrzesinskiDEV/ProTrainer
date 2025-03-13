import { cn } from "@/lib/twMergeUtill";
import Link from "next/link";
import { LuInfo } from "react-icons/lu";

export default function ExerciseDetailsLink({
  isCustom,
  exerciseId,
  className,

  buttonOpenHandler,
}: {
  isCustom?: boolean;
  exerciseId?: string;
  className?: string;

  buttonOpenHandler?: (customExerciseId: string) => void | undefined;
}) {
  if (!exerciseId) return null;
  return !buttonOpenHandler ? (
    <Link
      href={`/dashboard/${isCustom ? "my-exercises" : "exercises"}/${exerciseId}`}
      className={cn(
        "block absolute top-1/2 bg-gray-800 -translate-y-1/2 right-1 z-50 p-1.5 hover:bg-slate-600 rounded-full transition-colors",
        className
      )}
      title="View exercise details"
    >
      <LuInfo className="h-5 w-5 text-blue-400 " />
    </Link>
  ) : (
    <button
      onClick={() => buttonOpenHandler(exerciseId)}
      className={cn(
        "block absolute top-1/2 bg-gray-800 -translate-y-1/2 right-1 z-50 p-1.5 hover:bg-slate-600 rounded-full transition-colors",
        className
      )}
      title="View exercise details"
    >
      <LuInfo className="h-5 w-5 text-blue-400 " />
    </button>
  );
}
