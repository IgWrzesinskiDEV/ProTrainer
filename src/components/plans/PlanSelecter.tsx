export default function PlanSelecter() {
  return (
    <div className="flex">
      <h2 className="mr-2">Select your current plan:</h2>
      <select name="currentPlan" id="currentPlan" className="text-black">
        <option value="bench">bench</option>
        <option value="repair">repair</option>
        <option value="test plan">test plan</option>
        <option value="legs">legs</option>
      </select>
    </div>
  );
}
