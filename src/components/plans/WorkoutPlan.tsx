export default function WorkoutPlan() {
  return (
    <div className="flex flex-col items-center justify-center w-3/4 rounded-lg  overflow-hidden shadow-lg">
      <table className="w-full text-sm border-collapse   ">
        <thead className="text-black">
          <tr className="">
            {workoutPlan.map((dayPlan, index) => (
              <th
                key={dayPlan.id}
                className={`bg-black/40 text-white border-r border-stone-300/20  p-2 ${
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
                  className={`p-4 bg-blue-500 hover:bg-blue-700 transition-colors duration-150 cursor-pointer ${
                    index === workoutPlan.length - 1 && "border-none"
                  } border-r border-stone-300`}
                >
                  <span className="text-center w-full block text-xl">
                    {dayPlan.workoutTitle}
                  </span>
                  <ol className="list-decimal list-inside">
                    {dayPlan.exercises.map((exercise) => (
                      <li key={exercise.name}>{exercise.name}</li>
                    ))}
                  </ol>
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
    id: 1,
    day: "Monday",
    workoutTitle: "Upper",
    exercises: [
      {
        name: "push up plus",
        tempo: "2-0-2",
        sets: 3,
        weight: "-",
        rir: "-",
      },
      {
        name: "wyciskanie hantlami",
        tempo: "2-0-2",
        sets: 3,
        weight: "-",
        rir: "-",
      },
      {
        name: "przyciąganie z rotacja w odc piersiowym",
        tempo: "2-0-2",
        sets: 3,
        weight: "-",
        rir: "-",
      },
      {
        name: "wyciąg dolny do mocnego rozciągniecia",
        tempo: "2-0-2",
        sets: 3,
        weight: "-",
        rir: "-",
      },
    ],
  },
  {
    id: 2,
    day: "Tuesday",
    workoutTitle: "Upper",
    exercises: [
      {
        name: "push up plus",
        tempo: "2-0-2",
        sets: 3,
        weight: "-",
        rir: "-",
      },
      {
        name: "wyciskanie hantlami",
        tempo: "2-0-2",
        sets: 3,
        weight: "-",
        rir: "-",
      },
      {
        name: "przyciąganie z rotacja w odc piersiowym",
        tempo: "2-0-2",
        sets: 3,
        weight: "-",
        rir: "-",
      },
      {
        name: "wyciąg dolny do mocnego rozciągniecia",
        tempo: "2-0-2",
        sets: 3,
        weight: "-",
        rir: "-",
      },
    ],
  },
  {
    id: 3,
    day: "Wednesday",
    workoutTitle: "Rest Day",
    exercises: [],
  },
  {
    id: 4,
    day: "Thursday",
    workoutTitle: "Upper",
    exercises: [
      {
        name: "push up plus",
        tempo: "2-0-2",
        sets: 3,
        weight: "-",
        rir: "-",
      },
      {
        name: "wyciskanie hantlami",
        tempo: "2-0-2",
        sets: 3,
        weight: "-",
        rir: "-",
      },
      {
        name: "przyciąganie z rotacja w odc piersiowym",
        tempo: "2-0-2",
        sets: 3,
        weight: "-",
        rir: "-",
      },
      {
        name: "wyciąg dolny do mocnego rozciągniecia",
        tempo: "2-0-2",
        sets: 3,
        weight: "-",
        rir: "-",
      },
    ],
  },
  {
    id: 5,
    day: "Friday",
    workoutTitle: "Rest Day",
    exercises: [],
  },
  {
    id: 6,
    day: "Saturday",
    workoutTitle: "Rest Day",
    exercises: [],
  },
  {
    id: 7,
    day: "Sunday",
    workoutTitle: "Upper",
    exercises: [
      {
        name: "push up plus",
        tempo: "2-0-2",
        sets: 3,
        weight: "-",
        rir: "-",
      },
      {
        name: "wyciskanie hantlami",
        tempo: "2-0-2",
        sets: 3,
        weight: "-",
        rir: "-",
      },
      {
        name: "przyciąganie z rotacja w odc piersiowym",
        tempo: "2-0-2",
        sets: 3,
        weight: "-",
        rir: "-",
      },
      {
        name: "wyciąg dolny do mocnego rozciągniecia",
        tempo: "2-0-2",
        sets: 3,
        weight: "-",
        rir: "-",
      },
    ],
  },
];
