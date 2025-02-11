import ProfileWrapper from "@/components/profile/ProfileWrapper";
import SingleDayWorkout from "@/components/plans/SingleDayWorkout";

export default async function Plans({
  params,
}: {
  params: Promise<{ planSlug: string }>;
}) {
  const { planSlug } = await params;
  //console.log(planSlug);
  return (
    <ProfileWrapper title="Plan">
      <div className="flex items-center justify-center flex-col gap-5 w-full">
        <SingleDayWorkout />
      </div>
    </ProfileWrapper>
  );
}
