import PlanSelect from "../UI/Select/PlanSelect";

export default function PlanSelecter() {
  return (
    <div className="flex gap-3 flex-col">
      <h2 className="text-center">Select your current plan:</h2>
      <PlanSelect availablePlans={availablePlans} />
      {/* <select name="currentPlan" id="currentPlan" className="text-black">
        <option value="bench">bench</option>
        <option value="repair">repair</option>
        <option value="test plan">test plan</option>
        <option value="legs">legs</option>
      </select> */}
    </div>
  );
}

const availablePlans = ["bench", "repair", "test plan", "legs"];
