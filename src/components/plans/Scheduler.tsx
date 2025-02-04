"use client";

// export default function WorkoutPlan() {
//   return <div>

//   </div>;
// }

import React from "react";

const workoutPlan = [
  {
    day: "Monday",
    exercises: [
      {
        name: "rozpietki z rotacją zewnętrzną",
        tempo: "3111",
        sets: "3x9",
        weight: "10kg",
        rir: "rir0",
      },
      {
        name: "y raise",
        tempo: "3101",
        sets: "3x10",
        weight: "9kg",
        rir: "rir4",
      },
      {
        name: "wyciskanie leżąc na ławie",
        tempo: "-",
        sets: "5x5",
        weight: "50kg",
        rir: "rir7",
      },
      {
        name: "wiosłowanie hantlem w oparciu o ławkę",
        tempo: "-",
        sets: "4x10",
        weight: "24kg",
        rir: "rir6",
      },
      {
        name: "facepull z rotacją",
        tempo: "3101",
        sets: "4x8-10",
        weight: "20kg",
        rir: "-",
      },
      {
        name: "zwis na jednej ręce z ciężarem (z paskiem)",
        tempo: "-",
        sets: "3x15sek",
        weight: "+10kg",
        rir: "rir2",
      },
    ],
  },
  {
    day: "Tuesday",
    exercises: [
      { name: "RDL", tempo: "3001", sets: "4x5", weight: "75kg", rir: "rir3" },
      {
        name: "poliquin step up",
        tempo: "3011",
        sets: "4x8",
        weight: "+5kg",
        rir: "rir5",
      },
      {
        name: "copenhagen plank",
        tempo: "-",
        sets: "4x15sek",
        weight: "-",
        rir: "rir5",
      },
      {
        name: "monster walk",
        tempo: "-",
        sets: "3x15",
        weight: "-",
        rir: "rir10",
      },
    ],
  },
  {
    day: "Wensday",
    exercises: [
      { name: "RDL", tempo: "3001", sets: "4x5", weight: "75kg", rir: "rir3" },
      {
        name: "poliquin step up",
        tempo: "3011",
        sets: "4x8",
        weight: "+5kg",
        rir: "rir5",
      },
      {
        name: "copenhagen plank",
        tempo: "-",
        sets: "4x15sek",
        weight: "-",
        rir: "rir5",
      },
      {
        name: "monster walk",
        tempo: "-",
        sets: "3x15",
        weight: "-",
        rir: "rir10",
      },
    ],
  },
  {
    day: "Thursday",
    exercises: [
      {
        name: "push up plus",
        tempo: "-",
        sets: "3x6",
        weight: "-",
        rir: "rir3",
      },
      {
        name: "wyciskanie hantlami",
        tempo: "-",
        sets: "4x6",
        weight: "16kg",
        rir: "rir8",
      },
      {
        name: "przyciąganie z rotacją w odc piersiowym",
        tempo: "-",
        sets: "3x8-12",
        weight: "25kg",
        rir: "rir2",
      },
      {
        name: "wyciąg dolny do mocnego rozciągnięcia",
        tempo: "3101",
        sets: "3x8-12",
        weight: "17kg",
        rir: "rir2",
      },
      {
        name: "baysian curl",
        tempo: "-",
        sets: "4x10-15",
        weight: "15kg",
        rir: "-",
      },
      {
        name: "triceps jednorącz wyciąg",
        tempo: "-",
        sets: "4x10-15",
        weight: "15kg",
        rir: "-",
      },
    ],
  },
  {
    day: "Friday",
    exercises: [
      {
        name: "przysiad do boxa",
        tempo: "-",
        sets: "4x5",
        weight: "50kg",
        rir: "-",
      },
      { name: "cossaq squat", tempo: "-", sets: "4x5", weight: "-", rir: "-" },
      {
        name: "jaskółka ze sztangą",
        tempo: "-",
        sets: "4x5",
        weight: "-",
        rir: "rir0",
      },
      {
        name: "łydki na maszynie siedząc",
        tempo: "-",
        sets: "4x10-12",
        weight: "rir2",
        rir: "-",
      },
      {
        name: "dead bug z mini band na stopach",
        tempo: "-",
        sets: "3x15 na stronę",
        weight: "-",
        rir: "-",
      },
    ],
  },
  {
    day: "sathurday",
    exercises: [
      {
        name: "przysiad do boxa",
        tempo: "-",
        sets: "4x5",
        weight: "50kg",
        rir: "-",
      },
      { name: "cossaq squat", tempo: "-", sets: "4x5", weight: "-", rir: "-" },
      {
        name: "jaskółka ze sztangą",
        tempo: "-",
        sets: "4x5",
        weight: "-",
        rir: "rir0",
      },
      {
        name: "łydki na maszynie siedząc",
        tempo: "-",
        sets: "4x10-12",
        weight: "rir2",
        rir: "-",
      },
      {
        name: "dead bug z mini band na stopach",
        tempo: "-",
        sets: "3x15 na stronę",
        weight: "-",
        rir: "-",
      },
    ],
  },
  {
    day: "Sunday",
    exercises: [
      {
        name: "przysiad do boxa",
        tempo: "-",
        sets: "4x5",
        weight: "50kg",
        rir: "-",
      },
      { name: "cossaq squat", tempo: "-", sets: "4x5", weight: "-", rir: "-" },
      {
        name: "jaskółka ze sztangą",
        tempo: "-",
        sets: "4x5",
        weight: "-",
        rir: "rir0",
      },
      {
        name: "łydki na maszynie siedząc",
        tempo: "-",
        sets: "4x10-12",
        weight: "rir2",
        rir: "-",
      },
      {
        name: "dead bug z mini band na stopach",
        tempo: "-",
        sets: "3x15 na stronę",
        weight: "-",
        rir: "-",
      },
    ],
  },
];

const GymScheduleTable = () => {
  return (
    <div className="p-4 max-w-5xl mx-auto ">
      <h1 className="text-2xl font-bold mb-6">Workout Plan</h1>
      <table className="w-full text-sm border-collapse border border-gray-300">
        <thead className="text-black">
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Day</th>
            <th className="border border-gray-300 p-2">Exercise Name</th>
            <th className="border border-gray-300 p-2">Tempo</th>
            <th className="border border-gray-300 p-2">Sets</th>
            <th className="border border-gray-300 p-2">Weight</th>
            <th className="border border-gray-300 p-2">RIR</th>
          </tr>
        </thead>
        <tbody className="text-white">
          {workoutPlan.map((dayPlan) => (
            <React.Fragment key={dayPlan.day}>
              <tr className="bg-gray-100">
                <td
                  className="border border-gray-300 p-2 font-semibold text-black"
                  colSpan="6"
                >
                  {dayPlan.day}
                </td>
              </tr>
              {dayPlan.exercises.map((exercise, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2">{++index}</td>
                  <td className="border border-gray-300 p-2">
                    {exercise.name}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {exercise.tempo}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {exercise.sets}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {exercise.weight}
                  </td>
                  <td className="border border-gray-300 p-2">{exercise.rir}</td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GymScheduleTable;
