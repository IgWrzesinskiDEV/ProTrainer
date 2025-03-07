import SingleDayWorkout from "@/components/client-components/plans/SingleDayWorkout";
import { getSinglePlanDay } from "@/utils/data/getClientPlans";
import { WeekDays } from "@/interfaces/workout/IWorkout";
import { LuCalendarDays } from "react-icons/lu";

export default async function Plans({
  params,
}: {
  params: Promise<{ planSlug: string }>;
}) {
  const { planSlug } = await params;
  const planId = planSlug[0];
  const weekDay = planSlug[1] as WeekDays;

  const singleDayWorkout = await getSinglePlanDay(planId, weekDay);

  return (
    <div className="flex flex-col items-start w-full  mx-auto px-4 py-6 gap-6">
      <div className="flex items-center gap-3 w-full">
        <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
          <LuCalendarDays className="w-6 h-6 text-blue-500" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Daily Workout</h1>
          <p className="text-gray-400">View and track your workout progress</p>
        </div>
      </div>

      <SingleDayWorkout
        day={JSON.stringify(singleDayWorkout)}
        planId={planId}
      />
    </div>
  );
}
