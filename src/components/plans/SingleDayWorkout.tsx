import { ex as plan } from "@/components/plans/WorkoutPlan";

export default function SingleDayWorkout() {
  const plandata = plan.days[0];
  console.log(plandata);
  return (
    <div className="p-4 max-w-full">
      <h2 className="text-2xl font-bold mb-4">{plan.planName} Workout Plan</h2>

      <div
        key={plandata.id}
        className="border rounded-lg shadow-lg mb-6 p-10  bg-neutral-900 flex items-start flex-col overflow-x-auto"
      >
        <h3 className="text-xl font-semibold mb-2">{plandata.day}</h3>
        <p className="italic text-gray-600 mb-4">{plandata.workoutTitle}</p>
        {plandata.exercises.length > 0 ? (
          <table className=" border-collapse border table-fixed   block  border-gray-300 text-sm ">
            <thead className="">
              <tr className="bg-backgound">
                <th className="border border-gray-300 px-2 py-1">#</th>
                <th className="border border-gray-300 px-2 py-1">Exercise</th>
                <th className="border border-gray-300 px-2 py-1">Tempo</th>

                {plandata.exercises[0].weekData.map((week, index) => (
                  <th
                    key={index}
                    colSpan={2}
                    className="border border-gray-300 px-2 py-1 text-center"
                  >
                    Week {week.week}
                  </th>
                ))}
                <th
                  className="border border-gray-300 px-2 py-1 text-center text-nowrap"
                  colSpan={2}
                >
                  Week {plandata.exercises[0].weekData.at(-1)!.week + 1}
                </th>
              </tr>
            </thead>
            <tbody className="">
              {plandata.exercises.map((exercise, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-neutral-900" : "bg-neutral-500"
                  }`}
                >
                  <td className="border border-gray-300 px-2 py-1 text-center">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {exercise.name}
                  </td>
                  <td className="border border-gray-300 px-2 py-1 text-center">
                    {exercise.tempo}
                  </td>
                  {exercise.weekData.map((weekData) => (
                    <>
                      <td
                        key={weekData.week}
                        className="border border-gray-300 px-2 py-1 text-center"
                      >
                        {weekData.coachData}
                      </td>
                      <td className="border border-gray-300 px-2 py-1 text-center">
                        {weekData.userData}
                      </td>
                    </>
                  ))}
                  <td
                    className="border border-gray-300 px-2 py-1 text-center"
                    colSpan={2}
                  >
                    add
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-stone-200">Rest Day</p>
        )}
      </div>
    </div>
  );
}
