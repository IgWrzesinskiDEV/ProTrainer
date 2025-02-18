import Link from "next/link";

export default function WorkoutPlan() {
  return (
    <div className="flex flex-col items-center justify-center w-3/4 rounded-lg  overflow-hidden shadow-lg">
      <table className="w-full text-sm border-collapse   ">
        <thead className="text-black">
          <tr className="">
            {workoutPlan.map((dayPlan, index) => (
              <th
                key={dayPlan.id}
                className={`bg-neutral-900 text-white border-r border-stone-300/20  p-2 ${
                  index === workoutPlan.length - 1 && "border-none"
                } `}
              >
                {dayPlan.day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-white ">
          <tr>
            {workoutPlan.map((dayPlan, index) => {
              if (dayPlan.workoutTitle === "Rest Day") {
                return (
                  <td
                    className={`bg-foo border-gray-300 border-r ${
                      index === workoutPlan.length - 1 && "border-none"
                    }`}
                    key={dayPlan.id}
                  >
                    <p className="rotate-90 select-none  text-nowrap text-xl">
                      {dayPlan.workoutTitle}
                    </p>
                  </td>
                );
              }
              return (
                <td
                  key={dayPlan.id}
                  className={` bg-blue-500 hover:bg-blue-700 transition-colors duration-150 cursor-pointer ${
                    index === workoutPlan.length - 1 && "border-none"
                  } border-r border-stone-300`}
                >
                  <Link
                    href={`plans/${ex.planId}/${dayPlan.day}`}
                    passHref
                    className="block p-4"
                  >
                    <span className="text-center w-full block text-xl">
                      {dayPlan.workoutTitle}
                    </span>
                    <ol className="list-decimal list-inside">
                      {dayPlan.exercises.map((exercise) => (
                        <li key={exercise.name}>{exercise.name}</li>
                      ))}
                    </ol>
                  </Link>
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

const workoutPlan = [
  {
    id: 6,
    day: "Saturday",
    workoutTitle: "Lower",
    exercises: [
      {
        number: 1,
        name: "Squats",
        tempo: "2-0-2",
        weekData: [
          {
            week: 1,
            coachData: "3x10 20kg",
            userData: "rir1",
          },
          {
            week: 2,
            coachData: "3x10 20kg",
            userData: "rir1",
          },
          {
            week: 3,
            coachData: "3x10 20kg",
            userData: "",
          },
        ],
      },
      {
        number: 2,
        name: "Lunges",
        tempo: "2-0-2",
        weekData: [
          {
            week: 1,
            coachData: "3x12 15kg",
            userData: "rir2",
          },
          {
            week: 2,
            coachData: "3x10 20kg",
            userData: "rir1",
          },
          {
            week: 3,
            coachData: "3x10 20kg",
            userData: "",
          },
        ],
      },
      {
        number: 3,
        name: "Leg Press",
        tempo: "2-0-2",
        weekData: [
          {
            week: 1,
            coachData: "3x15 50kg",
            userData: "rir1",
          },
          {
            week: 2,
            coachData: "3x10 20kg",
            userData: "rir1",
          },
          {
            week: 3,
            coachData: "3x10 20kg",
            userData: "",
          },
        ],
      },
      {
        number: 4,
        name: "Calf Raises",
        tempo: "2-0-2",
        weekData: [
          {
            week: 1,
            coachData: "3x20 10kg",
            userData: "rir0",
          },
          {
            week: 2,
            coachData: "3x10 20kg",
            userData: "rir1",
          },
          {
            week: 3,
            coachData: "3x10 20kg",
            userData: "",
          },
        ],
      },
    ],
  },
  {
    id: 7,
    day: "Sunday",
    workoutTitle: "Upper",
    exercises: [
      {
        number: 1,
        name: "Push Up Plus",
        tempo: "2-0-2",
        weekData: [
          {
            week: 1,
            coachData: "3x10 10kg",
            userData: "rir0",
          },
        ],
      },
      {
        number: 2,
        name: "Pull Ups",
        tempo: "2-0-2",
        weekData: [
          {
            week: 1,
            coachData: "3x8 Bodyweight",
            userData: "rir1",
          },
        ],
      },
      {
        number: 3,
        name: "Shoulder Press",
        tempo: "2-0-2",
        weekData: [
          {
            week: 1,
            coachData: "3x12 15kg",
            userData: "rir2",
          },
        ],
      },
      {
        number: 4,
        name: "Bicep Curls",
        tempo: "2-0-2",
        weekData: [
          {
            week: 1,
            coachData: "3x15 10kg",
            userData: "rir1",
          },
        ],
      },
    ],
  },
];

export const ex = {
  planId: 1,
  planName: "bench",
  days: [...workoutPlan],
};
