import ProfileWrapper from "../profile/ProfileWrapper";
import PlanSelecter from "./PlanSelecter";

import WorkoutPlan from "./WorkoutPlan";

export default function Plans() {
  return (
    <ProfileWrapper title="Plans">
      <div className="flex items-center justify-center flex-col gap-5 relative">
        <PlanSelecter />
        <WorkoutPlan />
      </div>
    </ProfileWrapper>
  );
}
