import { cn } from "@/lib/twMergeUtill";
import Link from "next/link";
import { LuInfo } from "react-icons/lu";

export default function ExerciseDetailsLink({
  exerciseId,
  className,
}: {
  exerciseId?: string;
  className?: string;
}) {
  if (!exerciseId) return null;
  return (
    <Link
      href={`/dashboard/exercises/${exerciseId}`}
      className={cn(
        "flex-shrink-0 p-2 hover:bg-slate-600 rounded-full transition-colors",
        className
      )}
      title="View exercise details"
    >
      <LuInfo className="h-5 w-5 text-blue-400 " />
    </Link>
  );
}
