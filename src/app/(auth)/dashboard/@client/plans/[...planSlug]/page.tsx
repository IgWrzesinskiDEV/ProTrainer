import ProfileWrapper from "@/components/profile/ProfileWrapper";
import SingleDayWorkout from "@/components/plans/SingleDayWorkout";
import { getSinglePlanDay } from "@/utils/data/getClientPlans";
import { WeekDays } from "@/interfaces/workout/IWorkout";

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
    <ProfileWrapper title="Plan">
      <div className="flex items-center justify-center flex-col gap-5 w-full">
        <SingleDayWorkout
          day={JSON.stringify(singleDayWorkout)}
          planId={planId}
        />
      </div>
    </ProfileWrapper>
  );
}
